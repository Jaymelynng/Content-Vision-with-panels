
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ClipRequirementsProps {
  templateId: number;
}

interface ClipRequirement {
  id: number;
  title: string;
  duration: string;
  description: string;
  status: "pending" | "uploading" | "complete" | "invalid";
  example?: string;
}

// Mock template requirements based on template ID
const getTemplateRequirements = (templateId: number): ClipRequirement[] => {
  // Default requirements for template 1 (Seasonal Event Promo)
  const defaultRequirements: ClipRequirement[] = [
    {
      id: 1,
      title: "Intro Shot",
      duration: "3-5 seconds",
      description: "Close-up of coach greeting the audience",
      status: "pending",
      example: "Coach smiling and saying hello to camera"
    },
    {
      id: 2,
      title: "Activity Overview",
      duration: "10-15 seconds",
      description: "Wide shot showing multiple kids participating in the activity",
      status: "pending",
      example: "Pan across gym showing children doing cartwheels"
    },
    {
      id: 3,
      title: "Feature Highlight",
      duration: "5-10 seconds",
      description: "Close-up of specific activity or equipment being used",
      status: "pending",
      example: "Child successfully completing a cartwheel with coach assistance"
    },
    {
      id: 4,
      title: "Closing Shot",
      duration: "3-5 seconds",
      description: "Smiling faces or celebration of achievement",
      status: "pending",
      example: "Group of children and coach giving thumbs up"
    }
  ];

  // Template 2: Coach Spotlight requirements
  const coachSpotlightRequirements: ClipRequirement[] = [
    {
      id: 1,
      title: "Coach Introduction",
      duration: "5-10 seconds",
      description: "Coach introducing themselves directly to camera",
      status: "pending",
      example: "Coach saying name and how long they've been coaching"
    },
    {
      id: 2,
      title: "Teaching Moment",
      duration: "10-20 seconds",
      description: "Coach demonstrating technique or teaching students",
      status: "pending",
      example: "Coach showing proper form for a skill"
    },
    {
      id: 3,
      title: "Student Interaction",
      duration: "10-15 seconds",
      description: "Coach working directly with students",
      status: "pending",
      example: "Coach giving feedback and encouragement to students"
    },
    {
      id: 4,
      title: "Personal Interest",
      duration: "5-10 seconds",
      description: "Coach sharing something personal or their coaching philosophy",
      status: "pending",
      example: "Coach talking about why they love gymnastics"
    },
    {
      id: 5,
      title: "Closing Statement",
      duration: "3-5 seconds",
      description: "Coach inviting viewers to join their class",
      status: "pending",
      example: "Coach saying 'Come join us!'"
    }
  ];

  switch (templateId) {
    case 2:
      return coachSpotlightRequirements;
    default:
      return defaultRequirements;
  }
};

const ClipRequirements = ({ templateId }: ClipRequirementsProps) => {
  const requirements = getTemplateRequirements(templateId);
  const totalClips = requirements.length;
  const completedClips = requirements.filter(r => r.status === "complete").length;
  const progress = totalClips > 0 ? (completedClips / totalClips) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Upload Progress</span>
          <span className="text-sm">{completedClips} of {totalClips} clips</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-4">
        {requirements.map((requirement) => (
          <div 
            key={requirement.id} 
            className={cn(
              "border rounded-lg p-4 transition-colors",
              requirement.status === "complete" ? "bg-green-50 border-green-200" : 
              requirement.status === "invalid" ? "bg-red-50 border-red-200" : 
              "bg-white hover:bg-slate-50"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{requirement.title}</h4>
                  {requirement.status === "complete" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {requirement.description}
                </p>
                <div className="text-xs mt-1 text-muted-foreground">
                  Duration: {requirement.duration}
                </div>
                {requirement.example && (
                  <div className="text-xs mt-1 text-muted-foreground italic">
                    Example: {requirement.example}
                  </div>
                )}
              </div>
              <div className="text-sm">
                {requirement.status === "pending" && 
                  <span className="text-amber-500">Needed</span>
                }
                {requirement.status === "uploading" && 
                  <span className="text-blue-500">Uploading...</span>
                }
                {requirement.status === "complete" && 
                  <span className="text-green-500">Complete</span>
                }
                {requirement.status === "invalid" && 
                  <span className="text-red-500">Invalid</span>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipRequirements;
