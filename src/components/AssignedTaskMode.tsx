
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import { EditorVideoSection } from "@/components/EditorVideoSection";
import { TemplateRequirements } from "@/components/TemplateRequirements";
import { AISuggestions } from "@/components/AISuggestions";

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

interface AssignedTaskModeProps {
  clips: Clip[];
  onClipsChange: (clips: Clip[]) => void;
  currentTime: number;
  totalDuration: number;
  isPlaying: boolean;
  volume: number;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onSeek: (time: number) => void;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  aiEditing: boolean;
  onAIEditingChange: (enabled: boolean) => void;
}

export function AssignedTaskMode({
  clips,
  onClipsChange,
  currentTime,
  totalDuration,
  isPlaying,
  volume,
  onTimeUpdate,
  onDurationChange,
  onSeek,
  onPlayPause,
  onVolumeChange,
  aiEditing,
  onAIEditingChange
}: AssignedTaskModeProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Fullscreen Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <Maximize2 className="w-4 h-4 mr-2" />
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </div>

      {/* Three Panel Layout */}
      <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-12 h-screen p-6' : 'lg:grid-cols-12'}`}>
        {/* Left Panel - Template Requirements */}
        <div className={`${isFullscreen ? 'col-span-2' : 'lg:col-span-2'} space-y-6`}>
          <TemplateRequirements />
        </div>

        {/* Center Panel - Video Editor */}
        <div className={`${isFullscreen ? 'col-span-8' : 'lg:col-span-8'}`}>
          <EditorVideoSection
            clips={clips}
            onClipsChange={onClipsChange}
            currentTime={currentTime}
            totalDuration={totalDuration}
            isPlaying={isPlaying}
            volume={volume}
            onTimeUpdate={onTimeUpdate}
            onDurationChange={onDurationChange}
            onSeek={onSeek}
            onPlayPause={onPlayPause}
            onVolumeChange={onVolumeChange}
            aiEditing={aiEditing}
            onAIEditingChange={onAIEditingChange}
            aiSwitchId="ai-editing"
          />
        </div>

        {/* Right Panel - AI Suggestions */}
        <div className={`${isFullscreen ? 'col-span-2' : 'lg:col-span-2'} space-y-6`}>
          <AISuggestions />
        </div>
      </div>
    </div>
  );
}
