
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const assignments = [
  {
    id: 1,
    title: "Summer Camp Promotion",
    template: "Seasonal Event",
    due: "2025-05-20",
    status: "completed",
    timestamp: "2025-05-14 10:30 AM"
  },
  {
    id: 2,
    title: "Coach Spotlight: Sarah",
    template: "Team Member Feature",
    due: "2025-05-18",
    status: "in-review",
    timestamp: "2025-05-15 09:15 AM"
  },
  {
    id: 3,
    title: "New Equipment Showcase",
    template: "Facility Update",
    due: "2025-05-22",
    status: "in-progress",
    timestamp: "2025-05-15 11:45 AM"
  },
  {
    id: 4,
    title: "Gymnastics Competition Results",
    template: "Event Recap",
    due: "2025-05-16",
    status: "overdue",
    timestamp: "2025-05-13 02:30 PM"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <Check className="h-4 w-4 text-green-500" />;
    case "overdue":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-amber-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case "in-review":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Review</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>;
    case "overdue":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>;
    default:
      return null;
  }
};

const RecentAssignments = () => {
  return (
    <div className="space-y-5">
      {assignments.map((assignment) => (
        <div key={assignment.id} className="flex flex-col md:flex-row gap-4 md:items-center justify-between border-b pb-5 last:border-0 last:pb-0">
          <div className="flex items-start gap-3">
            <div className="mt-1">{getStatusIcon(assignment.status)}</div>
            <div>
              <div className="font-medium">{assignment.title}</div>
              <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-3 items-start sm:items-center">
                <span>Template: {assignment.template}</span>
                <span className="hidden sm:inline">•</span>
                <span>Due: {assignment.due}</span>
              </div>
              <div className="mt-1.5">
                {getStatusBadge(assignment.status)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-7 md:ml-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{assignment.timestamp}</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/editor">View</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentAssignments;
