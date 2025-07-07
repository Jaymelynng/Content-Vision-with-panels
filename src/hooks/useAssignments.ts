import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Assignment {
  id: string;
  gym_id: string;
  title: string;
  description: string;
  due_date: string;
  collection_period: string;
  status: 'active' | 'completed' | 'cancelled';
  content_requirements: any[];
  video_photo_split: { video: number; photo: number };
  class_camp_split: { class: number; camp: number };
  created_at: string;
  updated_at: string;
}

export interface AssignmentRequirement {
  id: string;
  assignment_id: string;
  name: string;
  description: string;
  duration: string;
  type: 'photo' | 'video';
  example_description: string;
  sort_order: number;
  is_required: boolean;
}

export interface ContentSubmission {
  id: string;
  assignment_id: string;
  gym_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: 'photo' | 'video';
  content_category: 'class' | 'camp';
  submission_notes: string;
  status: 'pending' | 'approved' | 'needs_redo' | 'rejected';
  feedback_notes: string;
  submitted_at: string;
  reviewed_at: string;
  reviewed_by: string;
}

// Get all assignments for the current gym
export function useAssignments() {
  const { gym } = useAuth();
  
  return useQuery({
    queryKey: ['assignments', gym?.id],
    queryFn: async () => {
      if (!gym?.id) throw new Error('No gym authenticated');
      
      const { data, error } = await supabase
        .from('ambassador_assignments')
        .select('*')
        .eq('gym_id', gym.id)
        .eq('status', 'active')
        .order('due_date', { ascending: true });
        
      if (error) throw error;
      return data as Assignment[];
    },
    enabled: !!gym?.id,
  });
}

// Get a single assignment with its requirements
export function useAssignment(assignmentId: string) {
  return useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: async () => {
      const { data: assignment, error: assignmentError } = await supabase
        .from('ambassador_assignments')
        .select('*')
        .eq('id', assignmentId)
        .single();
        
      if (assignmentError) throw assignmentError;
      
      const { data: requirements, error: requirementsError } = await supabase
        .from('assignment_requirements')
        .select('*')
        .eq('assignment_id', assignmentId)
        .order('sort_order', { ascending: true });
        
      if (requirementsError) throw requirementsError;
      
      return {
        ...assignment,
        requirements
      } as Assignment & { requirements: AssignmentRequirement[] };
    },
  });
}

// Get submissions for an assignment
export function useAssignmentSubmissions(assignmentId: string) {
  const { gym } = useAuth();
  
  return useQuery({
    queryKey: ['submissions', assignmentId, gym?.id],
    queryFn: async () => {
      if (!gym?.id) throw new Error('No gym authenticated');
      
      const { data, error } = await supabase
        .from('content_submissions')
        .select('*')
        .eq('assignment_id', assignmentId)
        .eq('gym_id', gym.id)
        .order('submitted_at', { descending: true });
        
      if (error) throw error;
      return data as ContentSubmission[];
    },
    enabled: !!gym?.id && !!assignmentId,
  });
}

// Submit content for an assignment
export function useSubmitContent() {
  const queryClient = useQueryClient();
  const { gym } = useAuth();
  
  return useMutation({
    mutationFn: async ({
      assignmentId,
      file,
      fileType,
      contentCategory,
      notes
    }: {
      assignmentId: string;
      file: File;
      fileType: 'photo' | 'video';
      contentCategory: 'class' | 'camp';
      notes?: string;
    }) => {
      if (!gym?.id) throw new Error('No gym authenticated');
      
      // Upload file to Supabase storage
      const fileName = `${gym.id}/${assignmentId}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('content-uploads')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      // Create submission record
      const { data, error } = await supabase
        .from('content_submissions')
        .insert({
          assignment_id: assignmentId,
          gym_id: gym.id,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          file_type: fileType,
          content_category: contentCategory,
          submission_notes: notes,
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['submissions', variables.assignmentId] });
      toast.success('Content submitted successfully!');
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast.error('Failed to submit content. Please try again.');
    },
  });
}

// Calculate assignment progress
export function useAssignmentProgress(assignmentId: string) {
  const { data: assignment } = useAssignment(assignmentId);
  const { data: submissions } = useAssignmentSubmissions(assignmentId);
  
  if (!assignment || !submissions) {
    return {
      totalRequired: 0,
      totalSubmitted: 0,
      photoProgress: 0,
      videoProgress: 0,
      classProgress: 0,
      campProgress: 0,
      overallProgress: 0,
    };
  }
  
  const totalRequired = assignment.requirements?.length || 0;
  const totalSubmitted = submissions.length;
  
  const photoSubmissions = submissions.filter(s => s.file_type === 'photo').length;
  const videoSubmissions = submissions.filter(s => s.file_type === 'video').length;
  const classSubmissions = submissions.filter(s => s.content_category === 'class').length;
  const campSubmissions = submissions.filter(s => s.content_category === 'camp').length;
  
  const expectedPhotos = Math.ceil(totalRequired * (assignment.video_photo_split.photo / 100));
  const expectedVideos = Math.ceil(totalRequired * (assignment.video_photo_split.video / 100));
  const expectedClass = Math.ceil(totalRequired * (assignment.class_camp_split.class / 100));
  const expectedCamp = Math.ceil(totalRequired * (assignment.class_camp_split.camp / 100));
  
  return {
    totalRequired,
    totalSubmitted,
    photoProgress: expectedPhotos > 0 ? (photoSubmissions / expectedPhotos) * 100 : 0,
    videoProgress: expectedVideos > 0 ? (videoSubmissions / expectedVideos) * 100 : 0,
    classProgress: expectedClass > 0 ? (classSubmissions / expectedClass) * 100 : 0,
    campProgress: expectedCamp > 0 ? (campSubmissions / expectedCamp) * 100 : 0,
    overallProgress: totalRequired > 0 ? (totalSubmitted / totalRequired) * 100 : 0,
  };
}