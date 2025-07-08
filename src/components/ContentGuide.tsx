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
          <div className="flex-shrink-0 w-80">
            {/* Visual Progress Section */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Assignment Progress</h3>
                <div className="flex items-center gap-2">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={overallProgress === 100 ? "#10b981" : "#3b82f6"}
                        strokeWidth="2"
                        strokeDasharray={`${overallProgress}, 100`}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">
                        {Math.round(overallProgress)}%
                      </span>
                    </div>
                  </div>
                  {overallProgress === 100 && (
                    <div className="animate-scale-in text-green-500">
                      🎉
                    </div>
                  )}
                </div>
              </div>
              
              {/* Individual Requirements Progress */}
              <div className="space-y-2">
                {requirements.map((req: any, index: number) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-2 rounded transition-all duration-300 ${
                      uploadProgress[req.name] === 100 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="relative">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        uploadProgress[req.name] === 100
                          ? 'bg-green-500 border-green-500 scale-110'
                          : uploadProgress[req.name] > 0
                          ? 'bg-blue-500 border-blue-500'
                          : 'bg-gray-100 border-gray-300'
                      }`}>
                        {uploadProgress[req.name] === 100 ? (
                          <svg className="w-3 h-3 text-white animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : uploadProgress[req.name] > 0 ? (
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        ) : (
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {req.name}
                      </div>
                      {uploadProgress[req.name] > 0 && uploadProgress[req.name] < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[req.name]}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {uploadProgress[req.name] === 100 ? '✓' : uploadProgress[req.name] > 0 ? `${uploadProgress[req.name]}%` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <UploadRequirements 
              requirements={requirements}
              uploadProgress={uploadProgress}
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