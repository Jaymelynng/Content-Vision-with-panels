import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, MessageSquare, Eye, Calendar, Target, Users, Zap, TrendingUp } from 'lucide-react';
import { ContentUploadSection } from './ContentUploadSection';
import { PostComments } from './PostComments';
import { useContentIdeas } from '@/hooks/useContentIdeas';
import { useUserContentProgress } from '@/hooks/useUserContentProgress';

interface EnhancedContentDetailProps {
  contentId: number;
  monthYear: string;
}

export const EnhancedContentDetail = ({ contentId, monthYear }: EnhancedContentDetailProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data: ideas = [] } = useContentIdeas();
  const { data: progressData = [] } = useUserContentProgress();
  
  const content = ideas.find(idea => idea.id === contentId);
  const progress = progressData.find(p => p.content_id === contentId);

  if (!content) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">Select a content post to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{content.title}</h1>
                <p className="text-muted-foreground mt-1">{content.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{content.category}</Badge>
                <Badge variant="outline">{content.difficulty}</Badge>
              </div>
            </div>
            
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Jayme's Notes</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Content Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Target Audience:</span>
                      <div className="flex gap-1">
                        {content.target_audience?.map((audience, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Engagement:</span>
                      <Badge variant="secondary">{content.engagement}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Month:</span>
                      <span className="text-sm">{content.month_year}</span>
                    </div>
                    
                    {content.due_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Due Date:</span>
                        <span className="text-sm">{new Date(content.due_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Formats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {content.formats?.map((format, index) => (
                        <Badge key={index} variant="outline">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Features & Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {content.features?.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Social Media Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Data Points</h4>
                      <ul className="text-sm space-y-1">
                        {content.data_points?.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Google Trends</h4>
                      <ul className="text-sm space-y-1">
                        {content.google_trends?.map((trend, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{trend}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Strategy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Hook Ideas</h4>
                      <ul className="text-sm space-y-1">
                        {content.hook_ideas?.map((hook, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{hook}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Caption Ideas</h4>
                      <ul className="text-sm space-y-1">
                        {content.caption_ideas?.map((caption, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{caption}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Music Vibes</h4>
                      <ul className="text-sm space-y-1">
                        {content.music_vibes?.map((vibe, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{vibe}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {content.coaching_script && (
                <Card>
                  <CardHeader>
                    <CardTitle>Coaching the Moment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{content.coaching_script}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="instructions" className="p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Visual Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Setup Planning - Photo</h4>
                      <ul className="text-sm space-y-2">
                        {content.setup_planning_photo?.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Production Tips - Photo</h4>
                      <ul className="text-sm space-y-2">
                        {content.production_tips_photo?.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Setup Planning - Video</h4>
                      <ul className="text-sm space-y-2">
                        {content.setup_planning_video?.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Production Tips - Video</h4>
                      <ul className="text-sm space-y-2">
                        {content.production_tips_video?.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="p-6">
              <PostComments contentId={contentId} monthYear={monthYear} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Upload Section */}
      <div className="border-t border-border">
        <ContentUploadSection 
          contentId={contentId} 
          progressId={progress?.id} 
          requirements={Array.isArray(content.requirements) ? content.requirements : []} 
        />
      </div>
    </div>
  );
};