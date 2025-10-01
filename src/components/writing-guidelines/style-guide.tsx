'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Edit, Save } from 'lucide-react';

interface StyleGuideProps {
  data: {
    purpose: string;
    brandPersonality: string;
    formattingStandards: string;
    brandName: string;
    brandStory: string;
  };
  updateData: (newData: {
    purpose: string;
    brandPersonality: string;
    formattingStandards: string;
    brandName: string;
    brandStory: string;
  }) => void;
}

export default function StyleGuide({ data, updateData }: StyleGuideProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    purpose: data.purpose,
    brandPersonality: data.brandPersonality,
    formattingStandards: data.formattingStandards,
    brandName: data.brandName,
    brandStory: data.brandStory
  });

  const handleEdit = (field: string) => {
    setEditingField(field);
    setEditValues({
      ...editValues,
      [field]: data[field as keyof typeof data] || editValues[field as keyof typeof editValues],
    });
  };

  const handleChange = (field: string, value: string) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const handleSave = (field: string) => {
    if (field === 'brandInfo') {
      updateData({
        ...data,
        brandName: editValues.brandName,
        brandStory: editValues.brandStory
      });
    } else {
      updateData({
        ...data,
        [field]: editValues[field as keyof typeof editValues],
      });
    }
    setEditingField(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight">Style Guide</h2>
      <p className="text-muted-foreground">
        Define your brand's overall style guidelines and principles. These serve as the foundation for all communications.
      </p>

      {/* Brand Information */}
      <Card className="border-2 bg-slate-50 dark:bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Brand Information</CardTitle>
            {editingField === 'brandInfo' ? (
              <Button variant="ghost" size="sm" onClick={() => handleSave('brandInfo')}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleEdit('brandInfo')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          <CardDescription>
            Enter your brand name and a brief story or description
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editingField === 'brandInfo' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Name</label>
                <Input
                  value={editValues.brandName}
                  onChange={(e) => handleChange('brandName', e.target.value)}
                  placeholder="e.g., Prasaja"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Story</label>
                <Textarea
                  value={editValues.brandStory}
                  onChange={(e) => handleChange('brandStory', e.target.value)}
                  placeholder="e.g., I'm Prasaja Mukti Aji. I'm a UX writer and product developer hybrid..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-medium mb-1">Brand Name</h4>
                <p className="text-slate-700 dark:text-slate-300">{editValues.brandName}</p>
              </div>
              <div>
                <h4 className="text-base font-medium mb-1">Brand Story</h4>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{editValues.brandStory}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Purpose */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Purpose</CardTitle>
            {editingField === 'purpose' ? (
              <Button variant="ghost" size="sm" onClick={() => handleSave('purpose')}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleEdit('purpose')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          <CardDescription>
            Define why this style guide exists and what it helps your team accomplish.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editingField === 'purpose' ? (
            <Textarea
              value={editValues.purpose}
              onChange={(e) => handleChange('purpose', e.target.value)}
              className="min-h-[120px]"
            />
          ) : (
            <div className="whitespace-pre-wrap">{data.purpose}</div>
          )}
        </CardContent>
      </Card>

      {/* Brand Personality */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Brand Personality</CardTitle>
            {editingField === 'brandPersonality' ? (
              <Button variant="ghost" size="sm" onClick={() => handleSave('brandPersonality')}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleEdit('brandPersonality')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          <CardDescription>
            Describe your brand's character and attributes that shape your voice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editingField === 'brandPersonality' ? (
            <Textarea
              value={editValues.brandPersonality}
              onChange={(e) => handleChange('brandPersonality', e.target.value)}
              className="min-h-[120px]"
            />
          ) : (
            <div className="whitespace-pre-wrap">{data.brandPersonality}</div>
          )}
        </CardContent>
      </Card>

      {/* Formatting Standards */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Formatting Standards</CardTitle>
            {editingField === 'formattingStandards' ? (
              <Button variant="ghost" size="sm" onClick={() => handleSave('formattingStandards')}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleEdit('formattingStandards')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          <CardDescription>
            Define your visual formatting conventions for consistent presentation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editingField === 'formattingStandards' ? (
            <Textarea
              value={editValues.formattingStandards}
              onChange={(e) => handleChange('formattingStandards', e.target.value)}
              className="min-h-[150px] font-mono text-sm"
            />
          ) : (
            <div className="whitespace-pre-wrap font-mono">{data.formattingStandards}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 