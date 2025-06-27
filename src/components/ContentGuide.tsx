
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Video, Upload, Check, Clock } from "lucide-react";
import { useState } from "react";

interface ContentGuideProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
}

export function ContentGuide({ open, onClose, contentId }: ContentGuideProps) {
  const [selectedFormat, setSelectedFormat] = useState<'photo' | 'video'>('photo');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  
  // Mock data for the guide - in real app this would come from props or API
  const guideData = {
    1: {
      title: "Handstand = Homework Focus",
      description: "Educational content connecting gymnastics skills to academic success",
      setup: {
        photo: [
          "Find a clean wall space with good natural lighting",
          "Set up your phone camera at eye level, 3-4 feet away",
          "Have gymnastics equipment visible in background",
          "Prepare your homework materials nearby"
        ],
        video: [
          "Use tripod or stable surface for steady recording",
          "Ensure good audio quality - minimize background noise",
          "Plan your talking points about handstand-homework connection",
          "Have demonstration space cleared and safe"
        ]
      },
      filming: {
        photo: [
          "Take multiple angles of the handstand position",
          "Capture before/during/after homework session",
          "Use burst mode for action shots",
          "Include close-ups of focused expressions"
        ],
        video: [
          "Record in landscape orientation",
          "Keep clips between 15-30 seconds each",
          "Demonstrate the handstand technique clearly",
          "Show the connection to homework focus"
        ]
      },
      effects: {
        photo: [
          "Add text overlay with study tips",
          "Use split-screen for before/after",
          "Apply motivational quote graphics",
          "Include progress tracking elements"
        ],
        video: [
          "Add motion graphics for skill progression",
          "Include timer or countdown elements",
          "Use transitions between handstand and homework",
          "Add background music that's motivational"
        ]
      },
      requirements: [
        { name: "Opening Hook", duration: "3-5 seconds", type: "intro", completed: false },
        { name: "Handstand Demo", duration: "10-15 seconds", type: "main", completed: false },
        { name: "Homework Connection", duration: "10-20 seconds", type: "explanation", completed: false },
        { name: "Call to Action", duration: "5-8 seconds", type: "outro", completed: false }
      ]
    }
    // Add more content data as needed
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
        // Mark as completed after upload
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
                Photo Version
              </Button>
              <Button
                variant={selectedFormat === 'video' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedFormat('video')}
              >
                <Video className="w-4 h-4 mr-2" />
                Video Version
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 p-3 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Quick Stats</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Difficulty: Easy</div>
                <div>Est. Time: 30-45 min</div>
                <div>Equipment: Basic</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="filming">Filming Tips</TabsTrigger>
                <TabsTrigger value="effects">Special Effects</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Setup Instructions
                      <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                        {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentGuide.setup[selectedFormat].map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{step}</span>
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
                      Filming Tips
                      <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                        {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentGuide.filming[selectedFormat].map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="effects" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Special Effects & Editing
                      <Badge variant={selectedFormat === 'photo' ? 'default' : 'secondary'}>
                        {selectedFormat === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentGuide.effects[selectedFormat].map((effect, index) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Template Requirements */}
          <div className="w-80 border-l pl-4">
            <h3 className="font-semibold mb-4">Template Requirements</h3>
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
                  <div className="text-xs text-muted-foreground mb-2">{req.duration}</div>
                  
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
              <h4 className="font-medium text-sm mb-2">Upload Tips</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Use landscape orientation</li>
                <li>• Good lighting is crucial</li>
                <li>• Keep clips under 30 seconds</li>
                <li>• Stable footage works best</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              Save for Later
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
