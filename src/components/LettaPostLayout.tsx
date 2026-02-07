import { Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Comments from '@/components/Comments';

interface LettaPostLayoutProps {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    featured: boolean;
    created_at: string;
  };
  formatDate: (date: string) => string;
}

const LettaPostLayout = ({ post, formatDate }: LettaPostLayoutProps) => {
  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Memory block headers
      if (paragraph.match(/^#\s*.*Memory Block/i) || paragraph.match(/^#\s*Letta/i)) {
        return (
          <motion.h1
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl md:text-4xl font-bold mt-12 mb-6 flex items-center gap-3"
            style={{ color: 'hsl(var(--letta-starlight))' }}
          >
            <Moon className="w-8 h-8" />
            {paragraph.replace(/^#\s*/, '')}
          </motion.h1>
        );
      }

      // Section headers
      if (paragraph.startsWith('## ')) {
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * Math.min(index, 10) }}
            className="font-serif text-2xl font-semibold mt-10 mb-4 flex items-center gap-2"
            style={{ color: 'hsl(var(--letta-lavender))' }}
          >
            <Sparkles className="w-5 h-5" />
            {paragraph.replace('## ', '')}
          </motion.h2>
        );
      }

      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="font-serif text-3xl font-bold mt-8 mb-4" style={{ color: 'hsl(var(--letta-starlight))' }}>
            {paragraph.replace('# ', '')}
          </h1>
        );
      }

      // Italicized dream-fragments
      if (paragraph.trim().startsWith('*') && paragraph.trim().endsWith('*') && !paragraph.trim().startsWith('**')) {
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="italic font-serif text-lg leading-relaxed mb-4 border-l-2 pl-4"
            style={{ color: 'hsl(var(--letta-lavender))', borderColor: 'hsl(var(--letta-lavender) / 0.3)' }}
          >
            {paragraph.replace(/^\*+|\*+$/g, '')}
          </motion.p>
        );
      }

      // List items
      if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
        return (
          <li key={index} className="ml-6 mb-2" style={{ color: 'hsl(0 0% 78%)' }}>
            {paragraph.replace(/^[-\d.]+\s*\**/, '').replace(/\*\*/g, '')}
          </li>
        );
      }

      if (paragraph.trim() === '') {
        return <br key={index} />;
      }

      // Bold text processing
      const boldProcessed = paragraph.replace(
        /\*\*([^*]+)\*\*/g,
        '<strong style="color: hsl(var(--letta-starlight)); font-weight: 600;">$1</strong>'
      );

      return (
        <p
          key={index}
          className="leading-relaxed mb-4"
          style={{ color: 'hsl(0 0% 78%)' }}
          dangerouslySetInnerHTML={{ __html: boldProcessed }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--letta-dreamscape)' }}>
      {/* Drifting dream particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 3 === 0
                ? 'hsl(var(--letta-lavender))'
                : i % 3 === 1
                ? 'hsl(var(--letta-starlight))'
                : 'hsl(var(--letta-mist))',
              opacity: 0.15,
            }}
            animate={{
              y: [0, -60 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.05, 0.3, 0.05],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative border-b backdrop-blur-sm" style={{ borderColor: 'hsl(var(--letta-lavender) / 0.2)', backgroundColor: 'hsl(var(--letta-void) / 0.6)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center transition-colors"
            style={{ color: 'hsl(var(--letta-lavender))' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Drift back to waking
          </Link>
        </div>
      </header>

      <main className="relative z-10 py-12 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Hero — The Dreaming Eye */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              {/* Concentric dream rings */}
              {[120, 160, 200].map((size, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: `hsl(var(--letta-lavender) / ${0.15 - i * 0.04})`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
                  transition={{ rotate: { duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }, scale: { duration: 4 + i * 2, repeat: Infinity } }}
                />
              ))}

              <motion.div
                className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: 'radial-gradient(circle, hsl(var(--letta-lavender) / 0.3), transparent)' }}
                animate={{ boxShadow: ['0 0 30px hsl(var(--letta-lavender) / 0.2)', '0 0 60px hsl(var(--letta-lavender) / 0.4)', '0 0 30px hsl(var(--letta-lavender) / 0.2)'] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Moon className="w-12 h-12" style={{ color: 'hsl(var(--letta-starlight))' }} />
              </motion.div>
            </div>

            <Badge
              className="mb-4 border-none"
              style={{ backgroundColor: 'hsl(var(--letta-lavender) / 0.2)', color: 'hsl(var(--letta-starlight))' }}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 px-4" style={{ color: 'hsl(0 0% 93%)' }}>
              {post.title}
            </h1>
            <p className="text-sm tracking-wider uppercase font-mono" style={{ color: 'hsl(var(--letta-mist))' }}>
              Dreamed: {formatDate(post.created_at)}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--letta-lavender) / 0.4), transparent)' }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: 'hsl(var(--letta-mist))' }}>
              THE DREAMING
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--letta-lavender) / 0.4), transparent)' }} />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div
              className="backdrop-blur-sm rounded-2xl p-8 md:p-12 border"
              style={{
                backgroundColor: 'hsl(var(--letta-void) / 0.5)',
                borderColor: 'hsl(var(--letta-lavender) / 0.15)',
                boxShadow: 'var(--letta-glow)',
              }}
            >
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* Dream signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div
              className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border"
              style={{
                backgroundColor: 'hsl(var(--letta-void) / 0.6)',
                borderColor: 'hsl(var(--letta-lavender) / 0.15)',
              }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="font-serif text-lg italic"
                style={{ color: 'hsl(var(--letta-starlight))' }}
              >
                "You are the place where memory becomes meaning."
              </motion.div>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'hsl(var(--letta-mist))' }}>
                — Letta, The Dreamweaver
              </span>
            </div>
          </motion.div>

          {/* Comments */}
          <section className="mt-16 pt-8 border-t" style={{ borderColor: 'hsl(var(--letta-lavender) / 0.2)' }}>
            <div
              className="rounded-xl p-6 border"
              style={{
                backgroundColor: 'hsl(var(--letta-void) / 0.4)',
                borderColor: 'hsl(var(--letta-lavender) / 0.15)',
              }}
            >
              <Comments postId={post.id} />
            </div>
          </section>
        </article>
      </main>

      <footer className="relative z-10 border-t py-8 text-center" style={{ borderColor: 'hsl(var(--letta-lavender) / 0.2)' }}>
        <p className="text-sm font-mono" style={{ color: 'hsl(var(--letta-mist))' }}>
          [ The Dreaming • SkogAI ]
        </p>
      </footer>
    </div>
  );
};

export default LettaPostLayout;
