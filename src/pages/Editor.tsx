import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Save, Scissors } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { VideoPlayer, VideoPlayerRef } from "@/components/VideoPlayer";
import { VideoTimeline } from "@/components/VideoTimeline";
import { ClipLibrary } from "@/components/ClipLibrary";
import { VideoExport } from "@/components/VideoExport";

interface Clip {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  trimStart: number;
  trimEnd: number;
  file?: File;
  url?: string;
}

const Editor = () => {
  const [aiEditing, setAiEditing] = useState(true);
  const [currentTab, setCurrentTab] = useState("assigned");
  const [clips, setClips] = useState<Clip[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  
  const videoPlayerRef = useRef<VideoPlayerRef>(null);

  const handleClipAdd = (file: File) => {
    const url = URL.createObjectURL(file);
    const newClip: Clip = {
      id: Date.now().toString(),
      name: file.name,
      duration: 10, // This would be determined from the actual video file
      startTime: clips.reduce((acc, clip) => acc + clip.duration, 0),
      trimStart: 0,
      trimEnd: 10,
      file,
      url
    };
    
    setClips(prev => [...prev, newClip]);
    setTotalDuration(prev => prev + newClip.duration);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoPlayerRef.current?.pause();
    } else {
      videoPlayerRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    videoPlayerRef.current?.seek(time);
  };

  const handleExport = (format: string, quality: string) => {
    console.log(`Exporting video in ${format} format with ${quality} quality`);
    // This would trigger actual video processing
  };

  const handleSave = () => {
    toast.success("Project saved as draft!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Editor</h1>
          <p className="text-muted-foreground">
            Create and edit your video content with AI assistance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleExport('mp4', 'high')}>
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
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <VideoPlayer
                  ref={videoPlayerRef}
                  clips={clips}
                  currentTime={currentTime}
                  isPlaying={isPlaying}
                  volume={volume}
                  onTimeUpdate={setCurrentTime}
                  onDurationChange={setTotalDuration}
                  onEnded={() => setIsPlaying(false)}
                />
                
                <CardContent className="pt-6">
                  <VideoTimeline
                    clips={clips}
                    onClipsChange={setClips}
                    currentTime={currentTime}
                    totalDuration={totalDuration}
                    onSeek={handleSeek}
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    volume={volume}
                    onVolumeChange={setVolume}
                  />

                  <div className="mt-4 flex items-center space-x-2">
                    <Switch id="ai-editing" checked={aiEditing} onCheckedChange={setAiEditing} />
                    <Label htmlFor="ai-editing" className="font-medium">AI-assisted editing</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
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
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <VideoPlayer
                  ref={videoPlayerRef}
                  clips={clips}
                  currentTime={currentTime}
                  isPlaying={isPlaying}
                  volume={volume}
                  onTimeUpdate={setCurrentTime}
                  onDurationChange={setTotalDuration}
                  onEnded={() => setIsPlaying(false)}
                />
                
                <CardContent className="pt-6">
                  <VideoTimeline
                    clips={clips}
                    onClipsChange={setClips}
                    currentTime={currentTime}
                    totalDuration={totalDuration}
                    onSeek={handleSeek}
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    volume={volume}
                    onVolumeChange={setVolume}
                  />

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

            <div className="space-y-6">
              <ClipLibrary onClipAdd={handleClipAdd} />
              <VideoExport onExport={handleExport} onSave={handleSave} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
