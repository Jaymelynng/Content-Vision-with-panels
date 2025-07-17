import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Shield, User } from 'lucide-react';
import { useClipComments } from '@/hooks/useClipComments';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface ClipCommentsProps {
  progressId: string;
  contentId: number;
  requirementIndex: number;
}

export const ClipComments = ({ progressId, contentId, requirementIndex }: ClipCommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
  const { gym } = useAuth();
  const { comments, isLoading, createComment, updateComment } = useClipComments(
    progressId,
    contentId,
    requirementIndex
  );

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    await createComment.mutateAsync(newComment);
    setNewComment('');
  };

  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingComment(commentId);
    setEditText(currentText);
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editText.trim()) return;
    
    await updateComment.mutateAsync({ commentId, commentText: editText });
    setEditingComment(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditText('');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <MessageSquare className="w-4 h-4" />
          Private Comments
          <Badge variant="outline" className="text-xs">
            Gym Only
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Comments List */}
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4 text-sm text-muted-foreground">
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className={cn(
                  "p-3 rounded-lg border",
                  comment.is_admin ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {comment.is_admin ? (
                      <Shield className="w-4 h-4 text-blue-500" />
                    ) : (
                      <User className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-sm font-medium">
                      {comment.is_admin ? 'Admin' : 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  
                  {comment.gym_id === gym?.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditComment(comment.id, comment.comment_text)}
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  )}
                </div>
                
                {editingComment === comment.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="min-h-[60px] text-sm"
                      placeholder="Edit your comment..."
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleUpdateComment(comment.id)}
                        disabled={updateComment.isPending}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{comment.comment_text}</p>
                )}
              </div>
            ))
          )}
        </div>

        {/* New Comment Form */}
        <div className="space-y-3 border-t pt-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a private comment about this upload requirement..."
            className="min-h-[80px] text-sm"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              This comment will only be visible to your gym and admins
            </span>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || createComment.isPending}
              size="sm"
              className="flex items-center gap-2"
            >
              <Send className="w-3 h-3" />
              Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};