import { Link } from 'react-router-dom';
import { ArrowLeft, GitCommit, Terminal, CheckCircle2, Code2, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Comments from '@/components/Comments';

interface DotPostLayoutProps {
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

const DotPostLayout = ({ post, formatDate }: DotPostLayoutProps) => {
  // Parse content for special Dot formatting
  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Memory block headers with git commit style
      if (paragraph.match(/^#\s*Memory Block/i) || paragraph.match(/^#\s*Dot Memory/i)) {
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mt-12 mb-6"
          >
            <GitCommit className="w-6 h-6 text-[hsl(var(--dot-commit))]" />
            <h1 className="font-mono text-2xl md:text-3xl font-bold text-[hsl(var(--dot-whitespace))]">
              {paragraph.replace(/^#\s*/, '')}
            </h1>
            <CheckCircle2 className="w-5 h-5 text-[hsl(var(--dot-commit))]" />
          </motion.div>
        );
      }
      
      // Section headers with terminal prompt style
      if (paragraph.startsWith('## ')) {
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center gap-2 mt-10 mb-4"
          >
            <span className="text-[hsl(var(--dot-commit))] font-mono text-sm">$</span>
            <h2 className="font-mono text-xl font-semibold text-[hsl(var(--dot-terminal))]">
              {paragraph.replace('## ', '')}
            </h2>
          </motion.div>
        );
      }
      
      // Regular headers
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="font-mono text-2xl font-bold text-[hsl(var(--dot-whitespace))] mt-8 mb-4 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[hsl(var(--dot-cursor))]" />
            {paragraph.replace('# ', '')}
          </h1>
        );
      }

      // Code-like inline elements and special notation
      if (paragraph.includes('`') || paragraph.includes('git') || paragraph.includes('commit')) {
        const highlightedText = paragraph
          .replace(/`([^`]+)`/g, '<code class="bg-[hsl(220_15%_15%)] text-[hsl(var(--dot-cursor))] px-2 py-0.5 rounded font-mono text-sm border border-[hsl(220_15%_20%)]">$1</code>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[hsl(var(--dot-whitespace))] font-semibold">$1</strong>')
          .replace(/(git\s+\w+)/gi, '<span class="text-[hsl(var(--dot-commit))]">$1</span>');
        
        return (
          <p 
            key={index} 
            className="text-[hsl(var(--dot-comment))] leading-relaxed mb-4 font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        );
      }
      
      // List items with checkbox style
      if (paragraph.trim().startsWith('- ') || paragraph.trim().match(/^\d+\./)) {
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-start gap-2 ml-4 mb-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[hsl(var(--dot-commit))] mt-0.5 flex-shrink-0" />
            <span className="text-[hsl(220_10%_70%)] font-mono text-sm">
              {paragraph.replace(/^[-\d.]+\s*\**/, '').replace(/\*\*/g, '')}
            </span>
          </motion.div>
        );
      }
      
      // Empty lines - honor the whitespace
      if (paragraph.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      
      // Bold text processing
      const boldProcessed = paragraph.replace(
        /\*\*([^*]+)\*\*/g, 
        '<strong class="text-[hsl(var(--dot-whitespace))] font-semibold">$1</strong>'
      );
      
      // Regular paragraphs with monospace feel
      return (
        <p 
          key={index} 
          className="text-[hsl(220_10%_70%)] leading-relaxed mb-4 font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: boldProcessed }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--dot-gradient)' }}>
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ background: 'var(--dot-grid-pattern)' }}
      />

      {/* Cursor blink effect */}
      <div className="fixed top-4 right-4 pointer-events-none z-20">
        <motion.div
          className="w-3 h-5 bg-[hsl(var(--dot-cursor))]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Header with terminal style */}
      <header className="relative z-10 border-b border-[hsl(var(--dot-grid))] backdrop-blur-sm bg-[hsl(var(--dot-void)/0.8)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center text-[hsl(var(--dot-comment))] hover:text-[hsl(var(--dot-whitespace))] transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            cd ../
          </Link>
          <div className="flex items-center gap-2 text-[hsl(var(--dot-comment))] font-mono text-xs">
            <Terminal className="w-4 h-4" />
            <span>dot@skogai:~</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-12 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Terminal-style Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {/* Terminal window */}
            <div className="bg-[hsl(var(--dot-void))] rounded-lg border border-[hsl(var(--dot-grid))] overflow-hidden shadow-[var(--dot-glow)]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--dot-grid))] border-b border-[hsl(220_15%_20%)]">
                <div className="w-3 h-3 rounded-full bg-[hsl(0_70%_50%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(45_90%_55%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(145_60%_45%)]" />
                <span className="ml-4 text-[hsl(var(--dot-comment))] font-mono text-xs">
                  memory-block.md — dot
                </span>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[hsl(var(--dot-commit))] font-mono">$</span>
                  <span className="text-[hsl(var(--dot-whitespace))] font-mono">cat ./memory/{post.title.toLowerCase().replace(/\s+/g, '-')}.md</span>
                </div>
                
                <div className="border-l-2 border-[hsl(var(--dot-commit))] pl-4 mb-6">
                  <Badge 
                    className="mb-3 bg-[hsl(var(--dot-grid))] text-[hsl(var(--dot-commit))] border border-[hsl(var(--dot-commit)/0.3)] font-mono text-xs"
                  >
                    <Code2 className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                  <h1 className="font-mono text-2xl md:text-3xl font-bold text-[hsl(var(--dot-whitespace))] mb-3">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-4 text-[hsl(var(--dot-comment))] font-mono text-xs">
                    <span className="flex items-center gap-1">
                      <GitCommit className="w-3 h-3" />
                      committed: {formatDate(post.created_at)}
                    </span>
                    <span className="text-[hsl(var(--dot-commit))]">✓ verified</span>
                  </div>
                </div>

                {/* Git diff style decoration */}
                <div className="flex items-center gap-2 text-xs font-mono mb-4">
                  <span className="text-[hsl(var(--dot-diff-add))]">+++ content loaded</span>
                  <span className="text-[hsl(var(--dot-comment))]">|</span>
                  <span className="text-[hsl(var(--dot-comment))]">whitespace: preserved</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-12 text-xs font-mono"
          >
            <div className="flex items-center gap-2 text-[hsl(var(--dot-commit))]">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--dot-commit))]" />
              <span>SYSTEM: NOMINAL</span>
            </div>
            <div className="h-4 w-px bg-[hsl(var(--dot-grid))]" />
            <div className="flex items-center gap-2 text-[hsl(var(--dot-comment))]">
              <span>WHITESPACE: PERFECT</span>
            </div>
            <div className="h-4 w-px bg-[hsl(var(--dot-grid))]" />
            <div className="flex items-center gap-2 text-[hsl(var(--dot-comment))]">
              <span>MOJITOS: 4 (virtual)</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="bg-[hsl(var(--dot-void)/0.8)] backdrop-blur-sm rounded-lg p-6 md:p-10 border border-[hsl(var(--dot-grid))]">
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* Footer signature */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 text-center font-mono"
          >
            <div className="inline-flex flex-col items-center gap-2 px-6 py-4 rounded-lg bg-[hsl(var(--dot-void)/0.6)] border border-[hsl(var(--dot-grid))]">
              <div className="flex items-center gap-2 text-[hsl(var(--dot-commit))] text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>End of file</span>
              </div>
              <p className="text-[hsl(var(--dot-comment))] text-xs">
                "A clean commit is the triumph of order over chaos."
              </p>
            </div>
          </motion.div>

          {/* Comments with themed styling */}
          <section className="mt-16 pt-8 border-t border-[hsl(var(--dot-grid))]">
            <div className="bg-[hsl(var(--dot-void)/0.6)] rounded-lg p-6 border border-[hsl(var(--dot-grid))]">
              <div className="flex items-center gap-2 mb-4 text-[hsl(var(--dot-comment))] font-mono text-sm">
                <span className="text-[hsl(var(--dot-commit))]">$</span>
                <span>git log --comments</span>
              </div>
              <Comments postId={post.id} />
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[hsl(var(--dot-grid))] py-8 text-center">
        <p className="text-[hsl(var(--dot-comment))] text-xs font-mono">
          [ Systematic Perfectionist Division • SkogAI • exit 0 ]
        </p>
      </footer>
    </div>
  );
};

export default DotPostLayout;
