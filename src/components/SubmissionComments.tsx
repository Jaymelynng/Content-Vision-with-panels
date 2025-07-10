import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, MessageSquare } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface SubmissionCommentsProps {
  progressId: string;
  gymId: string;
  contentTitle: string;
}

interface Comment {
  id: string;
  comment_text: string;
  comment_type: string;
  is_admin: boolean;
  created_at: string;
  user_id: string;
}

export function SubmissionComments({ progressId, gymId, contentTitle }: SubmissionCommentsProps) {
  const [commentText, setCommentText] = useState('');
  const { gym } = useAuth();
  const queryClient = useQueryClient();

  // Fetch comments for this submission
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['submission-comments', progressId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('submission_comments')
        .select('*')
        .eq('progress_id', progressId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Comment[];
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (text: string) => {
      const { error } = await supabase
        .from('submission_comments')
        .insert([{
          progress_id: progressId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          gym_id: gymId,
          comment_text: text,
          comment_type: 'feedback',
          is_admin: false, // User comments are not admin comments
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission-comments', progressId] });
      setCommentText('');
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    },
  });

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addCommentMutation.mutate(commentText.trim());
  };

  if (isLoading) {
    return <div className="p-4">Loading comments...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Feedback & Comments
        </CardTitle>
        <p className="text-sm text-muted-foreground">{contentTitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Comments Thread */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No comments yet. Start the conversation!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-3 rounded-lg ${
                  comment.is_admin 
                    ? 'bg-primary/10 ml-4' 
                    : 'bg-muted mr-4'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {comment.is_admin ? 'A' : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={comment.is_admin ? 'default' : 'secondary'}>
                        {comment.is_admin ? 'Admin' : gym?.gym_name || 'User'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.comment_text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Add Comment */}
        <div className="space-y-3 border-t pt-4">
          <Textarea
            placeholder="Add your comment or question..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleAddComment}
              disabled={!commentText.trim() || addCommentMutation.isPending}
            >
              <Send className="h-4 w-4 mr-2" />
              {addCommentMutation.isPending ? 'Sending...' : 'Send Comment'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}