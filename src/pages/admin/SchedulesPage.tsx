
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { User, Class, Slot, Schedule } from '@/lib/types';

// Mock data - in a real app this would come from an API
const mockTeachers: User[] = [
  {
    id: '2',
    roll_no: 'T001',
    name: 'Teacher User',
    email: 'teacher@nriit.edu',
    phone: '9876543211',
    type: 'teacher',
  },
  {
    id: '5',
    roll_no: 'T002',
    name: 'Another Teacher',
    email: 'teacher2@nriit.edu',
    phone: '9876543214',
    type: 'teacher',
  }
];

const mockClasses: Class[] = [
  {
    class_id: '1',
    name: 'CSE-A',
    semester: '1-1',
  },
  {
    class_id: '2',
    name: 'ECE-A',
    semester: '1-1',
  }
];

const mockSlots: Slot[] = [
  {
    slot_id: '1',
    name: 'Period 1',
    time: '9:00–9:50 AM',
  },
  {
    slot_id: '2',
    name: 'Period 2',
    time: '9:50–10:40 AM',
  }
];

// Mock schedules
const mockSchedules: Schedule[] = [
  {
    schedule_id: '1',
    class_id: '1',
    slot_id: '1',
    teacher_id: '2',
    subject: 'Data Structures'
  }
];

const SchedulesPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const [newSchedule, setNewSchedule] = useState({
    class_id: '',
    slot_id: '',
    teacher_id: '',
    subject: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if schedule already exists for this class-slot combination
    const exists = schedules.some(
      s => s.class_id === newSchedule.class_id && s.slot_id === newSchedule.slot_id
    );
    
    if (exists) {
      alert('This class-slot combination already has a schedule.');
      return;
    }
    
    // In a real app, this would make an API call
    const schedule: Schedule = {
      schedule_id: `${Date.now()}`,
      ...newSchedule
    };
    
    setSchedules(prev => [...prev, schedule]);
    
    // Reset form
    setNewSchedule({
      class_id: '',
      slot_id: '',
      teacher_id: '',
      subject: ''
    });
    
    console.log('Created schedule:', schedule);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    // In a real app, this would make an API call
    setSchedules(schedules.filter(s => s.schedule_id !== scheduleId));
    console.log('Deleted schedule ID:', scheduleId);
  };

  // Helper functions to get details for display
  const getClassName = (id: string) => {
    const cls = mockClasses.find(c => c.class_id === id);
    return cls ? `${cls.name} (${cls.semester})` : 'Unknown Class';
  };
  
  const getSlotName = (id: string) => {
    const slot = mockSlots.find(s => s.slot_id === id);
    return slot ? `${slot.name} (${slot.time})` : 'Unknown Slot';
  };
  
  const getTeacherName = (id: string) => {
    const teacher = mockTeachers.find(t => t.id === id);
    return teacher ? `${teacher.name} (${teacher.roll_no})` : 'Unknown Teacher';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Class Schedule Management</h1>
      
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Create New Schedule</h2>
        <form onSubmit={handleCreateSchedule} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Class</label>
              <select
                name="class_id"
                value={newSchedule.class_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="">Select Class</option>
                {mockClasses.map(cls => (
                  <option key={cls.class_id} value={cls.class_id}>
                    {cls.name} ({cls.semester})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Time Slot</label>
              <select
                name="slot_id"
                value={newSchedule.slot_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="">Select Time Slot</option>
                {mockSlots.map(slot => (
                  <option key={slot.slot_id} value={slot.slot_id}>
                    {slot.name} ({slot.time})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Teacher</label>
              <select
                name="teacher_id"
                value={newSchedule.teacher_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="">Select Teacher</option>
                {mockTeachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} ({teacher.roll_no})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={newSchedule.subject}
                onChange={handleInputChange}
                placeholder="e.g., Mathematics"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Create Schedule
          </button>
        </form>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800 p-4">
        <h2 className="text-xl font-semibold mb-4">Existing Schedules</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <TableRow key={schedule.schedule_id}>
                  <TableCell>{getClassName(schedule.class_id)}</TableCell>
                  <TableCell>{getSlotName(schedule.slot_id)}</TableCell>
                  <TableCell>{getTeacherName(schedule.teacher_id)}</TableCell>
                  <TableCell>{schedule.subject}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.schedule_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No schedules found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SchedulesPage;
