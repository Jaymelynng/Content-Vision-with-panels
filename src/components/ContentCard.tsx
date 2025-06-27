import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Image, Play, Instagram } from "lucide-react";
import { getAudienceBadge, getFormatBadge, getStatusIcon } from "@/utils/contentUtils";
import { ContentGuide } from "./ContentGuide";
import { useState } from "react";

interface ContentIdea {
  id: number;
  title: string;
  description: string;
  category: string;
  targetAudience: string[];
  formats: string[];
  difficulty: string;
  engagement: string;
  status: string;
  thumbnail: string;
  features: string[];
}

interface ContentCardProps {
  idea: ContentIdea;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const ContentCard = ({ idea, isFavorite, onToggleFavorite }: ContentCardProps) => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
        <CardHeader className="p-0">
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
            <img 
              src={idea.thumbnail} 
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
            <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(idea.status)}
              <button 
                onClick={() => onToggleFavorite(idea.id)} 
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{idea.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {idea.targetAudience.map((audience) => (
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
          >
            View Guide
          </Button>
          <Button variant="outline" size="sm">
            Create
          </Button>
        </CardFooter>
      </Card>
      <ContentGuide 
        open={showGuide}
        onClose={() => setShowGuide(false)}
        contentId={idea.id}
      />
    </>
  );
};

export default ContentCard;
