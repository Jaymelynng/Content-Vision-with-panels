
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Check, Clock } from "lucide-react";
import { useAppSettings } from "@/hooks/useAppSettings";

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
  uploadedFiles: { [key: string]: File };
  onFileUpload: (requirementName: string) => void;
}

export function UploadRequirements({ requirements, uploadProgress, uploadedFiles, onFileUpload }: UploadRequirementsProps) {
  const { data: appSettings } = useAppSettings();
  const fileRequirements = appSettings?.file_requirements || {};
  
  return (
    <div className="w-80 flex flex-col h-full">
      <h3 className="font-semibold mb-4 flex-shrink-0 text-gray-800">Upload Requirements</h3>
      
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {requirements.map((req, index) => {
            const uploadedFile = uploadedFiles[req.name];
            
            return (
              <div 
                key={index} 
                className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-md ${
                  uploadProgress[req.name] === 100 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm' 
                    : uploadProgress[req.name] > 0
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm text-gray-800">{req.name}</span>
                  <div className="flex items-center gap-2">
                    {uploadProgress[req.name] === 100 ? (
                      <div className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-500 animate-scale-in" />
                        <span className="text-xs text-green-600 font-medium">Uploaded</span>
                      </div>
                    ) : uploadProgress[req.name] > 0 ? (
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-blue-600 font-medium">{uploadProgress[req.name]}%</span>
                      </div>
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mb-2 bg-gray-50 px-2 py-1 rounded">
                  📹 {req.duration}
                </div>
                <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                  {req.description}
                </div>
                
                {/* Thumbnail Preview */}
                {uploadedFile && uploadProgress[req.name] === 100 && (
                  <div className="mb-3 p-2 bg-gray-50 rounded border">
                    <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                      {uploadedFile.type.startsWith('video/') ? (
                        <video 
                          src={URL.createObjectURL(uploadedFile)} 
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          controls={false}
                        />
                      ) : (
                        <img 
                          src={URL.createObjectURL(uploadedFile)} 
                          alt={req.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="mt-1 text-xs text-gray-600 text-center">
                      {uploadedFile.name}
                    </div>
                  </div>
                )}
                
                {uploadProgress[req.name] > 0 && uploadProgress[req.name] < 100 && (
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${uploadProgress[req.name]}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <Button
                  size="sm"
                  variant={uploadProgress[req.name] === 100 ? "secondary" : "outline"}
                  className={`w-full transition-all duration-300 ${
                    uploadProgress[req.name] === 100 
                      ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                      : 'hover:bg-blue-50 hover:border-blue-300 hover:scale-105'
                  }`}
                  onClick={() => onFileUpload(req.name)}
                  disabled={uploadProgress[req.name] === 100}
                >
                  <Upload className={`w-3 h-3 mr-2 ${uploadProgress[req.name] === 100 ? 'hidden' : ''}`} />
                  {uploadProgress[req.name] === 100 ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Uploaded Successfully
                    </span>
                  ) : (
                    'Upload Clip'
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 flex-shrink-0">
        <h4 className="font-medium text-sm mb-3 text-gray-800 flex items-center gap-2">
          📋 File Requirements
        </h4>
        <ul className="text-xs space-y-2 text-gray-700">
          {fileRequirements.video && (
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
              <span><strong>Video:</strong> {fileRequirements.video.formats?.join(', ')} (max {fileRequirements.video.maxSize})</span>
            </li>
          )}
          {fileRequirements.photo && (
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
              <span><strong>Photo:</strong> {fileRequirements.photo.formats?.join(', ')} (max {fileRequirements.photo.maxSize})</span>
            </li>
          )}
          {fileRequirements.general?.map((tip: string, index: number) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
