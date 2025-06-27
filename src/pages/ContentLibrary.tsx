
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import ContentGrid from "@/components/ContentGrid";
import { contentIdeas } from "@/data/contentIdeas";

const ContentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]);
  };
  
  const filteredContent = contentIdeas.filter(idea => 
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    idea.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
          <p className="text-muted-foreground">
            Your luxury catalog of high-performing content strategies at your fingertips.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search content ideas..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="pl-10" 
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="back-to-school">Back-to-School</TabsTrigger>
          <TabsTrigger value="skill-mastery">Skill Mastery</TabsTrigger>
          <TabsTrigger value="behind-the-scenes">Behind-the-Scenes</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="gaming">Gaming Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <ContentGrid 
            ideas={filteredContent} 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
          />
        </TabsContent>

        {["back-to-school", "skill-mastery", "behind-the-scenes", "community", "gaming"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <ContentGrid 
              ideas={filteredContent.filter((idea) => idea.category === category)} 
              favorites={favorites} 
              onToggleFavorite={toggleFavorite} 
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentLibrary;
