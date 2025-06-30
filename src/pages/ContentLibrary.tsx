
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import ContentGrid from "@/components/ContentGrid";
import { useContentIdeas } from "@/hooks/useContentIdeas";
import { useUserFavorites, useToggleFavorite } from "@/hooks/useUserFavorites";
import { useContentCategories } from "@/hooks/useAppSettings";
import { AuthGuard } from "@/components/AuthGuard";
import { UserNav } from "@/components/UserNav";

const ContentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: ideas = [], isLoading } = useContentIdeas();
  const { data: favorites = [] } = useUserFavorites();
  const { data: categories = [] } = useContentCategories();
  const toggleFavorite = useToggleFavorite();
  
  const handleToggleFavorite = (id: number) => {
    const isFavorite = favorites.includes(id);
    toggleFavorite.mutate({ contentId: id, isFavorite });
  };
  
  const filteredContent = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    idea.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
            <p className="text-muted-foreground">
              Your luxury catalog of high-performing content strategies at your fingertips.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
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
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.name}>
                {category.name === 'all' ? 'All Content' : 
                 category.name.split('-').map(word => 
                   word.charAt(0).toUpperCase() + word.slice(1)
                 ).join(' ')}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.name} className="mt-0">
              <ContentGrid 
                ideas={category.name === 'all' ? filteredContent : 
                       filteredContent.filter((idea) => idea.category === category.name)} 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AuthGuard>
  );
};

export default ContentLibrary;
