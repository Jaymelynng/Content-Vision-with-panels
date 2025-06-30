
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Save, ArrowLeft } from 'lucide-react';
import { useAppSettings, useContentCategories } from '@/hooks/useAppSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import type { ContentIdea } from '@/hooks/useContentIdeas';
import { UploadRequirementsEditor } from './UploadRequirementsEditor';

interface ContentIdeaEditorProps {
  contentIdea?: ContentIdea | null;
  onClose: () => void;
}

interface UploadRequirement {
  name: string;
  duration: string;
  description: string;
  type: string;
}

export function ContentIdeaEditor({ contentIdea, onClose }: ContentIdeaEditorProps) {
  const queryClient = useQueryClient();
  const { data: appSettings } = useAppSettings();
  const { data: categories } = useContentCategories();
  
  const [formData, setFormData] = useState({
    title: contentIdea?.title || '',
    description: contentIdea?.description || '',
    category: contentIdea?.category || '',
    difficulty: contentIdea?.difficulty || 'medium',
    engagement: contentIdea?.engagement || 'medium',
    formats: contentIdea?.formats || ['photo', 'video'],
    target_audience: contentIdea?.target_audience || ['growth'],
    features: contentIdea?.features || [],
  });

  const [uploadRequirements, setUploadRequirements] = useState<UploadRequirement[]>(
    contentIdea?.requirements?.upload_requirements || []
  );

  const handleSave = async () => {
    try {
      const dataToSave = {
        ...formData,
        requirements: {
          upload_requirements: uploadRequirements,
        },
        setup_planning_photo: contentIdea?.setup_planning_photo || [],
        setup_planning_video: contentIdea?.setup_planning_video || [],
        production_tips_photo: contentIdea?.production_tips_photo || [],
        production_tips_video: contentIdea?.production_tips_video || [],
        upload_track_photo: contentIdea?.upload_track_photo || [],
        upload_track_video: contentIdea?.upload_track_video || [],
        file_requirements: contentIdea?.file_requirements || {},
      };

      if (contentIdea) {
        // Update existing
        const { error } = await supabase
          .from('content_ideas')
          .update(dataToSave)
          .eq('id', contentIdea.id);
        
        if (error) throw error;
        toast.success('Content idea updated successfully');
      } else {
        // Create new
        const { error } = await supabase
          .from('content_ideas')
          .insert([dataToSave]);
        
        if (error) throw error;
        toast.success('Content idea created successfully');
      }

      queryClient.invalidateQueries({ queryKey: ['content-ideas'] });
      onClose();
    } catch (error) {
      console.error('Error saving content idea:', error);
      toast.error('Failed to save content idea');
    }
  };

  const difficultyLevels = appSettings?.difficulty_levels || ['easy', 'medium', 'hard'];
  const engagementLevels = appSettings?.engagement_levels || ['low', 'medium', 'high'];
  const targetAudiences = appSettings?.target_audiences || ['premium', 'growth', 'community', 'beginners'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
        <h2 className="text-2xl font-semibold">
          {contentIdea ? 'Edit Content Idea' : 'Create New Content Idea'}
        </h2>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter content idea title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter content idea description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <UploadRequirementsEditor
          requirements={uploadRequirements}
          onChange={setUploadRequirements}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Content Idea
          </Button>
        </div>
      </div>
    </div>
  );
}
