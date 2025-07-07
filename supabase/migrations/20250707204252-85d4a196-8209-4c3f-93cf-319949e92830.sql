-- Insert transformed content ideas from the content bank

INSERT INTO content_ideas (
  title, description, category, difficulty, engagement, 
  formats, target_audience, features,
  setup_planning_photo, setup_planning_video,
  production_tips_photo, production_tips_video,
  upload_track_photo, upload_track_video,
  requirements, file_requirements, content_formats, status_options
) VALUES 

-- SP-01: Fun First, Strength Follows
(
  'Fun First, Strength Follows',
  'Giggles are our favorite ab workout - capturing laughter during animal walks builds core activation and confidence',
  'skill-development',
  'easy',
  'high',
  ARRAY['photo', 'reel', 'story'],
  ARRAY['premium', 'growth', 'community'],
  ARRAY['Core Activation', 'Fun Approach', 'Animal Walks'],
  ARRAY[
    'Hero Moment: Kids mid-laugh during animal walks showing pure joy in movement',
    'Parent Value: Fun approach to fitness, core strength development, positive association with exercise',
    'Kid Feel: Happy, silly, not realizing they''re working out',
    'Must-See Skills: Animal walks, core engagement through laughter',
    'Equipment: Open floor space, fun music, cheerful coaching energy'
  ],
  ARRAY[
    'Hero Moment: Complete transformation from hesitant to confident through fun',
    'Parent Value: Evidence that fitness can be joyful and effective',
    'Kid Feel: Excited, engaged, wanting to continue',
    'Must-See Skills: Various animal walks, core strength building',
    'Equipment: Open space, upbeat music, enthusiastic coaching'
  ],
  ARRAY[
    'Camera Flow: Wide shot of group → close-up of laughing faces → action shots of animal walks',
    'Audio Cues: Kids giggling, coach encouraging silly animal sounds',
    'Timing: Capture spontaneous laughter moments, 3-5 quick shots',
    'Quality Specs: Fast shutter for action, bright lighting, focus on expressions'
  ],
  ARRAY[
    'Camera Flow: Wide establishing shot → medium for giggles → close-up for joy',
    'Audio Cues: Natural laughter, animal sound effects, coach encouragement',
    'Timing: 15-20 seconds total, quick cuts for energy',
    'Quality Specs: Good lighting, capture genuine reactions, stable shots'
  ],
  ARRAY[
    '📸 Photo A: Wide group shot during bear walks with visible laughter',
    '📸 Photo B: Close-up of child''s face mid-giggle during crab walk',
    '📸 Photo C: Coach demonstrating silly animal walk with kids copying',
    'Fail-Safe: Any child smiling during basic movement exercise',
    'Crop-Safe Zone: Keep faces and full body movement in center frame'
  ],
  ARRAY[
    '🎥 Clip A: Group Animal Walk - Wide shot showing multiple kids doing animal walks (Kids feel: silly and happy, Parents value: fun fitness)',
    '🎥 Clip B: Laughter Close-up - Close-up capturing genuine child laughter (Kids feel: joyful, Parents value: positive experience)',
    '🎥 Clip C: Coach Demo - Coach leading silly animal movement (Kids feel: eager to copy, Parents value: engaging instruction)',
    '🎥 Clip D: Happy Participation - Kids eagerly copying and having fun (Kids feel: successful, Parents value: active engagement)',
    'Fail-Safe: Any child participating in animal walks with smile'
  ],
  jsonb_build_object(
    'upload_requirements', jsonb_build_array(
      jsonb_build_object('name', 'Group Animal Walk', 'duration', '10-15 seconds', 'description', 'Wide shot showing multiple kids doing animal walks with giggles', 'type', 'video'),
      jsonb_build_object('name', 'Laughter Close-up', 'duration', '5-8 seconds', 'description', 'Close-up capturing genuine child laughter during movement', 'type', 'video'),
      jsonb_build_object('name', 'Coach Demonstration', 'duration', '8-12 seconds', 'description', 'Coach leading silly animal movement with enthusiasm', 'type', 'video'),
      jsonb_build_object('name', 'Happy Participation', 'duration', '5-10 seconds', 'description', 'Kids eagerly copying coach and having fun', 'type', 'video')
    )
  ),
  jsonb_build_object(
    'video', jsonb_build_object('formats', jsonb_build_array('MP4', 'MOV'), 'maxSize', '100MB'),
    'photo', jsonb_build_object('formats', jsonb_build_array('JPG', 'PNG'), 'maxSize', '10MB'),
    'general', jsonb_build_array('Capture genuine laughter', 'Bright, cheerful lighting', 'Show group participation')
  ),
  ARRAY['photo', 'video'],
  ARRAY['not-started', 'in-progress', 'completed', 'draft']
),

-- CP-01: Pullover Power Drill  
(
  'Pullover Power Drill',
  'Bar belly roll? Start here. Three sets of chin-tuck rock-back produce the core snap needed for first pullovers',
  'skill-development',
  'medium',
  'high',
  ARRAY['reel', 'story'],
  ARRAY['premium', 'growth'],
  ARRAY['Technique Breakdown', 'Progressive Drills', 'Core Development'],
  ARRAY[
    'Hero Moment: Breakthrough moment when athlete nails their first pullover',
    'Parent Value: Proper progression prevents injury, builds foundation skills',
    'Kid Feel: Accomplished, stronger, ready for next challenge',
    'Must-See Skills: Chin-tuck position, rock-back motion, core engagement',
    'Equipment: Low bar or modified setup, safety mats, clear sight lines'
  ],
  ARRAY[
    'Hero Moment: Complete pullover progression from drill to full skill',
    'Parent Value: Step-by-step instruction showing safe skill development',
    'Kid Feel: Confident in progression, excited about improvement',
    'Must-See Skills: Drill demonstration, proper form, successful pullover',
    'Equipment: Bars at appropriate height, mats, coaching spots'
  ],
  ARRAY[
    'Camera Flow: Setup position → drill demonstration → coach spotting → successful execution',
    'Audio Cues: Coach counting sets, technique cues like "chin tuck, rock back"',
    'Timing: Capture 3-5 drill repetitions showing progression',
    'Quality Specs: Side angle for form, clear view of core engagement'
  ],
  ARRAY[
    'Camera Flow: Drill setup → technique demo → progression → success moment',
    'Audio Cues: Coach instruction, counting, encouragement, celebration',
    'Timing: 20-25 seconds total, show complete progression',
    'Quality Specs: Multiple angles, clear form visibility, good lighting'
  ],
  ARRAY[
    '📸 Photo A: Drill Setup - Proper starting position for pullover drill',
    '📸 Photo B: Technique Demo - Coach showing chin-tuck rock-back',
    '📸 Photo C: Student Success - Athlete completing pullover progression',
    'Fail-Safe: Strong hanging position with good form',
    'Crop-Safe Zone: Frame to show complete body position and form'
  ],
  ARRAY[
    '🎥 Clip A: Drill Explanation - Coach demonstrating pullover preparation drill (Kids feel: ready to learn, Parents value: safety-first approach)',
    '🎥 Clip B: Practice Progression - Student working through drill with coaching (Kids feel: supported, Parents value: proper instruction)',
    '🎥 Clip C: Success Moment - First successful pullover execution (Kids feel: accomplished, Parents value: skill achievement)',
    '🎥 Clip D: Form Focus - Close-up of proper technique details (Kids feel: understanding, Parents value: technical accuracy)',
    'Fail-Safe: Any athlete demonstrating good hanging position'
  ],
  jsonb_build_object(
    'upload_requirements', jsonb_build_array(
      jsonb_build_object('name', 'Drill Explanation', 'duration', '8-12 seconds', 'description', 'Coach demonstrating pullover preparation drill technique', 'type', 'video'),
      jsonb_build_object('name', 'Practice Progression', 'duration', '15-20 seconds', 'description', 'Student working through drill with coaching guidance', 'type', 'video'),
      jsonb_build_object('name', 'Success Moment', 'duration', '10-15 seconds', 'description', 'First successful pullover execution with celebration', 'type', 'video'),
      jsonb_build_object('name', 'Form Focus', 'duration', '8-10 seconds', 'description', 'Close-up of proper technique and body position', 'type', 'video')
    )
  ),
  jsonb_build_object(
    'video', jsonb_build_object('formats', jsonb_build_array('MP4', 'MOV'), 'maxSize', '100MB'),
    'photo', jsonb_build_object('formats', jsonb_build_array('JPG', 'PNG'), 'maxSize', '10MB'),
    'general', jsonb_build_array('Clear form visibility', 'Safety focus', 'Progressive instruction')
  ),
  ARRAY['video'],
  ARRAY['not-started', 'in-progress', 'completed', 'draft']
),

-- PEG-02: Growth Happens Between Classes
(
  'Growth Happens Between Classes',
  '48-hour learning window: Skills consolidate after practice. Sleep + balanced snacks = stronger synapses',
  'educational-coaching',
  'easy',
  'medium',
  ARRAY['photo', 'story', 'carousel'],
  ARRAY['premium', 'growth'],
  ARRAY['Parent Education', 'Science-Based', 'Recovery Tips'],
  ARRAY[
    'Hero Moment: Visual showing brain consolidation process during rest',
    'Parent Value: Understanding how learning actually works, practical recovery tips',
    'Kid Feel: Reassured that rest is part of getting better',
    'Must-See Skills: Recovery positions, healthy snack examples',
    'Equipment: Educational graphics, healthy snack props, cozy rest setup'
  ],
  ARRAY[
    'Hero Moment: Time-lapse style showing skill improvement over 48 hours',
    'Parent Value: Scientific explanation of skill development process',
    'Kid Feel: Excited about improvement happening even during rest',
    'Must-See Skills: Before/after skill comparison, recovery activities',
    'Equipment: Graphics for brain science, skill demonstration space'
  ],
  ARRAY[
    'Camera Flow: Skill attempt → rest/recovery activities → improved skill performance',
    'Audio Cues: Gentle narration about learning process, quiet rest sounds',
    'Timing: Show progression over time with visual transitions',
    'Quality Specs: Clean, educational style with clear text overlays'
  ],
  ARRAY[
    'Camera Flow: Practice session → recovery time → improved performance',
    'Audio Cues: Educational narration, quiet background, positive results',
    'Timing: 25-30 seconds showing complete learning cycle',
    'Quality Specs: Clear before/after comparison, professional educational tone'
  ],
  ARRAY[
    '📸 Photo A: Practice Session - Athlete working on skill during class',
    '📸 Photo B: Recovery Time - Healthy snacks and rest activities',
    '📸 Photo C: Improved Performance - Same skill executed better after rest',
    'Fail-Safe: Simple infographic about 48-hour learning window',
    'Crop-Safe Zone: Clear text and visual elements for education'
  ],
  ARRAY[
    '🎥 Clip A: Learning Science - Educational explanation of 48-hour window (Kids feel: smart about learning, Parents value: science-based approach)',
    '🎥 Clip B: Recovery Activities - Showing proper rest and nutrition (Kids feel: proud of healthy choices, Parents value: practical guidance)',
    '🎥 Clip C: Skill Improvement - Before/after comparison showing growth (Kids feel: amazed by progress, Parents value: visible results)',
    '🎥 Clip D: Action Steps - Simple tips for supporting learning at home (Kids feel: supported, Parents value: actionable advice)',
    'Fail-Safe: Simple educational graphic about learning and rest'
  ],
  jsonb_build_object(
    'upload_requirements', jsonb_build_array(
      jsonb_build_object('name', 'Learning Science', 'duration', '10-15 seconds', 'description', 'Educational explanation of the 48-hour learning consolidation window', 'type', 'video'),
      jsonb_build_object('name', 'Recovery Activities', 'duration', '8-12 seconds', 'description', 'Showing proper rest, sleep, and nutrition for athletes', 'type', 'video'),
      jsonb_build_object('name', 'Skill Improvement', 'duration', '10-15 seconds', 'description', 'Before/after comparison showing skill growth over time', 'type', 'video'),
      jsonb_build_object('name', 'Action Steps', 'duration', '8-10 seconds', 'description', 'Simple tips for parents to support learning at home', 'type', 'video')
    )
  ),
  jsonb_build_object(
    'video', jsonb_build_object('formats', jsonb_build_array('MP4', 'MOV'), 'maxSize', '100MB'),
    'photo', jsonb_build_object('formats', jsonb_build_array('JPG', 'PNG'), 'maxSize', '10MB'),
    'general', jsonb_build_array('Educational clarity', 'Professional graphics', 'Parent-friendly information')
  ),
  ARRAY['photo', 'video'],
  ARRAY['not-started', 'in-progress', 'completed', 'draft']
),

-- IG-02: Emoji Skill Decoder
(
  'Emoji Skill Decoder',
  'Post emoji string, ask followers to decode the skill. First 5 right answers win shout-outs',
  'community-engagement',
  'easy',
  'very-high',
  ARRAY['story', 'photo'],
  ARRAY['premium', 'growth', 'community'],
  ARRAY['Interactive Content', 'Engagement Boost', 'Skill Recognition'],
  ARRAY[
    'Hero Moment: Community coming together to solve fun puzzle',
    'Parent Value: Educational game that teaches skill names and recognition',
    'Kid Feel: Excited to participate, proud when they guess correctly',
    'Must-See Skills: Skills represented by emojis, visual skill demonstrations',
    'Equipment: Colorful emoji graphics, skill demonstration space'
  ],
  ARRAY[
    'Hero Moment: Reveal of skill with celebration of correct guessers',
    'Parent Value: Fun learning game that builds gymnastics vocabulary',
    'Kid Feel: Engaged, competitive in positive way, learning while playing',
    'Must-See Skills: Actual skill performance matching emoji clues',
    'Equipment: Emoji graphics, skill demonstration, celebration elements'
  ],
  ARRAY[
    'Camera Flow: Emoji reveal → skill demonstration → winner announcement',
    'Audio Cues: Playful music, skill execution sounds, celebration cheers',
    'Timing: Quick emoji reveal, clear skill demo, excited reactions',
    'Quality Specs: Bright, colorful graphics, clear skill visibility'
  ],
  ARRAY[
    'Camera Flow: Emoji puzzle → suspense build → skill reveal → winner celebration',
    'Audio Cues: Puzzle music, suspenseful pause, skill sounds, celebration',
    'Timing: 15-20 seconds with clear progression through game',
    'Quality Specs: High contrast emojis, clear skill demonstration'
  ],
  ARRAY[
    '📸 Photo A: Emoji Puzzle - Creative emoji combination representing skill',
    '📸 Photo B: Skill Reveal - Clear demonstration of the actual skill',
    '📸 Photo C: Winner Celebration - Shout-out to correct guessers',
    'Fail-Safe: Simple emoji with obvious skill match',
    'Crop-Safe Zone: Keep emojis large and readable for mobile viewing'
  ],
  ARRAY[
    '🎥 Clip A: Emoji Challenge - Present emoji puzzle with dramatic flair (Kids feel: intrigued and challenged, Parents value: educational game)',
    '🎥 Clip B: Suspense Build - Count down to reveal with excitement (Kids feel: anticipation, Parents value: engagement building)',
    '🎥 Clip C: Skill Reveal - Demonstrate the actual skill matching emojis (Kids feel: satisfied with answer, Parents value: skill learning)',
    '🎥 Clip D: Winner Shout-Out - Celebrate community participation (Kids feel: recognized, Parents value: positive community)',
    'Fail-Safe: Any emoji that clearly represents a basic gymnastics skill'
  ],
  jsonb_build_object(
    'upload_requirements', jsonb_build_array(
      jsonb_build_object('name', 'Emoji Challenge', 'duration', '5-8 seconds', 'description', 'Present emoji puzzle with dramatic flair and call to action', 'type', 'video'),
      jsonb_build_object('name', 'Suspense Build', 'duration', '3-5 seconds', 'description', 'Build anticipation before revealing the answer', 'type', 'video'),
      jsonb_build_object('name', 'Skill Reveal', 'duration', '8-12 seconds', 'description', 'Demonstrate the actual skill that matches the emoji puzzle', 'type', 'video'),
      jsonb_build_object('name', 'Winner Celebration', 'duration', '5-8 seconds', 'description', 'Celebrate correct guessers and community participation', 'type', 'video')
    )
  ),
  jsonb_build_object(
    'video', jsonb_build_object('formats', jsonb_build_array('MP4', 'MOV'), 'maxSize', '100MB'),
    'photo', jsonb_build_object('formats', jsonb_build_array('JPG', 'PNG'), 'maxSize', '10MB'),
    'general', jsonb_build_array('High contrast graphics', 'Mobile-friendly sizing', 'Community engagement focus')
  ),
  ARRAY['photo', 'video'],
  ARRAY['not-started', 'in-progress', 'completed', 'draft']
),

-- OTB-06: Glow-in-the-Dark Tumbling
(
  'Glow-in-the-Dark Tumbling',
  'Kill lights, use neon tape & black-light; film passes in silhouette for stunning visual impact',
  'community-engagement',
  'hard',
  'very-high',
  ARRAY['reel', 'video'],
  ARRAY['premium', 'growth'],
  ARRAY['Creative Effects', 'Visual Impact', 'Unique Content'],
  ARRAY[
    'Hero Moment: Stunning silhouette tumbling that looks like art in motion',
    'Parent Value: Creative, memorable content showcasing athletic artistry',
    'Kid Feel: Amazed by how cool they look, feeling like gymnastics superstar',
    'Must-See Skills: Clean tumbling passes, artistic movements in silhouette',
    'Equipment: Black lights, neon tape, dark room capability, safety setup'
  ],
  ARRAY[
    'Hero Moment: Jaw-dropping visual effects that make gymnastics look magical',
    'Parent Value: Unique, shareable content that showcases gym creativity',
    'Kid Feel: Like they''re in a movie, excited about special effects',
    'Must-See Skills: Tumbling passes, jumps, poses that show well in silhouette',
    'Equipment: Professional lighting setup, neon props, video equipment'
  ],
  ARRAY[
    'Camera Flow: Setup reveal → athlete preparation → stunning tumbling silhouettes',
    'Audio Cues: Dramatic music, skill execution sounds, amazed reactions',
    'Timing: Build suspense with setup, capture multiple tumbling passes',
    'Quality Specs: High contrast, dramatic lighting, artistic composition'
  ],
  ARRAY[
    'Camera Flow: Lights out → neon reveal → tumbling artistry → final impact',
    'Audio Cues: Dramatic music build, skill sounds, excitement from viewers',
    'Timing: 25-30 seconds with dramatic pacing and multiple angles',
    'Quality Specs: Professional lighting effects, high contrast, cinematic quality'
  ],
  ARRAY[
    '📸 Photo A: Setup Reveal - Black light equipment and neon tape preparation',
    '📸 Photo B: Silhouette Art - Stunning tumbling pass in dramatic lighting',
    '📸 Photo C: Impact Moment - Athlete in powerful pose with glow effects',
    'Fail-Safe: Simple gymnastics pose under dramatic lighting',
    'Crop-Safe Zone: Full body silhouettes centered for maximum impact'
  ],
  ARRAY[
    '🎥 Clip A: Setup Magic - Transformation from normal to glow lighting (Kids feel: anticipation, Parents value: creativity and production value)',
    '🎥 Clip B: Tumbling Artistry - Stunning silhouette tumbling passes (Kids feel: amazed by their abilities, Parents value: artistic showcase)',
    '🎥 Clip C: Multiple Angles - Different perspectives of glow tumbling (Kids feel: like movie stars, Parents value: professional quality)',
    '🎥 Clip D: Final Impact - Dramatic ending pose with full glow effect (Kids feel: powerful and accomplished, Parents value: memorable content)',
    'Fail-Safe: Any gymnastics movement under dramatic black light effects'
  ],
  jsonb_build_object(
    'upload_requirements', jsonb_build_array(
      jsonb_build_object('name', 'Setup Magic', 'duration', '8-12 seconds', 'description', 'Transformation from normal lighting to dramatic glow setup', 'type', 'video'),
      jsonb_build_object('name', 'Tumbling Artistry', 'duration', '15-20 seconds', 'description', 'Stunning silhouette tumbling passes under black light', 'type', 'video'),
      jsonb_build_object('name', 'Multiple Angles', 'duration', '10-15 seconds', 'description', 'Different camera perspectives of glow-effect tumbling', 'type', 'video'),
      jsonb_build_object('name', 'Final Impact', 'duration', '5-8 seconds', 'description', 'Dramatic ending pose with full glow effect and music climax', 'type', 'video')
    )
  ),
  jsonb_build_object(
    'video', jsonb_build_object('formats', jsonb_build_array('MP4', 'MOV'), 'maxSize', '100MB'),
    'photo', jsonb_build_object('formats', jsonb_build_array('JPG', 'PNG'), 'maxSize', '10MB'),
    'general', jsonb_build_array('Professional lighting required', 'Safety considerations', 'High contrast settings', 'Artistic composition')
  ),
  ARRAY['video'],
  ARRAY['not-started', 'in-progress', 'completed', 'draft']
);