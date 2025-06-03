
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, Upload, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ClipRequirements from "@/components/ClipRequirements";

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
                <div className="text-center py-8">
                  <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-2">Upload Complete!</h3>
                  <p className="text-muted-foreground mb-6">
                    {files.length} file{files.length !== 1 ? 's' : ''} uploaded successfully
                  </p>
                  <div className="space-y-3">
                    <Button onClick={handleContinueToEditor} size="lg" className="w-full">
                      Continue to Editor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUploadComplete(false);
                        setFiles([]);
                      }}
                      className="w-full"
                    >
                      Upload More Files
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept="video/mp4,video/mov,video/avi" 
                      multiple 
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-1">Click to upload or drag and drop</h3>
                    <p className="text-sm text-muted-foreground">
                      MP4, MOV or AVI (max 1GB per file)
                    </p>
                  </div>

                  {files.length > 0 && (
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
                              onClick={() => handleRemoveFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploading ? (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Uploading...</span>
                        <span className="text-sm">{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  ) : (
                    <Button className="mt-6 w-full" onClick={handleUpload} disabled={files.length === 0}>
                      Upload {files.length > 0 ? `${files.length} Files` : ''}
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {!uploadComplete && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Use landscape orientation (horizontal) for best results</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Good lighting improves video quality dramatically</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Stable shots (tripod or steady hand) look more professional</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Record extra footage beyond what you think you'll need</span>
                  </li>
                  <li className="flex gap-3">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Avoid background noise when recording audio</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Template Requirements</CardTitle>
              <CardDescription>
                {templateId !== "none" ? 
                  "These clips are required for your selected template." : 
                  "Select a template to see specific requirements."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {templateId !== "none" ? (
                <ClipRequirements templateId={parseInt(templateId)} />
              ) : (
                <div className="text-center py-10">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-1">No Template Selected</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Choose a template from the Templates page to see specific requirements for your video.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/templates">Browse Templates</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentUpload;
