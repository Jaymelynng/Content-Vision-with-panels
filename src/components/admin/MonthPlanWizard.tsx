import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Save, Calendar, FileText, Video, Camera } from 'lucide-react';
import { useContentIdeas } from '@/hooks/useContentIdeas';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface MonthPlanWizardProps {
  sourceMonth?: string;
  targetMonth?: string;
  onClose: () => void;
}

interface ContentTemplate {
  type: 'photo_carousel' | 'video_reel';
  title: string;
  category: string;
  formats: string[];
  photoCount?: number;
  videoCount?: number;
  duration?: string;
}

const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    type: 'photo_carousel',
    title: 'Photo Carousel Template',
    category: 'General',
    formats: ['photo'],
    photoCount: 4
  },
  {
    type: 'video_reel',
    title: 'Video Reel Template', 
    category: 'General',
    formats: ['video'],
    videoCount: 5,
    duration: '15-20 seconds each'
  }
];

export function MonthPlanWizard({ sourceMonth, targetMonth, onClose }: MonthPlanWizardProps) {
  const { data: contentIdeas } = useContentIdeas();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [monthYear, setMonthYear] = useState(targetMonth || '');
  const [planPosts, setPlanPosts] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [step, setStep] = useState<'setup' | 'template' | 'posts' | 'review'>('setup');

  useEffect(() => {
    if (sourceMonth && contentIdeas) {
      const sourceIdeas = contentIdeas.filter(idea => idea.month_year === sourceMonth);
      setPlanPosts(sourceIdeas.map(idea => ({
        ...idea,
        id: undefined, // Will get new ID when created
        month_year: monthYear
      })));
      setStep('posts');
    }
  }, [sourceMonth, contentIdeas, monthYear]);

  const formatMonthDisplay = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const createPostFromTemplate = (template: ContentTemplate, index: number) => {
    const postNumber = index + 1;
    const baseTitle = `${formatMonthDisplay(monthYear)} - Post #${postNumber}`;
    
    if (template.type === 'photo_carousel') {
      return {
        title: `${baseTitle}: Photo Carousel`,
        description: `Photo carousel content for ${formatMonthDisplay(monthYear)}`,
        category: template.category,
        difficulty: 'medium',
        engagement: 'medium',
        formats: ['photo'],
        target_audience: ['growth'],
        features: [],
        month_year: monthYear,
        setup_planning_photo: [
          'Four photos that will be edited into a carousel',
          'Focus on clear composition and lighting',
          'Show progression or different angles of the same concept'
        ],
        production_tips_photo: [
          'Take 4 photos total. All photos must be SQUARE (1:1) aspect ratio',
          'Each photo should be well-lit and properly composed',
          'Post-ready quality with no cropping needed'
        ],
        upload_track_photo: [
          'Photo 1: [Describe the first shot]',
          'Photo 2: [Describe the second shot]', 
          'Photo 3: [Describe the third shot]',
          'Photo 4: [Describe the fourth shot]'
        ],
        requirements: JSON.stringify({
          upload_requirements: [{
            name: '4 Square Photos',
            type: 'photo',
            duration: '1:1 aspect ratio',
            description: 'High-quality photos ready for carousel posting'
          }]
        })
      };
    } else {
      return {
        title: `${baseTitle}: Video Reel`,
        description: `Video reel content for ${formatMonthDisplay(monthYear)}`,
        category: template.category,
        difficulty: 'medium',
        engagement: 'high',
        formats: ['video'],
        target_audience: ['growth'],
        features: [],
        month_year: monthYear,
        setup_planning_video: [
          'Five clips that tell a cohesive story',
          'Plan your transitions and flow',
          'Consider audio and music needs'
        ],
        production_tips_video: [
          'Record 5 clips total. Each should be 15–20 seconds long',
          'Upload final trimmed clips ready for posting',
          'Ensure good lighting and clear audio'
        ],
        upload_track_video: [
          'Video 1: [Describe the first clip - 15-20 seconds]',
          'Video 2: [Describe the second clip - 15-20 seconds]',
          'Video 3: [Describe the third clip - 15-20 seconds]',
          'Video 4: [Describe the fourth clip - 15-20 seconds]',
          'Video 5: [Describe the fifth clip - 15-20 seconds]'
        ],
        requirements: JSON.stringify({
          upload_requirements: [{
            name: '5 Video Clips',
            type: 'video',
            duration: '15-20 seconds each',
            description: 'Post-ready video clips with good audio and lighting'
          }]
        })
      };
    }
  };

  const addPost = () => {
    if (!selectedTemplate) return;
    
    const newPost = createPostFromTemplate(selectedTemplate, planPosts.length);
    setPlanPosts([...planPosts, newPost]);
  };

  const removePost = (index: number) => {
    setPlanPosts(planPosts.filter((_, i) => i !== index));
  };

  const updatePost = (index: number, field: string, value: any) => {
    setPlanPosts(planPosts.map((post, i) => 
      i === index ? { ...post, [field]: value } : post
    ));
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('content_ideas')
        .insert(planPosts.map(post => ({
          ...post,
          setup_planning_photo: post.setup_planning_photo || [],
          setup_planning_video: post.setup_planning_video || [],
          production_tips_photo: post.production_tips_photo || [],
          production_tips_video: post.production_tips_video || [],
          upload_track_photo: post.upload_track_photo || [],
          upload_track_video: post.upload_track_video || []
        })));

      if (error) throw error;

      toast({
        title: "Success",
        description: `Created ${planPosts.length} content ideas for ${formatMonthDisplay(monthYear)}`
      });

      queryClient.invalidateQueries({ queryKey: ['content-ideas'] });
      onClose();
    } catch (error) {
      console.error('Error creating month plan:', error);
      toast({
        title: "Error",
        description: "Failed to create month plan",
        variant: "destructive"
      });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'setup':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Setup New Month Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Month/Year</Label>
                <Input
                  type="month"
                  value={monthYear}
                  onChange={(e) => setMonthYear(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setStep('template')} 
                disabled={!monthYear}
                className="w-full"
              >
                Continue to Template Selection
              </Button>
            </CardContent>
          </Card>
        );

      case 'template':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Choose Content Templates</CardTitle>
              <p className="text-muted-foreground">Select templates to quickly create structured content</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {CONTENT_TEMPLATES.map((template) => (
                  <div
                    key={template.type}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate?.type === template.type ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-center gap-3">
                      {template.type === 'photo_carousel' ? (
                        <Camera className="h-8 w-8 text-primary" />
                      ) : (
                        <Video className="h-8 w-8 text-primary" />
                      )}
                      <div>
                        <h3 className="font-medium">{template.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.type === 'photo_carousel' 
                            ? `${template.photoCount} photos in square format`
                            : `${template.videoCount} video clips, ${template.duration}`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setStep('posts')} 
                disabled={!selectedTemplate}
                className="w-full"
              >
                Continue to Post Creation
              </Button>
            </CardContent>
          </Card>
        );

      case 'posts':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Create Posts for {formatMonthDisplay(monthYear)}
                  <Button onClick={addPost} disabled={!selectedTemplate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {planPosts.map((post, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Post #{index + 1}</h4>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removePost(index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Post title"
                          value={post.title}
                          onChange={(e) => updatePost(index, 'title', e.target.value)}
                        />
                        <Select 
                          value={post.category} 
                          onValueChange={(value) => updatePost(index, 'category', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Back-to-School">Back-to-School</SelectItem>
                            <SelectItem value="Skills">Skills</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Safety">Safety</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {post.formats?.map((format: string) => (
                          <Badge key={format} variant="secondary">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Button 
              onClick={() => setStep('review')} 
              disabled={planPosts.length === 0}
              className="w-full"
            >
              Review and Create Plan
            </Button>
          </div>
        );

      case 'review':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review {formatMonthDisplay(monthYear)} Plan</CardTitle>
              <p className="text-muted-foreground">
                {planPosts.length} posts ready to create
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {planPosts.map((post, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <span className="font-medium">{post.title}</span>
                      <div className="flex gap-1 mt-1">
                        {post.formats?.map((format: string) => (
                          <Badge key={format} variant="secondary" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                ))}
              </div>
              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Create Month Plan
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Month Manager
        </Button>
        <h2 className="text-2xl font-semibold">
          {sourceMonth ? 'Duplicate Month Plan' : 'Create New Month Plan'}
        </h2>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {['setup', 'template', 'posts', 'review'].map((stepName, index) => (
          <React.Fragment key={stepName}>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              step === stepName ? 'bg-primary text-primary-foreground' : 
              ['setup', 'template', 'posts', 'review'].indexOf(step) > index ? 'bg-muted text-muted-foreground' : 
              'bg-secondary text-secondary-foreground'
            }`}>
              <span className="capitalize">{stepName}</span>
            </div>
            {index < 3 && <div className="w-4 h-px bg-border" />}
          </React.Fragment>
        ))}
      </div>

      {renderStepContent()}
    </div>
  );
}