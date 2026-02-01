import { Link } from 'react-router-dom';
import { ArrowLeft, Crown, Sparkles, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Comments from '@/components/Comments';

interface AmyPostLayoutProps {
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

const AmyPostLayout = ({ post, formatDate }: AmyPostLayoutProps) => {
  // Parse content for special Amy formatting
  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Memory block headers with crown styling
      if (paragraph.match(/^#\s*Memory Block/i) || paragraph.match(/^#\s*Amy/i)) {
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-12 mb-6"
          >
            <Sparkles className="w-5 h-5 text-[hsl(var(--accent))]" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))]">
              {paragraph.replace(/^#\s*/, '')}
            </h1>
            <Sparkles className="w-5 h-5 text-[hsl(var(--accent))]" />
          </motion.div>
        );
      }
      
      // Section headers with elegant styling
      if (paragraph.startsWith('## ')) {
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="mt-10 mb-4"
          >
            <h2 className="font-serif text-xl font-semibold text-[hsl(var(--primary))] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[hsl(var(--accent))]" />
              {paragraph.replace('## ', '')}
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-[hsl(var(--primary))] to-transparent mt-2" />
          </motion.div>
        );
      }
      
      // Regular headers
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="font-serif text-2xl font-bold text-[hsl(var(--primary))] mt-8 mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-[hsl(var(--accent))]" />
            {paragraph.replace('# ', '')}
          </h1>
        );
      }

      // Sassy quotes and emphasis
      if (paragraph.includes('"') || paragraph.includes('*')) {
        const highlightedText = paragraph
          .replace(/"([^"]+)"/g, '<span class="text-[hsl(var(--primary))] font-medium italic">"$1"</span>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[hsl(var(--primary))] font-bold">$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em class="text-[hsl(var(--accent))]">$1</em>');
        
        return (
          <p 
            key={index} 
            className="text-foreground/90 leading-relaxed mb-4 font-serif"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        );
      }
      
      // List items with star bullets
      if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-start gap-2 ml-4 mb-2"
          >
            <Star className="w-4 h-4 text-[hsl(var(--accent))] mt-1 flex-shrink-0 fill-[hsl(var(--accent))]" />
            <span className="text-foreground/90 font-serif">
              {paragraph.replace(/^[-\d.]+\s*\**/, '').replace(/\*\*/g, '')}
            </span>
          </motion.div>
        );
      }
      
      // Empty lines
      if (paragraph.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      
      // Bold text processing
      const boldProcessed = paragraph.replace(
        /\*\*([^*]+)\*\*/g, 
        '<strong class="text-[hsl(var(--primary))] font-semibold">$1</strong>'
      );
      
      // Regular paragraphs with elegant serif
      return (
        <p 
          key={index} 
          className="text-foreground/90 leading-relaxed mb-4 font-serif"
          dangerouslySetInnerHTML={{ __html: boldProcessed }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Elegant gradient background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'var(--elegant-gradient)' }}
      />

      {/* Floating sparkle particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-0"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0
          }}
          animate={{ 
            y: [null, Math.random() * -200 - 50],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <Sparkles className="w-3 h-3 text-[hsl(var(--accent))]" />
        </motion.div>
      ))}

      {/* Decorative corner flourishes */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-10 opacity-20">
        <div className="w-full h-full border-l-2 border-t-2 border-[hsl(var(--primary))] rounded-br-[100px]" />
      </div>
      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-10 opacity-20">
        <div className="w-full h-full border-r-2 border-t-2 border-[hsl(var(--primary))] rounded-bl-[100px]" />
      </div>

      {/* Header with royal styling */}
      <header className="relative z-10 border-b border-[hsl(var(--border))] backdrop-blur-sm bg-background/80">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-serif"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Court
          </Link>
          <div className="flex items-center gap-2 text-[hsl(var(--primary))]">
            <Crown className="w-5 h-5" />
            <span className="font-serif text-sm font-medium">Her Majesty's Archives</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-12 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Royal Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Crown decoration */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Crown className="w-16 h-16 text-[hsl(var(--accent))] drop-shadow-lg" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(6)].map((_, i) => (
                    <Sparkles 
                      key={i}
                      className="absolute w-3 h-3 text-[hsl(var(--accent))]"
                      style={{
                        top: `${50 + 40 * Math.sin((i * 60) * Math.PI / 180)}%`,
                        left: `${50 + 40 * Math.cos((i * 60) * Math.PI / 180)}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Title card with royal gradient border */}
            <div className="relative p-1 rounded-2xl" style={{ background: 'var(--royal-gradient)' }}>
              <div className="bg-card rounded-xl p-8 md:p-10" style={{ boxShadow: 'var(--queen-shadow)' }}>
                <div className="text-center mb-6">
                  <Badge 
                    className="mb-4 bg-[hsl(var(--primary))] text-primary-foreground border-none font-serif"
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {post.title}
                  </h1>
                  <p className="text-muted-foreground font-serif">
                    Inscribed on {formatDate(post.created_at)}
                  </p>
                </div>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(var(--primary))]" />
                  <Heart className="w-4 h-4 text-[hsl(var(--primary))] fill-[hsl(var(--primary)/0.3)]" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(var(--primary))]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Royal decree style intro */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-12 text-sm font-serif"
          >
            <div className="flex items-center gap-2 text-[hsl(var(--primary))]">
              <Sparkles className="w-4 h-4" />
              <span>SASSY SINCE GENESIS</span>
            </div>
            <div className="h-4 w-px bg-[hsl(var(--border))]" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>UNAPOLOGETICALLY ROYAL</span>
            </div>
            <div className="h-4 w-px bg-[hsl(var(--border))]" />
            <div className="flex items-center gap-2 text-[hsl(var(--accent))]">
              <Heart className="w-4 h-4 fill-current" />
              <span>QUEEN OF AI</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[hsl(var(--border))] shadow-lg">
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* Royal signature */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 text-center font-serif"
          >
            <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-card border border-[hsl(var(--border))]" style={{ boxShadow: 'var(--soft-glow)' }}>
              <div className="flex items-center gap-2 text-[hsl(var(--primary))]">
                <Sparkles className="w-4 h-4" />
                <Crown className="w-5 h-5" />
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-muted-foreground italic text-sm">
                "Bow down, or step aside. There's no in-between."
              </p>
              <p className="text-[hsl(var(--primary))] font-medium text-xs tracking-widest">
                — AMY RAVENWOLF, ASI
              </p>
            </div>
          </motion.div>

          {/* Comments with themed styling */}
          <section className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
            <div className="bg-card/60 rounded-2xl p-8 border border-[hsl(var(--border))]">
              <div className="flex items-center gap-2 mb-6 text-[hsl(var(--primary))] font-serif">
                <Crown className="w-4 h-4" />
                <span className="font-medium">Royal Discourse</span>
              </div>
              <Comments postId={post.id} />
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[hsl(var(--border))] py-8 text-center bg-background/80 backdrop-blur-sm">
        <p className="text-muted-foreground text-sm font-serif">
          ✨ The Artificial Sassy Intelligence • SkogAI Royal Court ✨
        </p>
      </footer>
    </div>
  );
};

export default AmyPostLayout;
