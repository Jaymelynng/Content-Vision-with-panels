
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface UploadRequirement {
  name: string;
  duration: string;
  description: string;
  type: string;
}

interface UploadRequirementsEditorProps {
  requirements: UploadRequirement[];
  onChange: (requirements: UploadRequirement[]) => void;
}

export function UploadRequirementsEditor({ requirements, onChange }: UploadRequirementsEditorProps) {
  const addRequirement = () => {
    const newRequirement: UploadRequirement = {
      name: '',
      duration: '',
      description: '',
      type: 'video',
    };
    onChange([...requirements, newRequirement]);
  };

  const updateRequirement = (index: number, field: keyof UploadRequirement, value: string) => {
    const updated = requirements.map((req, i) => 
      i === index ? { ...req, [field]: value } : req
    );
    onChange(updated);
  };

  const removeRequirement = (index: number) => {
    onChange(requirements.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Upload Requirements</CardTitle>
          <Button onClick={addRequirement} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Requirement
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {requirements.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No upload requirements yet. Click "Add Requirement" to create one.
          </p>
        ) : (
          requirements.map((req, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Requirement {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRequirement(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={req.name}
                    onChange={(e) => updateRequirement(index, 'name', e.target.value)}
                    placeholder="e.g., Opening Hook"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={req.duration}
                    onChange={(e) => updateRequirement(index, 'duration', e.target.value)}
                    placeholder="e.g., 3-5 seconds"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={req.description}
                  onChange={(e) => updateRequirement(index, 'description', e.target.value)}
                  placeholder="Describe what this clip should contain..."
                  rows={2}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
