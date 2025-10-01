'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, X, Save, Edit } from 'lucide-react';

type ContextItem = {
  context: string;
  tone: string;
};

interface ContextAdaptationProps {
  contexts: ContextItem[];
  onChange: (contexts: ContextItem[]) => void;
}

export default function ContextAdaptation({ contexts, onChange }: ContextAdaptationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContexts, setEditedContexts] = useState<ContextItem[]>([...contexts]);
  const [newContext, setNewContext] = useState<ContextItem>({ context: '', tone: '' });

  const handleSave = () => {
    onChange(editedContexts.filter(ctx => ctx.context.trim() !== ''));
    setIsEditing(false);
  };

  const handleAdd = () => {
    if (newContext.context.trim() === '') return;
    setEditedContexts([...editedContexts, { ...newContext }]);
    setNewContext({ context: '', tone: '' });
  };

  const handleRemove = (index: number) => {
    const updated = [...editedContexts];
    updated.splice(index, 1);
    setEditedContexts(updated);
  };

  const handleContextChange = (index: number, field: keyof ContextItem, value: string) => {
    const updated = [...editedContexts];
    updated[index] = { ...updated[index], [field]: value };
    setEditedContexts(updated);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Context Adaptation</CardTitle>
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
          Define how your tone adapts to different scenarios and contexts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-6">
            {editedContexts.map((item, index) => (
              <div key={index} className="space-y-3 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Input
                    value={item.context}
                    onChange={(e) => handleContextChange(index, 'context', e.target.value)}
                    placeholder="e.g., Error messages, Onboarding, etc."
                    className="flex-1"
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
                <Textarea
                  value={item.tone}
                  onChange={(e) => handleContextChange(index, 'tone', e.target.value)}
                  placeholder="Describe the tone for this context"
                  className="min-h-[80px]"
                />
              </div>
            ))}
            <div className="space-y-3 pt-2">
              <Input
                value={newContext.context}
                onChange={(e) => setNewContext({ ...newContext, context: e.target.value })}
                placeholder="Add new context (e.g., 'Product Updates')"
              />
              <Textarea
                value={newContext.tone}
                onChange={(e) => setNewContext({ ...newContext, tone: e.target.value })}
                placeholder="Describe the tone for this context"
                className="min-h-[80px]"
              />
              <Button
                variant="outline"
                onClick={handleAdd}
                className="w-full"
                disabled={newContext.context.trim() === ''}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Context
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {contexts.map((item, index) => (
              <div key={index} className="pb-3 border-b last:border-b-0 last:pb-0">
                <h4 className="font-medium text-sm">{item.context}</h4>
                <p className="text-muted-foreground mt-1">{item.tone}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 