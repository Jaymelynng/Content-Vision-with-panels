
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Video, Upload, Check, Clock, Image } from "lucide-react";
import { useState } from "react";

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
          {/* Left Sidebar - Format Selection */}
          <div className="w-64 border-r pr-4">
            <h3 className="font-semibold mb-4">Content Format</h3>
            <div className="space-y-2">
              <Button
                variant={selectedFormat === 'photo' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedFormat('photo')}
              >
                <Camera className="w-4 h-4 mr-2" />
                Photo Post
              </Button>
              <Button
                variant={selectedFormat === 'video' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedFormat('video')}
              >
                <Video className="w-4 h-4 mr-2" />
                Video Reel
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 p-3 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Content Stats</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Difficulty: Easy</div>
                <div>Est. Time: 30-45 min</div>
                <div>Equipment: Wall space</div>
                <div>Safety: Intermediate</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="visual" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visual">Post Visual</TabsTrigger>
                <TabsTrigger value="notes">Content Notes</TabsTrigger>
                <TabsTrigger value="filming">Filming Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="visual" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Visual Composition
                      <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                        {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentGuide.postVisual[selectedFormat].map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Content & Messaging
                      <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                        {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentGuide.contentNotes[selectedFormat].map((note, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="filming" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Production Guidelines
                      <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                        {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentGuide.filmingTips[selectedFormat].map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Upload Requirements */}
          <div className="w-80 border-l pl-4">
            <h3 className="font-semibold mb-4">Upload Requirements</h3>
            <div className="space-y-3">
              {currentGuide.requirements.map((req, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{req.name}</span>
                    {uploadProgress[req.name] === 100 ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{req.duration}</div>
                  <div className="text-xs text-muted-foreground mb-2">{req.description}</div>
                  
                  {uploadProgress[req.name] > 0 && uploadProgress[req.name] < 100 && (
                    <Progress value={uploadProgress[req.name]} className="h-2 mb-2" />
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleFileUpload(req.name)}
                    disabled={uploadProgress[req.name] === 100}
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    {uploadProgress[req.name] === 100 ? 'Uploaded' : 'Upload Clip'}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">File Requirements</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Video: MP4, MOV (max 100MB)</li>
                <li>• Photo: JPG, PNG (max 10MB)</li>
                <li>• Landscape orientation preferred</li>
                <li>• Good lighting essential</li>
              </ul>
            </div>
          </div>
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
