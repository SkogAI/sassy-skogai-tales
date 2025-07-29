import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  commentCount: number;
  featured?: boolean;
  slug?: string;
}

const BlogPost = ({ title, excerpt, date, category, commentCount, featured = false, slug }: BlogPostProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (slug) {
      navigate(`/post/${slug}`);
    }
  };

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-soft-glow cursor-pointer ${featured ? 'ring-2 ring-primary/20' : ''}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={featured ? "default" : "secondary"}>
            {category}
          </Badge>
          {featured && <Badge variant="outline">✨ Featured</Badge>}
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