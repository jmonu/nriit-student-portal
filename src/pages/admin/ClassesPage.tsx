
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Class } from '@/lib/types';
import dbService from '@/lib/database/db-service';
import { useToast } from '@/hooks/use-toast';

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClass, setNewClass] = useState({
    name: '',
    semester: '1-1',
  });
  const { toast } = useToast();

  // Load classes from database on component mount
  useEffect(() => {
    setClasses(dbService.getClasses());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClass(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new class to database
    const createdClass = dbService.addClass(newClass);
    
    // Update local state
    setClasses(dbService.getClasses());
    
    // Reset form
    setNewClass({
      name: '',
      semester: '1-1',
    });

    toast({
      title: "Class Created",
      description: `Class "${createdClass.name}" has been created successfully.`
    });
  };

  const handleDeleteClass = (classId: string) => {
    // Delete class from database
    dbService.deleteClass(classId);
    
    // Update local state
    setClasses(dbService.getClasses());
    
    toast({
      title: "Class Deleted",
      description: "The class has been deleted successfully."
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Class Management</h1>
      
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Create New Class</h2>
        <form onSubmit={handleCreateClass} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Class Name</label>
              <input
                type="text"
                name="name"
                value={newClass.name}
                onChange={handleInputChange}
                placeholder="e.g., CSE-A"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <select
                name="semester"
                value={newClass.semester}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="1-1">1-1</option>
                <option value="1-2">1-2</option>
                <option value="2-1">2-1</option>
                <option value="2-2">2-2</option>
                <option value="3-1">3-1</option>
                <option value="3-2">3-2</option>
                <option value="4-1">4-1</option>
                <option value="4-2">4-2</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Create Class
          </button>
        </form>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800 p-4">
        <h2 className="text-xl font-semibold mb-4">Existing Classes</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.length > 0 ? (
              classes.map((cls) => (
                <TableRow key={cls.class_id}>
                  <TableCell>{cls.class_id}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.semester}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteClass(cls.class_id)}
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
                  No classes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClassesPage;
