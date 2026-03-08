import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Shield, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Official = () => {
  const { posts, loading, error, formatDate } = useBlogPosts();

  const officialPosts = posts.filter(
    (p) =>
      p.category.toLowerCase() === 'official documentation' ||
      p.category.toLowerCase() === 'official'
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--official-bg))]">
      <Header />

      {/* Hero */}
      <div style={{ background: 'var(--official-header-gradient)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[hsl(var(--official-accent))]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[hsl(220_16%_65%)]">
                SkogAI Governance
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-sans mb-4">
              Official Documentation
            </h1>
            <p className="text-[hsl(220_16%_65%)] max-w-xl mx-auto leading-relaxed">
              Dictator decisions, release declarations, and governance records for the SkogAI ecosystem.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-destructive">{error}</p>
        )}

        {!loading && !error && officialPosts.length === 0 && (
          <p className="text-center text-[hsl(var(--official-muted))] py-16">
            No official documents published yet.
          </p>
        )}

        <div className="space-y-4">
          {officialPosts.map((post, i) => {
            // Extract status from content
            const statusMatch = post.content?.match(/\*\*Status\*\*:\s*(.+)/);
            const status = statusMatch ? statusMatch[1].trim() : null;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <Link to={`/post/${post.slug || post.id}`}>
                  <div className="bg-[hsl(var(--official-surface))] border border-[hsl(var(--official-border))] rounded-lg p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-[hsl(var(--official-accent))] flex-shrink-0" />
                          <h2 className="font-sans font-semibold text-[hsl(var(--official-heading))] truncate group-hover:text-[hsl(var(--official-accent))] transition-colors">
                            {post.title}
                          </h2>
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-[hsl(var(--official-muted))] line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--official-muted))]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.created_at)}
                          </div>
                          {status && (
                            <Badge
                              variant="outline"
                              className="text-[10px] border-[hsl(var(--official-success))] text-[hsl(var(--official-success))]"
                            >
                              {status}
                            </Badge>
                          )}
                          {post.featured && (
                            <Badge variant="outline" className="text-[10px]">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[hsl(var(--official-muted))] group-hover:text-[hsl(var(--official-accent))] transition-colors mt-1 flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Official;
