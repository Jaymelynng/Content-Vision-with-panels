
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { EditorHeader } from "@/components/EditorHeader";
import { AssignedTaskMode } from "@/components/AssignedTaskMode";
import { FreeEditMode } from "@/components/FreeEditMode";

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
  const [clips, setClips] = useState<Clip[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

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
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
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
      <EditorHeader 
        onSave={handleSave}
        onExport={() => handleExport('mp4', 'high')}
      />

      <Tabs defaultValue="assigned" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="assigned">Assigned Task Mode</TabsTrigger>
          <TabsTrigger value="free">Free Edit Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="mt-0 space-y-6">
          <AssignedTaskMode
            clips={clips}
            onClipsChange={setClips}
            currentTime={currentTime}
            totalDuration={totalDuration}
            isPlaying={isPlaying}
            volume={volume}
            onTimeUpdate={setCurrentTime}
            onDurationChange={setTotalDuration}
            onSeek={handleSeek}
            onPlayPause={handlePlayPause}
            onVolumeChange={setVolume}
            aiEditing={aiEditing}
            onAIEditingChange={setAiEditing}
          />
        </TabsContent>

        <TabsContent value="free" className="mt-0 space-y-6">
          <FreeEditMode
            clips={clips}
            onClipsChange={setClips}
            currentTime={currentTime}
            totalDuration={totalDuration}
            isPlaying={isPlaying}
            volume={volume}
            onTimeUpdate={setCurrentTime}
            onDurationChange={setTotalDuration}
            onSeek={handleSeek}
            onPlayPause={handlePlayPause}
            onVolumeChange={setVolume}
            aiEditing={aiEditing}
            onAIEditingChange={setAiEditing}
            onClipAdd={handleClipAdd}
            onExport={handleExport}
            onSave={handleSave}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Editor;
