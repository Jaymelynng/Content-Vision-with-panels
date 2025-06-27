import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Star, Play, Image, Instagram, Heart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
const contentIdeas = [
// Back-to-School Confidence Builders (Ideas 1-5)
{
  id: 1,
  title: "Handstand = Homework Focus",
  description: "Educational content connecting gymnastics skills to academic success with interactive riddles",
  category: "back-to-school",
  targetAudience: ["premium", "growth"],
  formats: ["photo", "reel", "story"],
  difficulty: "easy",
  engagement: "high",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Interactive Riddle", "Challenge Tracker", "Motion Graphics"]
}, {
  id: 2,
  title: "Cartwheel Confidence Transfer",
  description: "Showing how gymnastics confidence builds school confidence with spot-the-difference games",
  category: "back-to-school",
  targetAudience: ["premium", "growth", "value"],
  formats: ["photo", "reel", "story"],
  difficulty: "easy",
  engagement: "high",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Spot the Difference", "Counter Challenge", "Confidence Tracking"]
}, {
  id: 3,
  title: "Beam Balance = Life Balance",
  description: "Educational content about balance skills and life skills with motion comparison games",
  category: "back-to-school",
  targetAudience: ["premium", "growth"],
  formats: ["photo", "reel", "story"],
  difficulty: "medium",
  engagement: "medium",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Motion Analysis", "Home Challenge", "Progress Tracker"]
}, {
  id: 4,
  title: "Strength for School Success",
  description: "Connecting physical strength to academic performance with challenge trackers",
  category: "back-to-school",
  targetAudience: ["premium", "growth"],
  formats: ["photo", "reel", "story"],
  difficulty: "medium",
  engagement: "high",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Strength Challenge", "Progress Visualization", "Benefits Breakdown"]
}, {
  id: 5,
  title: "Flexibility for Growing Bodies",
  description: "Educational content about flexibility and healthy development with progression puzzles",
  category: "back-to-school",
  targetAudience: ["premium", "growth", "value"],
  formats: ["photo", "reel", "story"],
  difficulty: "easy",
  engagement: "medium",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Progression Puzzle", "Safety Tips", "Flexibility Challenge"]
},
// Skill Mastery Showcases (Ideas 6-10)
{
  id: 6,
  title: "Back Walkover Breakthrough",
  description: "Celebrating advanced skill achievement with skill building games",
  category: "skill-mastery",
  targetAudience: ["premium"],
  formats: ["photo", "reel", "story"],
  difficulty: "hard",
  engagement: "high",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Skill Puzzle", "Level-Up Graphics", "Progress Journey"]
}, {
  id: 7,
  title: "Pullover Power Progression",
  description: "Technical skill breakdown for bars with motion connection games",
  category: "skill-mastery",
  targetAudience: ["premium"],
  formats: ["photo", "reel", "story"],
  difficulty: "hard",
  engagement: "medium",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Motion Analysis", "Angle Graphics", "Cross-Training Connections"]
}, {
  id: 8,
  title: "Round-off Mastery Moment",
  description: "Tumbling skill celebration with technique analysis games",
  category: "skill-mastery",
  targetAudience: ["premium", "growth"],
  formats: ["photo", "reel", "story"],
  difficulty: "medium",
  engagement: "high",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Counter Challenge", "Technique Analysis", "Progression Path"]
}, {
  id: 9,
  title: "Handstand Hold Hero",
  description: "Strength and determination showcase with achievement challenges",
  category: "skill-mastery",
  targetAudience: ["premium", "growth", "value"],
  formats: ["photo", "reel", "story"],
  difficulty: "easy",
  engagement: "very-high",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Achievement Tracker", "Hero Badges", "Leaderboard"]
}, {
  id: 10,
  title: "Leap of Faith Landing",
  description: "Dance and leap skill showcase with grace challenges",
  category: "skill-mastery",
  targetAudience: ["premium", "growth"],
  formats: ["photo", "reel", "story"],
  difficulty: "medium",
  engagement: "medium",
  status: "not-started",
  thumbnail: "/placeholder.svg",
  features: ["Grace Challenge", "Sport Connections", "Artistic Expression"]
}];
const getAudienceBadge = (audience: string) => {
  switch (audience) {
    case "premium":
      return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
    case "growth":
      return <Badge className="bg-blue-100 text-blue-800">Growth</Badge>;
    case "value":
      return <Badge className="bg-green-100 text-green-800">Value</Badge>;
    default:
      return null;
  }
};
const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return <Badge className="bg-green-100 text-green-800">Easy</Badge>;
    case "medium":
      return <Badge className="bg-amber-100 text-amber-800">Medium</Badge>;
    case "hard":
      return <Badge className="bg-red-100 text-red-800">Complex</Badge>;
    default:
      return null;
  }
};
const getEngagementBadge = (engagement: string) => {
  switch (engagement) {
    case "very-high":
      return <Badge className="bg-emerald-100 text-emerald-800">🔥 Viral</Badge>;
    case "high":
      return <Badge className="bg-green-100 text-green-800">📈 High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">📊 Medium</Badge>;
    default:
      return null;
  }
};
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <div className="h-4 w-4 bg-amber-400 rounded-full animate-pulse" />;
    case "not-started":
      return <div className="h-4 w-4 bg-slate-300 rounded-full" />;
    default:
      return null;
  }
};
const ContentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]);
  };
  const filteredContent = contentIdeas.filter(idea => idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || idea.description.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-6">
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
        <Input placeholder="Search content ideas..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 border border-gray-200 bg-[#b48f8f]">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="back-to-school">Back-to-School</TabsTrigger>
          <TabsTrigger value="skill-mastery">Skill Mastery</TabsTrigger>
          <TabsTrigger value="behind-the-scenes">Behind-the-Scenes</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="gaming">Gaming Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map(idea => <Card key={idea.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    <img src={idea.thumbnail} alt={idea.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {getDifficultyBadge(idea.difficulty)}
                    </div>
                    <div className="absolute top-2 left-2">
                      {getEngagementBadge(idea.engagement)}
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
                      <button onClick={() => toggleFavorite(idea.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className={`h-4 w-4 ${favorites.includes(idea.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{idea.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {idea.targetAudience.map(audience => <div key={audience}>
                        {getAudienceBadge(audience)}
                      </div>)}
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {idea.features.slice(0, 2).map(feature => <span key={feature} className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                          {feature}
                        </span>)}
                      {idea.features.length > 2 && <span className="text-xs text-muted-foreground">+{idea.features.length - 2} more</span>}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button className="flex-1 text-sm">
                    View Guide
                  </Button>
                  <Button variant="outline" size="sm">
                    Create
                  </Button>
                </CardFooter>
              </Card>)}
          </div>
        </TabsContent>

        {["back-to-school", "skill-mastery", "behind-the-scenes", "community", "gaming"].map(category => <TabsContent key={category} value={category} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredContent.filter(idea => idea.category === category).map(idea => <Card key={idea.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                        <img src={idea.thumbnail} alt={idea.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {getDifficultyBadge(idea.difficulty)}
                        </div>
                        <div className="absolute top-2 left-2">
                          {getEngagementBadge(idea.engagement)}
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
                          <button onClick={() => toggleFavorite(idea.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                            <Heart className={`h-4 w-4 ${favorites.includes(idea.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{idea.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {idea.targetAudience.map(audience => <div key={audience}>
                            {getAudienceBadge(audience)}
                          </div>)}
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {idea.features.slice(0, 2).map(feature => <span key={feature} className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                              {feature}
                            </span>)}
                          {idea.features.length > 2 && <span className="text-xs text-muted-foreground">+{idea.features.length - 2} more</span>}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-2">
                      <Button className="flex-1 text-sm">
                        View Guide
                      </Button>
                      <Button variant="outline" size="sm">
                        Create
                      </Button>
                    </CardFooter>
                  </Card>)}
            </div>
          </TabsContent>)}
      </Tabs>
    </div>;
};
export default ContentLibrary;