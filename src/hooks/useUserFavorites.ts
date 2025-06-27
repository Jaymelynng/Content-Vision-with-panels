
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function useUserFavorites() {
  const { gym } = useAuth();
  
  return useQuery({
    queryKey: ['user-favorites', gym?.id],
    queryFn: async () => {
      if (!gym) return [];
      
      // Set the gym context for RLS
      await supabase.rpc('set_config', {
        parameter: 'app.current_gym_id',
        value: gym.id
      });
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('content_id')
        .eq('gym_id', gym.id);
      
      if (error) throw error;
      return data?.map(item => item.content_id) || [];
    },
    enabled: !!gym,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { gym } = useAuth();
  
  return useMutation({
    mutationFn: async ({ contentId, isFavorite }: { contentId: number; isFavorite: boolean }) => {
      if (!gym) throw new Error('No gym selected');
      
      // Set the gym context for RLS
      await supabase.rpc('set_config', {
        parameter: 'app.current_gym_id',
        value: gym.id
      });
      
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('content_id', contentId)
          .eq('gym_id', gym.id);
        if (error) throw error;
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('user_favorites')
          .insert({ content_id: contentId, gym_id: gym.id });
        if (error) throw error;
      }
    },
    onSuccess: (_, { isFavorite }) => {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    },
    onError: (error) => {
      toast.error('Failed to update favorites: ' + error.message);
    },
  });
}
