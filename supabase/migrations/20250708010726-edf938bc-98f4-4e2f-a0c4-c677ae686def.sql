-- Update content categories to status-based workflow
DELETE FROM content_categories;

INSERT INTO content_categories (name, description, display_order, active) VALUES
('all', 'All Content', 0, true),
('to-do', 'To Do', 1, true),
('in-progress', 'In Progress', 2, true),
('review', 'Review', 3, true),
('completed', 'Completed', 4, true);

-- Update existing content ideas to use 'to-do' as default status
UPDATE content_ideas SET category = 'to-do' WHERE category IN ('skill-development', 'seasonal-events', 'event-promotion', 'community-engagement', 'educational-coaching', 'behind-the-scenes');