-- Add enhanced fields to content_ideas table for Jayme's Notes
ALTER TABLE public.content_ideas 
ADD COLUMN data_points TEXT[],
ADD COLUMN google_trends TEXT[],
ADD COLUMN hook_ideas TEXT[],
ADD COLUMN caption_ideas TEXT[],
ADD COLUMN music_vibes TEXT[],
ADD COLUMN coaching_script TEXT,
ADD COLUMN theme TEXT,
ADD COLUMN concept_goal TEXT,
ADD COLUMN post_visual TEXT,
ADD COLUMN content_notes TEXT,
ADD COLUMN upload_instructions TEXT;

-- Create clip_comments table for individual upload requirement feedback (per gym)
CREATE TABLE public.clip_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  progress_id UUID NOT NULL,
  content_id INTEGER NOT NULL,
  requirement_index INTEGER NOT NULL,
  gym_id UUID NOT NULL,
  user_id UUID NOT NULL,
  comment_text TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_comments table for general post discussion (all gyms can see)
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id INTEGER NOT NULL,
  month_year TEXT NOT NULL,
  user_id UUID NOT NULL,
  gym_id UUID NOT NULL,
  comment_text TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.clip_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for clip_comments (gym-specific visibility)
CREATE POLICY "Users can view clip comments for their gym" 
ON public.clip_comments 
FOR SELECT 
USING (gym_id = (current_setting('app.current_gym_id'::text, true))::uuid);

CREATE POLICY "Users can create clip comments for their gym" 
ON public.clip_comments 
FOR INSERT 
WITH CHECK (gym_id = (current_setting('app.current_gym_id'::text, true))::uuid);

CREATE POLICY "Users can update their own clip comments" 
ON public.clip_comments 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all clip comments" 
ON public.clip_comments 
FOR ALL 
USING (is_admin(auth.uid()));

-- RLS policies for post_comments (cross-gym visibility)
CREATE POLICY "Anyone can view post comments" 
ON public.post_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create post comments" 
ON public.post_comments 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own post comments" 
ON public.post_comments 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all post comments" 
ON public.post_comments 
FOR ALL 
USING (is_admin(auth.uid()));

-- Add triggers for updated_at columns
CREATE TRIGGER update_clip_comments_updated_at
  BEFORE UPDATE ON public.clip_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_post_comments_updated_at
  BEFORE UPDATE ON public.post_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();