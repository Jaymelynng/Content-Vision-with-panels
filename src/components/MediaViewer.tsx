import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  Sparkles, 
  Maximize, 
  RotateCcw,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface MediaViewerProps {
  open: boolean;
  onClose: () => void;
  file: File;
  fileName: string;
}

export function MediaViewer({ open, onClose, file, fileName }: MediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [enhancementQuality, setEnhancementQuality] = useState("4k");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = file.type.startsWith('video/');
  const fileUrl = URL.createObjectURL(file);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleEnhancement = async () => {
    setIsEnhancing(true);
    toast.loading("Enhancing your content...", { id: "enhancement" });

    try {
      // Convert file to base64 or upload to temp storage
      const formData = new FormData();
      formData.append('file', file);
      formData.append('quality', enhancementQuality);
      formData.append('type', isVideo ? 'video' : 'image');

      // Call enhancement API
      const response = await fetch('/api/enhance-media', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Enhancement failed');
      }

      const result = await response.json();
      setEnhancedUrl(result.enhancedUrl);
      
      toast.success(`Content enhanced to ${enhancementQuality.toUpperCase()}!`, { id: "enhancement" });
    } catch (error) {
      toast.error("Enhancement failed. Please try again.", { id: "enhancement" });
      console.error('Enhancement error:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  const getFileInfo = () => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const format = file.type.split('/')[1].toUpperCase();
    return `${format} • ${sizeInMB} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{fileName}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{getFileInfo()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {isVideo ? 'Video' : 'Image'}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* Media Display */}
        <div className="relative bg-black flex items-center justify-center min-h-[400px] mx-6">
          {isVideo ? (
            <div className="relative w-full">
              <video
                ref={videoRef}
                src={enhancedUrl || fileUrl}
                className="w-full h-auto max-h-[60vh] object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted={isMuted}
              />
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-50 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={togglePlayPause}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMute}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {enhancedUrl ? `Enhanced ${enhancementQuality.toUpperCase()}` : 'Original Quality'}
                </Badge>
              </div>
            </div>
          ) : (
            <img
              src={enhancedUrl || fileUrl}
              alt={fileName}
              className="max-w-full max-h-[60vh] object-contain"
            />
          )}
        </div>

        {/* Enhancement Controls */}
        <div className="p-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              AI Enhancement Tools
            </h3>
            {enhancedUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEnhancedUrl(null);
                  toast.info("Reverted to original quality");
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Revert to Original
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quality Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Enhancement Quality</label>
              <Select value={enhancementQuality} onValueChange={setEnhancementQuality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2k">2K (1440p)</SelectItem>
                  <SelectItem value="4k">4K (2160p)</SelectItem>
                  <SelectItem value="8k">8K (4320p)</SelectItem>
                  <SelectItem value="ultra">Ultra HD+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Enhancement Button */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Enhance</label>
              <Button
                onClick={handleEnhancement}
                disabled={isEnhancing}
                className="w-full"
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enhance to {enhancementQuality.toUpperCase()}
                  </>
                )}
              </Button>
            </div>

            {/* Download Button */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Download</label>
              <Button
                variant="outline"
                onClick={() => downloadFile(
                  enhancedUrl || fileUrl, 
                  enhancedUrl ? `enhanced_${fileName}` : fileName
                )}
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download {enhancedUrl ? 'Enhanced' : 'Original'}
              </Button>
            </div>
          </div>

          {/* Enhancement Info */}
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-purple-800 mb-1">AI Enhancement Features:</p>
                <ul className="text-purple-700 space-y-1">
                  <li>• <strong>Super Resolution:</strong> Upscale to {enhancementQuality.toUpperCase()} with AI</li>
                  <li>• <strong>Noise Reduction:</strong> Remove grain and compression artifacts</li>
                  <li>• <strong>Detail Enhancement:</strong> Sharpen edges and improve clarity</li>
                  {isVideo && <li>• <strong>Frame Interpolation:</strong> Smooth motion and stabilization</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}