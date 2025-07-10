
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Shield, CheckCircle2, Circle, Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentGrid from "@/components/ContentGrid";
import { useContentAssignments } from "@/hooks/useUserContentProgress";
import { AuthGuard } from "@/components/AuthGuard";
import { UserNav } from "@/components/UserNav";
import { useIsAdmin } from "@/hooks/useUserRole";
import { AssignedTaskMode } from "@/components/AssignedTaskMode";

const ContentLibrary = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all');
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [taskData, setTaskData] = useState<{
    files: any[];
    contentId: number;
    format: string;
  } | null>(null);
  
  // Video editor states
  const [clips, setClips] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [aiEditing, setAiEditing] = useState(false);
  
  const navigate = useNavigate();
  const { data: assignments = [], isLoading } = useContentAssignments();
  const isAdmin = useIsAdmin();

  const handleStartFullscreen = (files: any[], contentId: number, format: string) => {
    setTaskData({ files, contentId, format });
    setClips(files.map((file, index) => ({
      id: `clip-${index}`,
      name: file.name,
      duration: 10, // Default duration, would need to get actual duration
      startTime: index * 10,
      trimStart: 0,
      trimEnd: 10,
      url: file.url
    })));
    setFullscreenMode(true);
  };

  const handleStartSidePanel = (files: any[], contentId: number, format: string) => {
    setTaskData({ files, contentId, format });
    setClips(files.map((file, index) => ({
      id: `clip-${index}`,
      name: file.name,
      duration: 10, // Default duration, would need to get actual duration
      startTime: index * 10,
      trimStart: 0,
      trimEnd: 10,
      url: file.url
    })));
    setSidePanelOpen(true);
  };
  
  const filteredAssignments = assignments.filter(assignment => 
    statusFilter === 'all' || assignment.status === statusFilter
  );

  const statusCounts = {
    all: assignments.length,
    'not-started': assignments.filter(a => a.status === 'not-started').length,
    'in-progress': assignments.filter(a => a.status === 'in-progress').length,
    completed: assignments.filter(a => a.status === 'completed').length,
  };

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

  // Handle fullscreen mode
  if (fullscreenMode && taskData) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <AssignedTaskMode
          clips={clips}
          onClipsChange={setClips}
          currentTime={currentTime}
          totalDuration={totalDuration}
          isPlaying={isPlaying}
          volume={volume}
          onTimeUpdate={setCurrentTime}
          onDurationChange={setTotalDuration}
          onSeek={setCurrentTime}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onVolumeChange={setVolume}
          aiEditing={aiEditing}
          onAIEditingChange={setAiEditing}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFullscreenMode(false)}
          className="absolute top-4 left-4 z-10"
        >
          Exit Fullscreen
        </Button>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Monthly Content Plan</h1>
            <p className="text-muted-foreground">
              Complete your assigned content for this month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                ADMIN PANEL
              </Button>
            )}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Circle className="h-4 w-4" />
              All ({statusCounts.all})
            </TabsTrigger>
            <TabsTrigger value="not-started" className="flex items-center gap-2">
              <Circle className="h-4 w-4" />
              Todo ({statusCounts['not-started']})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              In Progress ({statusCounts['in-progress']})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed ({statusCounts.completed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter} className="mt-0">
            <ContentGrid 
              ideas={filteredAssignments} 
              favorites={[]} 
              onToggleFavorite={() => {}} // Remove favorites functionality
              onStartFullscreen={handleStartFullscreen}
              onStartSidePanel={handleStartSidePanel}
            />
          </TabsContent>
        </Tabs>

        {/* Side Panel */}
        <Sheet open={sidePanelOpen} onOpenChange={setSidePanelOpen}>
          <SheetContent side="right" className="w-[90vw] max-w-none p-0">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle>Content Editor</SheetTitle>
            </SheetHeader>
            <div className="p-6 pt-4">
              {taskData && (
                <AssignedTaskMode
                  clips={clips}
                  onClipsChange={setClips}
                  currentTime={currentTime}
                  totalDuration={totalDuration}
                  isPlaying={isPlaying}
                  volume={volume}
                  onTimeUpdate={setCurrentTime}
                  onDurationChange={setTotalDuration}
                  onSeek={setCurrentTime}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  onVolumeChange={setVolume}
                  aiEditing={aiEditing}
                  onAIEditingChange={setAiEditing}
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AuthGuard>
  );
};

export default ContentLibrary;
