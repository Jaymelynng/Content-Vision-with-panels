
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useContentAssignments, useAvailableMonths } from "@/hooks/useUserContentProgress";
import { AuthGuard } from "@/components/AuthGuard";
import { UserNav } from "@/components/UserNav";
import { useIsAdmin } from "@/hooks/useUserRole";
import { AssignedTaskMode } from "@/components/AssignedTaskMode";
import { MonthSelector } from "@/components/MonthSelector";
import { ContentSidebar } from "@/components/ContentSidebar";
import { EnhancedContentDetail } from "@/components/EnhancedContentDetail";
import { ContentUploadSection } from "@/components/ContentUploadSection";

const ContentLibrary = () => {
  const [selectedContentId, setSelectedContentId] = useState<number | undefined>();
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
  const { data: availableMonths = [] } = useAvailableMonths();
  
  // Default to the most recent month (first in the sorted array)
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  
  // Set default month when available months load
  useMemo(() => {
    if (availableMonths.length > 0 && !selectedMonth) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);
  
  const { data: assignments = [], isLoading } = useContentAssignments(selectedMonth);
  const isAdmin = useIsAdmin();
  
  const formatMonthDisplay = (monthYear: string) => {
    if (!monthYear) return 'Monthly Content Plan';
    const [year, month] = monthYear.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = parseInt(month) - 1;
    return `${monthNames[monthIndex]} ${year} Content Plan`;
  };

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

  const handleContentSelect = (contentId: number) => {
    setSelectedContentId(contentId);
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
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <ContentSidebar
          selectedContentId={selectedContentId}
          onContentSelect={handleContentSelect}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">{formatMonthDisplay(selectedMonth)}</h1>
                <p className="text-sm text-muted-foreground">
                  Complete your assigned content for this month
                </p>
              </div>
              <div className="flex items-center gap-2">
                {availableMonths.length > 0 && (
                  <MonthSelector
                    availableMonths={availableMonths}
                    selectedMonth={selectedMonth}
                    onMonthChange={setSelectedMonth}
                  />
                )}
                <UserNav />
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    ADMIN
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Content Detail */}
          <div className="flex-1 overflow-auto">
            {selectedContentId ? (
              <EnhancedContentDetail contentId={selectedContentId} monthYear={selectedMonth} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a content assignment from the sidebar to get started
              </div>
            )}
          </div>

          {/* Upload Section */}
          {selectedContentId && (
            <div className="border-t bg-white">
              <ContentUploadSection 
                contentId={selectedContentId}
                requirements={[]} // This will be populated by the component
              />
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default ContentLibrary;
