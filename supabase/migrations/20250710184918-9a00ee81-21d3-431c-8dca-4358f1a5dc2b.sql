-- Add month_year column to content_ideas table
ALTER TABLE public.content_ideas 
ADD COLUMN month_year TEXT DEFAULT '2025-01';

-- Add assignment_month column to user_content_progress table  
ALTER TABLE public.user_content_progress
ADD COLUMN assignment_month TEXT DEFAULT '2025-01';

-- Update existing content_ideas with current month
UPDATE public.content_ideas 
SET month_year = '2025-01' 
WHERE month_year IS NULL;

-- Update existing user_content_progress with current month
UPDATE public.user_content_progress 
SET assignment_month = '2025-01' 
WHERE assignment_month IS NULL;