
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface VideoPlayerProps {
  clips: Array<{
    id: string;
    name: string;
    duration: number;
    startTime: number;
    trimStart: number;
    trimEnd: number;
    file?: File;
    url?: string;
  }>;
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onEnded: () => void;
}

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(({
  clips,
  currentTime,
  isPlaying,
  volume,
  onTimeUpdate,
  onDurationChange,
  onEnded
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    },
    pause: () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
    seek: (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    }
  }));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onTimeUpdate(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      onDurationChange(video.duration);
    };

    const handleEnded = () => {
      onEnded();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, onDurationChange, onEnded]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Find the current clip that should be playing
  const getCurrentClip = () => {
    return clips.find(clip => 
      currentTime >= clip.startTime && 
      currentTime < clip.startTime + clip.duration
    );
  };

  const currentClip = getCurrentClip();

  return (
    <div className="relative aspect-video bg-slate-900 rounded overflow-hidden">
      {currentClip ? (
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={currentClip.url}
          muted={false}
          playsInline
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-xl mb-2">No video loaded</div>
            <div className="text-sm text-gray-400">Add clips to the timeline to start editing</div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
