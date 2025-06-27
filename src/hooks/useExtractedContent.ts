
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function useExtractedContent() {
  const { gym } = useAuth();

  return useQuery({
    queryKey: ['extracted-content', gym?.id],
    queryFn: async () => {
      if (!gym) return [];

      const { data, error } = await supabase
        .from('extracted_content_ideas')
        .select('*')
        .eq('gym_id', gym.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!gym,
  });
}

export function useApproveContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, approved }: { id: string; approved: boolean }) => {
      const updateData = {
        approval_status: approved ? 'approved' : 'rejected',
        approved_at: approved ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from('extracted_content_ideas')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // If approved, import to content_ideas
      if (approved) {
        const { data, error: importError } = await supabase.functions.invoke('import-content-idea', {
          body: { extractedContentId: id }
        });

        if (importError) throw importError;
        return data;
      }
    },
    onSuccess: (_, { approved }) => {
      queryClient.invalidateQueries({ queryKey: ['extracted-content'] });
      queryClient.invalidateQueries({ queryKey: ['content-ideas'] });
      toast.success(approved ? 'Content approved and imported!' : 'Content rejected');
    },
    onError: (error) => {
      toast.error('Failed to update content: ' + error.message);
    },
  });
}
