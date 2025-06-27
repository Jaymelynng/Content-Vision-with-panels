
import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";

interface FormatSelectorProps {
  selectedFormat: 'photo' | 'video';
  onFormatChange: (format: 'photo' | 'video') => void;
}

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  return (
    <div className="w-64 border-r pr-4">
      <h3 className="font-semibold mb-4">Content Format</h3>
      <div className="space-y-2">
        <Button
          variant={selectedFormat === 'photo' ? 'default' : 'outline'}
          className="w-full justify-start"
          onClick={() => onFormatChange('photo')}
        >
          <Camera className="w-4 h-4 mr-2" />
          Photo Post
        </Button>
        <Button
          variant={selectedFormat === 'video' ? 'default' : 'outline'}
          className="w-full justify-start"
          onClick={() => onFormatChange('video')}
        >
          <Video className="w-4 h-4 mr-2" />
          Video Reel
        </Button>
      </div>
    </div>
  );
}
