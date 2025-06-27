
-- Create table for storing uploaded documents
CREATE TABLE public.uploaded_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID REFERENCES public.gym_profiles(id) NOT NULL,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  upload_status TEXT NOT NULL DEFAULT 'uploaded',
  processing_status TEXT NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for extracted content ideas from documents
CREATE TABLE public.extracted_content_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.uploaded_documents(id) NOT NULL,
  gym_id UUID REFERENCES public.gym_profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  engagement TEXT NOT NULL,
  target_audience TEXT[] NOT NULL DEFAULT '{}',
  formats TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  requirements JSONB NOT NULL DEFAULT '{}',
  setup_planning_photo TEXT[] NOT NULL DEFAULT '{}',
  setup_planning_video TEXT[] NOT NULL DEFAULT '{}',
  production_tips_photo TEXT[] NOT NULL DEFAULT '{}',
  production_tips_video TEXT[] NOT NULL DEFAULT '{}',
  upload_track_photo TEXT[] NOT NULL DEFAULT '{}',
  upload_track_video TEXT[] NOT NULL DEFAULT '{}',
  approval_status TEXT NOT NULL DEFAULT 'pending',
  approved_at TIMESTAMP WITH TIME ZONE,
  imported_to_content_ideas BOOLEAN NOT NULL DEFAULT false,
  content_idea_id INTEGER REFERENCES public.content_ideas(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for uploaded_documents
ALTER TABLE public.uploaded_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view documents from their gym" 
  ON public.uploaded_documents 
  FOR SELECT 
  USING (gym_id = current_setting('app.current_gym_id')::uuid);

CREATE POLICY "Users can upload documents to their gym" 
  ON public.uploaded_documents 
  FOR INSERT 
  WITH CHECK (gym_id = current_setting('app.current_gym_id')::uuid);

CREATE POLICY "Users can update documents from their gym" 
  ON public.uploaded_documents 
  FOR UPDATE 
  USING (gym_id = current_setting('app.current_gym_id')::uuid);

-- Add RLS policies for extracted_content_ideas
ALTER TABLE public.extracted_content_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view extracted ideas from their gym" 
  ON public.extracted_content_ideas 
  FOR SELECT 
  USING (gym_id = current_setting('app.current_gym_id')::uuid);

CREATE POLICY "Users can create extracted ideas for their gym" 
  ON public.extracted_content_ideas 
  FOR INSERT 
  WITH CHECK (gym_id = current_setting('app.current_gym_id')::uuid);

CREATE POLICY "Users can update extracted ideas from their gym" 
  ON public.extracted_content_ideas 
  FOR UPDATE 
  USING (gym_id = current_setting('app.current_gym_id')::uuid);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Add storage policies for documents bucket
CREATE POLICY "Users can upload documents to their gym folder" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] = current_setting('app.current_gym_id')::text
  );

CREATE POLICY "Users can view documents from their gym folder" 
  ON storage.objects 
  FOR SELECT 
  USING (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] = current_setting('app.current_gym_id')::text
  );

CREATE POLICY "Users can update documents from their gym folder" 
  ON storage.objects 
  FOR UPDATE 
  USING (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] = current_setting('app.current_gym_id')::text
  );

CREATE POLICY "Users can delete documents from their gym folder" 
  ON storage.objects 
  FOR DELETE 
  USING (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] = current_setting('app.current_gym_id')::text
  );
