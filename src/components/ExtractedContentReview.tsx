
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Lightbulb } from "lucide-react";
import { useExtractedContent, useApproveContent } from "@/hooks/useExtractedContent";
import { formatDistanceToNow } from "date-fns";

export function ExtractedContentReview() {
  const { data: extractedContent = [], isLoading } = useExtractedContent();
  const { mutate: approveContent, isPending } = useApproveContent();

  const pendingContent = extractedContent.filter(item => item.approval_status === 'pending');
  const approvedContent = extractedContent.filter(item => item.approval_status === 'approved');
  const rejectedContent = extractedContent.filter(item => item.approval_status === 'rejected');

  if (isLoading) {
    return <div className="text-center py-8">Loading extracted content...</div>;
  }

  const ContentCard = ({ item }: { item: any }) => (
    <Card key={item.id}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            {item.title}
          </CardTitle>
          <Badge 
            className={
              item.approval_status === 'approved' 
                ? 'bg-green-100 text-green-800'
                : item.approval_status === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }
          >
            {item.approval_status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-gray-600">{item.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Category:</span> {item.category}
            </div>
            <div>
              <span className="font-medium">Difficulty:</span> {item.difficulty}
            </div>
            <div>
              <span className="font-medium">Engagement:</span> {item.engagement}
            </div>
            <div>
              <span className="font-medium">Formats:</span> {item.formats.join(', ')}
            </div>
          </div>

          {item.features.length > 0 && (
            <div>
              <span className="font-medium text-sm">Features:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.features.map((feature: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-500">
              Extracted {formatDistanceToNow(new Date(item.created_at))} ago
            </span>
            
            {item.approval_status === 'pending' && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => approveContent({ id: item.id, approved: false })}
                  disabled={isPending}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => approveContent({ id: item.id, approved: true })}
                  disabled={isPending}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve & Import
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {pendingContent.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            Pending Review ({pendingContent.length})
          </h3>
          <div className="space-y-4">
            {pendingContent.map(item => <ContentCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {approvedContent.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Approved & Imported ({approvedContent.length})
          </h3>
          <div className="space-y-4">
            {approvedContent.map(item => <ContentCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {rejectedContent.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Rejected ({rejectedContent.length})
          </h3>
          <div className="space-y-4">
            {rejectedContent.map(item => <ContentCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {extractedContent.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No extracted content yet</p>
            <p className="text-sm text-gray-400">Upload and process documents to see extracted content ideas!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
