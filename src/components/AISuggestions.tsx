
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Scissors } from "lucide-react";

export function AISuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Suggestions</CardTitle>
        <CardDescription>Recommendations from AI analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-purple-500">
            <Scissors className="h-4 w-4" />
          </div>
          <p className="text-sm">Trim 2 seconds from the beginning of clip 1 to improve pacing</p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="mt-1 text-purple-500">
            <Scissors className="h-4 w-4" />
          </div>
          <p className="text-sm">Add transition effect between clips 2 and 3 for smoother flow</p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="mt-1 text-purple-500">
            <Scissors className="h-4 w-4" />
          </div>
          <p className="text-sm">Increase brightness on clip 3 by 10% to match other clips</p>
        </div>

        <Button variant="outline" className="w-full mt-2">
          <Check className="mr-2 h-4 w-4" />
          Apply All Suggestions
        </Button>
      </CardContent>
    </Card>
  );
}
