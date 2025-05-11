
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from '@/lib/types';
import { Plus, X, Calendar } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      text: 'Annual Sports Day',
      date: '2025-06-15',
      image: 'https://i.ibb.co/Tx65QwNn/1e27abec6e44.jpg'
    },
    {
      id: '2',
      text: 'Technical Symposium',
      date: '2025-07-10'
    }
  ]);

  const [formData, setFormData] = useState({
    text: '',
    date: new Date().toISOString().split('T')[0],
    image: ''
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Event = {
      id: Date.now().toString(),
      text: formData.text,
      date: formData.date,
      image: formData.image || undefined
    };
    
    setEvents([...events, newEvent]);
    setFormData({ 
      text: '', 
      date: new Date().toISOString().split('T')[0], 
      image: '' 
    });
    
    toast({
      title: "Event Created",
      description: "The event has been added successfully."
    });
  };
  
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    
    toast({
      title: "Event Deleted",
      description: "The event has been removed successfully."
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
  
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>
      
      <Tabs defaultValue="create" className="mb-8">
        <TabsList>
          <TabsTrigger value="create">Create Event</TabsTrigger>
          <TabsTrigger value="view">View Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Create New Event</h2>
            
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label htmlFor="text" className="block text-sm font-medium mb-1">Event Description</label>
                <textarea
                  id="text"
                  name="text"
                  rows={4}
                  required
                  value={formData.text}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded resize-none"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium mb-1">Event Date</label>
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
              
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL (Optional)</label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com/image.jpg"
                />
                
                {formData.image && (
                  <div className="mt-2">
                    <p className="text-sm mb-1">Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Event preview" 
                      className="max-h-40 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        toast({
                          title: "Image Error",
                          description: "Failed to load the image. Please check the URL.",
                          variant: "destructive"
                        });
                      }} 
                    />
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Create Event
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            
            {sortedEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No events have been scheduled.
              </div>
            ) : (
              <div className="space-y-4">
                {sortedEvents.map(event => (
                  <div key={event.id} className="border rounded p-4 relative">
                    <div className="flex justify-between">
                      <div className="text-sm text-primary font-medium flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(event.date)}
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete event"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">{event.text}</p>
                    </div>
                    {event.image && (
                      <div className="mt-3">
                        <img 
                          src={event.image} 
                          alt="Event attachment" 
                          className="max-h-40 rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
