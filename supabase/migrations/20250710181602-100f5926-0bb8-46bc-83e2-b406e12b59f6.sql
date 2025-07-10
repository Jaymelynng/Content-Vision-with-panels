-- Add missing content categories that match the content_ideas
INSERT INTO content_categories (name, description, display_order, active) VALUES
  ('back-to-school', 'Back-to-School Content', 1, true),
  ('skill-mastery', 'Skill Mastery Content', 2, true),
  ('behind-the-scenes', 'Behind-the-Scenes Content', 3, true),
  ('community', 'Community Building Content', 4, true),
  ('gaming', 'Gaming Challenges Content', 5, true)
ON CONFLICT (name) DO NOTHING;