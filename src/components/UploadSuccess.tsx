
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

interface UploadSuccessProps {
  fileCount: number;
  onContinueToEditor: () => void;
  onUploadMore: () => void;
}

export function UploadSuccess({ fileCount, onContinueToEditor, onUploadMore }: UploadSuccessProps) {
  return (
    <div className="text-center py-8">
      <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="font-medium text-lg mb-2">Upload Complete!</h3>
      <p className="text-muted-foreground mb-6">
        {fileCount} file{fileCount !== 1 ? 's' : ''} uploaded successfully
      </p>
      <div className="space-y-3">
        <Button onClick={onContinueToEditor} size="lg" className="w-full">
          Continue to Editor
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          onClick={onUploadMore}
          className="w-full"
        >
          Upload More Files
        </Button>
      </div>
    </div>
  );
}
