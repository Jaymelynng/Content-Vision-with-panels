import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Play, Image as ImageIcon, CheckCircle, Clock, Users, Target, Camera, Dumbbell, Apple, TrendingUp, BookOpen, Wrench } from 'lucide-react';

interface ContentCategory {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  icon: React.ReactNode;
  contentType: 'video' | 'photo' | 'mixed';
  duration?: string;
  totalRequired: number;
  completed: number;
  pendingReview: number;
  needsRevision: number;
  setupPlanning: {
    title: string;
    checklist: string[];
    timeline: string;
    requirements: string[];
  };
  productionTips: {
    title: string;
    tips: string[];
    dosDonts: { dos: string[]; donts: string[] };
    equipment: string[];
  };
  examples: {
    title: string;
    exampleImages: string[];
    descriptions: string[];
    commonMistakes: string[];
  };
}

const contentCategories: ContentCategory[] = [
  {
    id: 'workout-videos',
    title: 'Workout Demonstration Videos',
    description: 'High-energy workout videos showcasing different exercises and training styles',
    thumbnailUrl: '/api/placeholder/300/200?text=Workout+Demo',
    icon: <Dumbbell className="h-6 w-6" />,
    contentType: 'video',
    duration: '30-60 seconds',
    totalRequired: 8,
    completed: 3,
    pendingReview: 2,
    needsRevision: 1,
    setupPlanning: {
      title: 'Workout Video Planning',
      checklist: [
        'Select diverse workout types (strength, cardio, flexibility)',
        'Ensure proper lighting in workout area',
        'Choose upbeat background music',
        'Plan 3-4 different exercises per video',
        'Prepare demonstration participant'
      ],
      timeline: '2-3 weeks for complete set',
      requirements: [
        'Vertical video format (9:16)',
        'Minimum 1080p resolution',
        'Clear audio for instruction',
        'Visible branding/logo placement'
      ]
    },
    productionTips: {
      title: 'Filming Workout Videos',
      tips: [
        'Film during peak energy hours for authentic enthusiasm',
        'Use multiple camera angles for dynamic shots',
        'Ensure instructor demonstrates proper form clearly',
        'Include modification options for different fitness levels',
        'Capture reaction shots from participants'
      ],
      dosDonts: {
        dos: [
          'Show complete exercise movements',
          'Use natural lighting when possible',
          'Keep camera steady',
          'Feature diverse participants'
        ],
        donts: [
          'Film during empty/low-energy times',
          'Rush through exercise demonstrations',
          'Ignore audio quality',
          'Use outdated music'
        ]
      },
      equipment: ['Smartphone with stabilizer', 'Wireless microphone', 'Ring light', 'Tripod']
    },
    examples: {
      title: 'Workout Video Examples',
      exampleImages: [
        '/api/placeholder/150/200?text=HIIT+Demo',
        '/api/placeholder/150/200?text=Strength+Training',
        '/api/placeholder/150/200?text=Yoga+Flow',
        '/api/placeholder/150/200?text=Cardio+Blast'
      ],
      descriptions: [
        'High-intensity interval training with clear timing',
        'Strength training with proper form demonstration',
        'Yoga flow with breathing instructions',
        'Cardio workout with energy and motivation'
      ],
      commonMistakes: [
        'Poor lighting making exercises hard to see',
        'Rushed demonstrations without form explanation',
        'Low energy presentation',
        'Background distractions'
      ]
    }
  },
  {
    id: 'nutrition-content',
    title: 'Nutrition & Meal Prep',
    description: 'Healthy meal preparation and nutrition education content',
    thumbnailUrl: '/api/placeholder/300/200?text=Nutrition+Content',
    icon: <Apple className="h-6 w-6" />,
    contentType: 'mixed',
    duration: '15-45 seconds',
    totalRequired: 6,
    completed: 2,
    pendingReview: 1,
    needsRevision: 0,
    setupPlanning: {
      title: 'Nutrition Content Planning',
      checklist: [
        'Plan seasonal, relevant meal prep ideas',
        'Source fresh, colorful ingredients',
        'Prepare clean, organized cooking space',
        'Plan quick, achievable recipes',
        'Consider dietary restrictions and alternatives'
      ],
      timeline: '1-2 weeks per content batch',
      requirements: [
        'High-quality food photography',
        'Step-by-step process shots',
        'Ingredient lists visible',
        'Nutritional benefit callouts'
      ]
    },
    productionTips: {
      title: 'Food Content Creation',
      tips: [
        'Use natural lighting for food photography',
        'Show the complete cooking process',
        'Include ingredient measurements and substitutions',
        'Feature colorful, appealing food arrangements',
        'Add nutritional education throughout'
      ],
      dosDonts: {
        dos: [
          'Style food attractively',
          'Use clean, uncluttered backgrounds',
          'Show portion sizes',
          'Include prep time information'
        ],
        donts: [
          'Use harsh artificial lighting',
          'Rush through preparation steps',
          'Ignore food safety practices',
          'Feature unhealthy options'
        ]
      },
      equipment: ['Good smartphone camera', 'Natural light source', 'Clean cutting boards', 'Attractive serving dishes']
    },
    examples: {
      title: 'Nutrition Content Examples',
      exampleImages: [
        '/api/placeholder/150/200?text=Meal+Prep',
        '/api/placeholder/150/200?text=Smoothie+Bowl',
        '/api/placeholder/150/200?text=Healthy+Snacks',
        '/api/placeholder/150/200?text=Post+Workout'
      ],
      descriptions: [
        'Weekly meal prep containers with balanced macros',
        'Colorful smoothie bowls with fresh toppings',
        'Portable healthy snack options',
        'Post-workout nutrition timing and options'
      ],
      commonMistakes: [
        'Poor food styling making meals look unappetizing',
        'Overcomplicated recipes that intimidate beginners',
        'Missing nutritional context and benefits',
        'Inadequate lighting for food photography'
      ]
    }
  },
  {
    id: 'success-stories',
    title: 'Client Success Stories',
    description: 'Inspiring transformation stories and member achievements',
    thumbnailUrl: '/api/placeholder/300/200?text=Success+Stories',
    icon: <TrendingUp className="h-6 w-6" />,
    contentType: 'mixed',
    duration: '30-90 seconds',
    totalRequired: 4,
    completed: 1,
    pendingReview: 1,
    needsRevision: 0,
    setupPlanning: {
      title: 'Success Story Planning',
      checklist: [
        'Identify willing success story participants',
        'Schedule interview/photo sessions',
        'Prepare thoughtful interview questions',
        'Gather before/after photos (with permission)',
        'Plan celebration and recognition elements'
      ],
      timeline: '2-4 weeks per story',
      requirements: [
        'Signed consent forms for sharing',
        'Professional-quality photos',
        'Authentic, heartfelt testimonials',
        'Measurable achievement highlights'
      ]
    },
    productionTips: {
      title: 'Capturing Success Stories',
      tips: [
        'Create comfortable interview environment',
        'Ask open-ended questions about their journey',
        'Capture genuine emotional moments',
        'Include family/support system when appropriate',
        'Focus on personal growth beyond physical changes'
      ],
      dosDonts: {
        dos: [
          'Respect privacy boundaries',
          'Highlight personal achievements',
          'Show authentic emotions',
          'Include progress measurements'
        ],
        donts: [
          'Pressure reluctant participants',
          'Focus only on weight loss',
          'Use unflattering photos',
          'Share without explicit permission'
        ]
      },
      equipment: ['Quality camera/smartphone', 'Good audio recording', 'Professional lighting', 'Comfortable seating area']
    },
    examples: {
      title: 'Success Story Examples',
      exampleImages: [
        '/api/placeholder/150/200?text=Weight+Loss',
        '/api/placeholder/150/200?text=Strength+Gain',
        '/api/placeholder/150/200?text=Confidence+Boost',
        '/api/placeholder/150/200?text=Lifestyle+Change'
      ],
      descriptions: [
        'Weight loss journey with lifestyle changes',
        'Strength and muscle building achievements',
        'Confidence and mental health improvements',
        'Complete lifestyle transformation story'
      ],
      commonMistakes: [
        'Focusing only on physical appearance',
        'Sharing without proper consent',
        'Overly staged or artificial presentation',
        'Missing the emotional journey aspects'
      ]
    }
  },
  {
    id: 'behind-scenes',
    title: 'Behind-the-Scenes',
    description: 'Authentic glimpses into daily gym operations and staff',
    thumbnailUrl: '/api/placeholder/300/200?text=Behind+Scenes',
    icon: <Camera className="h-6 w-6" />,
    contentType: 'mixed',
    duration: '15-30 seconds',
    totalRequired: 10,
    completed: 4,
    pendingReview: 2,
    needsRevision: 1,
    setupPlanning: {
      title: 'Behind-the-Scenes Planning',
      checklist: [
        'Identify interesting daily moments to capture',
        'Get staff comfortable with being filmed',
        'Plan equipment maintenance/setup shots',
        'Schedule during varied operational times',
        'Include different areas of the facility'
      ],
      timeline: 'Ongoing, 2-3 pieces per week',
      requirements: [
        'Authentic, unscripted moments',
        'Good lighting and audio',
        'Variety in locations and people',
        'Positive, energetic atmosphere'
      ]
    },
    productionTips: {
      title: 'Candid Content Creation',
      tips: [
        'Be ready to capture spontaneous moments',
        'Keep filming sessions short and natural',
        'Feature different staff members regularly',
        'Show the preparation that goes into classes',
        'Include member interactions (with permission)'
      ],
      dosDonts: {
        dos: [
          'Capture authentic interactions',
          'Show facility pride and care',
          'Include diverse staff and members',
          'Highlight unique gym features'
        ],
        donts: [
          'Stage interactions awkwardly',
          'Film during inappropriate times',
          'Ignore member privacy',
          'Focus on negative aspects'
        ]
      },
      equipment: ['Smartphone with good low-light performance', 'Discrete microphone', 'Steady hands or gimbal']
    },
    examples: {
      title: 'Behind-the-Scenes Examples',
      exampleImages: [
        '/api/placeholder/150/200?text=Staff+Setup',
        '/api/placeholder/150/200?text=Equipment+Prep',
        '/api/placeholder/150/200?text=Team+Meeting',
        '/api/placeholder/150/200?text=Facility+Care'
      ],
      descriptions: [
        'Staff setting up for morning classes',
        'Equipment maintenance and preparation',
        'Team meetings and training sessions',
        'Facility cleaning and care processes'
      ],
      commonMistakes: [
        'Overly staged or artificial moments',
        'Poor timing disrupting operations',
        'Focusing on mundane rather than interesting activities',
        'Not including enough variety in content'
      ]
    }
  },
  {
    id: 'educational-tips',
    title: 'Educational Fitness Tips',
    description: 'Quick, valuable fitness and wellness education',
    thumbnailUrl: '/api/placeholder/300/200?text=Education+Tips',
    icon: <BookOpen className="h-6 w-6" />,
    contentType: 'mixed',
    duration: '30-60 seconds',
    totalRequired: 12,
    completed: 5,
    pendingReview: 3,
    needsRevision: 2,
    setupPlanning: {
      title: 'Educational Content Planning',
      checklist: [
        'Research current fitness trends and questions',
        'Prepare factual, evidence-based information',
        'Plan visual aids and demonstrations',
        'Create engaging, easy-to-understand explanations',
        'Prepare for common follow-up questions'
      ],
      timeline: '1 week per educational series',
      requirements: [
        'Accurate, research-backed information',
        'Clear, concise explanations',
        'Visual demonstrations when applicable',
        'Engaging presentation style'
      ]
    },
    productionTips: {
      title: 'Educational Content Creation',
      tips: [
        'Break complex concepts into simple points',
        'Use visual aids and demonstrations',
        'Speak clearly and at appropriate pace',
        'Include practical application examples',
        'End with actionable takeaways'
      ],
      dosDonts: {
        dos: [
          'Fact-check all information',
          'Use simple, understandable language',
          'Include practical examples',
          'Engage with current fitness topics'
        ],
        donts: [
          'Share unverified information',
          'Use overly technical language',
          'Make content too lengthy',
          'Ignore audience questions and interests'
        ]
      },
      equipment: ['Clear audio recording', 'Good lighting for demonstrations', 'Props for visual aids', 'Notes or teleprompter']
    },
    examples: {
      title: 'Educational Content Examples',
      exampleImages: [
        '/api/placeholder/150/200?text=Form+Tips',
        '/api/placeholder/150/200?text=Recovery+Info',
        '/api/placeholder/150/200?text=Myth+Busting',
        '/api/placeholder/150/200?text=Goal+Setting'
      ],
      descriptions: [
        'Proper exercise form and technique tips',
        'Recovery and rest day importance',
        'Common fitness myth explanations',
        'Goal setting and progress tracking advice'
      ],
      commonMistakes: [
        'Sharing outdated or incorrect information',
        'Making content too complex for general audience',
        'Not providing practical application',
        'Ignoring current trends and questions'
      ]
    }
  },
  {
    id: 'equipment-demos',
    title: 'Equipment Demonstrations',
    description: 'Proper equipment usage and safety demonstrations',
    thumbnailUrl: '/api/placeholder/300/200?text=Equipment+Demo',
    icon: <Wrench className="h-6 w-6" />,
    contentType: 'video',
    duration: '45-90 seconds',
    totalRequired: 6,
    completed: 2,
    pendingReview: 1,
    needsRevision: 0,
    setupPlanning: {
      title: 'Equipment Demo Planning',
      checklist: [
        'Select equipment that members frequently ask about',
        'Ensure equipment is clean and in good condition',
        'Plan safety points to emphasize',
        'Prepare common beginner mistakes to address',
        'Schedule during less busy times'
      ],
      timeline: '2-3 weeks for complete equipment series',
      requirements: [
        'Clear view of equipment operation',
        'Safety warnings and proper form',
        'Multiple angles for complex movements',
        'Audio explanation of each step'
      ]
    },
    productionTips: {
      title: 'Equipment Demo Filming',
      tips: [
        'Film from multiple angles for clarity',
        'Emphasize safety considerations',
        'Show common mistakes and corrections',
        'Include setup and breakdown processes',
        'Feature both beginner and advanced uses'
      ],
      dosDonts: {
        dos: [
          'Demonstrate proper safety procedures',
          'Show equipment adjustments clearly',
          'Include weight/resistance recommendations',
          'Address common user errors'
        ],
        donts: [
          'Rush through safety instructions',
          'Use damaged or dirty equipment',
          'Skip important setup steps',
          'Assume prior knowledge'
        ]
      },
      equipment: ['Multi-angle camera setup', 'Clear audio recording', 'Good lighting around equipment', 'Safety spotters if needed']
    },
    examples: {
      title: 'Equipment Demo Examples',
      exampleImages: [
        '/api/placeholder/150/200?text=Cable+Machine',
        '/api/placeholder/150/200?text=Free+Weights',
        '/api/placeholder/150/200?text=Cardio+Equipment',
        '/api/placeholder/150/200?text=Functional+Tools'
      ],
      descriptions: [
        'Cable machine setup and exercise variations',
        'Free weight proper handling and storage',
        'Cardio equipment features and programs',
        'Functional training tool demonstrations'
      ],
      commonMistakes: [
        'Not showing proper equipment adjustments',
        'Skipping safety instructions',
        'Poor camera angles hiding important details',
        'Not addressing beginner concerns'
      ]
    }
  }
];

interface ContentCategoryCardProps {
  category: ContentCategory;
  onSelect: (category: ContentCategory) => void;
}

function ContentCategoryCard({ category, onSelect }: ContentCategoryCardProps) {
  const progressPercent = (category.completed / category.totalRequired) * 100;
  
  const getStatusColor = (status: 'completed' | 'pending' | 'needs_revision') => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'needs_revision': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => onSelect(category)}>
      <CardHeader className="pb-3">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
          <img 
            src={category.thumbnailUrl}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
            {category.icon}
          </div>
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {category.contentType === 'video' ? (
              <span className="flex items-center gap-1">
                <Play className="h-3 w-3" />
                {category.duration}
              </span>
            ) : category.contentType === 'photo' ? (
              <span className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                Photo
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                Mixed
              </span>
            )}
          </div>
        </div>
        <CardTitle className="text-lg">{category.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">
              {category.completed}/{category.totalRequired}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          
          <div className="flex gap-2 flex-wrap">
            {category.completed > 0 && (
              <Badge className={getStatusColor('completed')}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {category.completed} completed
              </Badge>
            )}
            {category.pendingReview > 0 && (
              <Badge className={getStatusColor('pending')}>
                <Clock className="h-3 w-3 mr-1" />
                {category.pendingReview} pending
              </Badge>
            )}
            {category.needsRevision > 0 && (
              <Badge className={getStatusColor('needs_revision')}>
                <Target className="h-3 w-3 mr-1" />
                {category.needsRevision} revision needed
              </Badge>
            )}
          </div>
          
          <Button variant="outline" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface ContentDetailModalProps {
  category: ContentCategory | null;
  isOpen: boolean;
  onClose: () => void;
}

function ContentDetailModal({ category, isOpen, onClose }: ContentDetailModalProps) {
  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {category.icon}
            {category.title}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Setup & Planning</TabsTrigger>
            <TabsTrigger value="production">Production Tips</TabsTrigger>
            <TabsTrigger value="examples">Content Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.setupPlanning.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Planning Checklist</h4>
                  <ul className="space-y-2">
                    {category.setupPlanning.checklist.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Timeline</h4>
                    <p className="text-sm text-blue-800">{category.setupPlanning.timeline}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Requirements</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      {category.setupPlanning.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.productionTips.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Production Tips</h4>
                  <ul className="space-y-2">
                    {category.productionTips.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-3">✓ Do's</h4>
                    <ul className="space-y-2">
                      {category.productionTips.dosDonts.dos.map((item, index) => (
                        <li key={index} className="text-sm text-green-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 mb-3">✗ Don'ts</h4>
                    <ul className="space-y-2">
                      {category.productionTips.dosDonts.donts.map((item, index) => (
                        <li key={index} className="text-sm text-red-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Recommended Equipment</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.productionTips.equipment.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-purple-800">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{category.examples.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Example Content</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.examples.exampleImages.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={image}
                            alt={`Example ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {category.examples.descriptions[index]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-medium text-orange-900 mb-3">Common Mistakes to Avoid</h4>
                  <ul className="space-y-2">
                    {category.examples.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-600 text-sm">⚠️</span>
                        <span className="text-sm text-orange-800">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export function ContentLibraryManager() {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | null>(null);

  const totalContent = contentCategories.reduce((acc, cat) => acc + cat.totalRequired, 0);
  const completedContent = contentCategories.reduce((acc, cat) => acc + cat.completed, 0);
  const pendingContent = contentCategories.reduce((acc, cat) => acc + cat.pendingReview, 0);
  const revisionContent = contentCategories.reduce((acc, cat) => acc + cat.needsRevision, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">Content Library Management</h2>
          <p className="text-muted-foreground">Manage content categories and track ambassador submissions</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-700">{completedContent}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-700">{pendingContent}</div>
            <div className="text-sm text-blue-600">Pending Review</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentCategories.map((category) => (
          <ContentCategoryCard
            key={category.id}
            category={category}
            onSelect={setSelectedCategory}
          />
        ))}
      </div>

      <ContentDetailModal
        category={selectedCategory}
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
}