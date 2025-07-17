import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface ClipComment {
  id: string;
  progress_id: string;
  content_id: number;
  requirement_index: number;
  gym_id: string;
  user_id: string;
  comment_text: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export function useClipComments(progressId: string, contentId: number, requirementIndex: number) {
  const { gym } = useAuth();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['clip-comments', progressId, contentId, requirementIndex],
    queryFn: async () => {
      if (!gym?.id) return [];
      
      const { data, error } = await supabase
        .from('clip_comments')
        .select('*')
        .eq('progress_id', progressId)
        .eq('content_id', contentId)
        .eq('requirement_index', requirementIndex)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as ClipComment[];
    },
    enabled: !!gym?.id && !!progressId && !!contentId && requirementIndex >= 0,
  });

  const createComment = useMutation({
    mutationFn: async (commentText: string) => {
      if (!gym?.id) throw new Error('No gym selected');
      
      const { data, error } = await supabase
        .from('clip_comments')
        .insert({
          progress_id: progressId,
          content_id: contentId,
          requirement_index: requirementIndex,
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
      queryClient.invalidateQueries({ queryKey: ['clip-comments', progressId, contentId, requirementIndex] });
      toast.success('Comment added successfully');
    },
    onError: (error) => {
      toast.error(`Failed to add comment: ${error.message}`);
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({ commentId, commentText }: { commentId: string; commentText: string }) => {
      const { data, error } = await supabase
        .from('clip_comments')
        .update({ comment_text: commentText })
        .eq('id', commentId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clip-comments', progressId, contentId, requirementIndex] });
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