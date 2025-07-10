import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, MessageSquare, Clock, Eye, Send } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SubmissionWithDetails {
  id: string;
  content_id: number;
  selected_format: string;
  status: string;
  upload_progress: any;
  uploaded_files: any;
  admin_reviewed: boolean;
  admin_approved: boolean;
  admin_feedback_required: boolean;
  submission_notes: string;
  created_at: string;
  updated_at: string;
  gym_id: string;
  content_title: string;
  gym_name: string;
}

interface Comment {
  id: string;
  comment_text: string;
  comment_type: string;
  is_admin: boolean;
  created_at: string;
  user_id: string;
}

export function SubmissionReviewDashboard() {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentType, setCommentType] = useState<'feedback' | 'approval' | 'revision_request'>('feedback');
  const queryClient = useQueryClient();

  // Fetch all submissions with content and gym details
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['admin-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_content_progress')
        .select(`
          *,
          content_ideas!inner(title),
          gym_profiles!inner(gym_name)
        `)
        .neq('status', 'not-started')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(item => ({
        ...item,
        content_title: (item as any).content_ideas.title,
        gym_name: (item as any).gym_profiles.gym_name,
      })) as SubmissionWithDetails[];
    },
  });

  // Fetch comments for selected submission
  const { data: comments = [] } = useQuery({
    queryKey: ['submission-comments', selectedSubmission],
    queryFn: async () => {
      if (!selectedSubmission) return [];
      
      const { data, error } = await supabase
        .from('submission_comments')
        .select('*')
        .eq('progress_id', selectedSubmission)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!selectedSubmission,
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async ({ progressId, commentText, commentType }: {
      progressId: string;
      commentText: string;
      commentType: string;
    }) => {
      const submission = submissions.find(s => s.id === progressId);
      if (!submission) throw new Error('Submission not found');

      const { error } = await supabase
        .from('submission_comments')
        .insert([{
          progress_id: progressId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          gym_id: submission.gym_id,
          comment_text: commentText,
          comment_type: commentType,
          is_admin: true,
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission-comments'] });
      setCommentText('');
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    },
  });

  // Update submission status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, adminApproved, adminReviewed, feedbackRequired }: {
      id: string;
      status: string;
      adminApproved: boolean;
      adminReviewed: boolean;
      feedbackRequired: boolean;
    }) => {
      const { error } = await supabase
        .from('user_content_progress')
        .update({
          status,
          admin_approved: adminApproved,
          admin_reviewed: adminReviewed,
          admin_feedback_required: feedbackRequired,
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-submissions'] });
      toast.success('Status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  const handleAddComment = () => {
    if (!selectedSubmission || !commentText.trim()) return;
    
    addCommentMutation.mutate({
      progressId: selectedSubmission,
      commentText: commentText.trim(),
      commentType,
    });
  };

  const handleApprove = (submissionId: string) => {
    updateStatusMutation.mutate({
      id: submissionId,
      status: 'completed',
      adminApproved: true,
      adminReviewed: true,
      feedbackRequired: false,
    });
  };

  const handleRequestRevision = (submissionId: string) => {
    updateStatusMutation.mutate({
      id: submissionId,
      status: 'in-progress',
      adminApproved: false,
      adminReviewed: true,
      feedbackRequired: true,
    });
  };

  const getStatusColor = (submission: SubmissionWithDetails) => {
    if (submission.admin_approved) return 'bg-success text-success-foreground';
    if (submission.admin_feedback_required) return 'bg-warning text-warning-foreground';
    if (submission.admin_reviewed) return 'bg-secondary text-secondary-foreground';
    return 'bg-primary text-primary-foreground';
  };

  const getStatusText = (submission: SubmissionWithDetails) => {
    if (submission.admin_approved) return 'Approved';
    if (submission.admin_feedback_required) return 'Needs Revision';
    if (submission.admin_reviewed) return 'Under Review';
    return 'New Submission';
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading submissions...</div>;
  }

  const selectedSubmissionData = submissions.find(s => s.id === selectedSubmission);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Submission Review Dashboard</h2>
        <p className="text-muted-foreground">Review and provide feedback on gym submissions</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Submissions List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Reviews ({submissions.filter(s => !s.admin_reviewed).length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSubmission === submission.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedSubmission(submission.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{submission.content_title}</p>
                      <p className="text-xs text-muted-foreground">{submission.gym_name}</p>
                      <Badge className={getStatusColor(submission)} variant="secondary">
                        {getStatusText(submission)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(submission.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Submission Details */}
        <div className="lg:col-span-2">
          {selectedSubmissionData ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedSubmissionData.content_title}</CardTitle>
                      <p className="text-muted-foreground">{selectedSubmissionData.gym_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedSubmissionData.id)}
                        className="bg-success hover:bg-success/90"
                        disabled={selectedSubmissionData.admin_approved}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRequestRevision(selectedSubmissionData.id)}
                        disabled={selectedSubmissionData.admin_feedback_required}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Request Revision
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="files" className="w-full">
                    <TabsList>
                      <TabsTrigger value="files">Uploaded Files</TabsTrigger>
                      <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="files" className="space-y-4">
                      <div className="grid gap-4">
                        {selectedSubmissionData.uploaded_files && 
                         Object.entries(selectedSubmissionData.uploaded_files).map(([key, file]) => (
                          <div key={key} className="p-4 border rounded-lg">
                            <h4 className="font-medium">{key}</h4>
                            <p className="text-sm text-muted-foreground">
                              {(file as any)?.file?.name || 'Unknown file'}
                            </p>
                            {(file as any)?.url && (
                              <Button variant="outline" size="sm" className="mt-2">
                                <Eye className="h-4 w-4 mr-2" />
                                View File
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="comments" className="space-y-4">
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            className={`p-3 rounded-lg ${
                              comment.is_admin 
                                ? 'bg-primary/10 ml-4' 
                                : 'bg-muted mr-4'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={comment.is_admin ? 'default' : 'secondary'}>
                                {comment.is_admin ? 'Admin' : 'User'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{comment.comment_text}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add Comment */}
                      <div className="space-y-3 border-t pt-4">
                        <div className="flex gap-2">
                          <Select value={commentType} onValueChange={(value: any) => setCommentType(value)}>
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="approval">Approval</SelectItem>
                              <SelectItem value="revision_request">Revision Request</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Add your comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            onClick={handleAddComment}
                            disabled={!commentText.trim() || addCommentMutation.isPending}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Select a submission to review</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}