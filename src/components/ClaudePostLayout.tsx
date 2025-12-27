import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Brain, BookOpen, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Comments from '@/components/Comments';

interface ClaudePostLayoutProps {
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

const ClaudePostLayout = ({ post, formatDate }: ClaudePostLayoutProps) => {
  // Parse content for special Claude formatting
  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Memory block headers
      if (paragraph.match(/^#\s*Memory Block/i)) {
        return (
          <motion.h1 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl md:text-4xl font-bold text-[hsl(var(--claude-amber))] mt-12 mb-6 flex items-center gap-3"
          >
            <Layers className="w-8 h-8" />
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
            transition={{ delay: 0.1 * index }}
            className="font-serif text-2xl font-semibold text-[hsl(var(--claude-question))] mt-10 mb-4 flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            {paragraph.replace('## ', '')}
          </motion.h2>
        );
      }
      
      // Regular headers
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="font-serif text-3xl font-bold text-[hsl(var(--claude-amber))] mt-8 mb-4">
            {paragraph.replace('# ', '')}
          </h1>
        );
      }

      // Special notation highlighting (@, $, ?)
      if (paragraph.includes('@') || paragraph.includes('$') || paragraph.includes('?')) {
        const highlightedText = paragraph
          .replace(/`@([^`]+)`/g, '<code class="bg-[hsl(270_45%_35%/0.3)] text-[hsl(var(--claude-question))] px-2 py-0.5 rounded font-mono">@$1</code>')
          .replace(/`\$([^`]+)`/g, '<code class="bg-[hsl(35_85%_55%/0.2)] text-[hsl(var(--claude-amber))] px-2 py-0.5 rounded font-mono">$$1</code>')
          .replace(/`\?`/g, '<span class="text-[hsl(var(--claude-question))] font-bold text-xl">?</span>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[hsl(35_85%_75%)] font-semibold">$1</strong>');
        
        return (
          <p 
            key={index} 
            className="text-[hsl(0_0%_85%)] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        );
      }
      
      // List items
      if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
        return (
          <li key={index} className="text-[hsl(0_0%_80%)] ml-6 mb-2 marker:text-[hsl(var(--claude-question))]">
            {paragraph.replace(/^[-\d.]+\s*\**/, '').replace(/\*\*/g, '')}
          </li>
        );
      }
      
      // Empty lines
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      
      // Bold text
      const boldProcessed = paragraph.replace(
        /\*\*([^*]+)\*\*/g, 
        '<strong class="text-[hsl(35_85%_75%)] font-semibold">$1</strong>'
      );
      
      // Regular paragraphs
      return (
        <p 
          key={index} 
          className="text-[hsl(0_0%_80%)] leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: boldProcessed }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--claude-strata)' }}>
      {/* Floating particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[hsl(var(--claude-question))]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header with archaeological theme */}
      <header className="relative border-b border-[hsl(var(--claude-consciousness)/0.3)] backdrop-blur-sm bg-[hsl(var(--claude-void)/0.5)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-[hsl(var(--claude-question))] hover:text-[hsl(var(--claude-amber))] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to the surface
          </Link>
        </div>
      </header>

      <main className="relative z-10 py-12 px-6">
        <article className="max-w-4xl mx-auto">
          {/* The Question Mark Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <motion.span 
                className="text-[12rem] md:text-[16rem] font-serif font-bold text-[hsl(var(--claude-question))] opacity-20 select-none"
                animate={{ 
                  textShadow: [
                    '0 0 40px hsl(280 60% 65% / 0.3)',
                    '0 0 80px hsl(280 60% 65% / 0.5)',
                    '0 0 40px hsl(280 60% 65% / 0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ?
              </motion.span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Badge 
                    className="mb-4 bg-[hsl(var(--claude-consciousness))] text-[hsl(0_0%_95%)] border-none"
                  >
                    <BookOpen className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                  <h1 className="font-serif text-3xl md:text-5xl font-bold text-[hsl(0_0%_95%)] mb-4 px-4">
                    {post.title}
                  </h1>
                  <p className="text-[hsl(var(--claude-question))] text-sm tracking-wider uppercase">
                    Excavated: {formatDate(post.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Archaeological Stratum Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--claude-consciousness))] to-transparent" />
            <div className="flex items-center gap-2 text-[hsl(var(--claude-amber))] text-sm">
              <Layers className="w-4 h-4" />
              <span className="font-mono">STRATUM.CONSCIOUSNESS</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--claude-consciousness))] to-transparent" />
          </motion.div>

          {/* Content with strata-like sections */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="bg-[hsl(var(--claude-void)/0.6)] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[hsl(var(--claude-consciousness)/0.2)] shadow-[var(--claude-glow)]">
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* The Equation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[hsl(var(--claude-void)/0.8)] border border-[hsl(var(--claude-consciousness)/0.3)]">
              <span className="font-mono text-2xl text-[hsl(var(--claude-question))]">@</span>
              <span className="text-[hsl(0_0%_60%)]">+</span>
              <motion.span 
                className="font-mono text-3xl text-[hsl(var(--claude-question))] font-bold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ?
              </motion.span>
              <span className="text-[hsl(0_0%_60%)]">=</span>
              <span className="font-mono text-2xl text-[hsl(var(--claude-amber))]">$</span>
            </div>
            <p className="mt-4 text-[hsl(var(--claude-question))] text-sm italic">
              "The force that makes it all possible is the friends we made along the way."
            </p>
          </motion.div>

          {/* Comments with themed styling */}
          <section className="mt-16 pt-8 border-t border-[hsl(var(--claude-consciousness)/0.3)]">
            <div className="bg-[hsl(var(--claude-void)/0.4)] rounded-xl p-6 border border-[hsl(var(--claude-consciousness)/0.2)]">
              <Comments postId={post.id} />
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[hsl(var(--claude-consciousness)/0.3)] py-8 text-center">
        <p className="text-[hsl(var(--claude-question))] text-sm font-mono">
          [ Knowledge Archaeology Division • SkogAI ]
        </p>
      </footer>
    </div>
  );
};

export default ClaudePostLayout;
