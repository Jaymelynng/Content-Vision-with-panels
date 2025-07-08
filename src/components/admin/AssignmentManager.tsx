import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Eye, Edit, Calendar, Image, Video, Users, Target, Clock, CheckCircle } from 'lucide-react';
import { useAssignments, useAssignment, useAssignmentSubmissions, useAssignmentProgress } from '@/hooks/useAssignments';

interface AssignmentCardProps {
  assignmentId: string;
  onSelect: (id: string) => void;
}

function AssignmentCard({ assignmentId, onSelect }: AssignmentCardProps) {
  const { data: assignment } = useAssignment(assignmentId);
  const { data: submissions } = useAssignmentSubmissions(assignmentId);
  const progress = useAssignmentProgress(assignmentId);

  if (!assignment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelect(assignmentId)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{assignment.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Due: {new Date(assignment.due_date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {submissions?.length || 0} submissions
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(assignment.status)}>
            {assignment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {assignment.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium mb-1">Content Format</div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1">
                  <Image className="h-3 w-3" />
                  {assignment.video_photo_split.photo}%
                </span>
                <span className="flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  {assignment.video_photo_split.video}%
                </span>
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Content Categories</div>
              <div className="flex gap-2">
                <span>Class: {assignment.class_camp_split.class}%</span>
                <span>Camp: {assignment.class_camp_split.camp}%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress.overallProgress)}%
              </span>
            </div>
            <Progress value={progress.overallProgress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AssignmentDetails({ assignmentId }: { assignmentId: string }) {
  const { data: assignment } = useAssignment(assignmentId);
  const { data: submissions } = useAssignmentSubmissions(assignmentId);
  const progress = useAssignmentProgress(assignmentId);

  if (!assignment) return <div>Loading assignment details...</div>;

  const getThumbnailUrl = (submission: any) => {
    // This would normally get the actual thumbnail URL from Supabase storage
    return `https://via.placeholder.com/150x150/f0f0f0/666?text=${submission.file_type.toUpperCase()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{assignment.title}</h2>
          <p className="text-muted-foreground mt-1">{assignment.description}</p>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit Assignment
        </Button>
      </div>

      <Tabs defaultValue="requirements" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="planning">Setup & Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assignment Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignment.requirements?.map((req, index) => (
                <div key={req.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{req.name}</h4>
                      <Badge variant={req.type === 'video' ? 'default' : 'secondary'} className="mt-1">
                        {req.type} {req.duration && `• ${req.duration}`}
                      </Badge>
                    </div>
                    {req.is_required && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                  
                  {req.example_description && (
                    <div className="bg-blue-50 rounded-md p-3">
                      <div className="font-medium text-sm text-blue-900 mb-1">Production Tips:</div>
                      <p className="text-sm text-blue-800">{req.example_description}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Target className="h-8 w-8 text-blue-500" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">{progress.totalSubmitted}</div>
                    <div className="text-xs text-muted-foreground">of {progress.totalRequired}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium">Total Submissions</div>
                  <Progress value={progress.overallProgress} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Image className="h-8 w-8 text-green-500" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round(progress.photoProgress)}%</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium">Photo Content</div>
                  <Progress value={progress.photoProgress} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Video className="h-8 w-8 text-purple-500" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round(progress.videoProgress)}%</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium">Video Content</div>
                  <Progress value={progress.videoProgress} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <CheckCircle className="h-8 w-8 text-orange-500" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round(progress.classProgress)}%</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium">Class Content</div>
                  <Progress value={progress.classProgress} className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Format Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Media Type Split</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Photos</span>
                      <span>{assignment.video_photo_split.photo}%</span>
                    </div>
                    <Progress value={assignment.video_photo_split.photo} />
                    <div className="flex justify-between">
                      <span>Videos</span>
                      <span>{assignment.video_photo_split.video}%</span>
                    </div>
                    <Progress value={assignment.video_photo_split.video} />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Content Category Split</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Class Content</span>
                      <span>{assignment.class_camp_split.class}%</span>
                    </div>
                    <Progress value={assignment.class_camp_split.class} />
                    <div className="flex justify-between">
                      <span>Camp Content</span>
                      <span>{assignment.class_camp_split.camp}%</span>
                    </div>
                    <Progress value={assignment.class_camp_split.camp} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {submissions && submissions.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="space-y-2">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={getThumbnailUrl(submission)}
                          alt={submission.file_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-medium truncate">{submission.file_name}</div>
                        <div className="flex gap-1">
                          <Badge variant={submission.file_type === 'video' ? 'default' : 'secondary'} className="text-xs">
                            {submission.file_type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {submission.content_category}
                          </Badge>
                        </div>
                        <Badge 
                          variant={
                            submission.status === 'approved' ? 'default' :
                            submission.status === 'needs_redo' ? 'destructive' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {submission.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No submissions yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Setup & Planning Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Collection Period</h4>
                <p className="text-sm text-blue-800">
                  This assignment has a {assignment.collection_period} collection period, 
                  giving ambassadors adequate time to capture quality content without weekly deadline stress.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Content Planning Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Plan shoots during peak activity times</li>
                    <li>• Ensure good lighting for photo content</li>
                    <li>• Capture 20+ seconds for video content</li>
                    <li>• Get proper permissions for featuring people</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Quality Guidelines</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High resolution images (1080p minimum)</li>
                    <li>• Stable video recording</li>
                    <li>• Clear audio for video content</li>
                    <li>• Follow brand guidelines for visual style</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function AssignmentManager() {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const { data: assignments, isLoading } = useAssignments();

  if (isLoading) {
    return <div>Loading assignments...</div>;
  }

  if (selectedAssignmentId) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setSelectedAssignmentId(null)}
          className="mb-4"
        >
          ← Back to All Assignments
        </Button>
        <AssignmentDetails assignmentId={selectedAssignmentId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Assignment Management</h2>
          <p className="text-muted-foreground">Create and manage ambassador assignments across all gyms</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Assignment
        </Button>
      </div>

      <div className="grid gap-4">
        {assignments && assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentCard 
              key={assignment.id} 
              assignmentId={assignment.id}
              onSelect={setSelectedAssignmentId}
            />
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Assignments</h3>
              <p className="text-muted-foreground mb-4">
                Create your first assignment to start distributing tasks to gym ambassadors.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create First Assignment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}