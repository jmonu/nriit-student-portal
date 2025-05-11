
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/lib/types';
import { Check, X, Plus } from 'lucide-react';

interface UserFormData {
  roll_no: string;
  name: string;
  email: string;
  phone: string;
  type: 'student' | 'teacher' | 'admin';
  branch?: 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';
  year?: 1 | 2 | 3 | 4;
}

const initialUserFormData: UserFormData = {
  roll_no: '',
  name: '',
  email: '',
  phone: '',
  type: 'student',
  branch: 'CSE',
  year: 1
};

const UsersPage: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      roll_no: 'ADMIN001',
      name: 'Admin User',
      email: 'admin@nriit.edu',
      phone: '9876543210',
      type: 'admin'
    },
    {
      id: '2',
      roll_no: 'T001',
      name: 'Teacher User',
      email: 'teacher@nriit.edu',
      phone: '9876543211',
      type: 'teacher'
    },
    {
      id: '3',
      roll_no: 'S001',
      name: 'Student User',
      email: 'student@nriit.edu',
      phone: '9876543212',
      type: 'student',
      branch: 'CSE',
      year: 2
    }
  ]);

  const [formData, setFormData] = useState<UserFormData>(initialUserFormData);
  
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random ID
    const newUser: User = {
      id: Date.now().toString(),
      ...formData
    };
    
    setUsers([...users, newUser]);
    setFormData(initialUserFormData);
    
    // Log the user creation for demonstration
    console.log('Created user:', newUser);
    
    toast({
      title: "User Created",
      description: `${formData.name} (${formData.roll_no}) has been created successfully.`
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User Deleted",
      description: `${userToDelete?.name} (${userToDelete?.roll_no}) has been removed.`
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: any = value;
    if (name === 'year' && value) {
      parsedValue = parseInt(value) as 1 | 2 | 3 | 4;
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <Tabs defaultValue="create" className="mb-8">
        <TabsList>
          <TabsTrigger value="create">Create User</TabsTrigger>
          <TabsTrigger value="view">View Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Create New User</h2>
            
            <form onSubmit={handleCreateUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="roll_no" className="block text-sm font-medium mb-1">Roll Number</label>
                  <input
                    id="roll_no"
                    name="roll_no"
                    type="text"
                    required
                    value={formData.roll_no}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-1">User Type</label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                {formData.type === 'student' && (
                  <>
                    <div>
                      <label htmlFor="branch" className="block text-sm font-medium mb-1">Branch</label>
                      <select
                        id="branch"
                        name="branch"
                        required
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium mb-1">Year</label>
                      <select
                        id="year"
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
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
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Create User
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">User List</h2>
            
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
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.roll_no}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium
                          ${user.type === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 
                            user.type === 'teacher' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}
                        `}>
                          {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{user.branch || 'N/A'}</TableCell>
                      <TableCell>{user.year || 'N/A'}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          aria-label="Delete user"
                        >
                          <X size={18} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPage;
