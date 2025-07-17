import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useContentAssignments, useAvailableMonths } from '@/hooks/useUserContentProgress';
import { cn } from '@/lib/utils';

interface ContentSidebarProps {
  selectedContentId?: number;
  onContentSelect: (contentId: number) => void;
  selectedMonth: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ContentSidebar = ({ 
  selectedContentId, 
  onContentSelect,
  selectedMonth: parentSelectedMonth, 
  collapsed = false, 
  onToggleCollapse 
}: ContentSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const { data: availableMonths = [] } = useAvailableMonths();
  const { data: assignments = [] } = useContentAssignments(parentSelectedMonth);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (assignment: any) => {
    const requirements = assignment.requirements || [];
    const progress = assignment.progress || {};
    if (requirements.length === 0) return 0;
    
    const completedCount = requirements.filter((req: any, index: number) => 
      progress[index] === 100
    ).length;
    
    return (completedCount / requirements.length) * 100;
  };

  return (
    <div className={cn(
      "h-full bg-background border-r border-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-foreground">Content Progress</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-2"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Search and Filters */}
          <div className="p-4 space-y-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 p-2 rounded-md border border-border bg-muted text-sm text-muted-foreground">
                {parentSelectedMonth || 'All Months'}
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 p-2 rounded-md border border-border bg-background text-sm"
              >
                <option value="all">All Status</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Content List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-2">
              {filteredAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedContentId === assignment.id && "ring-2 ring-primary"
                  )}
                  onClick={() => onContentSelect(assignment.id)}
                >
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm line-clamp-2">{assignment.title}</h3>
                        {getStatusIcon(assignment.status)}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {assignment.category}
                        </Badge>
                        <Badge className={cn("text-xs", getStatusColor(assignment.status))}>
                          {assignment.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{Math.round(calculateProgress(assignment))}%</span>
                        </div>
                        <Progress value={calculateProgress(assignment)} className="h-2" />
                      </div>
                      
                      {assignment.due_date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};