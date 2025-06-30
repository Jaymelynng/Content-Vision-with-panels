
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useAppSettings } from "@/hooks/useAppSettings";

export function UploadTips() {
  const { data: appSettings } = useAppSettings();
  const fileRequirements = appSettings?.file_requirements || {};
  
  // Get tips from database or use defaults
  const tips = fileRequirements.general || [
    "Use landscape orientation (horizontal) for best results",
    "Good lighting improves video quality dramatically",
    "Stable shots (tripod or steady hand) look more professional",
    "Record extra footage beyond what you think you'll need"
  ];

  const avoidTips = [
    "Avoid background noise when recording audio"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
          {avoidTips.map((tip, index) => (
            <li key={`avoid-${index}`} className="flex gap-3">
              <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
