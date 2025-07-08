
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Video, Image, RotateCcw, MessageCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FormatSelectorProps {
  selectedFormats: string[];
  onFormatChange: (formats: string[]) => void;
}

export function FormatSelector({ selectedFormats, onFormatChange }: FormatSelectorProps) {
  
  // Complete format options as requested
  const availableFormats = [
    { key: 'static-photo', label: 'Static Photo', sublabel: 'Single image', icon: Camera },
    { key: 'carousel', label: 'Carousel Images', sublabel: 'Multi-photo post, 2-10 images', icon: Image },
    { key: 'animated-image', label: 'Animated Image', sublabel: 'GIF/Motion photo', icon: RotateCcw },
    { key: 'video-reel', label: 'Video/Reel', sublabel: 'Vertical format', icon: Video },
    { key: 'story', label: 'Story', sublabel: 'Short-form content', icon: MessageCircle }
  ];

  const handleFormatToggle = (formatKey: string) => {
    const newFormats = selectedFormats.includes(formatKey)
      ? selectedFormats.filter(f => f !== formatKey)
      : [...selectedFormats, formatKey];
    onFormatChange(newFormats);
  };

  return (
    <div className="w-64 border-r pr-4">
      <h3 className="font-semibold mb-4">Content Format</h3>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground mb-3">Select Required Formats:</p>
        {availableFormats.map((format) => {
          const IconComponent = format.icon;
          const isSelected = selectedFormats.includes(format.key);
          
          return (
            <div key={format.key} className="flex items-start space-x-3">
              <Checkbox
                id={format.key}
                checked={isSelected}
                onCheckedChange={() => handleFormatToggle(format.key)}
                className="mt-1"
              />
              <div className="flex-1 cursor-pointer" onClick={() => handleFormatToggle(format.key)}>
                <Label 
                  htmlFor={format.key} 
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <IconComponent className="w-4 h-4" />
                  <div>
                    <div className="font-medium">{format.label}</div>
                    <div className="text-xs text-muted-foreground">{format.sublabel}</div>
                  </div>
                </Label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
