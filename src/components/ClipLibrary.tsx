
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ClipLibraryProps {
  onClipAdd: (file: File) => void;
}

export function ClipLibrary({ onClipAdd }: ClipLibraryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        onClipAdd(file);
        toast.success(`Added ${file.name} to library`);
      } else {
        toast.error('Please select a video file');
      }
    }
  };

  const mockClips = [
    { id: '1', name: 'Gym entrance.mp4', duration: 15, size: '24MB' },
    { id: '2', name: 'Kids practice.mp4', duration: 42, size: '68MB' },
    { id: '3', name: 'Coach interview.mp4', duration: 70, size: '95MB' },
    { id: '4', name: 'Equipment demo.mp4', duration: 38, size: '52MB' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Clip Library
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {mockClips.map((clip) => (
          <div 
            key={clip.id}
            className="p-3 border rounded-md flex items-center justify-between hover:bg-slate-50 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-9 bg-slate-200 rounded flex-shrink-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-400 rounded"></div>
              </div>
              <div>
                <p className="font-medium text-sm">{clip.name}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(clip.duration / 60)}:{(clip.duration % 60).toString().padStart(2, '0')} • {clip.size}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
