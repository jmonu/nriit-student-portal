
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarEntry } from '@/lib/types';
import { Plus, X, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CalendarPage: React.FC = () => {
  const { toast } = useToast();
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([
    {
      id: '1',
      entry: 'First Semester Begins',
      date: '2025-07-01'
    },
    {
      id: '2',
      entry: 'Mid-term Examinations',
      date: '2025-09-15'
    },
    {
      id: '3',
      entry: 'Diwali Holidays',
      date: '2025-10-20'
    },
    {
      id: '4',
      entry: 'End Semester Examinations',
      date: '2025-12-10'
    }
  ]);

  const [formData, setFormData] = useState({
    entry: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: CalendarEntry = {
      id: Date.now().toString(),
      entry: formData.entry,
      date: formData.date
    };
    
    setCalendarEntries([...calendarEntries, newEntry]);
    setFormData({ 
      entry: '', 
      date: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: "Calendar Entry Added",
      description: "The academic calendar has been updated."
    });
  };
  
  const handleDeleteEntry = (entryId: string) => {
    setCalendarEntries(calendarEntries.filter(entry => entry.id !== entryId));
    
    toast({
      title: "Calendar Entry Removed",
      description: "The entry has been deleted from the academic calendar."
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Sort entries by date
  const sortedEntries = [...calendarEntries].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Academic Calendar</h1>
      
      <Tabs defaultValue="create" className="mb-8">
        <TabsList>
          <TabsTrigger value="create">Add Entry</TabsTrigger>
          <TabsTrigger value="view">View Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Add New Calendar Entry</h2>
            
            <form onSubmit={handleCreateEntry}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="entry" className="block text-sm font-medium mb-1">Event Description</label>
                  <input
                    id="entry"
                    name="entry"
                    type="text"
                    required
                    value={formData.entry}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g. First Semester Begins"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Entry
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Academic Calendar Entries</h2>
            
            {sortedEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No calendar entries yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEntries.map(entry => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-primary" />
                          {formatDate(entry.date)}
                        </div>
                      </TableCell>
                      <TableCell>{entry.entry}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          aria-label="Delete calendar entry"
                        >
                          <X size={18} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarPage;
