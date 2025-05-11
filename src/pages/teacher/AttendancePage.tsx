
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Download, Check, X, CheckSquare, Filter, UserCheck, UserX } from 'lucide-react';
import { Attendance, User } from '@/lib/types';

interface AttendanceFormData {
  classId: string;
  slotId: string;
  date: string;
  students: {
    id: string;
    name: string;
    roll_no: string;
    isPresent: boolean;
  }[];
}

const TeacherAttendancePage: React.FC = () => {
  const { toast } = useToast();
  
  // Mock class and slot data
  const classes = [
    { id: "1", name: "CSE-A" },
    { id: "2", name: "ECE-A" }
  ];
  
  const slots = [
    { id: "1", name: "Period 1" },
    { id: "2", name: "Period 2" },
    { id: "3", name: "Period 3" }
  ];
  
  // Mock student data
  const studentData: User[] = [
    { id: "1", type: "student", roll_no: "S001", name: "Student One", email: "s1@example.com", phone: "1234567890", branch: "CSE", year: 2 },
    { id: "2", type: "student", roll_no: "S002", name: "Student Two", email: "s2@example.com", phone: "1234567891", branch: "CSE", year: 2 },
    { id: "3", type: "student", roll_no: "S003", name: "Student Three", email: "s3@example.com", phone: "1234567892", branch: "CSE", year: 2 },
    { id: "4", type: "student", roll_no: "S004", name: "Student Four", email: "s4@example.com", phone: "1234567893", branch: "ECE", year: 2 },
    { id: "5", type: "student", roll_no: "S005", name: "Student Five", email: "s5@example.com", phone: "1234567894", branch: "ECE", year: 2 },
  ];
  
  // Mock attendance data
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([
    { 
      attendance_id: "1", 
      student_id: "1", 
      class_id: "1", 
      slot_id: "1", 
      date: "2025-05-10", 
      status: "present" 
    },
    { 
      attendance_id: "2", 
      student_id: "2", 
      class_id: "1", 
      slot_id: "1", 
      date: "2025-05-10", 
      status: "present" 
    },
    { 
      attendance_id: "3", 
      student_id: "3", 
      class_id: "1", 
      slot_id: "1", 
      date: "2025-05-10", 
      status: "absent" 
    },
  ]);
  
  const [formData, setFormData] = useState<AttendanceFormData>({
    classId: "",
    slotId: "",
    date: new Date().toISOString().split('T')[0],
    students: []
  });
  
  const [selectAll, setSelectAll] = useState(true);
  const [filterData, setFilterData] = useState({
    classId: "",
    date: new Date().toISOString().split('T')[0]
  });
  
  // Load students when class and slot are selected
  useEffect(() => {
    if (formData.classId) {
      // In a real app, this would be filtered based on class assignment
      const filteredStudents = studentData.map(student => ({
        id: student.id,
        name: student.name,
        roll_no: student.roll_no,
        isPresent: true
      }));
      
      setFormData(prev => ({
        ...prev,
        students: filteredStudents
      }));
    }
  }, [formData.classId, formData.slotId]);
  
  const handleSelectAllToggle = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    setFormData(prev => ({
      ...prev,
      students: prev.students.map(student => ({
        ...student,
        isPresent: newSelectAll
      }))
    }));
  };
  
  const handleStudentToggle = (studentId: string) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map(student => 
        student.id === studentId 
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    }));
    
    // Update selectAll state based on all students' status
    const updatedStudents = formData.students.map(student => 
      student.id === studentId 
        ? { ...student, isPresent: !student.isPresent }
        : student
    );
    
    const allSelected = updatedStudents.every(student => student.isPresent);
    setSelectAll(allSelected);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new attendance records
    const newRecords = formData.students.map(student => ({
      attendance_id: Date.now().toString() + student.id,
      student_id: student.id,
      class_id: formData.classId,
      slot_id: formData.slotId,
      date: formData.date,
      status: student.isPresent ? "present" as const : "absent" as const
    }));
    
    setAttendanceRecords([...attendanceRecords, ...newRecords]);
    
    // Count present and absent
    const presentCount = formData.students.filter(s => s.isPresent).length;
    const absentCount = formData.students.length - presentCount;
    
    toast({
      title: "Attendance Recorded",
      description: `Present: ${presentCount}, Absent: ${absentCount}`
    });
    
    // Reset form
    setFormData({
      classId: "",
      slotId: "",
      date: new Date().toISOString().split('T')[0],
      students: []
    });
  };
  
  const getFilteredAttendance = () => {
    return attendanceRecords.filter(record => 
      (filterData.classId === "" || record.class_id === filterData.classId) &&
      (record.date === filterData.date)
    );
  };
  
  const getStudentById = (id: string) => {
    return studentData.find(student => student.id === id);
  };
  
  const getClassName = (id: string) => {
    return classes.find(c => c.id === id)?.name || "Unknown";
  };
  
  const getSlotName = (id: string) => {
    return slots.find(s => s.id === id)?.name || "Unknown";
  };
  
  const exportAttendance = () => {
    // In a real app, this would export to CSV
    alert('Attendance export functionality would be implemented here');
  };
  
  // Count summary for filtered records
  const filteredRecords = getFilteredAttendance();
  const presentCount = filteredRecords.filter(r => r.status === "present").length;
  const absentCount = filteredRecords.filter(r => r.status === "absent").length;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>
      
      <Tabs defaultValue="take" className="mb-8">
        <TabsList>
          <TabsTrigger value="take">Take Attendance</TabsTrigger>
          <TabsTrigger value="view">View Attendance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="take">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Take Attendance</h2>
            
            <form onSubmit={handleSubmitAttendance}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="classId" className="block text-sm font-medium mb-1">Class</label>
                  <select
                    id="classId"
                    name="classId"
                    required
                    value={formData.classId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="slotId" className="block text-sm font-medium mb-1">Slot</label>
                  <select
                    id="slotId"
                    name="slotId"
                    required
                    value={formData.slotId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    disabled={!formData.classId}
                  >
                    <option value="">Select Slot</option>
                    {slots.map(slot => (
                      <option key={slot.id} value={slot.id}>{slot.name}</option>
                    ))}
                  </select>
                </div>
                
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
              </div>
              
              {formData.classId && formData.slotId && formData.students.length > 0 ? (
                <>
                  <div className="mb-4 flex items-center">
                    <div className="flex items-center">
                      <input
                        id="selectAll"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllToggle}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="selectAll" className="font-medium">Select All (Mark as Present)</label>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      Total Students: {formData.students.length}
                    </div>
                  </div>
                  
                  <div className="border rounded mb-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll No</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Attendance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.students.map(student => (
                          <TableRow key={student.id}>
                            <TableCell>{student.roll_no}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-right">
                              <button
                                type="button"
                                onClick={() => handleStudentToggle(student.id)}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  student.isPresent 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                              >
                                {student.isPresent ? (
                                  <span className="flex items-center">
                                    <Check size={14} className="mr-1" />
                                    Present
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <X size={14} className="mr-1" />
                                    Absent
                                  </span>
                                )}
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <CheckSquare size={18} />
                    Submit Attendance
                  </button>
                </>
              ) : (
                formData.classId && (
                  <div className="text-center py-8 text-gray-500">
                    {formData.students.length === 0 ? 
                      "No students found for this class. Please select a slot or add students to this class." : 
                      "Please select class and slot to view students."}
                  </div>
                )
              )}
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">View Attendance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="filterClassId" className="block text-sm font-medium mb-1">Filter by Class</label>
                <select
                  id="filterClassId"
                  name="classId"
                  value={filterData.classId}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All Classes</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="filterDate" className="block text-sm font-medium mb-1">Filter by Date</label>
                <input
                  id="filterDate"
                  name="date"
                  type="date"
                  value={filterData.date}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-sm">Present: {presentCount}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-sm">Absent: {absentCount}</span>
                </div>
              </div>
              
              <button 
                onClick={exportAttendance} 
                className="flex items-center text-sm text-primary hover:underline"
              >
                <Download size={14} className="mr-1" />
                Export as CSV
              </button>
            </div>
            
            {filteredRecords.length > 0 ? (
              <div className="border rounded">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Slot</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map(record => {
                      const student = getStudentById(record.student_id);
                      return (
                        <TableRow key={record.attendance_id}>
                          <TableCell>{student?.roll_no || 'Unknown'}</TableCell>
                          <TableCell>{student?.name || 'Unknown'}</TableCell>
                          <TableCell>{getClassName(record.class_id)}</TableCell>
                          <TableCell>{getSlotName(record.slot_id)}</TableCell>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                              ${record.status === 'present' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}
                            `}>
                              {record.status === 'present' ? 'Present' : 'Absent'}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No attendance records found for the selected filters.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherAttendancePage;
