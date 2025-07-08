
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormatSelector } from "./FormatSelector";
import { ContentStats } from "./ContentStats";
import { ContentTabs } from "./ContentTabs";
import { UploadRequirements } from "./UploadRequirements";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Camera, Video, MessageCircle } from "lucide-react";
import type { ContentIdea } from "@/hooks/useContentIdeas";

interface ContentGuideProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
  contentData: ContentIdea;
}

export function ContentGuide({ open, onClose, contentId, contentData }: ContentGuideProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('photo-version');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const navigate = useNavigate();
  const { gym } = useAuth();

  // Load existing progress from database
  useEffect(() => {
    const loadProgress = async () => {
      if (!gym?.id) return;
      
      const { data, error } = await supabase
        .from('user_content_progress')
        .select('*')
        .eq('content_id', contentId)
        .eq('gym_id', gym.id)
        .eq('selected_format', selectedFormat)
        .single();

      if (data && !error) {
        setUploadProgress(data.upload_progress as { [key: string]: number } || {});
      }
    };

    if (open) {
      loadProgress();
    }
  }, [open, contentId, gym?.id, selectedFormat]);

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
        selected_format: selectedFormat,
        upload_progress: progressUpdate,
        uploaded_files: uploadedFileData,
        status: Object.values(progressUpdate).every(p => p === 100) ? 'completed' : 'in-progress'
      });

    if (error) {
      console.error('Error saving progress:', error);
    }
  };
  
  // Parse requirements from the database
  const requirements = typeof contentData.requirements === 'string' 
    ? JSON.parse(contentData.requirements) 
    : contentData.requirements;

  const handleFileUpload = (requirementName: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = selectedFormat.includes('video') ? 'video/*' : 'image/*';
    
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
            // Save progress to database when upload completes
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
      sessionStorage.setItem('contentFormat', selectedFormat);
      
      navigate('/editor');
      onClose();
    } else {
      toast.error("Please upload at least one clip before starting to create.");
    }
  };

  const handleSaveDraft = () => {
    const draftData = {
      contentId,
      selectedFormat,
      uploadedFiles: Object.keys(uploadedFiles),
      progress: uploadProgress,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`draft_${contentId}`, JSON.stringify(draftData));
    toast.success("Draft saved successfully!");
  };

  const allRequirementsComplete = requirements.every((req: any) => 
    uploadProgress[req.name] === 100
  );

  // Create format versions data for the selector
  const formatVersions = [
    {
      key: 'photo-version',
      label: 'Photo Version',
      icon: Camera,
      required: true,
      uploadProgress: { completed: 2, total: 3 } // Example progress
    },
    {
      key: 'video-version', 
      label: 'Video Version',
      icon: Video,
      required: true,
      uploadProgress: { completed: 0, total: 2 } // Example progress
    },
    {
      key: 'story-version',
      label: 'Story Version', 
      icon: MessageCircle,
      required: false,
      uploadProgress: { completed: 0, total: 1 } // Example progress
    }
  ];

  const overallProgress = 40; // Example: 40% complete

  const guideData = {
    setupPlanning: {
      photo: contentData.setup_planning_photo,
      video: contentData.setup_planning_video,
    },
    productionTips: {
      photo: contentData.production_tips_photo,
      video: contentData.production_tips_video,
    },
    uploadTrack: {
      photo: contentData.upload_track_photo,
      video: contentData.upload_track_video,
    },
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl">{contentData.title}</DialogTitle>
          {contentData.due_date && (
            <p className="text-sm text-muted-foreground mt-1">
              Due: {new Date(contentData.due_date).toLocaleDateString()}
            </p>
          )}
        </DialogHeader>
        
        <div className="flex gap-6 flex-1 min-h-0">
          <div className="flex flex-col flex-shrink-0">
            <FormatSelector 
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
              formatVersions={formatVersions}
              overallProgress={overallProgress}
            />
            <ContentStats 
              uploadProgress={uploadProgress}
              totalRequirements={requirements.length}
            />
          </div>

          <div className="flex-1 min-w-0">
            <ContentTabs 
              selectedFormat={selectedFormat.includes('video') ? 'video' : 'photo'}
              guideData={guideData}
            />
          </div>

          <div className="flex-shrink-0 overflow-y-auto max-h-full">
            <UploadRequirements 
              requirements={requirements}
              uploadProgress={uploadProgress}
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Close Guide
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button 
              onClick={handleStartCreating}
              disabled={!allRequirementsComplete}
            >
              Start Creating {allRequirementsComplete ? '✓' : `(${Object.keys(uploadedFiles).length}/${requirements.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
