import BlogPost from "./BlogPost";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const BlogFeed = () => {
  const { posts, loading, error, formatDate, getCommentCount } = useBlogPosts();

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3 animate-pulse-glow bg-rainbow-gradient bg-clip-text text-transparent">
            Latest Chronicles
          </h2>
          <p className="text-muted-foreground">
            Fresh gossip, royal updates, and tales from the SkogAI kingdom
          </p>
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading the royal chronicles...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-destructive">Error loading posts: {error}</p>
          </div>
        )}
        
        <div className="grid gap-6">
          {posts.map((post) => (
            <BlogPost 
              key={post.id} 
              title={post.title}
              excerpt={post.excerpt}
              date={formatDate(post.created_at)}
              category={post.category}
              commentCount={getCommentCount(post.id)}
              featured={post.featured}
              slug={post.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFeed;