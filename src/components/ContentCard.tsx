
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Play, Instagram, CheckCircle2, Clock, Circle, Calendar } from "lucide-react";
import { getAudienceBadge, getFormatBadge } from "@/utils/contentUtils";
import { ContentGuide } from "./ContentGuide";
import { useState } from "react";
import type { ContentIdea } from "@/hooks/useContentIdeas";

interface ContentCardProps {
  idea: ContentIdea & {
    status: 'not-started' | 'in-progress' | 'completed';
    progress: Record<string, number>;
    uploadedFiles: any[];
    lastUpdated?: string;
  };
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onStartFullscreen?: (files: any[], contentId: number, format: string) => void;
  onStartSidePanel?: (files: any[], contentId: number, format: string) => void;
}

const ContentCard = ({ idea, isFavorite, onToggleFavorite, onStartFullscreen, onStartSidePanel }: ContentCardProps) => {
  const [showGuide, setShowGuide] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">Todo</Badge>;
    }
  };

  const getProgressPercentage = () => {
    const progressValues = Object.values(idea.progress);
    if (progressValues.length === 0) return 0;
    return Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length);
  };

  const getButtonText = () => {
    switch (idea.status) {
      case 'completed':
        return 'Review Work';
      case 'in-progress':
        return 'Continue';
      default:
        return 'Start Task';
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
        <CardHeader className="p-0">
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
            <img 
              src={idea.thumbnail || '/placeholder.svg'} 
              alt={idea.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
            />
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {idea.formats.map((format) => (
                <div key={format}>
                  {getFormatBadge(format)}
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 right-2 flex gap-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                <Image className="h-3 w-3" />
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                <Play className="h-3 w-3" />
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                <Instagram className="h-3 w-3" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
                {getStatusIcon(idea.status)}
              </div>
              <div className="flex items-center gap-2 mb-2">
                {getStatusBadge(idea.status)}
                {idea.status === 'in-progress' && (
                  <Badge variant="outline" className="text-xs">
                    {getProgressPercentage()}% complete
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{idea.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {idea.target_audience.map((audience) => (
              <div key={audience}>
                {getAudienceBadge(audience)}
              </div>
            ))}
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex flex-wrap gap-1">
              {idea.features.slice(0, 2).map((feature) => (
                <span key={feature} className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                  {feature}
                </span>
              ))}
              {idea.features.length > 2 && (
                <span className="text-xs text-muted-foreground">+{idea.features.length - 2} more</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex gap-2">
          <Button 
            className="flex-1 text-sm"
            onClick={() => setShowGuide(true)}
            variant={idea.status === 'completed' ? 'outline' : 'default'}
          >
            {getButtonText()}
          </Button>
          {idea.lastUpdated && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(idea.lastUpdated).toLocaleDateString()}
            </div>
          )}
        </CardFooter>
      </Card>
      <ContentGuide 
        open={showGuide}
        onClose={() => setShowGuide(false)}
        contentId={idea.id}
        contentData={idea}
        onStartFullscreen={onStartFullscreen}
        onStartSidePanel={onStartSidePanel}
      />
    </>
  );
};

export default ContentCard;
