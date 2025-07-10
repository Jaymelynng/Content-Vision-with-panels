-- Create submission comments table for feedback system
CREATE TABLE public.submission_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  progress_id uuid NOT NULL,
  user_id uuid NOT NULL,
  gym_id uuid NOT NULL,
  comment_text text NOT NULL,
  comment_type text NOT NULL DEFAULT 'feedback', -- 'feedback', 'approval', 'revision_request'
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT submission_comments_progress_id_fkey 
    FOREIGN KEY (progress_id) REFERENCES public.user_content_progress(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.submission_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for submission comments
CREATE POLICY "Users can view comments for their gym submissions" 
ON public.submission_comments 
FOR SELECT 
USING (gym_id = (current_setting('app.current_gym_id'::text, true))::uuid);

CREATE POLICY "Users can create comments on their gym submissions" 
ON public.submission_comments 
FOR INSERT 
WITH CHECK (gym_id = (current_setting('app.current_gym_id'::text, true))::uuid);

CREATE POLICY "Users can update their own comments" 
ON public.submission_comments 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all comments" 
ON public.submission_comments 
FOR ALL 
USING (is_admin(auth.uid()));

-- Add indexes for better performance
CREATE INDEX idx_submission_comments_progress_id ON public.submission_comments(progress_id);
CREATE INDEX idx_submission_comments_gym_id ON public.submission_comments(gym_id);
CREATE INDEX idx_submission_comments_created_at ON public.submission_comments(created_at);

-- Update user_content_progress table to include more detailed status tracking
ALTER TABLE public.user_content_progress 
ADD COLUMN IF NOT EXISTS admin_reviewed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS admin_approved boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS admin_feedback_required boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS last_comment_id uuid,
ADD COLUMN IF NOT EXISTS submission_notes text;

-- Add foreign key for last comment reference
ALTER TABLE public.user_content_progress 
ADD CONSTRAINT user_content_progress_last_comment_id_fkey 
FOREIGN KEY (last_comment_id) REFERENCES public.submission_comments(id) ON DELETE SET NULL;

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for submission_comments
CREATE TRIGGER update_submission_comments_updated_at
BEFORE UPDATE ON public.submission_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();