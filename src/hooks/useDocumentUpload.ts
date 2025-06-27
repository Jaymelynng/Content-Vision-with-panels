
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function useDocumentUpload() {
  const { gym } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!gym) throw new Error('No gym selected');

      // Set gym context
      try {
        await (supabase as any).rpc('set_config', {
          parameter: 'app.current_gym_id',
          value: gym.id
        });
      } catch (error) {
        console.error('Error setting gym context:', error);
      }

      // Upload file to storage
      const fileName = `${gym.id}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { data, error } = await supabase
        .from('uploaded_documents')
        .insert({
          gym_id: gym.id,
          filename: file.name,
          file_path: uploadData.path,
          file_size: file.size,
          file_type: file.type || 'application/octet-stream',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document uploaded successfully!');
    },
    onError: (error) => {
      toast.error('Failed to upload document: ' + error.message);
    },
  });
}

export function useDocuments() {
  const { gym } = useAuth();

  return useQuery({
    queryKey: ['documents', gym?.id],
    queryFn: async () => {
      if (!gym) return [];

      // Set gym context
      try {
        await (supabase as any).rpc('set_config', {
          parameter: 'app.current_gym_id',
          value: gym.id
        });
      } catch (error) {
        console.error('Error setting gym context:', error);
      }

      const { data, error } = await supabase
        .from('uploaded_documents')
        .select('*')
        .eq('gym_id', gym.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!gym,
  });
}

export function useProcessDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const { data, error } = await supabase.functions.invoke('process-document', {
        body: { documentId }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['extracted-content'] });
      toast.success('Document processing started!');
    },
    onError: (error) => {
      toast.error('Failed to process document: ' + error.message);
    },
  });
}
