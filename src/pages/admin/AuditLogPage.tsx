
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DownloadCloud, Search, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import dbService from '@/lib/database/db-service';
import { AuditLog } from '@/lib/types';

const AuditLogPage: React.FC = () => {
  const { user } = useAuth();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Load audit logs from database
    const logs = dbService.getAuditLogs();
    // Sort logs by timestamp, newest first
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setAuditLogs(logs);
  }, []);
  
  // Filter logs based on search query
  const filteredLogs = auditLogs.filter(log => {
    const query = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(query) ||
      log.details.toLowerCase().includes(query)
    );
  });
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  const handleExportLogs = () => {
    // In a real app, this would export logs to CSV
    alert('Audit log export functionality would be implemented here');
  };
  
  if (!user || (user.type !== 'admin' && user.type !== 'teacher')) {
    return <div className="p-4">Unauthorized access.</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <Button variant="outline" onClick={handleExportLogs} className="flex items-center gap-2">
          <DownloadCloud size={16} />
          Export Logs
        </Button>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <Search className="text-gray-400" size={20} />
        <Input
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <History size={18} className="text-primary" />
          <span className="font-medium">System Activity Logs</span>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {formatDate(log.timestamp)}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">{log.details}</div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                  {searchQuery ? 'No logs match your search' : 'No audit logs found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AuditLogPage;
