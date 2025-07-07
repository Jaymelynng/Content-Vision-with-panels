-- Update content categories to gymnastics-focused ones
DELETE FROM content_categories;

INSERT INTO content_categories (name, description, display_order) VALUES
  ('all', 'All Content Types', 0),
  ('skill-development', 'Gymnastics Skills & Technique Tips', 1),
  ('seasonal-events', 'Holiday & Seasonal Content', 2),
  ('event-promotion', 'Camps, Showcases & Special Events', 3),
  ('community-engagement', 'Social Media & Community Building', 4),
  ('educational-coaching', 'Coaching Tips & Educational Content', 5),
  ('behind-the-scenes', 'Coach Spotlights & Gym Culture', 6);