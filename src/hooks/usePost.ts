import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  featured: boolean;
  published: boolean;
  slug: string | null;
  created_at: string;
  updated_at: string;
}

export const usePost = (slug: string | undefined) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        // Try to find by slug first, then by id
        let { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        // If not found by slug, try by id
        if (!data && !error) {
          const { data: dataById, error: errorById } = await supabase
            .from('posts')
            .select('*')
            .eq('id', slug)
            .eq('published', true)
            .maybeSingle();
          
          data = dataById;
          error = errorById;
        }

        if (error) throw error;
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return { post, loading, error, formatDate };
};
