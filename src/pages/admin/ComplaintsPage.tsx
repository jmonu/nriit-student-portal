
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Check, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Complaint {
  id: string;
  student_id: string;
  student_name: string;
  subject: string;
  message: string;
  date: string;
  status: 'pending' | 'resolved' | 'rejected';
}

const mockComplaints: Complaint[] = [
  {
    id: '1',
    student_id: 'S001',
    student_name: 'John Doe',
    subject: 'Library Access Issue',
    message: 'I am unable to access the library database for my research project. Please help resolve this issue.',
    date: '2025-05-01',
    status: 'pending'
  },
  {
    id: '2',
    student_id: 'S002',
    student_name: 'Jane Smith',
    subject: 'Classroom Equipment',
    message: 'The projector in Room 203 is not working properly. This is affecting our presentations.',
    date: '2025-05-02',
    status: 'pending'
  },
  {
    id: '3',
    student_id: 'S003',
    student_name: 'Mark Johnson',
    subject: 'Internet Connectivity',
    message: 'The WiFi in the dormitory has been extremely slow for the past week.',
    date: '2025-04-28',
    status: 'resolved'
  },
  {
    id: '4',
    student_id: 'S004',
    student_name: 'Sarah Williams',
    subject: 'Cafeteria Food Quality',
    message: 'I would like to report that the food quality in the cafeteria has deteriorated recently.',
    date: '2025-04-25',
    status: 'rejected'
  },
];

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: 'pending' | 'resolved' | 'rejected') => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    ));
    
    toast({
      title: "Status updated",
      description: `Complaint status has been updated to ${newStatus}`,
    });

    if (selectedComplaint?.id === id) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus });
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (activeTab === 'all') return true;
    return complaint.status === activeTab;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Complaints Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare size={20} />
                <span>Complaints</span>
              </CardTitle>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <div 
                      key={complaint.id}
                      onClick={() => setSelectedComplaint(complaint)}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedComplaint?.id === complaint.id 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{complaint.subject}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' : 
                          complaint.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                        }`}>
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{complaint.student_name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{new Date(complaint.date).toLocaleDateString()}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No complaints found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            
            <CardContent>
              {selectedComplaint ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-1">{selectedComplaint.subject}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div>From: <span className="font-medium">{selectedComplaint.student_name}</span> ({selectedComplaint.student_id})</div>
                      <div>Date: {new Date(selectedComplaint.date).toLocaleDateString()}</div>
                      <div className={`px-2 py-1 rounded ${
                        selectedComplaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' : 
                        selectedComplaint.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                      }`}>
                        Status: {selectedComplaint.status.charAt(0).toUpperCase() + selectedComplaint.status.slice(1)}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 mb-6">
                      <p className="whitespace-pre-wrap">{selectedComplaint.message}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {selectedComplaint.status !== 'resolved' && (
                        <Button
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusChange(selectedComplaint.id, 'resolved')}
                        >
                          <Check size={16} className="mr-2" /> Mark as Resolved
                        </Button>
                      )}
                      
                      {selectedComplaint.status !== 'pending' && (
                        <Button
                          variant="outline"
                          onClick={() => handleStatusChange(selectedComplaint.id, 'pending')}
                        >
                          <AlertTriangle size={16} className="mr-2" /> Mark as Pending
                        </Button>
                      )}
                      
                      {selectedComplaint.status !== 'rejected' && (
                        <Button
                          variant="destructive"
                          onClick={() => handleStatusChange(selectedComplaint.id, 'rejected')}
                        >
                          <X size={16} className="mr-2" /> Reject Complaint
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* You could add a reply form here if needed */}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  Select a complaint to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;
