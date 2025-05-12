import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notice } from '@/lib/types';
import { Plus, X, Calendar } from 'lucide-react';

const NoticesPage = () => {
  const { toast } = useToast();
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'End Semester Examination Schedule',
      content: 'The end semester examinations will commence from June 15, 2023. The detailed schedule is available on the college website.',
      date: '2023-05-20',
      category: 'academic'
    },
    {
      id: '2',
      title: 'Holiday Notice',
      content: 'The college will remain closed on May 26, 2023 on account of Buddha Purnima.',
      date: '2023-05-18',
      category: 'general'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'general'
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNotice: Notice = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      date: formData.date,
      category: formData.category as 'general' | 'academic' | 'exam' | 'event'
    };
    
    setNotices([...notices, newNotice]);
    setFormData({ 
      title: '', 
      content: '', 
      date: new Date().toISOString().split('T')[0], 
      category: 'general' 
    });
    
    toast({
      title: "Notice Created",
      description: "The notice has been published successfully."
    });
  };
  
  const handleDeleteNotice = (noticeId: string) => {
    setNotices(notices.filter(notice => notice.id !== noticeId));
    
    toast({
      title: "Notice Deleted",
      description: "The notice has been removed successfully."
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
  // Sort notices by date (most recent first)
  const sortedNotices = [...notices].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notice Management</h1>
      
      <Tabs defaultValue="create" className="mb-8">
        <TabsList>
          <TabsTrigger value="create">Create Notice</TabsTrigger>
          <TabsTrigger value="view">View Notices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Create New Notice</h2>
            
            <form onSubmit={handleCreateNotice}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">Notice Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium mb-1">Notice Content</label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  required
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="exam">Examination</option>
                    <option value="event">Event</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Publish Notice
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Published Notices</h2>
            
            {sortedNotices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notices have been published yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedNotices.map(notice => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">{formatDate(notice.date)}</TableCell>
                      <TableCell>{notice.title}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs capitalize ${
                          notice.category === 'academic' ? 'bg-blue-100 text-blue-800' :
                          notice.category === 'exam' ? 'bg-purple-100 text-purple-800' :
                          notice.category === 'event' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notice.category}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">{notice.content}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete notice"
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

export default NoticesPage;
