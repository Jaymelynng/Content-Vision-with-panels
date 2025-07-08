import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { UploadRequirements } from "./UploadRequirements";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Camera, Video, Image, Settings } from "lucide-react";
import type { ContentIdea } from "@/hooks/useContentIdeas";

interface ContentGuideProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
  contentData: ContentIdea;
}

export function ContentGuide({ open, onClose, contentId, contentData }: ContentGuideProps) {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const navigate = useNavigate();
  const { gym } = useAuth();

  // Auto-detect format based on content requirements
  const detectContentFormat = () => {
    const requirements = typeof contentData.requirements === 'string' 
      ? JSON.parse(contentData.requirements) 
      : contentData.requirements;
    
    const hasVideoRequirements = requirements.some((req: any) => 
      req.type?.toLowerCase().includes('video') || 
      req.name?.toLowerCase().includes('video') ||
      req.name?.toLowerCase().includes('reel')
    );
    
    return hasVideoRequirements ? 'video' : 'photo';
  };

  const contentFormat = detectContentFormat();
  const requirements = typeof contentData.requirements === 'string' 
    ? JSON.parse(contentData.requirements) 
    : contentData.requirements;

  // Load existing progress from database
  useEffect(() => {
    const loadProgress = async () => {
      if (!gym?.id) return;
      
      const { data, error } = await supabase
        .from('user_content_progress')
        .select('*')
        .eq('content_id', contentId)
        .eq('gym_id', gym.id)
        .eq('selected_format', contentFormat)
        .single();

      if (data && !error) {
        setUploadProgress(data.upload_progress as { [key: string]: number } || {});
      }
    };

    if (open) {
      loadProgress();
    }
  }, [open, contentId, gym?.id, contentFormat]);

  // Save progress to database
  const saveProgressToDatabase = async (progressUpdate: { [key: string]: number }, filesUpdate: { [key: string]: File }) => {
    if (!gym?.id) return;

    const uploadedFileData = Object.entries(filesUpdate).map(([name, file]) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      requirement: name
    }));

    const { error } = await supabase
      .from('user_content_progress')
      .upsert({
        content_id: contentId,
        gym_id: gym.id,
        selected_format: contentFormat,
        upload_progress: progressUpdate,
        uploaded_files: uploadedFileData,
        status: Object.values(progressUpdate).every(p => p === 100) ? 'completed' : 'in-progress'
      });

    if (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleFileUpload = (requirementName: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = contentFormat === 'video' ? 'video/*' : 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const updatedFiles = { ...uploadedFiles, [requirementName]: file };
        setUploadedFiles(updatedFiles);
        
        let progress = 0;
        const interval = setInterval(async () => {
          progress += 10;
          const updatedProgress = { ...uploadProgress, [requirementName]: progress };
          setUploadProgress(updatedProgress);
          
          if (progress >= 100) {
            clearInterval(interval);
            toast.success(`${requirementName} uploaded successfully!`);
            await saveProgressToDatabase(updatedProgress, updatedFiles);
          }
        }, 200);
      }
    };
    
    input.click();
  };

  const handleStartCreating = () => {
    const uploadedFilesList = Object.entries(uploadedFiles).map(([name, file]) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      requirement: name
    }));
    
    if (uploadedFilesList.length > 0) {
      sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFilesList));
      sessionStorage.setItem('selectedTemplate', contentId.toString());
      sessionStorage.setItem('contentFormat', contentFormat);
      
      navigate('/editor');
      onClose();
    } else {
      toast.error("Please upload at least one clip before starting to create.");
    }
  };

  const completedCount = Object.values(uploadProgress).filter(p => p === 100).length;
  const overallProgress = requirements.length > 0 ? (completedCount / requirements.length) * 100 : 0;
  const allRequirementsComplete = requirements.every((req: any) => uploadProgress[req.name] === 100);

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{contentData.title}</DialogTitle>
              {contentData.due_date && (
                <p className="text-sm text-muted-foreground mt-1">
                  Due: {new Date(contentData.due_date).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {contentFormat === 'video' ? <Video className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              <Badge variant="outline" className="text-sm">
                {contentFormat === 'video' ? 'Video Content' : 'Photo Content'}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex gap-6 flex-1 min-h-0">
          {/* Content Guide */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Setup & Planning</TabsTrigger>
                <TabsTrigger value="production">Production Tips</TabsTrigger>
                <TabsTrigger value="examples">Content Examples</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Content Planning & Strategy
                      <Badge variant={contentFormat === 'photo' ? 'default' : 'secondary'}>
                        {contentFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(contentFormat === 'video' ? contentData.setup_planning_video : contentData.setup_planning_photo).map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="production" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Production Guidelines
                      <Badge variant={contentFormat === 'photo' ? 'default' : 'secondary'}>
                        {contentFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(contentFormat === 'video' ? contentData.production_tips_video : contentData.production_tips_photo).map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Content Examples & Shot List
                      <Badge variant={contentFormat === 'photo' ? 'default' : 'secondary'}>
                        {contentFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {(contentFormat === 'video' ? contentData.upload_track_video : contentData.upload_track_photo).map((item, index) => (
                        <li key={index} className="border-l-4 border-blue-500 pl-4 bg-slate-50 p-3 rounded-r-lg">
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Upload Section */}
          <div className="flex-shrink-0 overflow-y-auto max-h-full">
            <div className="w-80 border-l pl-4 mb-4">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Progress:</span>
                <span>{completedCount}/{requirements.length} complete</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            
            {/* Thumbnail Preview Section */}
            {Object.keys(uploadedFiles).length > 0 && (
              <div className="w-80 border-l pl-4 mb-4">
                <h4 className="font-medium text-sm mb-3">Uploaded Files</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(uploadedFiles).map(([name, file]) => (
                    <div key={name} className="relative group">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                        {file.type.startsWith('video/') ? (
                          <video 
                            src={URL.createObjectURL(file)} 
                            className="w-full h-full object-cover"
                            muted
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => e.currentTarget.pause()}
                          />
                        ) : (
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          {file.type.startsWith('video/') && (
                            <div className="opacity-0 group-hover:opacity-100 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                              Hover to preview
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-gray-600 truncate" title={name}>
                        {name}
                      </div>
                      <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <UploadRequirements 
              requirements={requirements}
              uploadProgress={uploadProgress}
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={handleStartCreating}
            disabled={!allRequirementsComplete}
          >
            Start Creating {allRequirementsComplete ? '✓' : `(${completedCount}/${requirements.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}