
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
          aiSwitchId="ai-editing"
        />
      </div>

      <div className="space-y-6">
        <TemplateRequirements />
        <AISuggestions />
      </div>
    </div>
  );
}
