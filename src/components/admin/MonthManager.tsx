import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Copy, Eye, Edit, Trash2 } from 'lucide-react';
import { useContentIdeas } from '@/hooks/useContentIdeas';
import { MonthPlanWizard } from './MonthPlanWizard';
import { useToast } from '@/hooks/use-toast';

export function MonthManager() {
  const { data: contentIdeas } = useContentIdeas();
  const { toast } = useToast();
  const [showWizard, setShowWizard] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [duplicateFromMonth, setDuplicateFromMonth] = useState<string>('');

  // Group content ideas by month
  const monthGroups = React.useMemo(() => {
    if (!contentIdeas) return {};
    
    return contentIdeas.reduce((groups, idea) => {
      const monthKey = idea.month_year || '2025-01';
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(idea);
      return groups;
    }, {} as Record<string, typeof contentIdeas>);
  }, [contentIdeas]);

  const availableMonths = Object.keys(monthGroups).sort();

  const handleCreateNewMonth = () => {
    setShowWizard(true);
  };

  const handleDuplicateMonth = async () => {
    if (!duplicateFromMonth || !selectedMonth) {
      toast({
        title: "Missing Information",
        description: "Please select both source and target months",
        variant: "destructive"
      });
      return;
    }

    // This would trigger the wizard with pre-filled data from the selected month
    setShowWizard(true);
  };

  const formatMonthDisplay = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  if (showWizard) {
    return (
      <MonthPlanWizard
        sourceMonth={duplicateFromMonth}
        targetMonth={selectedMonth}
        onClose={() => {
          setShowWizard(false);
          setSelectedMonth('');
          setDuplicateFromMonth('');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Month Management</h2>
          <p className="text-muted-foreground">Create and manage monthly content plans</p>
        </div>
        <Button onClick={handleCreateNewMonth}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Month Plan
        </Button>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Duplicate Month Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Copy from</Label>
              <Select value={duplicateFromMonth} onValueChange={setDuplicateFromMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month to copy" />
                </SelectTrigger>
                <SelectContent>
                  {availableMonths.map((month) => (
                    <SelectItem key={month} value={month}>
                      {formatMonthDisplay(month)} ({monthGroups[month].length} posts)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Create for</Label>
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                placeholder="Select target month"
              />
            </div>
          </div>
          <Button onClick={handleDuplicateMonth} disabled={!duplicateFromMonth || !selectedMonth}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate Month Plan
          </Button>
        </CardContent>
      </Card>

      {/* Month Overview */}
      <div className="grid gap-4">
        <h3 className="text-lg font-medium">Existing Month Plans</h3>
        {availableMonths.map((monthKey) => {
          const monthIdeas = monthGroups[monthKey];
          const photoCount = monthIdeas.filter(idea => idea.formats?.includes('photo')).length;
          const videoCount = monthIdeas.filter(idea => idea.formats?.includes('video')).length;

          return (
            <Card key={monthKey}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {formatMonthDisplay(monthKey)}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{monthIdeas.length} total posts</Badge>
                      <Badge variant="outline">{photoCount} photo</Badge>
                      <Badge variant="outline">{videoCount} video</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monthIdeas.map((idea) => (
                    <div key={idea.id} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">{idea.title}</span>
                        <div className="flex gap-1 mt-1">
                          {idea.formats?.map((format) => (
                            <Badge key={format} variant="secondary" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant="outline">{idea.category}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}