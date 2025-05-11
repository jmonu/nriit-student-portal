
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notice } from '@/lib/types';
import { Plus, X, Calendar } from 'lucide-react';

const NoticesPage: React.FC = () => {
  const { toast } = useToast();
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      text: 'College will be closed on May 15 for maintenance',
      date: '2025-05-10',
      image: 'https://i.ibb.co/LdpGgBcp/d65fba037fab.jpg'
    },
    {
      id: '2',
      text: 'Exam schedules now available on the portal',
      date: '2025-05-05'
    }
  ]);

  const [formData, setFormData] = useState({
    text: '',
    image: ''
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNotice: Notice = {
      id: Date.now().toString(),
      text: formData.text,
      date: new Date().toISOString().split('T')[0],
      image: formData.image || undefined
    };
    
    setNotices([newNotice, ...notices]);
    setFormData({ text: '', image: '' });
    
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
                <label htmlFor="text" className="block text-sm font-medium mb-1">Notice Text</label>
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
                      alt="Notice preview" 
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
                Publish Notice
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Notice List</h2>
            
            {notices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notices have been published yet.
              </div>
            ) : (
              <div className="space-y-4">
                {notices.map(notice => (
                  <div key={notice.id} className="border rounded p-4 relative">
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(notice.date)}
                      </div>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete notice"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-2">
                      <p>{notice.text}</p>
                    </div>
                    {notice.image && (
                      <div className="mt-3">
                        <img 
                          src={notice.image} 
                          alt="Notice attachment" 
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

export default NoticesPage;
