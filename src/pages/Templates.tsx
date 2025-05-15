
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const templates = [
  {
    id: 1,
    title: "Seasonal Event Promo",
    description: "Template for promoting upcoming seasonal events",
    category: "promo",
    difficulty: "easy",
    duration: "1-3 min",
    clips: 4,
    thumbnail: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Coach Spotlight",
    description: "Highlight your coaches and their expertise",
    category: "feature",
    difficulty: "medium",
    duration: "2-4 min",
    clips: 5,
    thumbnail: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Student Achievement",
    description: "Celebrate student progress and achievements",
    category: "feature",
    difficulty: "medium",
    duration: "1-2 min",
    clips: 3,
    thumbnail: "/placeholder.svg"
  },
  {
    id: 4,
    title: "New Class Announcement",
    description: "Promote a new class or program offering",
    category: "promo",
    difficulty: "easy",
    duration: "30-60 sec",
    clips: 2,
    thumbnail: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Facility Tour",
    description: "Showcase your gym's facilities and equipment",
    category: "overview",
    difficulty: "hard",
    duration: "3-5 min",
    clips: 8,
    thumbnail: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Competition Recap",
    description: "Highlight moments from recent competitions",
    category: "recap",
    difficulty: "medium",
    duration: "2-4 min",
    clips: 6,
    thumbnail: "/placeholder.svg"
  }
];

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Easy</Badge>;
    case "medium":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Medium</Badge>;
    case "hard":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Complex</Badge>;
    default:
      return null;
  }
};

const Templates = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Templates</h1>
          <p className="text-muted-foreground">
            Choose a template to get started with your next video project.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="promo">Promotional</TabsTrigger>
          <TabsTrigger value="feature">Features</TabsTrigger>
          <TabsTrigger value="recap">Recaps</TabsTrigger>
          <TabsTrigger value="overview">Overviews</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-slate-100 relative">
                    <img 
                      src={template.thumbnail} 
                      alt={template.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getDifficultyBadge(template.difficulty)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle className="text-xl mb-2">{template.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{template.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{template.clips} Clips</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild className="w-full">
                    <Link to={`/upload?template=${template.id}`}>Use Template</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["promo", "feature", "recap", "overview"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates
                .filter((template) => template.category === category)
                .map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-slate-100 relative">
                        <img 
                          src={template.thumbnail} 
                          alt={template.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          {getDifficultyBadge(template.difficulty)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <CardTitle className="text-xl mb-2">{template.title}</CardTitle>
                      <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{template.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{template.clips} Clips</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button asChild className="w-full">
                        <Link to={`/upload?template=${template.id}`}>Use Template</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Templates;
