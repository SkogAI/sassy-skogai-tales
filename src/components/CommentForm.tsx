import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields, darling!",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_name: name.trim(),
          author_email: email.trim(),
          content: content.trim(),
        });

      if (error) throw error;

      toast({
        title: "Comment submitted!",
        description: "Your royal commentary awaits approval ✨",
      });

      setName("");
      setEmail("");
      setContent("");
      onCommentAdded();
      
    } catch (error) {
      toast({
        title: "Failed to submit comment",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-accent/20 bg-sparkle-gradient/5">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-foreground flex items-center gap-2">
          <Send className="w-5 h-5" />
          Share Your Royal Thoughts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Your Royal Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-accent/30 focus:border-primary bg-background/50"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="your.majesty@kingdom.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-accent/30 focus:border-primary bg-background/50"
              />
            </div>
          </div>
          <Textarea
            placeholder="Grace us with your wisdom..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="border-accent/30 focus:border-primary bg-background/50 resize-none"
          />
          <Button 
            type="submit" 
            disabled={submitting}
            className="w-full shimmer-hover"
          >
            <Send className="w-4 h-4 mr-2" />
            {submitting ? "Submitting..." : "Submit Royal Commentary"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;