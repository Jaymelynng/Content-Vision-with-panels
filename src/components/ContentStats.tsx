
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ContentStatsProps {
  uploadProgress?: { [key: string]: number };
  totalRequirements?: number;
}

export function ContentStats({ uploadProgress = {}, totalRequirements = 4 }: ContentStatsProps) {
  const completedUploads = Object.values(uploadProgress).filter(progress => progress === 100).length;
  const overallProgress = (completedUploads / totalRequirements) * 100;
  
  return (
    <div className="mt-6 p-3 bg-slate-50 rounded-lg">
      <h4 className="font-medium text-sm mb-2">Content Progress</h4>
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Overall Progress</span>
            <span className="text-xs font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Clips Uploaded</span>
          <Badge variant={completedUploads === totalRequirements ? "default" : "secondary"}>
            {completedUploads}/{totalRequirements}
          </Badge>
        </div>
        
        {overallProgress === 100 && (
          <div className="text-xs text-green-600 font-medium">
            ✓ Ready to create!
          </div>
        )}
      </div>
    </div>
  );
}
