import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string;
  category: string;
  published: boolean | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useAdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (post: { title: string; content: string; excerpt?: string; category: string }) => {
    try {
      const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...post,
          slug,
          published: true
        })
        .select()
        .single();

      if (error) throw error;
      
      setPosts(prev => [data, ...prev]);
      toast({ title: 'Post created!' });
      return data;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive'
      });
      return null;
    }
  };

  const updatePost = async (id: string, updates: Partial<Post>) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
      toast({ title: 'Post updated!' });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update post',
        variant: 'destructive'
      });
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPosts(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Post deleted' });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive'
      });
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    await updatePost(id, { published });
  };

  return { posts, loading, createPost, updatePost, deletePost, togglePublished, refetch: fetchPosts };
};
