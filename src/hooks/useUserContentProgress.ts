import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserContentProgress {
  id: string;
  content_id: number;
  selected_format: string;
  status: 'not-started' | 'in-progress' | 'completed';
  upload_progress: Record<string, number>;
  uploaded_files: any[];
  created_at: string;
  updated_at: string;
}

export function useUserContentProgress() {
  const { gym } = useAuth();
  const gymId = gym?.id;

  return useQuery({
    queryKey: ['user-content-progress', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      
      const { data, error } = await supabase
        .from('user_content_progress')
        .select('*')
        .eq('gym_id', gymId)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as UserContentProgress[];
    },
    enabled: !!gymId,
  });
}

export function useContentAssignments() {
  const { data: ideas = [] } = useQuery({
    queryKey: ['content-ideas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_ideas')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: progress = [] } = useUserContentProgress();

  // Merge content ideas with user progress to create assignments
  const assignments = ideas.map(idea => {
    const userProgress = progress.find(p => p.content_id === idea.id);
    
    return {
      ...idea,
      status: userProgress?.status || 'not-started',
      progress: userProgress?.upload_progress || {},
      uploadedFiles: userProgress?.uploaded_files || [],
      lastUpdated: userProgress?.updated_at,
      progressId: userProgress?.id,
    };
  });

  return {
    data: assignments,
    isLoading: false, // We'll handle loading at the individual query level
  };
}