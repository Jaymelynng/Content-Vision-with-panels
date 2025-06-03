
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import ClipRequirements from "@/components/ClipRequirements";

interface TemplateRequirementsCardProps {
  templateId: string;
}

export function TemplateRequirementsCard({ templateId }: TemplateRequirementsCardProps) {
  return (
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
  );
}
