
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function UploadTips() {
  return (
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
  );
}
