
import React, { useState, useEffect } from 'react';
import { Calendar, Download, ChevronLeft, ChevronRight, BarChart } from 'lucide-react';
import { Bar } from 'recharts';
import { BarChart as ReBarChart } from 'recharts';

interface AttendanceRecord {
  id: string;
  date: string;
  section: string;
  subject: string;
  slot: string;
  status: 'present' | 'absent';
}

const dummyAttendanceRecords: AttendanceRecord[] = [
  { id: '1', date: '2025-03-01', section: 'CSE-A', subject: 'Data Structures', slot: 'Period 1', status: 'present' },
  { id: '2', date: '2025-03-01', section: 'CSE-A', subject: 'Computer Networks', slot: 'Period 2', status: 'present' },
  { id: '3', date: '2025-03-01', section: 'CSE-A', subject: 'Operating Systems', slot: 'Period 3', status: 'absent' },
  { id: '4', date: '2025-03-02', section: 'CSE-A', subject: 'Data Structures', slot: 'Period 1', status: 'present' },
  { id: '5', date: '2025-03-02', section: 'CSE-A', subject: 'Computer Networks', slot: 'Period 2', status: 'present' },
  { id: '6', date: '2025-03-02', section: 'CSE-A', subject: 'Operating Systems', slot: 'Period 3', status: 'present' },
  { id: '7', date: '2025-03-03', section: 'CSE-A', subject: 'Data Structures', slot: 'Period 1', status: 'absent' },
  { id: '8', date: '2025-03-03', section: 'CSE-A', subject: 'Computer Networks', slot: 'Period 2', status: 'present' },
  { id: '9', date: '2025-03-03', section: 'CSE-A', subject: 'Operating Systems', slot: 'Period 3', status: 'present' },
  { id: '10', date: '2025-03-04', section: 'CSE-A', subject: 'Data Structures', slot: 'Period 1', status: 'present' },
];

const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [allAttendanceData, setAllAttendanceData] = useState<AttendanceRecord[]>([]);
  const [attendancePercentage, setAttendancePercentage] = useState<number>(0);
  
  // For calendar navigation
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    // In a real app, this would be an API call
    // Simulate loading data
    setAllAttendanceData(dummyAttendanceRecords);
    
    // Calculate attendance percentage
    const totalClasses = dummyAttendanceRecords.length;
    const presentClasses = dummyAttendanceRecords.filter(record => record.status === 'present').length;
    const percentage = (presentClasses / totalClasses) * 100;
    setAttendancePercentage(Math.round(percentage));
    
    // Filter for selected date
    filterAttendanceByDate(selectedDate);
  }, []);
  
  const filterAttendanceByDate = (date: string) => {
    const filtered = allAttendanceData.filter(record => record.date === date);
    setAttendanceData(filtered);
  };
  
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    filterAttendanceByDate(date);
  };
  
  // Calculate chart data
  const getChartData = () => {
    const subjects = [...new Set(allAttendanceData.map(record => record.subject))];
    
    return subjects.map(subject => {
      const subjectRecords = allAttendanceData.filter(record => record.subject === subject);
      const totalClasses = subjectRecords.length;
      const presentClasses = subjectRecords.filter(record => record.status === 'present').length;
      const percentage = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 0;
      
      return {
        subject,
        present: presentClasses,
        absent: totalClasses - presentClasses,
        percentage: Math.round(percentage)
      };
    });
  };
  
  const exportAttendance = () => {
    // In a real app, this would generate an Excel file
    alert('Attendance export functionality would be implemented here');
  };
  
  // Calendar navigation
  const previousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };
  
  const nextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };
  
  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      const day = i < 10 ? `0${i}` : `${i}`;
      const month_str = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
      const dateStr = `${year}-${month_str}-${day}`;
      const isSelected = dateStr === selectedDate;
      const hasAttendance = allAttendanceData.some(record => record.date === dateStr);
      
      days.push(
        <button
          key={dateStr}
          onClick={() => handleDateChange(dateStr)}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm
            ${isSelected ? 'bg-primary text-white' : ''}
            ${hasAttendance && !isSelected ? 'border border-primary text-primary' : ''}
            hover:bg-gray-200 dark:hover:bg-gray-700
          `}
        >
          {i}
        </button>
      );
    }
    
    return days;
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>
      
      {/* Attendance Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              <Calendar className="inline mr-2 text-primary" size={20} />
              Attendance Overview
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Your overall attendance percentage
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button onClick={exportAttendance} className="btn-primary flex items-center">
              <Download size={18} className="mr-2" />
              Export as Excel
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Attendance Percentage</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-bold">{attendancePercentage}%</span>
              <span className={`text-sm ${attendancePercentage >= 75 ? 'text-green-500' : 'text-red-500'}`}>
                {attendancePercentage >= 75 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Present Days</p>
            <p className="text-3xl font-bold mt-1">
              {allAttendanceData.filter(record => record.status === 'present').length}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Absent Days</p>
            <p className="text-3xl font-bold mt-1">
              {allAttendanceData.filter(record => record.status === 'absent').length}
            </p>
          </div>
        </div>
        
        {/* Attendance Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart size={20} className="inline mr-2 text-primary" />
            Attendance by Subject
          </h3>
          <div className="h-64">
            <ReBarChart width={800} height={250} data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <Bar dataKey="present" stackId="a" fill="#1e40af" name="Present" />
              <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
            </ReBarChart>
          </div>
        </div>
      </div>
      
      {/* Calendar Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Date</h2>
          <div className="flex gap-2">
            <button 
              onClick={previousMonth} 
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="font-medium">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button 
              onClick={nextMonth} 
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-gray-500 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays()}
        </div>
      </div>
      
      {/* Daily Attendance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Attendance for {new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>
        
        {attendanceData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full data-table">
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Section</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Slot</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map(record => (
                  <tr key={record.id}>
                    <td className="px-4 py-2">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-2">{record.section}</td>
                    <td className="px-4 py-2">{record.subject}</td>
                    <td className="px-4 py-2">{record.slot}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${record.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}
                      `}>
                        {record.status === 'present' ? 'Present' : 'Absent'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No attendance records found for this date.
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
