
import { Check, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const tasks = [
  {
    id: 1,
    title: "Upload photos for Kids Class Recap",
    dueDate: "Today",
    priority: "high",
    completed: false
  },
  {
    id: 2,
    title: "Record intro for June Summer Camp promo",
    dueDate: "Tomorrow",
    priority: "medium",
    completed: false
  },
  {
    id: 3,
    title: "Approve edits to Team Showcase video",
    dueDate: "May 17",
    priority: "medium",
    completed: false
  },
  {
    id: 4,
    title: "Send testimonial clips for editing",
    dueDate: "May 18",
    priority: "low",
    completed: true
  }
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
    case "medium":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
    case "low":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
    default:
      return null;
  }
};

const TaskList = () => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className={`flex items-start gap-3 py-2 border-b last:border-0 ${task.completed ? 'opacity-60' : ''}`}>
          <Checkbox id={`task-${task.id}`} className="mt-1" checked={task.completed} />
          <div className="flex-1">
            <label
              htmlFor={`task-${task.id}`}
              className={`text-sm font-medium cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
            >
              {task.title}
            </label>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
              {getPriorityBadge(task.priority)}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link to="/upload">
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ))}
      
      <div className="pt-2">
        <Button variant="outline" className="w-full">
          <Check className="mr-2 h-4 w-4" />
          View All Tasks
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
