import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  className?: string;
  isUploading?: boolean;
  requirement?: {
    name: string;
    description: string;
    type: string;
  };
}

export function FileUploadDropzone({ 
  onFileSelect, 
  accept = "video/*,image/*", 
  className,
  isUploading = false,
  requirement
}: FileUploadDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, curr) => ({ ...acc, [curr.trim()]: [] }), {}),
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300",
        isDragActive 
          ? "border-blue-500 bg-blue-50 scale-105" 
          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
        isUploading && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-3">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
          isDragActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
        )}>
          <Upload className="w-6 h-6" />
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">
            {isDragActive ? "Drop your file here" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500">
            {accept.includes('video') && accept.includes('image') 
              ? "Video or Image files supported"
              : accept.includes('video') 
              ? "Video files supported"
              : "Image files supported"
            }
          </p>
        </div>
        
        {requirement && (
          <div className="text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
            {requirement.type} • {requirement.name}
          </div>
        )}
        
        {isUploading && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Uploading...
          </div>
        )}
      </div>
    </div>
  );
}