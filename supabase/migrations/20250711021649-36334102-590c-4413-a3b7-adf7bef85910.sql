-- Insert the Backpack Balance Beam post for August 5th
INSERT INTO public.content_ideas (
  title,
  description,
  category,
  difficulty,
  engagement,
  target_audience,
  formats,
  features,
  month_year,
  due_date,
  setup_planning_photo,
  setup_planning_video,
  production_tips_photo,
  production_tips_video,
  upload_track_photo,
  upload_track_video,
  requirements,
  post_visual,
  content_notes,
  upload_instructions
) VALUES (
  'BACKPACK BALANCE BEAM',
  'Four photos showcasing how beam balance builds school confidence. Kids walking uphill on a beam with books balanced on their heads demonstrate that gymnastics skills translate to real-world success.',
  'Beam',
  'Intermediate',
  'High',
  ARRAY['Parents', 'School-age kids'],
  ARRAY['Photo Carousel'],
  ARRAY['Back-to-school theme', 'Balance skills', 'Real-world application'],
  '2025-08',
  '2025-08-05',
  ARRAY['Set up floor beam with trapezoid or carpet beam for incline', 'Gather school props (books, backpacks)', 'Plan lighting for clear visibility'],
  ARRAY[],
  ARRAY['Capture 4 photos in SQUARE (1:1) aspect ratio', 'Ensure photos are well-lit, showing full beam and expressions', 'Check camera settings to avoid pixel enhancing/rotating', 'Photos should be post-ready for faster editing'],
  ARRAY[],
  ARRAY['Class walking uphill on beam with books', 'Forward shot of child balancing on one foot', 'Game example with hula hoop or pit throwing', 'Creative shot with backpacks/school items'],
  ARRAY[],
  jsonb_build_array(
    jsonb_build_object(
      'title', 'Class Walking Uphill on Beam Balancing Things on Head',
      'description', 'Use props like books for a back-to-school theme. Use a floor beam with a trapezoid or carpet beam to show the incline for younger kids.',
      'type', 'photo',
      'notes', ''
    ),
    jsonb_build_object(
      'title', 'Forward Shot',
      'description', 'A child balancing on one foot with something on their head. Focus on the narrowness of the beam and the control it takes to balance. School themes are best.',
      'type', 'photo',
      'notes', ''
    ),
    jsonb_build_object(
      'title', 'Game Example',
      'description', 'Show a fun activity like a hula hoop game or pit throwing game. Highlight how we make challenging skills engaging and fun.',
      'type', 'photo',
      'notes', ''
    ),
    jsonb_build_object(
      'title', 'Get Creative',
      'description', 'Incorporate backpacks or other school-related items. Show real-world application or create a visual connection to school readiness.',
      'type', 'photo',
      'notes', ''
    )
  ),
  'Four photos showcasing how beam balance builds school confidence. Kids walking uphill on a beam with books balanced on their heads demonstrate that gymnastics skills translate to real-world success. The message: if they can master this, they''re ready for what school throws their way.',
  'Capture 4 photos in SQUARE (1:1) aspect ratio. Ensure photos are well-lit, showing the full beam and kids'' expressions. Highlight impressive balance to make parents think, "Wow, my kid could do that!" Please check camera settings - when photos need pixel enhancing and rotating, it''s quite the process to do for each photo and all gyms. Photos should be turned in post ready so editing and creating the carousel go much faster.',
  'UPLOAD THESE 4 PHOTOS:'
);