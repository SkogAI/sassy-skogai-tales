import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface CommentsListProps {
  postId: string;
  refreshTrigger: number;
}

const CommentsList = ({ postId, refreshTrigger }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('id, author_name, content, created_at')
        .eq('post_id', postId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center text-muted-foreground">
        Loading royal commentary...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <Card className="border-accent/20 bg-sparkle-gradient/5">
        <CardContent className="text-center py-8">
          <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Be the first to grace this chronicle with your royal commentary!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5" />
        <h3 className="font-serif text-xl font-bold text-foreground">
          Royal Commentary ({comments.length})
        </h3>
      </div>
      
      {comments.map((comment) => (
        <Card 
          key={comment.id} 
          className="transition-all duration-300 hover:shadow-soft-glow border-accent/20"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-accent/50">
                  {comment.author_name}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {formatDate(comment.created_at)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentsList;