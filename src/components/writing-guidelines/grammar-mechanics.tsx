'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save } from 'lucide-react';

interface GrammarMechanicsProps {
  data: {
    punctuation: string;
    capitalization: string;
    numbersAndUnits: string;
    datesAndTimes: string;
  };
  updateData: (newData: {
    punctuation: string;
    capitalization: string;
    numbersAndUnits: string;
    datesAndTimes: string;
  }) => void;
}

export default function GrammarMechanics({ data, updateData }: GrammarMechanicsProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    punctuation: data.punctuation,
    capitalization: data.capitalization,
    numbersAndUnits: data.numbersAndUnits,
    datesAndTimes: data.datesAndTimes,
  });

  const handleEdit = (field: string) => {
    setEditingField(field);
    setEditValues({
      ...editValues,
      [field]: data[field as keyof typeof data],
    });
  };

  const handleChange = (field: string, value: string) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const handleSave = (field: string) => {
    updateData({
      ...data,
      [field]: editValues[field as keyof typeof editValues],
    });
    setEditingField(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight">Grammar & Mechanics</h2>
      <p className="text-muted-foreground">
        Define the technical rules that ensure consistency in your writing, from punctuation to date formats.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Punctuation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Punctuation</CardTitle>
              {editingField === 'punctuation' ? (
                <Button variant="ghost" size="sm" onClick={() => handleSave('punctuation')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => handleEdit('punctuation')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <CardDescription>
              Define standard punctuation rules for your content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editingField === 'punctuation' ? (
              <Textarea
                value={editValues.punctuation}
                onChange={(e) => handleChange('punctuation', e.target.value)}
                className="min-h-[200px]"
              />
            ) : (
              <div className="whitespace-pre-wrap">{data.punctuation}</div>
            )}
          </CardContent>
        </Card>

        {/* Capitalization */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Capitalization</CardTitle>
              {editingField === 'capitalization' ? (
                <Button variant="ghost" size="sm" onClick={() => handleSave('capitalization')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => handleEdit('capitalization')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <CardDescription>
              Specify when and how to capitalize words and phrases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editingField === 'capitalization' ? (
              <Textarea
                value={editValues.capitalization}
                onChange={(e) => handleChange('capitalization', e.target.value)}
                className="min-h-[200px]"
              />
            ) : (
              <div className="whitespace-pre-wrap">{data.capitalization}</div>
            )}
          </CardContent>
        </Card>

        {/* Numbers and Units */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Numbers & Units</CardTitle>
              {editingField === 'numbersAndUnits' ? (
                <Button variant="ghost" size="sm" onClick={() => handleSave('numbersAndUnits')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => handleEdit('numbersAndUnits')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <CardDescription>
              Define how to format numbers, measurements, and units.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editingField === 'numbersAndUnits' ? (
              <Textarea
                value={editValues.numbersAndUnits}
                onChange={(e) => handleChange('numbersAndUnits', e.target.value)}
                className="min-h-[200px]"
              />
            ) : (
              <div className="whitespace-pre-wrap">{data.numbersAndUnits}</div>
            )}
          </CardContent>
        </Card>

        {/* Dates and Times */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dates & Times</CardTitle>
              {editingField === 'datesAndTimes' ? (
                <Button variant="ghost" size="sm" onClick={() => handleSave('datesAndTimes')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => handleEdit('datesAndTimes')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <CardDescription>
              Standardize how dates and times are formatted in your content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editingField === 'datesAndTimes' ? (
              <Textarea
                value={editValues.datesAndTimes}
                onChange={(e) => handleChange('datesAndTimes', e.target.value)}
                className="min-h-[200px]"
              />
            ) : (
              <div className="whitespace-pre-wrap">{data.datesAndTimes}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 