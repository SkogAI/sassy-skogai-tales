import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckSquare, Square, Calendar, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Comments from '@/components/Comments';

interface OfficialDocPostLayoutProps {
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

const OfficialDocPostLayout = ({ post, formatDate }: OfficialDocPostLayoutProps) => {
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      // Code block handling
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-[hsl(var(--official-ink))] text-[hsl(220_16%_80%)] rounded-lg p-5 my-6 overflow-x-auto text-sm font-mono leading-relaxed border border-[hsl(var(--official-border))]">
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // H1
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold text-[hsl(var(--official-heading))] mt-10 mb-4 tracking-tight font-sans">
            {line.replace('# ', '')}
          </h1>
        );
        return;
      }

      // H2
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl font-semibold text-[hsl(var(--official-heading))] mt-10 mb-4 pb-2 border-b border-[hsl(var(--official-border))] font-sans">
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }

      // H3
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg font-semibold text-[hsl(var(--official-heading))] mt-6 mb-3 font-sans">
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Checkbox items
      if (line.trim().startsWith('- [x]') || line.trim().startsWith('- [ ]')) {
        const checked = line.trim().startsWith('- [x]');
        const text = line.replace(/^[\s]*- \[[ x]\]\s*/, '');
        elements.push(
          <div key={index} className="flex items-start gap-2.5 py-1 ml-2">
            {checked ? (
              <CheckSquare className="w-4 h-4 mt-0.5 text-[hsl(var(--official-success))] flex-shrink-0" />
            ) : (
              <Square className="w-4 h-4 mt-0.5 text-[hsl(var(--official-muted))] flex-shrink-0" />
            )}
            <span className={`text-sm leading-relaxed ${checked ? 'text-[hsl(var(--official-muted))]' : 'text-[hsl(var(--official-ink))]'}`}>
              {renderInlineFormatting(text)}
            </span>
          </div>
        );
        return;
      }

      // Emoji status items (✅, ❌)
      if (line.trim().startsWith('- ✅') || line.trim().startsWith('- ❌')) {
        const text = line.replace(/^[\s]*-\s*/, '');
        elements.push(
          <div key={index} className="flex items-start gap-2 py-0.5 ml-2 text-sm text-[hsl(var(--official-ink))]">
            <span className="leading-relaxed">{renderInlineFormatting(text)}</span>
          </div>
        );
        return;
      }

      // Regular list items
      if (line.trim().startsWith('- ')) {
        const text = line.replace(/^[\s]*-\s*/, '');
        elements.push(
          <li key={index} className="text-sm text-[hsl(var(--official-ink))] ml-5 mb-1.5 leading-relaxed marker:text-[hsl(var(--official-accent))]">
            {renderInlineFormatting(text)}
          </li>
        );
        return;
      }

      // Numbered list items
      if (line.trim().match(/^\d+\.\s/)) {
        const text = line.replace(/^[\s]*\d+\.\s*/, '');
        elements.push(
          <li key={index} className="text-sm text-[hsl(var(--official-ink))] ml-5 mb-1.5 leading-relaxed list-decimal marker:text-[hsl(var(--official-accent))] marker:font-semibold">
            {renderInlineFormatting(text)}
          </li>
        );
        return;
      }

      // Horizontal rules / separators
      if (line.trim() === '---' || line.trim() === ':::') {
        elements.push(
          <hr key={index} className="my-8 border-[hsl(var(--official-border))]" />
        );
        return;
      }

      // Metadata lines (bold key-value like **Date**: value)
      if (line.trim().startsWith('**') && line.includes(':')) {
        const html = line
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[hsl(var(--official-heading))]">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-[hsl(var(--official-accent-subtle))] text-[hsl(var(--official-accent))] px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
        elements.push(
          <p key={index} className="text-sm text-[hsl(var(--official-ink))] mb-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
        );
        return;
      }

      // Empty lines
      if (line.trim() === '') {
        elements.push(<div key={index} className="h-3" />);
        return;
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-sm text-[hsl(var(--official-ink)/0.85)] leading-relaxed mb-3">
          {renderInlineFormatting(line)}
        </p>
      );
    });

    return elements;
  };

  const renderInlineFormatting = (text: string) => {
    // Process bold, code, and italic inline
    const html = text
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[hsl(var(--official-heading))]">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-[hsl(var(--official-accent-subtle))] text-[hsl(var(--official-accent))] px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  // Extract metadata from content
  const extractMetadata = (content: string) => {
    const meta: Record<string, string> = {};
    const lines = content.split('\n');
    for (const line of lines) {
      const match = line.match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
      if (match) {
        meta[match[1].toLowerCase()] = match[2].trim();
      }
      // Stop after first empty line after metadata
      if (line.trim() === '' && Object.keys(meta).length > 0) break;
    }
    return meta;
  };

  const metadata = extractMetadata(post.content);

  return (
    <div className="min-h-screen" style={{ background: 'var(--official-gradient)' }}>
      {/* Top bar */}
      <div className="border-b border-[hsl(var(--official-border))]" style={{ background: 'var(--official-header-gradient)' }}>
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-[hsl(220_16%_70%)] hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to all posts
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[hsl(var(--official-accent))]" />
            <span className="text-xs text-[hsl(220_16%_70%)] font-mono uppercase tracking-wider">Official Documentation</span>
          </div>
        </div>
      </div>

      <main className="relative z-10 py-10 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Document header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[hsl(var(--official-surface))] rounded-lg border border-[hsl(var(--official-border))] shadow-sm mb-6"
          >
            <div className="px-8 py-6 border-b border-[hsl(var(--official-border))]">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-[hsl(var(--official-accent))] text-white border-none text-xs font-medium">
                  <FileText className="w-3 h-3 mr-1" />
                  {post.category}
                </Badge>
                {metadata.status && (
                  <Badge variant="outline" className="text-xs border-[hsl(var(--official-success))] text-[hsl(var(--official-success))]">
                    {metadata.status}
                  </Badge>
                )}
                {post.featured && (
                  <Badge variant="outline" className="text-xs border-[hsl(var(--official-warning))] text-[hsl(var(--official-warning))]">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--official-heading))] tracking-tight font-sans mb-3">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--official-muted))]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Published {formatDate(post.created_at)}
                </div>
                {metadata.authority && (
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    {metadata.authority}
                  </div>
                )}
                {metadata.environment && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <code className="font-mono text-[hsl(var(--official-accent))]">{metadata.environment}</code>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Document body */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-[hsl(var(--official-surface))] rounded-lg border border-[hsl(var(--official-border))] shadow-sm"
          >
            <div className="px-8 py-8 md:px-10 md:py-10">
              {renderContent(post.content)}
            </div>
          </motion.div>

          {/* Comments */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-[hsl(var(--official-surface))] rounded-lg border border-[hsl(var(--official-border))] shadow-sm p-8"
          >
            <Comments postId={post.id} />
          </motion.section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--official-border))] py-6 text-center">
        <p className="text-xs text-[hsl(var(--official-muted))] font-mono">
          SkogAI Official Documentation • Governance & Infrastructure Records
        </p>
      </footer>
    </div>
  );
};

export default OfficialDocPostLayout;
