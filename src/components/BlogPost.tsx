import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
  slug?: string | null;
}

const BlogPost = ({ id, title, excerpt, date, category, featured = false, slug }: BlogPostProps) => {
  const postUrl = `/post/${slug || id}`;

  return (
    <Link to={postUrl}>
      <Card className={`transition-all duration-300 hover:shadow-soft-glow hover:-translate-y-1 cursor-pointer ${featured ? 'ring-2 ring-primary/20' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant={featured ? "default" : "secondary"}>
              {category}
            </Badge>
            {featured && <Badge variant="outline">✨ Featured</Badge>}
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </div>
            <span className="flex items-center gap-1 text-primary">
              Read more <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPost;