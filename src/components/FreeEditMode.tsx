
import { Button } from "@/components/ui/button";
import { EditorVideoSection } from "@/components/EditorVideoSection";
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

interface FreeEditModeProps {
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
  onClipAdd: (file: File) => void;
  onExport: (format: string, quality: string) => void;
  onSave: () => void;
}

export function FreeEditMode({
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
  onAIEditingChange,
  onClipAdd,
  onExport,
  onSave
}: FreeEditModeProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
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
          aiSwitchId="ai-editing-free"
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
      </div>

      <div className="space-y-6">
        <ClipLibrary onClipAdd={onClipAdd} />
        <VideoExport onExport={onExport} onSave={onSave} />
      </div>
    </div>
  );
}
