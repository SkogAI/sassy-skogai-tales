import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  content: string;
  approved: boolean;
  created_at: string;
  post_id: string;
}

export const useComments = (postId: string | undefined) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', postId)
          .eq('approved', true)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setComments(data || []);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const submitComment = async (authorName: string, authorEmail: string, content: string) => {
    if (!postId) return false;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_name: authorName,
          author_email: authorEmail,
          content: content,
          approved: false
        });

      if (error) throw error;

      toast({
        title: "Comment submitted!",
        description: "Your comment is awaiting moderation and will appear once approved.",
      });

      return true;
    } catch (err) {
      toast({
        title: "Failed to submit comment",
        description: err instanceof Error ? err.message : 'Please try again later.',
        variant: "destructive"
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return { comments, loading, submitting, submitComment, formatDate };
};
