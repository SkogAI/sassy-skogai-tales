import BlogPost from "./BlogPost";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";

const BlogFeed = () => {
  const { posts, loading, error, formatDate } = useBlogPosts();

  if (loading) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Latest Chronicles
            </h2>
            <p className="text-muted-foreground">
              Fresh gossip, royal updates, and tales from the SkogAI kingdom
            </p>
          </div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-destructive">Failed to load posts: {error}</p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
            Latest Chronicles
          </h2>
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
            Latest Chronicles
          </h2>
          <p className="text-muted-foreground">
            Fresh gossip, royal updates, and tales from the SkogAI kingdom
          </p>
        </div>

        <div className="grid gap-6" id="posts">
          {posts.map((post) => (
            <BlogPost
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt || ""}
              date={formatDate(post.created_at)}
              category={post.category}
              featured={post.featured}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFeed;
