
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FileUploadZone } from "@/components/FileUploadZone";
import { FileList } from "@/components/FileList";
import { UploadProgress } from "@/components/UploadProgress";
import { UploadSuccess } from "@/components/UploadSuccess";
import { UploadTips } from "@/components/UploadTips";
import { TemplateRequirementsCard } from "@/components/TemplateRequirementsCard";

const ContentUpload = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get("template") || "none";
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      // Reset the input to allow selecting the same file again
      e.target.value = '';
    }
  };
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("Please add at least one file before uploading.");
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Simulate completion after progress reaches 100%
        setTimeout(() => {
          setUploading(false);
          setUploadProgress(0);
          setUploadComplete(true);
          toast.success("Files uploaded successfully!");
        }, 500);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 300);
  };

  const handleContinueToEditor = () => {
    // Store uploaded files in session storage to pass to editor
    const uploadedFiles = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    
    sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    sessionStorage.setItem('selectedTemplate', templateId);
    
    navigate('/editor');
  };

  const handleUploadMore = () => {
    setUploadComplete(false);
    setFiles([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Content</h1>
        <p className="text-muted-foreground">
          Upload your raw video clips to start creating content.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Videos</CardTitle>
              <CardDescription>
                Drag and drop or select files to upload.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadComplete ? (
                <UploadSuccess
                  fileCount={files.length}
                  onContinueToEditor={handleContinueToEditor}
                  onUploadMore={handleUploadMore}
                />
              ) : (
                <>
                  <FileUploadZone
                    onFileChange={handleFileChange}
                    onFileDrop={handleFileDrop}
                  />

                  <FileList
                    files={files}
                    onRemoveFile={handleRemoveFile}
                  />

                  {uploading ? (
                    <UploadProgress progress={uploadProgress} />
                  ) : (
                    <Button className="mt-6 w-full" onClick={handleUpload} disabled={files.length === 0}>
                      Upload {files.length > 0 ? `${files.length} Files` : ''}
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {!uploadComplete && <UploadTips />}
        </div>

        <div>
          <TemplateRequirementsCard templateId={templateId} />
        </div>
      </div>
    </div>
  );
};

export default ContentUpload;
