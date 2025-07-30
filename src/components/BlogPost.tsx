import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
  slug?: string;
}

const BlogPost = ({ title, excerpt, date, category, featured = false, slug }: BlogPostProps) => {
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      if (!slug) return;
      
      try {
        const { count, error } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', slug)
          .eq('approved', true);

        if (error) throw error;
        setCommentCount(count || 0);
      } catch (error) {
        console.error('Error fetching comment count:', error);
      }
    };

    fetchCommentCount();
  }, [slug]);

  const handleClick = () => {
    if (slug) {
      navigate(`/post/${slug}`);
    }
  };

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-magical-glow cursor-pointer hover-lift ${featured ? 'ring-2 ring-primary/20 bg-sparkle-gradient/5' : ''}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={featured ? "default" : "secondary"}>
            {category}
          </Badge>
          {featured && <Badge variant="outline" className="animate-shimmer bg-sparkle-gradient/20 border-accent/50">✨ Featured</Badge>}
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {commentCount} comments
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPost;