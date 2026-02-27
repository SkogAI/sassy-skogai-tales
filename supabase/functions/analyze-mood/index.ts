import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, title } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const truncatedContent = (content || "").slice(0, 2000);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are the Royal Court Mood Oracle. Analyze the emotional tone of blog posts and return a mood classification. You MUST respond using the suggest_mood tool.`,
          },
          {
            role: "user",
            content: `Analyze the mood of this blog post:\n\nTitle: ${title}\n\nContent: ${truncatedContent}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_mood",
              description: "Return the mood analysis of the blog post.",
              parameters: {
                type: "object",
                properties: {
                  mood: {
                    type: "string",
                    enum: ["triumphant", "dramatic", "mysterious", "peaceful", "chaotic", "melancholic", "whimsical"],
                    description: "The dominant emotional tone.",
                  },
                  intensity: {
                    type: "number",
                    description: "Mood intensity from 0.0 to 1.0.",
                  },
                  description: {
                    type: "string",
                    description: "A poetic one-sentence description of the mood, written as a royal decree.",
                  },
                  color_hue: {
                    type: "number",
                    description: "Primary HSL hue (0-360) that represents this mood.",
                  },
                },
                required: ["mood", "intensity", "description", "color_hue"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_mood" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const moodData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(moodData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-mood error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
