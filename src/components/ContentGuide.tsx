
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormatSelector } from "./FormatSelector";
import { ContentStats } from "./ContentStats";
import { ContentTabs } from "./ContentTabs";
import { UploadRequirements } from "./UploadRequirements";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ContentGuideProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
}

export function ContentGuide({ open, onClose, contentId }: ContentGuideProps) {
  const [selectedFormat, setSelectedFormat] = useState<'photo' | 'video'>('photo');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const navigate = useNavigate();
  
  // Restructured guide data with new workflow organization
  const guideData = {
    1: {
      title: "Handstand = Homework Focus",
      description: "Educational content connecting gymnastics skills to academic success",
      setupPlanning: {
        photo: [
          "Plan split-screen layout: handstand on left, focused homework on right",
          "Choose bright, clean background with good natural lighting",
          "Prepare text overlay: 'Balance in Gym = Focus in School'",
          "Set up homework materials and gymnastics space",
          "Plan key message: 'The balance I learn in gymnastics helps me focus on homework'"
        ],
        video: [
          "Storyboard: handstand hold → transition → homework desk setup",
          "Plan dynamic text animations for key messages",
          "Prepare before/after comparison shots",
          "Script opening hook: 'Want to know the secret to homework focus?'",
          "Plan engagement question: 'How do you prepare your mind for homework?'"
        ]
      },
      productionTips: {
        photo: [
          "Use tripod for stability when capturing handstand",
          "Natural lighting works best - avoid harsh shadows",
          "Capture multiple angles: side view for form, front for expression",
          "Have homework materials clearly visible and organized",
          "Take burst shots to capture the perfect moment"
        ],
        video: [
          "Record in landscape orientation for best quality",
          "Use stable surface or tripod - no shaky footage",
          "Ensure audio is clear if speaking during handstand",
          "Plan smooth transitions between handstand and homework scenes",
          "Keep individual clips short (15-30 seconds max)"
        ]
      },
      uploadTrack: {
        photo: [
          "Export in high resolution (at least 1080p)",
          "Use JPG or PNG format for best compatibility",
          "Keep file size under 10MB for faster uploads",
          "Add relevant hashtags and captions before posting",
          "Track engagement metrics after posting"
        ],
        video: [
          "Export in MP4 format for best compatibility",
          "Keep file size under 100MB for platform requirements",
          "Add captions for accessibility",
          "Schedule posting for optimal engagement times",
          "Monitor comments and engagement in first hour"
        ]
      },
      requirements: [
        { 
          name: "Opening Hook", 
          duration: "3-5 seconds", 
          type: "intro", 
          completed: false,
          description: "Attention-grabbing start that introduces the concept"
        },
        { 
          name: "Handstand Demo", 
          duration: "10-15 seconds", 
          type: "main", 
          completed: false,
          description: "Clear demonstration of proper handstand form"
        },
        { 
          name: "Homework Connection", 
          duration: "10-20 seconds", 
          type: "explanation", 
          completed: false,
          description: "Explaining how gymnastics skills transfer to academic focus"
        },
        { 
          name: "Call to Action", 
          duration: "5-8 seconds", 
          type: "outro", 
          completed: false,
          description: "Engaging question or challenge for viewers"
        }
      ]
    }
  };

  const currentGuide = guideData[contentId as keyof typeof guideData] || guideData[1];

  const handleFileUpload = (requirementName: string) => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = selectedFormat === 'photo' ? 'image/*' : 'video/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Store the uploaded file
        setUploadedFiles(prev => ({ ...prev, [requirementName]: file }));
        
        // Simulate upload progress
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
      // Store files and template info for the editor
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

  const allRequirementsComplete = currentGuide.requirements.every(req => 
    uploadProgress[req.name] === 100
  );

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{currentGuide.title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-6 h-[70vh]">
          <div className="flex flex-col">
            <FormatSelector 
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
            />
            <ContentStats 
              uploadProgress={uploadProgress}
              totalRequirements={currentGuide.requirements.length}
            />
          </div>

          <ContentTabs 
            selectedFormat={selectedFormat}
            guideData={currentGuide}
          />

          <UploadRequirements 
            requirements={currentGuide.requirements}
            uploadProgress={uploadProgress}
            onFileUpload={handleFileUpload}
          />
        </div>

        <div className="flex justify-between pt-4 border-t">
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
              Start Creating {allRequirementsComplete ? '✓' : `(${Object.keys(uploadedFiles).length}/${currentGuide.requirements.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
