
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export function FileList({ files, onRemoveFile }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <h4 className="font-medium mb-3">Files to upload ({files.length})</h4>
      <div className="space-y-3 max-h-64 overflow-auto pr-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center mr-3">
                <video className="w-full h-full object-cover rounded" />
              </div>
              <div>
                <p className="font-medium text-sm truncate max-w-[250px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => onRemoveFile(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
