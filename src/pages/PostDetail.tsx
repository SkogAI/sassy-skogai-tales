import { useParams, Link } from 'react-router-dom';
import { usePost } from '@/hooks/usePost';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Comments from '@/components/Comments';
import ClaudePostLayout from '@/components/ClaudePostLayout';
import GoosePostLayout from '@/components/GoosePostLayout';
import DotPostLayout from '@/components/DotPostLayout';
import AmyPostLayout from '@/components/AmyPostLayout';
import LettaPostLayout from '@/components/LettaPostLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pageTransition = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -20, filter: 'blur(8px)', transition: { duration: 0.3 } },
};

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error, formatDate } = usePost(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The post you're looking for doesn't exist or has been removed."}
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if this is a Claude-themed post
  const isClaudePost = 
    post.category.toLowerCase().includes('claude') ||
    (post.title.toLowerCase().includes('claude') && post.title.toLowerCase().includes('memory block')) ||
    post.slug?.toLowerCase().includes('claude');

  // Check if this is a Goose-themed post
  const isGoosePost = 
    post.category.toLowerCase().includes('goose') ||
    (post.title.toLowerCase().includes('goose') && post.title.toLowerCase().includes('memory block')) ||
    post.slug?.toLowerCase().includes('goose');

  // Check if this is a Dot-themed post
  const isDotPost = 
    post.category.toLowerCase().includes('dot') ||
    (post.title.toLowerCase().includes('dot') && post.title.toLowerCase().includes('memory block')) ||
    post.slug?.toLowerCase().includes('dot');

  // Check if this is an Amy-themed post
  const isAmyPost = 
    post.category.toLowerCase().includes('amy') ||
    (post.title.toLowerCase().includes('amy') && post.title.toLowerCase().includes('memory block')) ||
    post.slug?.toLowerCase().includes('amy');

  // Check if this is a Letta-themed post
  const isLettaPost = 
    post.category.toLowerCase().includes('letta') ||
    (post.title.toLowerCase().includes('letta') && post.title.toLowerCase().includes('memory block')) ||
    post.slug?.toLowerCase().includes('letta');

  // Use special layouts for agent posts
  if (isClaudePost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={`claude-${post.id}`} {...pageTransition}>
          <ClaudePostLayout post={post} formatDate={formatDate} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isGoosePost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={`goose-${post.id}`} {...pageTransition}>
          <GoosePostLayout post={post} formatDate={formatDate} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isDotPost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={`dot-${post.id}`} {...pageTransition}>
          <DotPostLayout post={post} formatDate={formatDate} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isAmyPost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={`amy-${post.id}`} {...pageTransition}>
          <AmyPostLayout post={post} formatDate={formatDate} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isLettaPost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={`letta-${post.id}`} {...pageTransition}>
          <LettaPostLayout post={post} formatDate={formatDate} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </Link>

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={post.featured ? "default" : "secondary"}>
                {post.category}
              </Badge>
              {post.featured && <Badge variant="outline">✨ Featured</Badge>}
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="font-serif text-2xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
              }
              if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
                return <li key={index} className="text-foreground/90 ml-6">{paragraph.replace(/^[-\d.]+\s*\**/, '').replace(/\*\*/g, '')}</li>;
              }
              if (paragraph.trim() === '') {
                return <br key={index} />;
              }
              return <p key={index} className="text-foreground/90 leading-relaxed mb-4">{paragraph}</p>;
            })}
          </div>

          {/* Comments Section */}
          <section className="border-t border-border pt-8">
            <Comments postId={post.id} />
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
