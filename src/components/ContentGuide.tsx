
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormatSelector } from "./FormatSelector";
import { ContentStats } from "./ContentStats";
import { ContentTabs } from "./ContentTabs";
import { UploadRequirements } from "./UploadRequirements";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { ContentIdea } from "@/hooks/useContentIdeas";

interface ContentGuideProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
  contentData: ContentIdea;
}

export function ContentGuide({ open, onClose, contentId, contentData }: ContentGuideProps) {
  const [selectedFormat, setSelectedFormat] = useState<'photo' | 'video'>('photo');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const navigate = useNavigate();
  
  // Parse requirements from the database
  const requirements = typeof contentData.requirements === 'string' 
    ? JSON.parse(contentData.requirements) 
    : contentData.requirements;

  const handleFileUpload = (requirementName: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = selectedFormat === 'photo' ? 'image/*' : 'video/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedFiles(prev => ({ ...prev, [requirementName]: file }));
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(prev => ({ ...prev, [requirementName]: progress }));
          if (progress >= 100) {
            clearInterval(interval);
            toast.success(`${requirementName} uploaded successfully!`);
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
        </DialogHeader>
        
        <div className="flex gap-6 flex-1 min-h-0">
          <div className="flex flex-col flex-shrink-0">
            <FormatSelector 
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
            />
            <ContentStats 
              uploadProgress={uploadProgress}
              totalRequirements={requirements.length}
            />
          </div>

          <div className="flex-1 min-w-0">
            <ContentTabs 
              selectedFormat={selectedFormat}
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
