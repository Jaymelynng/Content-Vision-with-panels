import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function useContentUpload() {
  const { gym } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      file, 
      contentId, 
      requirementName, 
      contentFormat,
      onProgress 
    }: {
      file: File;
      contentId: number;
      requirementName: string;
      contentFormat: string;
      onProgress: (progress: number) => void;
    }) => {
      if (!gym) throw new Error('No gym selected');

      // Create a unique file name
      const fileExtension = file.name.split('.').pop();
      const sanitizedName = requirementName.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '_');
      const fileName = `${gym.id}/content/${contentId}/${sanitizedName}_${Date.now()}.${fileExtension}`;

      // Upload file to storage with progress tracking
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('content-uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          metadata: {
            contentId: contentId.toString(),
            requirementName,
            contentFormat,
            gymId: gym.id
          }
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('content-uploads')
        .getPublicUrl(fileName);

      // Update progress to 100%
      onProgress(100);

      return {
        path: uploadData.path,
        url: urlData.publicUrl,
        fileName: file.name,
        size: file.size,
        type: file.type
      };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-content-progress'] });
      toast.success(`${variables.requirementName} uploaded successfully!`);
    },
    onError: (error, variables) => {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${variables.requirementName}: ${error.message}`);
    },
  });
}