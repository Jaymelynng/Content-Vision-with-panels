
import ContentCard from "./ContentCard";
import type { ContentIdea } from "@/hooks/useContentIdeas";

interface ContentGridProps {
  ideas: ContentIdea[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onStartFullscreen?: (files: any[], contentId: number, format: string) => void;
  onStartSidePanel?: (files: any[], contentId: number, format: string) => void;
}

const ContentGrid = ({ ideas, favorites, onToggleFavorite, onStartFullscreen, onStartSidePanel }: ContentGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <ContentCard
          key={idea.id}
          idea={idea}
          isFavorite={favorites.includes(idea.id)}
          onToggleFavorite={onToggleFavorite}
          onStartFullscreen={onStartFullscreen}
          onStartSidePanel={onStartSidePanel}
        />
      ))}
    </div>
  );
};

export default ContentGrid;
