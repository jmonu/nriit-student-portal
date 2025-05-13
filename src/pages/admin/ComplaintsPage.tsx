
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Complaint, User } from '@/lib/types';
import dbService from '@/lib/database/db-service';
import { Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const ComplaintsPage: React.FC = () => {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    // Load all complaints
    const loadComplaints = () => {
      const allComplaints = dbService.getComplaints();
      setComplaints(allComplaints);
    };

    // Load all students for reference
    const loadStudents = () => {
      const allUsers = dbService.getUsers();
      const studentUsers = allUsers.filter(user => user.type === 'student');
      setStudents(studentUsers);
    };

    loadComplaints();
    loadStudents();
  }, []);

  const getStudentName = (studentId: string): string => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setViewModalOpen(true);
  };

  const handleDeleteComplaint = (id: string) => {
    const success = dbService.deleteComplaint(id);
    if (success) {
      setComplaints(complaints.filter(complaint => complaint.id !== id));
      toast({
        title: "Complaint deleted",
        description: "The complaint has been successfully deleted."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete complaint.",
        variant: "destructive"
      });
    }
  };

  // Filter complaints based on search query
  const filteredComplaints = complaints.filter(complaint => {
    const studentName = getStudentName(complaint.student_id).toLowerCase();
    const subject = complaint.subject.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return (studentName.includes(query) || subject.includes(query));
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Complaints</h1>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by student name or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      {/* Complaints table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{formatDate(complaint.date)}</TableCell>
                  <TableCell>{getStudentName(complaint.student_id)}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewComplaint(complaint)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteComplaint(complaint.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No complaints found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Complaint Dialog */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{formatDate(selectedComplaint.date)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Student</p>
                <p>{getStudentName(selectedComplaint.student_id)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p>{selectedComplaint.subject}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Message</p>
                <p className="whitespace-pre-wrap">{selectedComplaint.message}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplaintsPage;
