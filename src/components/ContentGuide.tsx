
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormatSelector } from "./FormatSelector";
import { ContentStats } from "./ContentStats";
import { ContentTabs } from "./ContentTabs";
import { UploadRequirements } from "./UploadRequirements";

interface ContentGuideProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
}

export function ContentGuide({ open, onClose, contentId }: ContentGuideProps) {
  const [selectedFormat, setSelectedFormat] = useState<'photo' | 'video'>('photo');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  
  // Enhanced guide data with new structure
  const guideData = {
    1: {
      title: "Handstand = Homework Focus",
      description: "Educational content connecting gymnastics skills to academic success",
      postVisual: {
        photo: [
          "Split-screen layout: handstand on left, focused homework on right",
          "Use bright, clean background with good natural lighting",
          "Include text overlay: 'Balance in Gym = Focus in School'",
          "Show clear facial expressions of concentration",
          "Add motivational graphics with progress indicators"
        ],
        video: [
          "Start with handstand hold (3-5 seconds of solid form)",
          "Quick transition to homework desk setup",
          "Use dynamic text animations for key messages",
          "Include before/after comparison shots",
          "End with achievement celebration moment"
        ]
      },
      contentNotes: {
        photo: [
          "Key message: 'The balance I learn in gymnastics helps me focus on homework'",
          "Emphasize mind-body connection and transferable skills",
          "Include personal story about concentration improvement",
          "Mention specific benefits: better posture, increased focus time",
          "Call-to-action: 'What skills help you focus? Tell us below!'"
        ],
        video: [
          "Opening hook: 'Want to know the secret to homework focus?'",
          "Explain the connection: core strength = mental strength",
          "Share specific example: 'After gymnastics, I can study for 30 minutes straight'",
          "Educational element: demonstrate proper handstand form briefly",
          "Engagement question: 'How do you prepare your mind for homework?'"
        ]
      },
      filmingTips: {
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
          "Plan transitions between handstand and homework scenes",
          "Keep individual clips short (15-30 seconds max)"
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
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({ ...prev, [requirementName]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [requirementName]: 100 }));
        }, 500);
      }
    }, 200);
  };

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
              difficulty="Easy"
              estimatedTime="30-45 min"
              equipment="Wall space"
              safety="Intermediate"
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
            <Button variant="outline">
              Save Draft
            </Button>
            <Button>
              Start Creating
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
