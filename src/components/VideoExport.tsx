
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, Save, Share } from 'lucide-react';
import { toast } from 'sonner';

interface VideoExportProps {
  onExport: (format: string, quality: string) => void;
  onSave: () => void;
}

export function VideoExport({ onExport, onSave }: VideoExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const handleExport = async (format: string, quality: string) => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast.success('Video exported successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    onExport(format, quality);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export & Share</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isExporting && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Exporting video...</span>
              <span>{exportProgress}%</span>
            </div>
            <Progress value={exportProgress} className="h-2" />
          </div>
        )}

        <div className="grid gap-2">
          <Button 
            onClick={() => handleExport('mp4', 'high')}
            disabled={isExporting}
            className="justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            Export HD (1080p)
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => handleExport('mp4', 'medium')}
            disabled={isExporting}
            className="justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Standard (720p)
          </Button>
          
          <Button 
            variant="outline"
            onClick={onSave}
            className="justify-start"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Quick Share</h4>
          <Button variant="outline" size="sm" className="w-full">
            <Share className="h-4 w-4 mr-2" />
            Generate Preview Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
