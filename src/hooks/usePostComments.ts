import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface PostComment {
  id: string;
  content_id: number;
  month_year: string;
  user_id: string;
  gym_id: string;
  comment_text: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export function usePostComments(contentId: number, monthYear: string) {
  const { gym } = useAuth();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['post-comments', contentId, monthYear],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('content_id', contentId)
        .eq('month_year', monthYear)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as PostComment[];
    },
    enabled: !!contentId && !!monthYear,
  });

  const createComment = useMutation({
    mutationFn: async (commentText: string) => {
      if (!gym?.id) throw new Error('No gym selected');
      
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          content_id: contentId,
          month_year: monthYear,
          gym_id: gym.id,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          comment_text: commentText,
          is_admin: false,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', contentId, monthYear] });
      toast.success('Comment posted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to post comment: ${error.message}`);
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({ commentId, commentText }: { commentId: string; commentText: string }) => {
      const { data, error } = await supabase
        .from('post_comments')
        .update({ comment_text: commentText })
        .eq('id', commentId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', contentId, monthYear] });
      toast.success('Comment updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update comment: ${error.message}`);
    },
  });

  return {
    comments,
    isLoading,
    createComment,
    updateComment,
  };
}