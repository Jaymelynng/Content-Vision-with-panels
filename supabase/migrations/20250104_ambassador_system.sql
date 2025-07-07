-- Ambassador System Tables

-- 1. Ambassador Assignments (Content Hunts)
CREATE TABLE public.ambassador_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID REFERENCES public.gym_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  collection_period INTERVAL DEFAULT INTERVAL '30 days',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  content_requirements JSONB NOT NULL DEFAULT '[]',
  video_photo_split JSONB DEFAULT '{"video": 50, "photo": 50}',
  class_camp_split JSONB DEFAULT '{"class": 50, "camp": 50}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Content Submissions
CREATE TABLE public.content_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.ambassador_assignments(id) ON DELETE CASCADE,
  gym_id UUID REFERENCES public.gym_profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT NOT NULL CHECK (file_type IN ('photo', 'video')),
  content_category TEXT CHECK (content_category IN ('class', 'camp')),
  submission_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'needs_redo', 'rejected')),
  feedback_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT
);

-- 3. Assignment Requirements (specific clips needed)
CREATE TABLE public.assignment_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.ambassador_assignments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  type TEXT CHECK (type IN ('photo', 'video')),
  example_description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_required BOOLEAN DEFAULT true
);

-- 4. Content Comments
CREATE TABLE public.content_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.content_submissions(id) ON DELETE CASCADE,
  gym_id UUID REFERENCES public.gym_profiles(id),
  commenter_type TEXT CHECK (commenter_type IN ('admin', 'gym')),
  commenter_id TEXT NOT NULL, -- PIN for admin, gym_id for gym
  comment_text TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.content_comments(id),
  is_resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Ambassador Performance Tracking
CREATE TABLE public.ambassador_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID REFERENCES public.gym_profiles(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES public.ambassador_assignments(id),
  total_submissions INTEGER DEFAULT 0,
  approved_submissions INTEGER DEFAULT 0,
  on_time_submission BOOLEAN,
  quality_score DECIMAL(3,2),
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.ambassador_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Assignments: Gyms can only see their own assignments
CREATE POLICY "Gyms view own assignments" ON public.ambassador_assignments
  FOR SELECT USING (
    gym_id = COALESCE(
      current_setting('app.current_gym_id', true)::UUID,
      (SELECT id FROM public.gym_profiles WHERE pin_code = current_setting('app.current_pin', true))
    )
  );

-- Admins can manage all assignments
CREATE POLICY "Admins manage assignments" ON public.ambassador_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.gym_profiles 
      WHERE pin_code = current_setting('app.current_pin', true)
      AND pin_code IN ('1426', '2222')
    )
  );

-- Similar policies for other tables...
CREATE POLICY "Gyms manage own submissions" ON public.content_submissions
  FOR ALL USING (
    gym_id = COALESCE(
      current_setting('app.current_gym_id', true)::UUID,
      (SELECT id FROM public.gym_profiles WHERE pin_code = current_setting('app.current_pin', true))
    )
  );

CREATE POLICY "Admins view all submissions" ON public.content_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.gym_profiles 
      WHERE pin_code = current_setting('app.current_pin', true)
      AND pin_code IN ('1426', '2222')
    )
  );

-- Indexes for performance
CREATE INDEX idx_assignments_gym_id ON public.ambassador_assignments(gym_id);
CREATE INDEX idx_assignments_status ON public.ambassador_assignments(status);
CREATE INDEX idx_submissions_assignment_id ON public.content_submissions(assignment_id);
CREATE INDEX idx_submissions_status ON public.content_submissions(status);
CREATE INDEX idx_comments_submission_id ON public.content_comments(submission_id);