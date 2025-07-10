
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar, Filter } from 'lucide-react';
import { useContentIdeas } from '@/hooks/useContentIdeas';
import { EnhancedContentIdeaEditor } from './EnhancedContentIdeaEditor';
import type { ContentIdea } from '@/hooks/useContentIdeas';

export function ContentIdeasManager() {
  const { data: contentIdeas, isLoading } = useContentIdeas();
  const [editingIdea, setEditingIdea] = useState<ContentIdea | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Get unique months for filtering
  const availableMonths = React.useMemo(() => {
    if (!contentIdeas) return [];
    const months = [...new Set(contentIdeas.map(idea => idea.month_year || '2025-01'))];
    return months.sort();
  }, [contentIdeas]);

  // Filter content ideas by selected month
  const filteredIdeas = React.useMemo(() => {
    if (!contentIdeas) return [];
    if (selectedMonth === 'all') return contentIdeas;
    return contentIdeas.filter(idea => idea.month_year === selectedMonth);
  }, [contentIdeas, selectedMonth]);

  const formatMonthDisplay = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  if (isLoading) {
    return <div>Loading content ideas...</div>;
  }

  if (isCreating || editingIdea) {
    return (
      <EnhancedContentIdeaEditor
        contentIdea={editingIdea}
        onClose={() => {
          setIsCreating(false);
          setEditingIdea(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Content Ideas</h2>
          <p className="text-muted-foreground">Manage individual content ideas and assignments</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Content Idea
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by month:</span>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {availableMonths.map((month) => (
                  <SelectItem key={month} value={month}>
                    {formatMonthDisplay(month)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary">
              {filteredIdeas.length} idea{filteredIdeas.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredIdeas.map((idea) => (
          <Card key={idea.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{idea.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {idea.category} • {idea.difficulty} • {idea.engagement}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs text-muted-foreground">
                      {formatMonthDisplay(idea.month_year || '2025-01')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingIdea(idea)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{idea.description}</p>
              <div className="flex flex-wrap gap-1">
                {idea.formats.map((format) => (
                  <Badge key={format} variant="secondary" className="text-xs">
                    {format}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
