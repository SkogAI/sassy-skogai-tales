import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  featured: boolean;
  published: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateExcerpt = (content: string) => {
    // Remove markdown formatting and get first few sentences
    const cleanContent = content
      .replace(/\[LORE\]|\[\/LORE\]/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .trim();
    
    const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '');
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      // Generate excerpts for posts that don't have them
      const postsWithExcerpts = (data || []).map(post => ({
        ...post,
        excerpt: post.excerpt || generateExcerpt(post.content)
      }));
      setPosts(postsWithExcerpts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCommentCount = (postId: string) => {
    // Placeholder for now - will implement comments later
    return Math.floor(Math.random() * 50) + 1;
  };


  return {
    posts,
    loading,
    error,
    fetchPosts,
    formatDate,
    getCommentCount,
    generateExcerpt
  };
};