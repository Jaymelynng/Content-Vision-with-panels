
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { VideoPlayer, VideoPlayerRef } from "@/components/VideoPlayer";
import { VideoTimeline } from "@/components/VideoTimeline";

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

interface EditorVideoSectionProps {
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
  aiSwitchId: string;
}

export function EditorVideoSection({
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
  aiSwitchId
}: EditorVideoSectionProps) {
  const videoPlayerRef = useRef<VideoPlayerRef>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoPlayerRef.current?.pause();
    } else {
      videoPlayerRef.current?.play();
    }
    onPlayPause();
  };

  const handleSeek = (time: number) => {
    onSeek(time);
    videoPlayerRef.current?.seek(time);
  };

  return (
    <Card className="overflow-hidden">
      <VideoPlayer
        ref={videoPlayerRef}
        clips={clips}
        currentTime={currentTime}
        isPlaying={isPlaying}
        volume={volume}
        onTimeUpdate={onTimeUpdate}
        onDurationChange={onDurationChange}
        onEnded={() => onPlayPause()}
      />
      
      <CardContent className="pt-6">
        <VideoTimeline
          clips={clips}
          onClipsChange={onClipsChange}
          currentTime={currentTime}
          totalDuration={totalDuration}
          onSeek={handleSeek}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          volume={volume}
          onVolumeChange={onVolumeChange}
        />

        <div className="mt-4 flex items-center space-x-2">
          <Switch id={aiSwitchId} checked={aiEditing} onCheckedChange={onAIEditingChange} />
          <Label htmlFor={aiSwitchId} className="font-medium">AI-assisted editing</Label>
        </div>
      </CardContent>
    </Card>
  );
}
