
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, Video, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FormatVersion {
  key: string;
  label: string;
  icon: any;
  required: boolean;
  uploadProgress: { completed: number; total: number };
}

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  formatVersions: FormatVersion[];
  overallProgress: number;
}

export function FormatSelector({ 
  selectedFormat, 
  onFormatChange, 
  formatVersions,
  overallProgress 
}: FormatSelectorProps) {
  
  const getProgressIcon = (progress: { completed: number; total: number }) => {
    if (progress.completed === progress.total && progress.total > 0) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    return <Clock className="w-4 h-4 text-orange-600" />;
  };

  const getProgressText = (progress: { completed: number; total: number }) => {
    return `${progress.completed}/${progress.total} uploaded`;
  };

  return (
    <div className="w-80 border-r pr-6">
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Assignment Progress</h3>
        <div className="space-y-3">
          {formatVersions.map((version) => (
            <div key={version.key} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <version.icon className="w-4 h-4" />
                <span>{version.label}:</span>
                {version.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
              </div>
              <div className="flex items-center gap-2">
                {getProgressIcon(version.uploadProgress)}
                <span className="text-xs text-muted-foreground">
                  {getProgressText(version.uploadProgress)}
                </span>
              </div>
            </div>
          ))}
          
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Format Versions</h3>
        <Tabs value={selectedFormat} onValueChange={onFormatChange} className="w-full">
          <TabsList className="grid w-full grid-cols-1 gap-1 h-auto p-1">
            {formatVersions.map((version) => {
              const IconComponent = version.icon;
              const isComplete = version.uploadProgress.completed === version.uploadProgress.total && version.uploadProgress.total > 0;
              
              return (
                <TabsTrigger 
                  key={version.key} 
                  value={version.key}
                  className="flex items-center justify-between w-full p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{version.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {version.required && (
                      <Badge variant={isComplete ? "default" : "destructive"} className="text-xs">
                        {version.required ? "Required" : "Optional"}
                      </Badge>
                    )}
                    {isComplete && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
