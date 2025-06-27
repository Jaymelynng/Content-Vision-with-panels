
-- Create gym_profiles table to store gym information and PINs
CREATE TABLE public.gym_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_name TEXT NOT NULL,
  gym_location TEXT,
  pin_code TEXT NOT NULL UNIQUE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on gym_profiles
ALTER TABLE public.gym_profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read gym profiles (needed for PIN verification)
CREATE POLICY "Anyone can view active gym profiles" ON public.gym_profiles
  FOR SELECT USING (active = true);

-- Update user_content_progress to link to gym instead of individual users
ALTER TABLE public.user_content_progress 
ADD COLUMN gym_id UUID REFERENCES public.gym_profiles(id);

-- Update user_favorites to link to gym instead of individual users  
ALTER TABLE public.user_favorites 
ADD COLUMN gym_id UUID REFERENCES public.gym_profiles(id);

-- Update RLS policies for gym-based access
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_content_progress;
DROP POLICY IF EXISTS "Users can view their own favorites" ON public.user_favorites;

CREATE POLICY "Gym members can view gym progress" ON public.user_content_progress
  FOR ALL USING (gym_id = (current_setting('app.current_gym_id', true))::UUID);

CREATE POLICY "Gym members can view gym favorites" ON public.user_favorites
  FOR ALL USING (gym_id = (current_setting('app.current_gym_id', true))::UUID);

-- Insert sample gym data for demo
INSERT INTO public.gym_profiles (gym_name, gym_location, pin_code) VALUES
  ('Elite Gymnastics Academy', 'Downtown Location', '1234'),
  ('Champions Gym Center', 'Westside Branch', '5678'),
  ('Victory Athletics', 'North Campus', '9999'),
  ('Premier Gymnastics', 'East Valley', '0000');
