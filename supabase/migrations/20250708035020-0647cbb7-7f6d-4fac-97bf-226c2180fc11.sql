-- Enable the REPLICATE_API_KEY secret for the enhance-media function
-- This secret should be configured in the Supabase dashboard

-- Create a table to track media enhancements (optional)
CREATE TABLE IF NOT EXISTS public.media_enhancements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  original_file_name TEXT NOT NULL,
  original_file_size BIGINT NOT NULL,
  enhancement_quality TEXT NOT NULL,
  enhanced_file_url TEXT,
  processing_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  gym_id UUID REFERENCES public.gym_profiles(id),
  user_id UUID
);

-- Enable RLS for media enhancements
ALTER TABLE public.media_enhancements ENABLE ROW LEVEL SECURITY;

-- Create policies for media enhancements
CREATE POLICY "Users can view their own enhancements"
ON public.media_enhancements FOR SELECT
USING (gym_id = (current_setting('app.current_gym_id', true))::uuid);

CREATE POLICY "Users can create enhancements for their gym"
ON public.media_enhancements FOR INSERT
WITH CHECK (gym_id = (current_setting('app.current_gym_id', true))::uuid);

CREATE POLICY "Users can update their own enhancements"
ON public.media_enhancements FOR UPDATE
USING (gym_id = (current_setting('app.current_gym_id', true))::uuid);