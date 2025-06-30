
import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";
import { useAppSettings } from "@/hooks/useAppSettings";

interface FormatSelectorProps {
  selectedFormat: 'photo' | 'video';
  onFormatChange: (format: 'photo' | 'video') => void;
}

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const { data: appSettings } = useAppSettings();
  
  // Get available formats from database or use defaults
  const availableFormats = [
    { key: 'photo', label: 'Photo Post', icon: Camera },
    { key: 'video', label: 'Video Reel', icon: Video }
  ];

  return (
    <div className="w-64 border-r pr-4">
      <h3 className="font-semibold mb-4">Content Format</h3>
      <div className="space-y-2">
        {availableFormats.map((format) => {
          const IconComponent = format.icon;
          return (
            <Button
              key={format.key}
              variant={selectedFormat === format.key ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => onFormatChange(format.key as 'photo' | 'video')}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {format.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
