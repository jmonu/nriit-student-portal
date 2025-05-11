
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Faculty } from '@/lib/types';
import { Plus, X, User } from 'lucide-react';

const FacultyPage: React.FC = () => {
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      designation: 'Professor & HOD, CSE',
      bio: 'Ph.D. in Computer Science with 15+ years of teaching experience. Specializes in AI and Machine Learning.',
      photo: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      name: 'Dr. Priya Singh',
      designation: 'Associate Professor, ECE',
      bio: 'Ph.D. in Electronics with focus on VLSI Design. Published over 30 research papers in international journals.',
      photo: 'https://i.pravatar.cc/150?img=5'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    bio: '',
    photo: ''
  });

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: formData.name,
      designation: formData.designation,
      bio: formData.bio,
      photo: formData.photo || undefined
    };
    
    setFaculty([...faculty, newFaculty]);
    setFormData({ name: '', designation: '', bio: '', photo: '' });
    
    toast({
      title: "Faculty Added",
      description: `${formData.name} has been added to the faculty list.`
    });
  };
  
  const handleDeleteFaculty = (facultyId: string) => {
    const facultyToDelete = faculty.find(f => f.id === facultyId);
    setFaculty(faculty.filter(f => f.id !== facultyId));
    
    toast({
      title: "Faculty Removed",
      description: `${facultyToDelete?.name} has been removed from the faculty list.`
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Faculty Management</h1>
      
      <Tabs defaultValue="create" className="mb-8">
        <TabsList>
          <TabsTrigger value="create">Add Faculty</TabsTrigger>
          <TabsTrigger value="view">View Faculty</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Add New Faculty</h2>
            
            <form onSubmit={handleCreateFaculty}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
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
                  <label htmlFor="designation" className="block text-sm font-medium mb-1">Designation</label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    required
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g. Professor & HOD, CSE"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  required
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded resize-none"
                  placeholder="Brief description about the faculty member's education and experience"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-medium mb-1">Photo URL</label>
                <input
                  id="photo"
                  name="photo"
                  type="text"
                  value={formData.photo}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com/photo.jpg"
                />
                
                {formData.photo && (
                  <div className="mt-2 flex items-center">
                    <p className="text-sm mr-2">Preview:</p>
                    <img 
                      src={formData.photo} 
                      alt="Faculty preview" 
                      className="h-16 w-16 rounded-full object-cover"
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
                Add Faculty
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Faculty List</h2>
            
            {faculty.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No faculty members added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faculty.map(member => (
                  <div key={member.id} className="border rounded p-4 relative">
                    <button
                      onClick={() => handleDeleteFaculty(member.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      aria-label="Delete faculty"
                    >
                      <X size={18} />
                    </button>
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <div className="shrink-0">
                        {member.photo ? (
                          <img 
                            src={member.photo} 
                            alt={member.name} 
                            className="h-24 w-24 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<div class="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><span class="text-3xl">${member.name.charAt(0)}</span></div>`;
                            }}
                          />
                        ) : (
                          <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <User size={32} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-medium text-lg">{member.name}</h3>
                        <p className="text-sm text-primary mb-2">{member.designation}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
                      </div>
                    </div>
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

export default FacultyPage;
