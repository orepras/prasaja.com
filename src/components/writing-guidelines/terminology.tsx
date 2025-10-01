'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash, Edit, Save } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type TermStatus = 'approved' | 'limitedUse' | 'prohibited';

interface TermItem {
  term: string;
  definition: string;
  usageNotes: string;
  status: TermStatus;
}

interface TerminologyProps {
  data: TermItem[];
  updateData: (newData: TermItem[]) => void;
}

export default function Terminology({ data, updateData }: TerminologyProps) {
  const [terms, setTerms] = useState<TermItem[]>(data);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newTerm, setNewTerm] = useState<TermItem>({
    term: '',
    definition: '',
    usageNotes: '',
    status: 'approved'
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Update the main state when editing is finished
  const saveChanges = () => {
    updateData(terms);
  };

  // Handle editing a term
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  // Save edited term
  const handleSaveEdit = () => {
    setEditingIndex(null);
    saveChanges();
  };

  // Update a term field
  const handleUpdateTerm = (index: number, field: keyof TermItem, value: string) => {
    const updatedTerms = [...terms];
    
    if (field === 'status') {
      updatedTerms[index][field] = value as TermStatus;
    } else {
      updatedTerms[index][field] = value;
    }
    
    setTerms(updatedTerms);
  };

  // Delete a term
  const handleDeleteTerm = (index: number) => {
    const updatedTerms = [...terms];
    updatedTerms.splice(index, 1);
    setTerms(updatedTerms);
    saveChanges();
  };

  // Handle adding a new term
  const handleAddTerm = () => {
    if (newTerm.term.trim() === '') return;
    
    const updatedTerms = [...terms, { ...newTerm }];
    setTerms(updatedTerms);
    setNewTerm({
      term: '',
      definition: '',
      usageNotes: '',
      status: 'approved'
    });
    setIsAddingNew(false);
    saveChanges();
  };

  // Render status badge with appropriate color
  const StatusBadge = ({ status }: { status: TermStatus }) => {
    const getStatusColor = (status: TermStatus) => {
      switch (status) {
        case 'approved':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'limitedUse':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'prohibited':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
          return '';
      }
    };

    return (
      <Badge variant="outline" className={`${getStatusColor(status)}`}>
        {status === 'approved' ? 'Approved' : 
         status === 'limitedUse' ? 'Limited Use' : 'Prohibited'}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Terminology</h2>
          <p className="text-muted-foreground">
            Define the specific terms used in your product and industry. (optimized for desktop view)
          </p>
        </div>
        <Button onClick={() => setIsAddingNew(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Term
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product & Industry Terms</CardTitle>
          <CardDescription>
            Create a comprehensive glossary of terms with usage guidelines and approval status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAddingNew && (
            <Card className="mb-6 border-dashed border-2">
              <CardHeader>
                <CardTitle>Add New Term</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Term</label>
                    <Input 
                      value={newTerm.term}
                      onChange={(e) => setNewTerm({...newTerm, term: e.target.value})}
                      placeholder="e.g., User, Dashboard, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select 
                      value={newTerm.status}
                      onValueChange={(value) => setNewTerm({...newTerm, status: value as TermStatus})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="limitedUse">Limited Use</SelectItem>
                        <SelectItem value="prohibited">Prohibited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Definition</label>
                  <Textarea 
                    value={newTerm.definition}
                    onChange={(e) => setNewTerm({...newTerm, definition: e.target.value})}
                    placeholder="Concise definition of the term"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Usage Notes</label>
                  <Textarea 
                    value={newTerm.usageNotes}
                    onChange={(e) => setNewTerm({...newTerm, usageNotes: e.target.value})}
                    placeholder="Context, examples, or alternatives"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTerm}>
                  Add Term
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Term</TableHead>
                  <TableHead className="w-[250px]">Definition</TableHead>
                  <TableHead className="w-[250px]">Usage Notes</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No terms added yet. Click "Add Term" to create your terminology list.
                    </TableCell>
                  </TableRow>
                ) : (
                  terms.map((term, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {editingIndex === index ? (
                          <Input 
                            value={term.term}
                            onChange={(e) => handleUpdateTerm(index, 'term', e.target.value)}
                          />
                        ) : (
                          term.term
                        )}
                      </TableCell>
                      <TableCell>
                        {editingIndex === index ? (
                          <Textarea 
                            value={term.definition}
                            onChange={(e) => handleUpdateTerm(index, 'definition', e.target.value)}
                            className="min-h-[80px]"
                          />
                        ) : (
                          term.definition
                        )}
                      </TableCell>
                      <TableCell>
                        {editingIndex === index ? (
                          <Textarea 
                            value={term.usageNotes}
                            onChange={(e) => handleUpdateTerm(index, 'usageNotes', e.target.value)}
                            className="min-h-[80px]"
                          />
                        ) : (
                          term.usageNotes
                        )}
                      </TableCell>
                      <TableCell>
                        {editingIndex === index ? (
                          <Select 
                            value={term.status}
                            onValueChange={(value) => handleUpdateTerm(index, 'status', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="limitedUse">Limited Use</SelectItem>
                              <SelectItem value="prohibited">Prohibited</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <StatusBadge status={term.status} />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {editingIndex === index ? (
                            <Button size="icon" variant="ghost" onClick={handleSaveEdit}>
                              <Save className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button size="icon" variant="ghost" onClick={() => handleEdit(index)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteTerm(index)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 