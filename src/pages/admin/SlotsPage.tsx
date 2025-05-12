
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Slot } from '@/lib/types';
import dbService from '@/lib/database/db-service';
import { useToast } from '@/hooks/use-toast';

const SlotsPage: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [newSlot, setNewSlot] = useState({
    name: '',
    time: '',
  });
  const { toast } = useToast();

  // Load slots from database on component mount
  useEffect(() => {
    setSlots(dbService.getSlots());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new slot to database
    const createdSlot = dbService.addSlot(newSlot);
    
    // Update local state
    setSlots(dbService.getSlots());
    
    // Reset form
    setNewSlot({
      name: '',
      time: '',
    });

    toast({
      title: "Slot Created",
      description: `Time slot "${createdSlot.name}" has been created successfully.`
    });
  };

  const handleDeleteSlot = (slotId: string) => {
    // Delete slot from database
    dbService.deleteSlot(slotId);
    
    // Update local state
    setSlots(dbService.getSlots());
    
    toast({
      title: "Slot Deleted",
      description: "The time slot has been deleted successfully."
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Time Slots Management</h1>
      
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Create New Time Slot</h2>
        <form onSubmit={handleCreateSlot} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slot Name</label>
              <input
                type="text"
                name="name"
                value={newSlot.name}
                onChange={handleInputChange}
                placeholder="e.g., Period 1"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="text"
                name="time"
                value={newSlot.time}
                onChange={handleInputChange}
                placeholder="e.g., 9:00–9:50 AM"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Create Slot
          </button>
        </form>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800 p-4">
        <h2 className="text-xl font-semibold mb-4">Existing Time Slots</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slot ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slots.length > 0 ? (
              slots.map((slot) => (
                <TableRow key={slot.slot_id}>
                  <TableCell>{slot.slot_id}</TableCell>
                  <TableCell>{slot.name}</TableCell>
                  <TableCell>{slot.time}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteSlot(slot.slot_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No time slots found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SlotsPage;
