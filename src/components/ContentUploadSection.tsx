import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, File, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import { useContentUpload } from '@/hooks/useContentUpload';
import { ClipComments } from './ClipComments';
import { FileUploadDropzone } from './FileUploadDropzone';
import { cn } from '@/lib/utils';

interface ContentUploadSectionProps {
  contentId: number;
  progressId?: string;
  requirements: any[];
}

export const ContentUploadSection = ({ contentId, progressId, requirements }: ContentUploadSectionProps) => {
  const [expandedRequirement, setExpandedRequirement] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  
  const { mutate: uploadFile } = useContentUpload();

  const handleFileUpload = (file: File, requirementIndex: number) => {
    const requirement = requirements[requirementIndex];
    if (!requirement || !progressId) return;

    uploadFile({
      file,
      contentId,
      requirementName: requirement.title || `Requirement ${requirementIndex + 1}`,
      contentFormat: requirement.type || 'file',
      onProgress: (progress) => {
        setUploadProgress(prev => ({
          ...prev,
          [requirementIndex]: progress
        }));
      }
    });
  };

  const getRequirementStatus = (index: number) => {
    const progress = uploadProgress[index] || 0;
    if (progress === 100) return 'completed';
    if (progress > 0) return 'uploading';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'uploading': return <Upload className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'uploading': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!requirements || requirements.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <File className="w-12 h-12 mx-auto mb-2" />
        <p>No upload requirements defined for this content</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Upload Requirements</h3>
        <p className="text-sm text-muted-foreground">
          Complete all upload requirements to submit this content for review
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {requirements.map((requirement, index) => {
          const status = getRequirementStatus(index);
          const progress = uploadProgress[index] || 0;
          const isExpanded = expandedRequirement === index;

          return (
            <Card key={index} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {requirement.title || `Requirement ${index + 1}`}
                  </CardTitle>
                  {getStatusIcon(status)}
                </div>
                <Badge className={cn("text-xs w-fit", getStatusColor(status))}>
                  {status}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  {requirement.description}
                </div>

                {status === 'uploading' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {status === 'pending' && (
                  <FileUploadDropzone
                    onFileSelect={(file) => handleFileUpload(file, index)}
                    accept={requirement.type === 'photo' ? 'image/*' : 'video/*'}
                    className="h-24"
                    requirement={{
                      name: requirement.title || `Requirement ${index + 1}`,
                      description: requirement.description || '',
                      type: requirement.type || 'file'
                    }}
                  />
                )}

                {status === 'completed' && (
                  <div className="text-xs text-green-600 font-medium">
                    Upload completed successfully
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedRequirement(isExpanded ? null : index)}
                    className="text-xs"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Comments
                  </Button>
                  
                  <Badge variant="outline" className="text-xs">
                    {requirement.type}
                  </Badge>
                </div>

                {isExpanded && progressId && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <ClipComments
                      progressId={progressId}
                      contentId={contentId}
                      requirementIndex={index}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};