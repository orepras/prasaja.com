'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X, Save, Edit } from 'lucide-react';

interface VoiceAttributesProps {
  attributes: string[];
  onChange: (attributes: string[]) => void;
}

export default function VoiceAttributes({ attributes, onChange }: VoiceAttributesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAttributes, setEditedAttributes] = useState<string[]>([...attributes]);
  const [newAttribute, setNewAttribute] = useState('');

  const handleSave = () => {
    onChange(editedAttributes.filter(attr => attr.trim() !== ''));
    setIsEditing(false);
  };

  const handleAdd = () => {
    if (newAttribute.trim() === '') return;
    setEditedAttributes([...editedAttributes, newAttribute]);
    setNewAttribute('');
  };

  const handleRemove = (index: number) => {
    const updated = [...editedAttributes];
    updated.splice(index, 1);
    setEditedAttributes(updated);
  };

  const handleAttributeChange = (index: number, value: string) => {
    const updated = [...editedAttributes];
    updated[index] = value;
    setEditedAttributes(updated);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Voice Attributes</CardTitle>
          {isEditing ? (
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
        <CardDescription>
          Define the core attributes that make up your brand's voice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            {editedAttributes.map((attribute, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={attribute}
                  onChange={(e) => handleAttributeChange(index, e.target.value)}
                  placeholder="e.g., Friendly, Direct, etc."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4">
              <Input
                value={newAttribute}
                onChange={(e) => setNewAttribute(e.target.value)}
                placeholder="Add new voice attribute"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdd}
                className="shrink-0"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        ) : (
          <ul className="space-y-2 list-disc pl-5">
            {attributes.map((attribute, index) => (
              <li key={index}>{attribute}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
} 