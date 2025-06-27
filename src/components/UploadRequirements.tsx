
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Check, Clock } from "lucide-react";

interface Requirement {
  name: string;
  duration: string;
  type: string;
  completed: boolean;
  description: string;
}

interface UploadRequirementsProps {
  requirements: Requirement[];
  uploadProgress: { [key: string]: number };
  onFileUpload: (requirementName: string) => void;
}

export function UploadRequirements({ requirements, uploadProgress, onFileUpload }: UploadRequirementsProps) {
  return (
    <div className="w-80 border-l pl-4">
      <h3 className="font-semibold mb-4">Upload Requirements</h3>
      <div className="space-y-3">
        {requirements.map((req, index) => (
          <div key={index} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{req.name}</span>
              {uploadProgress[req.name] === 100 ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Clock className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className="text-xs text-muted-foreground mb-1">{req.duration}</div>
            <div className="text-xs text-muted-foreground mb-2">{req.description}</div>
            
            {uploadProgress[req.name] > 0 && uploadProgress[req.name] < 100 && (
              <Progress value={uploadProgress[req.name]} className="h-2 mb-2" />
            )}
            
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => onFileUpload(req.name)}
              disabled={uploadProgress[req.name] === 100}
            >
              <Upload className="w-3 h-3 mr-1" />
              {uploadProgress[req.name] === 100 ? 'Uploaded' : 'Upload Clip'}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">File Requirements</h4>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>• Video: MP4, MOV (max 100MB)</li>
          <li>• Photo: JPG, PNG (max 10MB)</li>
          <li>• Landscape orientation preferred</li>
          <li>• Good lighting essential</li>
        </ul>
      </div>
    </div>
  );
}
