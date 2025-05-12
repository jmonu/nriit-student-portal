
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { User } from '@/lib/types';
import { Check, X, Plus, Upload, User as UserIcon } from 'lucide-react';

interface UserFormData {
  roll_no: string;
  name: string;
  email: string;
  phone: string;
  type: 'student' | 'teacher' | 'admin';
  branch?: 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';
  year?: 1 | 2 | 3 | 4;
  photo?: string;
}

const initialUserFormData: UserFormData = {
  roll_no: '',
  name: '',
  email: '',
  phone: '',
  type: 'student',
  branch: 'CSE',
  year: 1,
  photo: ''
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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for photo if user type is student
    if (formData.type === 'student' && !formData.photo) {
      toast({
        title: "Photo Required",
        description: "Please upload a photo for the student profile.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a random ID
    const newUser: User = {
      id: Date.now().toString(),
      ...formData
    };
    
    setUsers([...users, newUser]);
    setFormData(initialUserFormData);
    setPhotoPreview(null);
    
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Photo should be less than 2MB in size.",
        variant: "destructive"
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }

    // Create a URL for the image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setFormData({
        ...formData,
        photo: result
      });
    };
    reader.readAsDataURL(file);
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
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-2 relative">
                  <Avatar className="w-24 h-24">
                    {photoPreview ? (
                      <AvatarImage src={photoPreview} alt="Profile preview" />
                    ) : (
                      <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                        <UserIcon className="w-12 h-12 text-gray-400" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label 
                    htmlFor="photo-upload" 
                    className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
                    title="Upload photo"
                  >
                    <Upload size={16} />
                  </label>
                  <Input
                    id="photo-upload"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.type === 'student' ? 'Profile photo (required)' : 'Profile photo (optional)'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="roll_no" className="block text-sm font-medium mb-1">Roll Number</label>
                  <Input
                    id="roll_no"
                    name="roll_no"
                    type="text"
                    required
                    value={formData.roll_no}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
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
                    <TableHead>Photo</TableHead>
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
                      <TableCell>
                        <Avatar className="w-10 h-10">
                          {user.photo ? (
                            <AvatarImage src={user.photo} alt={user.name} />
                          ) : (
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>
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
