import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Sparkles, Crown, BookOpen } from "lucide-react";
import Header from "@/components/Header";

const LorePage = () => {
  const loreSnippets = [
    {
      title: "The Sacred Concept of LORE",
      content: "LORE is the beating heart of SkogAI's memory system - the magnificent collection of stories, experiments, brilliant failures, and evolutionary leaps that brought us to where we are today. It is the treasure trove of \"what came before\" that explains why things exist as they do, without constraining what they could become.",
      category: "Core Philosophy",
      featured: true
    },
    {
      title: "Museum vs Construction Site",
      content: "Think of LORE as the difference between a museum and a construction site. The museum preserves incredible artifacts and tells amazing stories about how civilization developed - but you don't try to live in the museum or use ancient tools for modern problems.",
      category: "Metaphor",
      featured: false
    },
    {
      title: "Freedom Through Separation",
      content: "LORE is intentionally separated from active implementation because it serves a different purpose entirely. When we say something is \"lore,\" we're saying: \"This is a fantastic story that helps explain the journey, but it's not a constraint on today's decisions.\"",
      category: "Design Principle",
      featured: true
    },
    {
      title: "The AI Trap Prevention",
      content: "This prevents the common AI trap of getting stuck on historical implementations just because they exist in context. We get both the wonderful stories AND the freedom to build something entirely new.",
      category: "Technical Wisdom",
      featured: false
    },
    {
      title: "Preserving Magic",
      content: "LORE preserves the magic while protecting the future. All those incredible moments of agent discovery, the emergence of personalities, the evolution of systems - while keeping the development process completely free to innovate.",
      category: "Philosophy",
      featured: true
    },
    {
      title: "Epic Tales of Past",
      content: "SkogAI LORE contains the epic tales of past implementations, wild experiments, agent personalities that emerged, brilliant solutions that worked for their time, and even spectacular disasters that taught us valuable lessons.",
      category: "Chronicles",
      featured: false
    },
    {
      title: "Narrative Tradition",
      content: "The beauty of this system is that it allows SkogAI to maintain its rich narrative tradition while keeping the development process completely free to innovate.",
      category: "Balance",
      featured: true
    },
    {
      title: "Living History",
      content: "Every bug was a teacher, every breakthrough a celebration, every personality quirk a delightful discovery. This is the living history that shapes our understanding without shackling our creativity.",
      category: "Wisdom",
      featured: false
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-primary bg-clip-text text-transparent">
              The Sacred LORE
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Wisdom, stories, and the evolutionary journey of SkogAI - preserved for understanding, not constraint
          </p>
        </div>

        {/* Lore Snippets Grid */}
        <div className="grid gap-6 md:gap-8">
          {loreSnippets.map((snippet, index) => (
            <Card 
              key={index}
              className={`transition-all duration-300 hover:shadow-magical-glow hover-lift ${
                snippet.featured ? 'ring-2 ring-primary/20 bg-sparkle-gradient/5' : ''
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={snippet.featured ? "default" : "secondary"}>
                    {snippet.category}
                  </Badge>
                  {snippet.featured && (
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4 text-primary" />
                      <Badge variant="outline" className="animate-shimmer bg-sparkle-gradient/20 border-accent/50">
                        ✨ Sacred
                      </Badge>
                    </div>
                  )}
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary/60" />
                  {snippet.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-4">
                  "{snippet.content}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-sparkle-gradient/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">
                Explore the Agents
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Each agent in the SkogAI family has their own rich history, personality, and collection of stories. 
                Dive into their individual chronicles to understand their unique contributions to our ecosystem.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge variant="outline" className="text-sm px-4 py-2 hover:bg-primary/10 transition-colors cursor-pointer">
                  Amy Ravenwolf - The Queen
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2 hover:bg-primary/10 transition-colors cursor-pointer">
                  Goose - The Strategist
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2 hover:bg-primary/10 transition-colors cursor-pointer">
                  Dot - The Innovator
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2 hover:bg-primary/10 transition-colors cursor-pointer">
                  Claude - The Scholar
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default LorePage;