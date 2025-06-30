
-- Add new columns to content_ideas table
ALTER TABLE content_ideas 
  ADD COLUMN file_requirements JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN content_formats TEXT[] DEFAULT '{}'::text[],
  ADD COLUMN status_options TEXT[] DEFAULT '{}'::text[];

-- Create content_categories table
CREATE TABLE content_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create app_settings table
CREATE TABLE app_settings (
  id SERIAL PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
  category TEXT DEFAULT 'general',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert initial categories
INSERT INTO content_categories (name, description, display_order) VALUES
  ('all', 'All Content Types', 0),
  ('back-to-school', 'Back-to-School Content', 1),
  ('skill-mastery', 'Skill Mastery Content', 2),
  ('behind-the-scenes', 'Behind-the-Scenes Content', 3),
  ('community', 'Community Building Content', 4),
  ('gaming', 'Gaming Challenges Content', 5);

-- Insert app settings
INSERT INTO app_settings (setting_key, setting_value, category, description) VALUES
  ('difficulty_levels', '["easy", "medium", "hard"]'::jsonb, 'content', 'Available difficulty levels'),
  ('engagement_levels', '["low", "medium", "high"]'::jsonb, 'content', 'Available engagement levels'),
  ('target_audiences', '["premium", "growth", "community", "beginners"]'::jsonb, 'content', 'Available target audiences'),
  ('file_requirements', '{"video": {"formats": ["MP4", "MOV"], "maxSize": "100MB"}, "photo": {"formats": ["JPG", "PNG"], "maxSize": "10MB"}, "general": ["Landscape orientation preferred", "Good lighting essential"]}'::jsonb, 'upload', 'File upload requirements and tips');

-- Update existing content_ideas with default values
UPDATE content_ideas SET 
  file_requirements = '{"video": {"formats": ["MP4", "MOV"], "maxSize": "100MB"}, "photo": {"formats": ["JPG", "PNG"], "maxSize": "10MB"}, "general": ["Landscape orientation preferred", "Good lighting essential"]}'::jsonb,
  content_formats = ARRAY['photo', 'video'],
  status_options = ARRAY['not-started', 'in-progress', 'completed', 'draft']
WHERE file_requirements = '{}'::jsonb;
