
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { User, Class } from '@/lib/types';

// Mock data - in a real app this would come from an API
const mockStudents: User[] = [
  {
    id: '3',
    roll_no: 'S001',
    name: 'Student User',
    email: 'student@nriit.edu',
    phone: '9876543212',
    type: 'student',
    branch: 'CSE',
    year: 2,
  },
  {
    id: '4',
    roll_no: 'S002',
    name: 'Another Student',
    email: 'student2@nriit.edu',
    phone: '9876543213',
    type: 'student',
    branch: 'ECE',
    year: 1,
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
  },
  {
    class_id: '3',
    name: 'CSE-B',
    semester: '2-1',
  },
];

// Mock student-class assignments
const mockAssignments: { id: string; student_id: string; class_id: string }[] = [
  {
    id: '1',
    student_id: '3',
    class_id: '1',
  }
];

const ClassAssignmentPage: React.FC = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [newAssignment, setNewAssignment] = useState({
    student_id: '',
    class_id: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if assignment already exists
    const exists = assignments.some(
      a => a.student_id === newAssignment.student_id && a.class_id === newAssignment.class_id
    );
    
    if (exists) {
      alert('This student is already assigned to this class.');
      return;
    }
    
    // In a real app, this would make an API call
    const assignment = {
      id: `${Date.now()}`,
      ...newAssignment
    };
    
    setAssignments(prev => [...prev, assignment]);
    
    // Reset form
    setNewAssignment({
      student_id: '',
      class_id: ''
    });
    
    console.log('Created assignment:', assignment);
  };

  const handleDeleteAssignment = (id: string) => {
    // In a real app, this would make an API call
    setAssignments(assignments.filter(a => a.id !== id));
    console.log('Deleted assignment ID:', id);
  };

  // Get student and class details for display
  const getStudentName = (id: string) => {
    const student = mockStudents.find(s => s.id === id);
    return student ? `${student.roll_no} - ${student.name}` : 'Unknown Student';
  };
  
  const getClassName = (id: string) => {
    const cls = mockClasses.find(c => c.class_id === id);
    return cls ? `${cls.name} (${cls.semester})` : 'Unknown Class';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Class Assignment</h1>
      
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Assign Student to Class</h2>
        <form onSubmit={handleAssign} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Student</label>
              <select
                name="student_id"
                value={newAssignment.student_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="">Select Student</option>
                {mockStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.roll_no} - {student.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Class</label>
              <select
                name="class_id"
                value={newAssignment.class_id}
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
          </div>
          
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Assign Student
          </button>
        </form>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800 p-4">
        <h2 className="text-xl font-semibold mb-4">Current Assignments</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{getStudentName(assignment.student_id)}</TableCell>
                  <TableCell>{getClassName(assignment.class_id)}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No assignments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClassAssignmentPage;
