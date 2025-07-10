-- Clean up conflicting categories - remove task-based categories except 'all'
-- Keep content-type categories that match the actual content_ideas
DELETE FROM content_categories 
WHERE name IN ('to-do', 'in-progress', 'review', 'completed');

-- Fix display_order conflicts by updating the remaining categories
UPDATE content_categories 
SET display_order = CASE 
  WHEN name = 'all' THEN 0
  WHEN name = 'back-to-school' THEN 1
  WHEN name = 'skill-mastery' THEN 2
  WHEN name = 'behind-the-scenes' THEN 3
  WHEN name = 'community' THEN 4
  WHEN name = 'gaming' THEN 5
END;