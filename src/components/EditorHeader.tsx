
import { Button } from "@/components/ui/button";
import { ArrowRight, Save } from "lucide-react";

interface EditorHeaderProps {
  onSave: () => void;
  onExport: () => void;
}

export function EditorHeader({ onSave, onExport }: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Editor</h1>
        <p className="text-muted-foreground">
          Create and edit your video content with AI assistance.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <Button onClick={onExport}>
          Export Video
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
