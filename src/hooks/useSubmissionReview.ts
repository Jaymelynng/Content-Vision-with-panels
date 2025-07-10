import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SubmissionWithDetails {
  id: string;
  content_id: number;
  selected_format: string;
  status: string;
  upload_progress: any;
  uploaded_files: any;
  admin_reviewed: boolean;
  admin_approved: boolean;
  admin_feedback_required: boolean;
  submission_notes: string;
  created_at: string;
  updated_at: string;
  gym_id: string;
  content_title: string;
  gym_name: string;
}

export interface SubmissionComment {
  id: string;
  progress_id: string;
  user_id: string;
  gym_id: string;
  comment_text: string;
  comment_type: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export function useSubmissions() {
  return useQuery({
    queryKey: ['admin-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_content_progress')
        .select(`
          *,
          content_ideas!inner(title),
          gym_profiles!inner(gym_name)
        `)
        .neq('status', 'not-started')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(item => ({
        ...item,
        content_title: (item as any).content_ideas.title,
        gym_name: (item as any).gym_profiles.gym_name,
      })) as SubmissionWithDetails[];
    },
  });
}

export function useSubmissionComments(progressId: string) {
  return useQuery({
    queryKey: ['submission-comments', progressId],
    queryFn: async () => {
      if (!progressId) return [];
      
      const { data, error } = await supabase
        .from('submission_comments')
        .select('*')
        .eq('progress_id', progressId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as SubmissionComment[];
    },
    enabled: !!progressId,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ progressId, commentText, commentType, gymId }: {
      progressId: string;
      commentText: string;
      commentType: string;
      gymId: string;
    }) => {
      const { error } = await supabase
        .from('submission_comments')
        .insert([{
          progress_id: progressId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          gym_id: gymId,
          comment_text: commentText,
          comment_type: commentType,
          is_admin: true, // This hook is for admin comments
        }]);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['submission-comments', variables.progressId] });
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    },
  });
}

export function useUpdateSubmissionStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, adminApproved, adminReviewed, feedbackRequired }: {
      id: string;
      status: string;
      adminApproved: boolean;
      adminReviewed: boolean;
      feedbackRequired: boolean;
    }) => {
      const { error } = await supabase
        .from('user_content_progress')
        .update({
          status,
          admin_approved: adminApproved,
          admin_reviewed: adminReviewed,
          admin_feedback_required: feedbackRequired,
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['user-content-progress'] });
      toast.success('Status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });
}