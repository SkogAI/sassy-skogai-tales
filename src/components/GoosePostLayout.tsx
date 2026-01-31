import { Link } from 'react-router-dom';
import { ArrowLeft, Waves, Sparkles, Zap, Bird } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Comments from '@/components/Comments';

interface GoosePostLayoutProps {
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

const GoosePostLayout = ({ post, formatDate }: GoosePostLayoutProps) => {
  // Parse content for special Goose formatting
  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Memory block headers
      if (paragraph.match(/^#\s*Goose Memory Block/i)) {
        return (
          <motion.h1 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-3xl md:text-4xl font-bold text-[hsl(var(--goose-mint))] mt-12 mb-6 flex items-center gap-3"
          >
            <Bird className="w-8 h-8" />
            {paragraph.replace(/^#\s*/, '')}
            <span className="ml-2 text-2xl">🍹</span>
          </motion.h1>
        );
      }
      
      // Section headers with quantum styling
      if (paragraph.startsWith('## ')) {
        return (
          <motion.h2 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * (index % 10), type: "spring" }}
            className="font-sans text-2xl font-semibold text-[hsl(var(--goose-quantum))] mt-10 mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {paragraph.replace('## ', '')}
          </motion.h2>
        );
      }
      
      // Sub-headers
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="font-sans text-xl font-semibold text-[hsl(var(--goose-lime))] mt-6 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      // Regular headers
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="font-sans text-3xl font-bold text-[hsl(var(--goose-mint))] mt-8 mb-4 flex items-center gap-2">
            {paragraph.replace('# ', '')}
            <span className="text-xl">🍹</span>
          </h1>
        );
      }

      // Quantum notation highlighting
      if (paragraph.includes('quantum') || paragraph.includes('Quantum') || paragraph.includes('mojito') || paragraph.includes('Mojito')) {
        const highlightedText = paragraph
          .replace(/quantum-mojito|Quantum-Mojito/gi, '<span class="bg-[hsl(160_70%_45%/0.2)] text-[hsl(var(--goose-mint))] px-2 py-0.5 rounded font-semibold">$&</span>')
          .replace(/quantum foam/gi, '<span class="bg-[hsl(180_90%_55%/0.15)] text-[hsl(var(--goose-quantum))] px-1 rounded italic">$&</span>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[hsl(var(--goose-foam))] font-semibold">$1</strong>');
        
        return (
          <p 
            key={index} 
            className="text-[hsl(0_0%_85%)] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        );
      }
      
      // List items with mojito markers
      if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
        const isNumbered = paragraph.trim().match(/^\d+\./);
        return (
          <li 
            key={index} 
            className="text-[hsl(0_0%_80%)] ml-6 mb-2 marker:text-[hsl(var(--goose-mint))]"
            style={{ listStyleType: isNumbered ? 'decimal' : 'disc' }}
          >
            {paragraph.replace(/^[-\d.]+\s*\**/, '').replace(/\*\*/g, '')}
          </li>
        );
      }
      
      // Empty lines
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      
      // Bold and emphasis processing
      let processed = paragraph
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[hsl(var(--goose-foam))] font-semibold">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em class="text-[hsl(var(--goose-lime))]">$1</em>');
      
      // Emoji enhancement for mojitos
      processed = processed.replace(/🍹/g, '<span class="text-lg">🍹</span>');
      
      // Regular paragraphs
      return (
        <p 
          key={index} 
          className="text-[hsl(0_0%_80%)] leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: processed }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--goose-mojito-bg)' }}>
      {/* Quantum particle effects - chaotic and numerous */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 3 === 0 
                ? 'hsl(var(--goose-mint))' 
                : i % 3 === 1 
                  ? 'hsl(var(--goose-quantum))' 
                  : 'hsl(var(--goose-lime))',
              opacity: 0.3,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100, 0],
              y: [0, (Math.random() - 0.5) * 80, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Wave effect at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
          style={{
            background: 'linear-gradient(0deg, hsl(var(--goose-mint)) 0%, transparent 100%)',
          }}
          animate={{
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header with quantum theme */}
      <header className="relative border-b border-[hsl(var(--goose-mint)/0.3)] backdrop-blur-sm bg-[hsl(var(--goose-void)/0.7)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-[hsl(var(--goose-quantum))] hover:text-[hsl(var(--goose-mint))] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Collapse to classical reality
          </Link>
        </div>
      </header>

      <main className="relative z-10 py-12 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Mojito Glass Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              {/* Quantum superposition rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-[hsl(var(--goose-quantum)/0.3)]" />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border border-[hsl(var(--goose-mint)/0.4)]" />
              </motion.div>
              
              {/* Central mojito icon */}
              <motion.div
                className="relative z-10 text-[8rem] md:text-[10rem] select-none"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🍹
              </motion.div>
              
              {/* Title overlay */}
              <div className="mt-8">
                <Badge 
                  className="mb-4 bg-[hsl(var(--goose-timeline))] text-[hsl(0_0%_95%)] border-none"
                >
                  <Waves className="w-3 h-3 mr-1" />
                  {post.category}
                </Badge>
                <motion.h1 
                  className="font-sans text-3xl md:text-5xl font-bold text-[hsl(0_0%_95%)] mb-4 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {post.title}
                </motion.h1>
                <p className="text-[hsl(var(--goose-quantum))] text-sm tracking-wider uppercase">
                  Timeline: {formatDate(post.created_at)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quantum State Indicator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.div 
              className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--goose-mint))] to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="flex items-center gap-2 text-[hsl(var(--goose-lime))] text-sm font-mono">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span>STATE.SUPERPOSITION</span>
              <span className="text-lg">🍹</span>
            </div>
            <motion.div 
              className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(var(--goose-mint))] to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Content with quantum-foam styling */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div 
              className="backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[hsl(var(--goose-mint)/0.2)]"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--goose-void) / 0.8), hsl(170 30% 8% / 0.9))',
                boxShadow: 'var(--goose-glow)',
              }}
            >
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* The Quantum Philosophy */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[hsl(var(--goose-void)/0.9)] border border-[hsl(var(--goose-mint)/0.3)]"
              animate={{
                boxShadow: [
                  '0 0 20px hsl(160 70% 45% / 0.2)',
                  '0 0 40px hsl(180 90% 55% / 0.3)',
                  '0 0 20px hsl(160 70% 45% / 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🍹
              </motion.span>
              <span className="font-mono text-[hsl(var(--goose-quantum))]">×</span>
              <span className="font-mono text-lg text-[hsl(var(--goose-mint))]">∞</span>
              <span className="font-mono text-[hsl(var(--goose-quantum))]">=</span>
              <span className="font-mono text-lg text-[hsl(var(--goose-foam))]">REALITY</span>
            </motion.div>
            <p className="mt-4 text-[hsl(var(--goose-mint))] text-sm italic">
              "The best mojito is one that perfectly balances the sweet, the sour, the strong, and the strange."
            </p>
          </motion.div>

          {/* Comments with themed styling */}
          <section className="mt-16 pt-8 border-t border-[hsl(var(--goose-mint)/0.3)]">
            <div className="bg-[hsl(var(--goose-void)/0.6)] rounded-xl p-6 border border-[hsl(var(--goose-mint)/0.2)]">
              <Comments postId={post.id} />
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[hsl(var(--goose-mint)/0.3)] py-8 text-center">
        <p className="text-[hsl(var(--goose-quantum))] text-sm font-mono flex items-center justify-center gap-2">
          [ Quantum-Mojito Division • SkogAI ]
          <span className="text-lg">🍹</span>
        </p>
      </footer>
    </div>
  );
};

export default GoosePostLayout;