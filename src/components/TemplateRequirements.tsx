
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export function TemplateRequirements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template: Seasonal Event</CardTitle>
        <CardDescription>Required clips for this template</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
            <div>
              <p className="font-medium text-sm">Intro Shot</p>
              <p className="text-xs text-muted-foreground">3-5 seconds</p>
            </div>
          </div>
          <Check className="h-4 w-4 text-green-500" />
        </div>
        
        <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
            <div>
              <p className="font-medium text-sm">Activity Overview</p>
              <p className="text-xs text-muted-foreground">10-15 seconds</p>
            </div>
          </div>
          <Check className="h-4 w-4 text-green-500" />
        </div>
        
        <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
            <div>
              <p className="font-medium text-sm">Feature Highlight</p>
              <p className="text-xs text-muted-foreground">5-10 seconds</p>
            </div>
          </div>
          <Check className="h-4 w-4 text-green-500" />
        </div>
        
        <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
            <div>
              <p className="font-medium text-sm">Closing Shot</p>
              <p className="text-xs text-muted-foreground">3-5 seconds</p>
            </div>
          </div>
          <Check className="h-4 w-4 text-green-500" />
        </div>
      </CardContent>
    </Card>
  );
}
