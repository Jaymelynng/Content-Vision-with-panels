
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

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

interface VideoTimelineProps {
  clips: Clip[];
  onClipsChange: (clips: Clip[]) => void;
  currentTime: number;
  totalDuration: number;
  onSeek: (time: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VideoTimeline({ 
  clips, 
  onClipsChange, 
  currentTime, 
  totalDuration, 
  onSeek, 
  isPlaying, 
  onPlayPause,
  volume,
  onVolumeChange 
}: VideoTimelineProps) {
  const [draggedClip, setDraggedClip] = useState<string | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleClipDragStart = (e: React.DragEvent, clipId: string) => {
    setDraggedClip(clipId);
    setDragStartX(e.clientX);
  };

  const handleClipDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleClipDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedClip || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newStartTime = (x / rect.width) * totalDuration;

    const updatedClips = clips.map(clip => 
      clip.id === draggedClip 
        ? { ...clip, startTime: Math.max(0, newStartTime) }
        : clip
    );

    onClipsChange(updatedClips);
    setDraggedClip(null);
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickTime = (x / rect.width) * totalDuration;
    onSeek(clickTime);
  };

  return (
    <div className="space-y-4">
      {/* Playback Controls */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => onSeek(Math.max(0, currentTime - 10))}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onPlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onSeek(Math.min(totalDuration, currentTime + 10))}>
          <SkipForward className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2 ml-4">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={[volume]}
            onValueChange={(value) => onVolumeChange(value[0])}
            max={100}
            step={1}
            className="w-20"
          />
        </div>
        
        <span className="text-sm text-muted-foreground ml-4">
          {Math.floor(currentTime)}s / {Math.floor(totalDuration)}s
        </span>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        <div className="text-sm font-medium">Timeline</div>
        <div 
          ref={timelineRef}
          className="relative h-20 bg-slate-100 rounded border cursor-pointer"
          onClick={handleTimelineClick}
          onDragOver={handleClipDragOver}
          onDrop={handleClipDrop}
        >
          {/* Timeline ruler */}
          <div className="absolute top-0 left-0 right-0 h-4 border-b flex">
            {Array.from({ length: Math.ceil(totalDuration / 10) }, (_, i) => (
              <div key={i} className="flex-1 border-r text-xs px-1">
                {i * 10}s
              </div>
            ))}
          </div>

          {/* Clips */}
          {clips.map((clip) => {
            const left = (clip.startTime / totalDuration) * 100;
            const width = (clip.duration / totalDuration) * 100;
            
            return (
              <div
                key={clip.id}
                className="absolute top-4 h-16 bg-blue-500 rounded cursor-move flex items-center justify-center text-white text-xs font-medium border-2 border-blue-600 hover:bg-blue-600 transition-colors"
                style={{ left: `${left}%`, width: `${width}%` }}
                draggable
                onDragStart={(e) => handleClipDragStart(e, clip.id)}
              >
                {clip.name}
              </div>
            );
          })}

          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{ left: `${(currentTime / totalDuration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
