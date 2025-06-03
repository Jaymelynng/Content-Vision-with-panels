
import { Upload } from "lucide-react";

interface FileUploadZoneProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function FileUploadZone({ onFileChange, onFileDrop }: FileUploadZoneProps) {
  return (
    <div 
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onFileDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input 
        id="file-upload" 
        type="file" 
        accept="video/mp4,video/mov,video/avi" 
        multiple 
        className="hidden"
        onChange={onFileChange}
      />
      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
      <h3 className="font-medium mb-1">Click to upload or drag and drop</h3>
      <p className="text-sm text-muted-foreground">
        MP4, MOV or AVI (max 1GB per file)
      </p>
    </div>
  );
}
