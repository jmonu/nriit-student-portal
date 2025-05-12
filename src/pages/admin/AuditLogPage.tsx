
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, Search, Download, Filter, Calendar, User } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  details: string;
  user: string;
  userType: 'admin' | 'teacher' | 'student';
  ip: string;
  timestamp: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'User Login',
    details: 'Admin user logged in: ADMIN001',
    user: 'John Admin',
    userType: 'admin',
    ip: '192.168.1.1',
    timestamp: '2025-05-12T09:30:00'
  },
  {
    id: '2',
    action: 'User Created',
    details: 'New student account created: S0023',
    user: 'John Admin',
    userType: 'admin',
    ip: '192.168.1.1',
    timestamp: '2025-05-12T10:15:00'
  },
  {
    id: '3',
    action: 'Schedule Modified',
    details: 'Class schedule updated for CSE-4B',
    user: 'Sarah Teacher',
    userType: 'teacher',
    ip: '192.168.1.45',
    timestamp: '2025-05-12T11:20:00'
  },
  {
    id: '4',
    action: 'Notice Created',
    details: 'New notice published: Exam Schedule Update',
    user: 'Sarah Teacher',
    userType: 'teacher',
    ip: '192.168.1.45',
    timestamp: '2025-05-11T14:05:00'
  },
  {
    id: '5',
    action: 'User Login',
    details: 'Student user logged in: S0015',
    user: 'Michael Student',
    userType: 'student',
    ip: '192.168.1.78',
    timestamp: '2025-05-11T16:45:00'
  },
  {
    id: '6',
    action: 'Complaint Submitted',
    details: 'New complaint submitted: Library Access Issue',
    user: 'Michael Student',
    userType: 'student',
    ip: '192.168.1.78',
    timestamp: '2025-05-11T16:50:00'
  },
  {
    id: '7',
    action: 'User Login Failed',
    details: 'Failed login attempt for user: T005',
    user: 'Unknown',
    userType: 'teacher',
    ip: '192.168.1.100',
    timestamp: '2025-05-11T08:30:00'
  },
  {
    id: '8',
    action: 'System Update',
    details: 'System backup completed successfully',
    user: 'System',
    userType: 'admin',
    ip: 'localhost',
    timestamp: '2025-05-10T02:00:00'
  },
  {
    id: '9',
    action: 'User Logout',
    details: 'User logged out: ADMIN001',
    user: 'John Admin',
    userType: 'admin',
    ip: '192.168.1.1',
    timestamp: '2025-05-10T17:30:00'
  },
  {
    id: '10',
    action: 'Settings Changed',
    details: 'Security settings updated: password policy modified',
    user: 'John Admin',
    userType: 'admin',
    ip: '192.168.1.1',
    timestamp: '2025-05-10T15:25:00'
  }
];

const AuditLogPage = () => {
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Filter logs based on search query and filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesUserType = userTypeFilter === 'all' || log.userType === userTypeFilter;
    
    let matchesDate = true;
    const logDate = new Date(log.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateFilter === 'today') {
      matchesDate = logDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'yesterday') {
      matchesDate = logDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === 'this-week') {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      matchesDate = logDate >= weekStart;
    }
    
    return matchesSearch && matchesAction && matchesUserType && matchesDate;
  });
  
  // Get unique action types for the filter dropdown
  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));
  
  // Function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Audit Log</h1>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Search size={16} />
                <span className="text-sm font-medium">Search</span>
              </div>
              <Input 
                placeholder="Search logs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span className="text-sm font-medium">Action Type</span>
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm font-medium">User Type</span>
              </div>
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm font-medium">Time Period</span>
              </div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={16} />
              <span>Export Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[150px]">Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="w-[140px]">User</TableHead>
                  <TableHead className="w-[100px]">User Type</TableHead>
                  <TableHead className="w-[100px]">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          log.action.includes('Login') ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                          log.action.includes('Created') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                          log.action.includes('Modified') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                          log.action.includes('Failed') ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                        }`}>
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <span className="capitalize">{log.userType}</span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No logs found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <div>Showing {filteredLogs.length} of {logs.length} entries</div>
            <div>
              {/* Pagination could be added here */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogPage;
