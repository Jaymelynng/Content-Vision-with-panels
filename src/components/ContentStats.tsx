
interface ContentStatsProps {
  difficulty: string;
  estimatedTime: string;
  equipment: string;
  safety: string;
}

export function ContentStats({ difficulty, estimatedTime, equipment, safety }: ContentStatsProps) {
  return (
    <div className="mt-6 p-3 bg-slate-50 rounded-lg">
      <h4 className="font-medium text-sm mb-2">Content Stats</h4>
      <div className="space-y-1 text-sm text-muted-foreground">
        <div>Difficulty: {difficulty}</div>
        <div>Est. Time: {estimatedTime}</div>
        <div>Equipment: {equipment}</div>
        <div>Safety: {safety}</div>
      </div>
    </div>
  );
}
