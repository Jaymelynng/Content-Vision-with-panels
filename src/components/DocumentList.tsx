
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Brain, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useDocuments, useProcessDocument } from "@/hooks/useDocumentUpload";
import { formatDistanceToNow } from "date-fns";

export function DocumentList() {
  const { data: documents = [], isLoading } = useDocuments();
  const { mutate: processDocument, isPending: isProcessing } = useProcessDocument();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Brain className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading documents...</div>;
  }

  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents uploaded yet</p>
            <p className="text-sm text-gray-400">Upload your brain dumps to get started!</p>
          </CardContent>
        </Card>
      ) : (
        documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {doc.filename}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(doc.processing_status)}
                  <Badge className={getStatusColor(doc.processing_status)}>
                    {doc.processing_status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Size: {formatFileSize(doc.file_size)}</p>
                  <p>Type: {doc.file_type}</p>
                  <p>Uploaded: {formatDistanceToNow(new Date(doc.created_at))} ago</p>
                  {doc.processed_at && (
                    <p>Processed: {formatDistanceToNow(new Date(doc.processed_at))} ago</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {doc.processing_status === 'pending' && (
                    <Button
                      onClick={() => processDocument(doc.id)}
                      disabled={isProcessing}
                      size="sm"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      {isProcessing ? 'Processing...' : 'Process Document'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
