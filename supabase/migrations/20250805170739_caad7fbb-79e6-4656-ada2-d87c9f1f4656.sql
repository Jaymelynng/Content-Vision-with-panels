-- Add lifecycle tracking to content ideas
ALTER TABLE content_ideas 
ADD COLUMN lifecycle_stage text DEFAULT 'assigned',
ADD COLUMN publication_month text,
ADD COLUMN content_status text DEFAULT 'active',
ADD COLUMN created_by_admin uuid;

-- Add lifecycle tracking to user content progress
ALTER TABLE user_content_progress
ADD COLUMN lifecycle_stage text DEFAULT 'assigned',
ADD COLUMN publication_month text,
ADD COLUMN submitted_at timestamp with time zone,
ADD COLUMN approved_at timestamp with time zone,
ADD COLUMN published_at timestamp with time zone,
ADD COLUMN archived_at timestamp with time zone;

-- Create content archives table for historical tracking
CREATE TABLE public.content_archives (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id uuid NOT NULL,
  content_id integer NOT NULL,
  progress_id uuid,
  archive_month text NOT NULL,
  raw_files jsonb DEFAULT '[]'::jsonb,
  edited_files jsonb DEFAULT '[]'::jsonb,
  final_files jsonb DEFAULT '[]'::jsonb,
  performance_metrics jsonb DEFAULT '{}'::jsonb,
  tags text[] DEFAULT '{}',
  repurpose_potential text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on content archives
ALTER TABLE public.content_archives ENABLE ROW LEVEL SECURITY;

-- Create policies for content archives
CREATE POLICY "Gym members can view their archives" 
ON public.content_archives 
FOR SELECT 
USING (gym_id = (current_setting('app.current_gym_id', true))::uuid);

CREATE POLICY "Gym members can create their archives" 
ON public.content_archives 
FOR INSERT 
WITH CHECK (gym_id = (current_setting('app.current_gym_id', true))::uuid);

CREATE POLICY "Gym members can update their archives" 
ON public.content_archives 
FOR UPDATE 
USING (gym_id = (current_setting('app.current_gym_id', true))::uuid);

CREATE POLICY "Admins can manage all archives" 
ON public.content_archives 
FOR ALL 
USING (is_admin());

-- Create content versions table for file tracking
CREATE TABLE public.content_versions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  progress_id uuid NOT NULL,
  gym_id uuid NOT NULL,
  content_id integer NOT NULL,
  version_type text NOT NULL, -- 'raw', 'edited', 'final'
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size bigint,
  upload_timestamp timestamp with time zone NOT NULL DEFAULT now(),
  version_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on content versions
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;

-- Create policies for content versions
CREATE POLICY "Gym members can view their versions" 
ON public.content_versions 
FOR SELECT 
USING (gym_id = (current_setting('app.current_gym_id', true))::uuid);

CREATE POLICY "Gym members can create their versions" 
ON public.content_versions 
FOR INSERT 
WITH CHECK (gym_id = (current_setting('app.current_gym_id', true))::uuid);

CREATE POLICY "Admins can manage all versions" 
ON public.content_versions 
FOR ALL 
USING (is_admin());

-- Update existing trigger for content_archives
CREATE TRIGGER update_content_archives_updated_at
BEFORE UPDATE ON public.content_archives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();