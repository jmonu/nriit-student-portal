
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert } from '@/lib/types';
import { Plus, X, AlertTriangle } from 'lucide-react';

const AlertsPage: React.FC = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      text: 'Urgent: Due to heavy rains, classes may be suspended tomorrow. Check for updates.',
      date: '2025-05-11',
    },
    {
      id: '2',
      text: 'Warning: Campus security drill scheduled on May 20th. Please cooperate.',
      date: '2025-05-09',
      image: 'https://i.ibb.co/R4cTnKyz/8668a8797c75.jpg'
    }
  ]);

  const [formData, setFormData] = useState({
    text: '',
    image: ''
  });

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAlert: Alert = {
      id: Date.now().toString(),
      text: formData.text,
      date: new Date().toISOString().split('T')[0],
      image: formData.image || undefined
    };
    
    setAlerts([newAlert, ...alerts]);
    setFormData({ text: '', image: '' });
    
    toast({
      title: "Alert Created",
      description: "The alert has been published successfully."
    });
  };
  
  const handleDeleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    
    toast({
      title: "Alert Deleted",
      description: "The alert has been removed successfully."
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
      <h1 className="text-2xl font-bold mb-6">Alert Management</h1>
      
      <Tabs defaultValue="create" className="mb-8">
        <TabsList>
          <TabsTrigger value="create">Create Alert</TabsTrigger>
          <TabsTrigger value="view">View Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Create New Alert</h2>
            
            <form onSubmit={handleCreateAlert}>
              <div className="mb-4">
                <label htmlFor="text" className="block text-sm font-medium mb-1">Alert Message</label>
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
                      alt="Alert preview" 
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
                Publish Alert
              </button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
            
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No active alerts.
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded p-4 relative">
                    <div className="flex justify-between">
                      <div className="text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertTriangle size={14} className="mr-1" />
                        {formatDate(alert.date)}
                      </div>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete alert"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-red-800 dark:text-red-200">{alert.text}</p>
                    </div>
                    {alert.image && (
                      <div className="mt-3">
                        <img 
                          src={alert.image} 
                          alt="Alert attachment" 
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

export default AlertsPage;
