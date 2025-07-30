import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/hooks/useBlogPosts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentForm from "@/components/CommentForm";
import CommentsList from "@/components/CommentsList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar } from "lucide-react";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshComments, setRefreshComments] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch the main post
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .eq('published', true)
          .maybeSingle();

        if (postError) throw postError;
        setPost(postData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentAdded = () => {
    setRefreshComments(prev => prev + 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-center text-muted-foreground">Loading the royal chronicle...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-center text-destructive">
            {error || 'Chronicle not found'}
          </p>
          <div className="text-center mt-4">
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chronicles
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Button 
          onClick={() => navigate('/')} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chronicles
        </Button>

        <article className="mb-12">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={post.featured ? "default" : "secondary"}>
                {post.category}
              </Badge>
              {post.featured && <Badge variant="outline">✨ Featured</Badge>}
            </div>
            
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-foreground">
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>
        </article>

        <Separator className="my-12" />
        
        <section className="space-y-8">
          <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
          <CommentsList postId={post.id} refreshTrigger={refreshComments} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;