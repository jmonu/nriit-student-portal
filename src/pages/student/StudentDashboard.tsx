
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { FileText, Bell, Calendar } from 'lucide-react';
import type { Notice, Event, Alert } from '@/lib/types';
import dbService from '@/lib/database/db-service';
import { useToast } from '@/components/ui/use-toast';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Load data on component mount
  useEffect(() => {
    if (user) {
      // Load notices, events and alerts from database
      setNotices(dbService.getNotices());
      setEvents(dbService.getEvents());
      setAlerts(dbService.getAlerts());
    }
  }, [user]);

  if (!user || user.type !== 'student') {
    return <div className="p-4">Unauthorized access.</div>;
  }

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Submit complaint to database
      const newComplaint = dbService.addComplaint({
        student_id: user.id,
        subject: subject,
        message: message,
        date: new Date().toISOString().split('T')[0]
      });
      
      // Reset form
      setSubject('');
      setMessage('');
      
      // Show success message
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      
      {/* Student Profile */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src={user.photo || '/placeholder.svg'} 
              alt={user.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
                <p>{user.roll_no}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Branch</p>
                <p>{user.branch}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                <p>{user.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p>{user.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Updates Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Notices */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-primary" size={20} />
            <h2 className="text-xl font-semibold">Notices</h2>
          </div>
          <div className="space-y-4">
            {notices.length > 0 ? (
              notices.map(notice => (
                <div key={notice.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {new Date(notice.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">{notice.title}</p>
                  <p className="text-gray-700 dark:text-gray-300">{notice.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No notices available.</p>
            )}
          </div>
        </div>
        
        {/* Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-primary" size={20} />
            <h2 className="text-xl font-semibold">Events</h2>
          </div>
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map(event => (
                <div key={event.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{event.text}</p>
                  {event.image && (
                    <div className="mt-2">
                      <img 
                        src={event.image} 
                        alt={event.text} 
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No events available.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-primary" size={20} />
          <h2 className="text-xl font-semibold">Alerts</h2>
        </div>
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <div key={alert.id} className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-accent p-4 rounded">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {new Date(alert.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{alert.text}</p>
                {alert.image && (
                  <div className="mt-2">
                    <img 
                      src={alert.image} 
                      alt={alert.text} 
                      className="w-full h-32 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No alerts available.</p>
          )}
        </div>
      </div>
      
      {/* Complaint Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Submit a Complaint</h2>
        <form onSubmit={handleComplaintSubmit}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
              placeholder="Enter complaint subject"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
              placeholder="Enter your complaint details"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;
