
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Function to sanitize file names for storage
const sanitizeFileName = (fileName: string): string => {
  // Remove or replace invalid characters
  return fileName
    .replace(/[^\w\s.-]/g, '') // Remove all non-word characters except spaces, dots, and hyphens
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single underscore
    .trim();
};

export function useDocumentUpload() {
  const { gym } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!gym) throw new Error('No gym selected');

      // Sanitize the file name
      const sanitizedFileName = sanitizeFileName(file.name);
      console.log('Original filename:', file.name);
      console.log('Sanitized filename:', sanitizedFileName);

      // Upload file to storage with sanitized name
      const fileName = `${gym.id}/${Date.now()}_${sanitizedFileName}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create document record with original filename for display
      const { data, error } = await supabase
        .from('uploaded_documents')
        .insert({
          gym_id: gym.id,
          filename: file.name, // Keep original name for display
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
      console.error('Upload error:', error);
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
