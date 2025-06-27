
-- Create content_ideas table to store all the content templates
CREATE TABLE public.content_ideas (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  target_audience TEXT[] NOT NULL,
  formats TEXT[] NOT NULL,
  difficulty TEXT NOT NULL,
  engagement TEXT NOT NULL,
  thumbnail TEXT,
  features TEXT[] NOT NULL,
  setup_planning_photo TEXT[] NOT NULL,
  setup_planning_video TEXT[] NOT NULL,
  production_tips_photo TEXT[] NOT NULL,
  production_tips_video TEXT[] NOT NULL,
  upload_track_photo TEXT[] NOT NULL,
  upload_track_video TEXT[] NOT NULL,
  requirements JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_content_progress table to track user progress
CREATE TABLE public.user_content_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id INTEGER REFERENCES public.content_ideas(id) ON DELETE CASCADE,
  selected_format TEXT NOT NULL,
  upload_progress JSONB DEFAULT '{}',
  uploaded_files JSONB DEFAULT '{}',
  draft_data JSONB DEFAULT '{}',
  status TEXT DEFAULT 'not-started',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- Create user_favorites table to track favorites
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id INTEGER REFERENCES public.content_ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- Enable RLS
ALTER TABLE public.content_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_content_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Content ideas are public (everyone can read)
CREATE POLICY "Anyone can view content ideas" ON public.content_ideas
  FOR SELECT USING (true);

-- Users can only see their own progress
CREATE POLICY "Users can view their own progress" ON public.user_content_progress
  FOR ALL USING (auth.uid() = user_id);

-- Users can only see their own favorites
CREATE POLICY "Users can view their own favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Insert the real content data
INSERT INTO public.content_ideas (
  id, title, description, category, target_audience, formats, difficulty, engagement, thumbnail, features,
  setup_planning_photo, setup_planning_video, production_tips_photo, production_tips_video,
  upload_track_photo, upload_track_video, requirements
) VALUES 
(1, 'Handstand = Homework Focus', 'Educational content connecting gymnastics skills to academic success', 'back-to-school', 
 ARRAY['premium', 'growth'], ARRAY['photo', 'reel', 'story'], 'easy', 'high', '/placeholder.svg',
 ARRAY['Interactive Riddle', 'Challenge Tracker', 'Motion Graphics'],
 ARRAY['Plan split-screen layout: handstand on left, focused homework on right', 'Choose bright, clean background with good natural lighting', 'Prepare text overlay: Balance in Gym = Focus in School', 'Set up homework materials and gymnastics space', 'Plan key message: The balance I learn in gymnastics helps me focus on homework'],
 ARRAY['Storyboard: handstand hold → transition → homework desk setup', 'Plan dynamic text animations for key messages', 'Prepare before/after comparison shots', 'Script opening hook: Want to know the secret to homework focus?', 'Plan engagement question: How do you prepare your mind for homework?'],
 ARRAY['Use tripod for stability when capturing handstand', 'Natural lighting works best - avoid harsh shadows', 'Capture multiple angles: side view for form, front for expression', 'Have homework materials clearly visible and organized', 'Take burst shots to capture the perfect moment'],
 ARRAY['Record in landscape orientation for best quality', 'Use stable surface or tripod - no shaky footage', 'Ensure audio is clear if speaking during handstand', 'Plan smooth transitions between handstand and homework scenes', 'Keep individual clips short (15-30 seconds max)'],
 ARRAY['Export in high resolution (at least 1080p)', 'Use JPG or PNG format for best compatibility', 'Keep file size under 10MB for faster uploads', 'Add relevant hashtags and captions before posting', 'Track engagement metrics after posting'],
 ARRAY['Export in MP4 format for best compatibility', 'Keep file size under 100MB for platform requirements', 'Add captions for accessibility', 'Schedule posting for optimal engagement times', 'Monitor comments and engagement in first hour'],
 '[{"name": "Opening Hook", "duration": "3-5 seconds", "type": "intro", "completed": false, "description": "Attention-grabbing start that introduces the concept"}, {"name": "Handstand Demo", "duration": "10-15 seconds", "type": "main", "completed": false, "description": "Clear demonstration of proper handstand form"}, {"name": "Homework Connection", "duration": "10-20 seconds", "type": "explanation", "completed": false, "description": "Explaining how gymnastics skills transfer to academic focus"}, {"name": "Call to Action", "duration": "5-8 seconds", "type": "outro", "completed": false, "description": "Engaging question or challenge for viewers"}]'::jsonb),

(2, 'Cartwheel Confidence Transfer', 'Showing how gymnastics confidence builds school confidence with spot-the-difference games', 'back-to-school',
 ARRAY['premium', 'growth', 'value'], ARRAY['photo', 'reel', 'story'], 'easy', 'high', '/placeholder.svg',
 ARRAY['Spot the Difference', 'Counter Challenge', 'Confidence Tracking'],
 ARRAY['Set up before/after confidence shots', 'Plan cartwheel sequence in bright space', 'Prepare confidence-building text overlays', 'Create school scenario setup', 'Plan transition from gym to school confidence'],
 ARRAY['Film cartwheel progression sequence', 'Capture confident expressions during performance', 'Record school confidence scenarios', 'Plan smooth transitions between scenes', 'Script confidence-building narration'],
 ARRAY['Capture peak cartwheel moments', 'Focus on confident body language', 'Use natural lighting for authentic feel', 'Photograph school confidence scenarios', 'Take multiple angles of cartwheel'],
 ARRAY['Film in slow motion for impact', 'Capture audio of confident statements', 'Record smooth cartwheel sequences', 'Film school confidence examples', 'Keep clips dynamic and engaging'],
 ARRAY['Create before/after comparison images', 'Add confidence-building text overlays', 'Export in story-friendly formats', 'Plan posting schedule for maximum reach', 'Track confidence-building engagement'],
 ARRAY['Edit for maximum emotional impact', 'Add uplifting background music', 'Include confidence-building captions', 'Export in multiple formats', 'Schedule for peak engagement times'],
 '[{"name": "Confidence Before", "duration": "5-8 seconds", "type": "intro", "completed": false, "description": "Show initial hesitation or nervousness"}, {"name": "Cartwheel Sequence", "duration": "10-15 seconds", "type": "main", "completed": false, "description": "Confident cartwheel performance"}, {"name": "School Confidence", "duration": "10-15 seconds", "type": "connection", "completed": false, "description": "Show how gym confidence transfers to school"}, {"name": "Confidence Message", "duration": "5-8 seconds", "type": "outro", "completed": false, "description": "Inspiring message about building confidence"}]'::jsonb),

(3, 'Beam Balance = Life Balance', 'Educational content about balance skills and life skills with motion comparison games', 'back-to-school',
 ARRAY['premium', 'growth'], ARRAY['photo', 'reel', 'story'], 'medium', 'medium', '/placeholder.svg',
 ARRAY['Motion Analysis', 'Home Challenge', 'Progress Tracker'],
 ARRAY['Plan beam routine with focus points', 'Set up life balance comparison shots', 'Prepare educational text about balance', 'Create home challenge setup', 'Plan metaphor visual connections'],
 ARRAY['Storyboard beam to life transitions', 'Plan motion analysis graphics', 'Script educational narration', 'Design home challenge elements', 'Plan engaging hook about balance'],
 ARRAY['Capture steady beam performances', 'Focus on balance and concentration', 'Use stable camera for beam shots', 'Photograph life balance examples', 'Take multiple angles of beam work'],
 ARRAY['Film beam routine in segments', 'Capture focused expressions', 'Record smooth transitions', 'Film life balance scenarios', 'Keep shots steady and clear'],
 ARRAY['Create balance comparison graphics', 'Add educational text overlays', 'Export beam performance highlights', 'Create challenge graphics', 'Track educational engagement'],
 ARRAY['Edit for educational impact', 'Add motion analysis graphics', 'Include balance tips', 'Export with captions', 'Schedule for learning-focused times'],
 '[{"name": "Balance Demo", "duration": "8-12 seconds", "type": "intro", "completed": false, "description": "Demonstrate beam balance skills"}, {"name": "Life Connection", "duration": "15-20 seconds", "type": "main", "completed": false, "description": "Connect beam balance to life balance"}, {"name": "Challenge Intro", "duration": "8-10 seconds", "type": "challenge", "completed": false, "description": "Introduce home balance challenge"}, {"name": "Call to Action", "duration": "5-8 seconds", "type": "outro", "completed": false, "description": "Encourage viewers to try balance challenge"}]'::jsonb);

-- Create storage bucket for uploaded files
INSERT INTO storage.buckets (id, name, public) VALUES ('content-uploads', 'content-uploads', true);

-- Create storage policy for uploaded files
CREATE POLICY "Users can upload their own content files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'content-uploads' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own content files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'content-uploads' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
