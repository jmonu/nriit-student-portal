
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { User } from '@/lib/types';

// Mock user data - in a real app this would come from an API
const mockUsers: User[] = [
  {
    id: '2',
    roll_no: 'T001',
    name: 'Teacher User',
    email: 'teacher@nriit.edu',
    phone: '9876543211',
    type: 'teacher',
  },
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

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [newUser, setNewUser] = useState({
    roll_no: '',
    name: '',
    email: '',
    phone: '',
    type: 'student',
    branch: 'CSE',
    year: 1
  });

  // Filter users based on type
  const students = users.filter(user => user.type === 'student');
  const teachers = users.filter(user => user.type === 'teacher');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call
    const newUserWithId: User = {
      id: `${Date.now()}`,
      ...newUser,
      year: newUser.type === 'student' ? newUser.year as 1 | 2 | 3 | 4 : undefined,
      branch: newUser.type === 'student' ? newUser.branch as 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL' : undefined
    };

    setUsers(prev => [...prev, newUserWithId]);
    
    // Reset form
    setNewUser({
      roll_no: '',
      name: '',
      email: '',
      phone: '',
      type: 'student',
      branch: 'CSE',
      year: 1
    });

    console.log('Created user:', newUserWithId);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would make an API call
    setUsers(users.filter(user => user.id !== userId));
    console.log('Deleted user ID:', userId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Roll Number</label>
              <input
                type="text"
                name="roll_no"
                value={newUser.roll_no}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                value={newUser.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            
            {newUser.type === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Branch</label>
                  <select
                    name="branch"
                    value={newUser.branch}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <select
                    name="year"
                    value={newUser.year}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </>
            )}
          </div>
          
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Create User
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <UserTable users={users} onDelete={handleDeleteUser} />
          </TabsContent>
          
          <TabsContent value="students">
            <UserTable users={students} onDelete={handleDeleteUser} />
          </TabsContent>
          
          <TabsContent value="teachers">
            <UserTable users={teachers} onDelete={handleDeleteUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Roll No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.roll_no}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="capitalize">{user.type}</TableCell>
                <TableCell>{user.branch || '-'}</TableCell>
                <TableCell>{user.year || '-'}</TableCell>
                <TableCell>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-500 hover:text-red-700 mr-2"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
