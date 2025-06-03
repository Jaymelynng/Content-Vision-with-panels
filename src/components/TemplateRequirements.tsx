
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export function TemplateRequirements() {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("Template");

  useEffect(() => {
    const templateData = sessionStorage.getItem('selectedTemplate');
    if (templateData && templateData !== "none") {
      setTemplateId(templateData);
      // Set template name based on ID
      if (templateData === "1") {
        setTemplateName("Seasonal Event Promo");
      } else if (templateData === "2") {
        setTemplateName("Coach Spotlight");
      } else {
        setTemplateName("Custom Template");
      }
    }
  }, []);

  const getRequirements = () => {
    if (templateId === "2") {
      return [
        { name: "Coach Introduction", duration: "5-10 seconds", completed: true },
        { name: "Teaching Moment", duration: "10-20 seconds", completed: true },
        { name: "Student Interaction", duration: "10-15 seconds", completed: false },
        { name: "Personal Interest", duration: "5-10 seconds", completed: false },
        { name: "Closing Statement", duration: "3-5 seconds", completed: false }
      ];
    }
    
    // Default requirements for template 1 or others
    return [
      { name: "Intro Shot", duration: "3-5 seconds", completed: true },
      { name: "Activity Overview", duration: "10-15 seconds", completed: true },
      { name: "Feature Highlight", duration: "5-10 seconds", completed: true },
      { name: "Closing Shot", duration: "3-5 seconds", completed: true }
    ];
  };

  const requirements = getRequirements();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template: {templateName}</CardTitle>
        <CardDescription>Required clips for this template</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {requirements.map((requirement, index) => (
          <div 
            key={index}
            className={`p-3 rounded-md flex items-center justify-between ${
              requirement.completed 
                ? "bg-green-50 border border-green-200" 
                : "bg-amber-50 border border-amber-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="video-thumbnail w-16 h-9 bg-slate-200 rounded flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm">{requirement.name}</p>
                <p className="text-xs text-muted-foreground">{requirement.duration}</p>
              </div>
            </div>
            {requirement.completed && <Check className="h-4 w-4 text-green-500" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
