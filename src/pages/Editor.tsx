
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Check, PlayCircle, Plus, Save, Scissors } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Editor = () => {
  const [aiEditing, setAiEditing] = useState(true);
  const [currentTab, setCurrentTab] = useState("assigned");
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const handleExport = () => {
    toast.success("Your video has been queued for export!");
  };

  const togglePreview = () => {
    setPreviewPlaying(!previewPlaying);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Editor</h1>
          <p className="text-muted-foreground">
            Create and edit your video content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleExport}>
            Export Video
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="assigned" className="w-full" onValueChange={setCurrentTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="assigned">Assigned Task Mode</TabsTrigger>
          <TabsTrigger value="free">Free Edit Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="mt-0 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="bg-slate-900 aspect-video relative flex items-center justify-center">
                  {previewPlaying ? (
                    <video className="w-full h-full object-contain" controls autoPlay>
                      <source src="/placeholder.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-center">
                      <Button variant="outline" size="lg" className="bg-black/50 text-white border-white/20 hover:bg-black/70" onClick={togglePreview}>
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Preview Video
                      </Button>
                    </div>
                  )}
                </div>
                
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Timeline</h3>
                    <div className="timeline-track">
                      <div className="timeline-clip" style={{ left: '0%', width: '20%' }}>
                        Intro
                      </div>
                      <div className="timeline-clip" style={{ left: '22%', width: '30%' }}>
                        Main Content
                      </div>
                      <div className="timeline-clip" style={{ left: '54%', width: '20%' }}>
                        Feature
                      </div>
                      <div className="timeline-clip" style={{ left: '76%', width: '22%' }}>
                        Closing
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="transition-speed">Transition Speed</Label>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Slow</span>
                        <Slider id="transition-speed" defaultValue={[66]} max={100} step={1} className="flex-1" />
                        <span className="text-sm text-muted-foreground">Fast</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="music-volume">Music Volume</Label>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Low</span>
                        <Slider id="music-volume" defaultValue={[40]} max={100} step={1} className="flex-1" />
                        <span className="text-sm text-muted-foreground">High</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <Switch id="ai-editing" checked={aiEditing} onCheckedChange={setAiEditing} />
                    <Label htmlFor="ai-editing" className="font-medium">AI-assisted editing</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Template: Seasonal Event</CardTitle>
                  <CardDescription>Required clips for this template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Intro Shot</p>
                        <p className="text-xs text-muted-foreground">3-5 seconds</p>
                      </div>
                    </div>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Activity Overview</p>
                        <p className="text-xs text-muted-foreground">10-15 seconds</p>
                      </div>
                    </div>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Feature Highlight</p>
                        <p className="text-xs text-muted-foreground">5-10 seconds</p>
                      </div>
                    </div>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Closing Shot</p>
                        <p className="text-xs text-muted-foreground">3-5 seconds</p>
                      </div>
                    </div>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Suggestions</CardTitle>
                  <CardDescription>Recommendations from AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-500">
                      <Scissors className="h-4 w-4" />
                    </div>
                    <p className="text-sm">Trim 2 seconds from the beginning of clip 1 to improve pacing</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-500">
                      <Scissors className="h-4 w-4" />
                    </div>
                    <p className="text-sm">Add transition effect between clips 2 and 3 for smoother flow</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-500">
                      <Scissors className="h-4 w-4" />
                    </div>
                    <p className="text-sm">Increase brightness on clip 3 by 10% to match other clips</p>
                  </div>

                  <Button variant="outline" className="w-full mt-2">
                    <Check className="mr-2 h-4 w-4" />
                    Apply All Suggestions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="free" className="mt-0 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="bg-slate-900 aspect-video relative flex items-center justify-center">
                  {previewPlaying ? (
                    <video className="w-full h-full object-contain" controls autoPlay>
                      <source src="/placeholder.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-center">
                      <Button variant="outline" size="lg" className="bg-black/50 text-white border-white/20 hover:bg-black/70" onClick={togglePreview}>
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Preview Video
                      </Button>
                    </div>
                  )}
                </div>
                
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Timeline</h3>
                    <div className="timeline-track">
                      <div className="timeline-clip" style={{ left: '2%', width: '15%' }}>
                        Clip 1
                      </div>
                      <div className="timeline-clip" style={{ left: '20%', width: '25%' }}>
                        Clip 2
                      </div>
                      <div className="timeline-clip" style={{ left: '48%', width: '20%' }}>
                        Clip 3
                      </div>
                      <div className="timeline-clip" style={{ left: '70%', width: '15%' }}>
                        Clip 4
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <Button variant="outline">
                      Add Text
                    </Button>
                    <Button variant="outline">
                      Add Transition
                    </Button>
                    <Button variant="outline">
                      Add Music
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <Switch id="ai-editing-free" checked={aiEditing} onCheckedChange={setAiEditing} />
                    <Label htmlFor="ai-editing-free" className="font-medium">AI-assisted editing</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Media Library</CardTitle>
                  <CardDescription>Your uploaded video clips</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-md flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Gym entrance.mp4</p>
                        <p className="text-xs text-muted-foreground">0:15 • 24MB</p>
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Kids practice.mp4</p>
                        <p className="text-xs text-muted-foreground">0:42 • 68MB</p>
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Coach interview.mp4</p>
                        <p className="text-xs text-muted-foreground">1:10 • 95MB</p>
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">Equipment demo.mp4</p>
                        <p className="text-xs text-muted-foreground">0:38 • 52MB</p>
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload New Clip
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Requirements</CardTitle>
                  <CardDescription>Automatically applied to your videos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">CRR Brand Colors</p>
                      <p className="text-xs text-muted-foreground">Pink & Grey color scheme</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-slate-200 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">Logo Placement</p>
                      <p className="text-xs text-muted-foreground">Bottom right, 15% opacity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-200 flex-shrink-0 text-xs font-medium">A</div>
                    <div>
                      <p className="text-sm font-medium">Typography</p>
                      <p className="text-xs text-muted-foreground">Montserrat for headings, Open Sans for body</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
