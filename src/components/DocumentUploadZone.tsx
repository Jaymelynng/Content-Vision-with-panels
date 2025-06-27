
import { Upload, FileText, File } from "lucide-react";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";

interface DocumentUploadZoneProps {
  onUploadComplete?: () => void;
}

export function DocumentUploadZone({ onUploadComplete }: DocumentUploadZoneProps) {
  const { mutate: uploadDocument, isPending } = useDocumentUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const uploadFile = (file: File) => {
    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/markdown',
      'text/html',
      'application/rtf',
    ];

    const fileExtension = file.name.toLowerCase().split('.').pop();
    const allowedExtensions = ['pdf', 'docx', 'doc', 'txt', 'md', 'html', 'rtf'];

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
      alert('Please upload a valid document file (PDF, DOCX, DOC, TXT, MD, HTML, RTF)');
      return;
    }

    // Check file size (100MB limit for documents)
    if (file.size > 100 * 1024 * 1024) {
      alert('File size must be less than 100MB');
      return;
    }

    uploadDocument(file, {
      onSuccess: () => {
        onUploadComplete?.();
      }
    });
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isPending 
          ? 'border-blue-300 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
      onClick={() => !isPending && document.getElementById('document-upload')?.click()}
    >
      <input 
        id="document-upload" 
        type="file" 
        accept=".pdf,.docx,.doc,.txt,.md,.html,.rtf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain,text/markdown,text/html,application/rtf"
        className="hidden"
        onChange={handleFileChange}
        disabled={isPending}
      />
      
      {isPending ? (
        <div className="animate-spin">
          <Upload className="h-10 w-10 text-blue-500 mx-auto mb-4" />
        </div>
      ) : (
        <FileText className="h-10 w-10 text-gray-400 mx-auto mb-4" />
      )}
      
      <h3 className="font-medium mb-1">
        {isPending ? 'Uploading...' : 'Click to upload or drag and drop your brain dump'}
      </h3>
      <p className="text-sm text-gray-500">
        PDF, DOCX, DOC, TXT, MD, HTML, RTF (max 100MB)
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Upload massive documents - I'll break them down and extract content ideas!
      </p>
    </div>
  );
}
