
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useContentIdeas } from '@/hooks/useContentIdeas';
import { EnhancedContentIdeaEditor } from './EnhancedContentIdeaEditor';
import type { ContentIdea } from '@/hooks/useContentIdeas';

export function ContentIdeasManager() {
  const { data: contentIdeas, isLoading } = useContentIdeas();
  const [editingIdea, setEditingIdea] = useState<ContentIdea | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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
        <h2 className="text-2xl font-semibold">Content Ideas</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Content Idea
        </Button>
      </div>

      <div className="grid gap-4">
        {contentIdeas?.map((idea) => (
          <Card key={idea.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{idea.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {idea.category} • {idea.difficulty} • {idea.engagement}
                  </p>
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
                  <span
                    key={format}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
