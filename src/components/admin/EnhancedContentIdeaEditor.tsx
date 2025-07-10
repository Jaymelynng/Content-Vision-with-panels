import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, ArrowLeft, Upload, Eye } from 'lucide-react';
import { useAppSettings, useContentCategories } from '@/hooks/useAppSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import type { ContentIdea } from '@/hooks/useContentIdeas';

interface EnhancedContentIdeaEditorProps {
  contentIdea?: ContentIdea | null;
  onClose: () => void;
}

interface UploadRequirement {
  name: string;
  duration: string;
  description: string;
  type: string;
}

export function EnhancedContentIdeaEditor({ contentIdea, onClose }: EnhancedContentIdeaEditorProps) {
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
    due_date: contentIdea?.due_date ? new Date(contentIdea.due_date).toISOString().split('T')[0] : '',
    month_year: contentIdea?.month_year || new Date().toISOString().slice(0, 7), // YYYY-MM format
  });

  // 4-Section Structure State
  const [sections, setSections] = useState({
    setup_planning_photo: contentIdea?.setup_planning_photo || [''],
    setup_planning_video: contentIdea?.setup_planning_video || [''],
    production_tips_photo: contentIdea?.production_tips_photo || [''],
    production_tips_video: contentIdea?.production_tips_video || [''],
    upload_track_photo: contentIdea?.upload_track_photo || [''],
    upload_track_video: contentIdea?.upload_track_video || [''],
  });

  // Upload requirements
  const getUploadRequirements = (requirements: any): UploadRequirement[] => {
    if (!requirements) return [];
    if (typeof requirements === 'string') {
      try {
        const parsed = JSON.parse(requirements);
        return parsed.upload_requirements || [];
      } catch {
        return [];
      }
    }
    return requirements.upload_requirements || [];
  };

  const [uploadRequirements, setUploadRequirements] = useState<UploadRequirement[]>(
    getUploadRequirements(contentIdea?.requirements)
  );

  const handleArrayFieldChange = (sectionKey: keyof typeof sections, index: number, value: string) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (sectionKey: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: [...prev[sectionKey], '']
    }));
  };

  const removeArrayItem = (sectionKey: keyof typeof sections, index: number) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].filter((_, i) => i !== index)
    }));
  };

  const addUploadRequirement = () => {
    setUploadRequirements(prev => [...prev, {
      name: '',
      duration: '',
      description: '',
      type: 'photo'
    }]);
  };

  const updateUploadRequirement = (index: number, field: keyof UploadRequirement, value: string) => {
    setUploadRequirements(prev => prev.map((req, i) => 
      i === index ? { ...req, [field]: value } : req
    ));
  };

  const removeUploadRequirement = (index: number) => {
    setUploadRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const requirementsJson = JSON.stringify({
        upload_requirements: uploadRequirements,
      });

      const dataToSave = {
        ...formData,
        requirements: requirementsJson as any,
        ...sections,
        file_requirements: contentIdea?.file_requirements || {},
      };

      if (contentIdea) {
        const { error } = await supabase
          .from('content_ideas')
          .update(dataToSave)
          .eq('id', contentIdea.id);
        
        if (error) throw error;
        toast.success('Content idea updated successfully');
      } else {
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

  const renderSectionEditor = (
    title: string, 
    sectionKey: keyof typeof sections, 
    description: string
  ) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addArrayItem(sectionKey)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections[sectionKey].map((item, index) => (
          <div key={index} className="flex gap-2">
            <Textarea
              value={item}
              onChange={(e) => handleArrayFieldChange(sectionKey, index, e.target.value)}
              placeholder={`${title} item ${index + 1}`}
              className="flex-1"
              rows={2}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem(sectionKey, index)}
              disabled={sections[sectionKey].length === 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );

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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="month_year">Month/Year</Label>
                <Input
                  id="month_year"
                  type="month"
                  value={formData.month_year}
                  onChange={(e) => setFormData({ ...formData, month_year: e.target.value })}
                />
              </div>
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

            <div className="grid grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <Label>Engagement</Label>
                <Select value={formData.engagement} onValueChange={(value) => setFormData({ ...formData, engagement: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {engagementLevels.map((level) => (
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

        {/* 4-Section Content Structure */}
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Setup & Planning</TabsTrigger>
            <TabsTrigger value="production">Production Tips</TabsTrigger>
            <TabsTrigger value="examples">Content Examples</TabsTrigger>
            <TabsTrigger value="upload">Upload Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <div className="grid gap-4">
              {renderSectionEditor(
                "Setup & Planning (Photo)",
                "setup_planning_photo",
                "Step-by-step setup instructions for photo content"
              )}
              {renderSectionEditor(
                "Setup & Planning (Video)",
                "setup_planning_video", 
                "Step-by-step setup instructions for video content"
              )}
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <div className="grid gap-4">
              {renderSectionEditor(
                "Production Tips (Photo)",
                "production_tips_photo",
                "Photography tips and requirements"
              )}
              {renderSectionEditor(
                "Production Tips (Video)",
                "production_tips_video",
                "Video production tips and requirements"
              )}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="grid gap-4">
              {renderSectionEditor(
                "Upload Track (Photo)",
                "upload_track_photo",
                "Photo examples and references"
              )}
              {renderSectionEditor(
                "Upload Track (Video)",
                "upload_track_video",
                "Video examples and references"
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Upload Requirements
                  <Button variant="outline" size="sm" onClick={addUploadRequirement}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Define what files users need to upload for this content idea
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadRequirements.map((req, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Requirement {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeUploadRequirement(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Requirement name"
                        value={req.name}
                        onChange={(e) => updateUploadRequirement(index, 'name', e.target.value)}
                      />
                      <Select 
                        value={req.type} 
                        onValueChange={(value) => updateUploadRequirement(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="photo">Photo</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="both">Photo & Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      placeholder="Duration/specifications"
                      value={req.duration}
                      onChange={(e) => updateUploadRequirement(index, 'duration', e.target.value)}
                    />
                    <Textarea
                      placeholder="Description and requirements"
                      value={req.description}
                      onChange={(e) => updateUploadRequirement(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
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