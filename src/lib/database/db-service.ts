import { User, Class, Slot, Schedule, Attendance, Notice, Event, Alert, Faculty, CalendarEntry, Complaint, AuditLog, Course } from '../types';

// Initialize database with default values if it doesn't exist
const initializeDatabase = () => {
  // Check if database is already initialized
  if (localStorage.getItem('nriit_db_initialized') === 'true') {
    return;
  }

  // Initialize Admin account
  const adminUser: User = {
    id: '1',
    roll_no: 'ADMIN001',
    name: 'Admin User',
    email: 'admin@nriit.edu',
    phone: '9876543210',
    type: 'admin',
    photo: 'https://i.pravatar.cc/150?img=1'
  };

  // Initialize Teacher account
  const teacherUser: User = {
    id: '2',
    roll_no: 'T001',
    name: 'Teacher User',
    email: 'teacher@nriit.edu',
    phone: '9876543211',
    type: 'teacher',
    photo: 'https://i.pravatar.cc/150?img=2'
  };

  // Initialize Student account
  const studentUser: User = {
    id: '3',
    roll_no: 'S001',
    name: 'Student User',
    email: 'student@nriit.edu',
    phone: '9876543212',
    type: 'student',
    branch: 'CSE',
    year: 2,
    photo: 'https://i.pravatar.cc/150?img=3'
  };

  // Initial classes
  const classes: Class[] = [
    {
      class_id: '1',
      name: 'CSE-A',
      semester: '1-1',
    },
    {
      class_id: '2',
      name: 'ECE-A',
      semester: '1-1',
    },
    {
      class_id: '3',
      name: 'CSE-B',
      semester: '2-1',
    },
  ];

  // Initial slots
  const slots: Slot[] = [
    {
      slot_id: '1',
      name: 'Period 1',
      time: '9:00–9:50 AM',
    },
    {
      slot_id: '2',
      name: 'Period 2',
      time: '9:50–10:40 AM',
    },
    {
      slot_id: '3',
      name: 'Period 3',
      time: '10:50–11:40 AM',
    },
  ];

  // Initial schedules
  const schedules: Schedule[] = [
    {
      schedule_id: '1',
      class_id: '1',
      slot_id: '1',
      teacher_id: '2',
      subject: 'Mathematics',
    },
    {
      schedule_id: '2',
      class_id: '1',
      slot_id: '2',
      teacher_id: '2',
      subject: 'Physics',
    },
  ];

  // Initial attendance records
  const attendanceRecords: Attendance[] = [
    {
      attendance_id: '1',
      student_id: '3',
      class_id: '1',
      slot_id: '1',
      date: '2025-05-12',
      status: 'present',
    }
  ];

  // Initial notices
  const notices: Notice[] = [
    {
      id: '1',
      title: 'Mid-semester exams starting from 15th May',
      content: 'Please prepare for the upcoming examinations. The schedule is available on the notice board.',
      category: 'exam',
      date: '2025-05-05',
    }
  ];

  // Initial events
  const events: Event[] = [
    {
      id: '1',
      text: 'Annual Cultural Fest on 25th May',
      date: '2025-05-05',
    }
  ];

  // Initial alerts
  const alerts: Alert[] = [
    {
      id: '1',
      text: 'Campus will be closed on 14th May due to elections',
      date: '2025-05-05',
    }
  ];

  // Initial faculty
  const faculty: Faculty[] = [
    {
      id: '2', // Same ID as teacherUser
      name: 'Teacher User',
      designation: 'Assistant Professor',
      bio: 'Specializes in Computer Science and Mathematics',
      photo: 'https://i.pravatar.cc/150?img=2',
    }
  ];

  // Initial calendar entries
  const calendarEntries: CalendarEntry[] = [
    {
      id: '1',
      entry: 'First Semester Begins',
      date: '2025-07-01'
    },
    {
      id: '2',
      entry: 'Mid-term Examinations',
      date: '2025-09-15'
    },
  ];

  // Initial complaints
  const complaints: Complaint[] = [];

  // Initial audit logs
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      action: 'Database Initialization',
      details: 'Initial database setup',
      timestamp: new Date().toISOString(),
    }
  ];

  // Initial courses
  const courses: Course[] = [
    {
      id: '1',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      description: 'Basic concepts of programming and computer science',
    },
    {
      id: '2',
      name: 'Data Structures',
      code: 'CS102',
      description: 'Implementation and analysis of data structures',
    },
  ];

  // Store initial data
  const users = [adminUser, teacherUser, studentUser];
  
  localStorage.setItem('nriit_users', JSON.stringify(users));
  localStorage.setItem('nriit_classes', JSON.stringify(classes));
  localStorage.setItem('nriit_slots', JSON.stringify(slots));
  localStorage.setItem('nriit_schedules', JSON.stringify(schedules));
  localStorage.setItem('nriit_attendance', JSON.stringify(attendanceRecords));
  localStorage.setItem('nriit_notices', JSON.stringify(notices));
  localStorage.setItem('nriit_events', JSON.stringify(events));
  localStorage.setItem('nriit_alerts', JSON.stringify(alerts));
  localStorage.setItem('nriit_faculty', JSON.stringify(faculty));
  localStorage.setItem('nriit_calendar', JSON.stringify(calendarEntries));
  localStorage.setItem('nriit_complaints', JSON.stringify(complaints));
  localStorage.setItem('nriit_audit_logs', JSON.stringify(auditLogs));
  localStorage.setItem('nriit_courses', JSON.stringify(courses));
  
  // Mark database as initialized
  localStorage.setItem('nriit_db_initialized', 'true');
};

// Generic function to get items from localStorage
const getItems = <T>(key: string): T[] => {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

// Generic function to set items in localStorage
const setItems = <T>(key: string, items: T[]): void => {
  localStorage.setItem(key, JSON.stringify(items));
};

// Generic function to add an item
const addItem = <T extends { id: string }>(key: string, item: Omit<T, 'id'>): T => {
  const items = getItems<T>(key);
  const newId = Date.now().toString();
  const newItem = { ...item, id: newId } as T;
  setItems(key, [...items, newItem]);
  
  // Log the action
  addAuditLog(`Added ${key.replace('nriit_', '')}`, `Added ${key.replace('nriit_', '')} with ID ${newId}`);
  
  return newItem;
};

// Generic function to update an item
const updateItem = <T extends { id: string }>(key: string, id: string, item: Partial<T>): T | null => {
  const items = getItems<T>(key);
  const index = items.findIndex(i => i.id === id);
  
  if (index === -1) return null;
  
  const updatedItem = { ...items[index], ...item } as T;
  items[index] = updatedItem;
  setItems(key, items);
  
  // Log the action
  addAuditLog(`Updated ${key.replace('nriit_', '')}`, `Updated ${key.replace('nriit_', '')} with ID ${id}`);
  
  return updatedItem;
};

// Generic function to delete an item
const deleteItem = <T extends { id: string }>(key: string, id: string): boolean => {
  const items = getItems<T>(key);
  const newItems = items.filter(item => item.id !== id);
  
  if (newItems.length === items.length) return false;
  
  setItems(key, newItems);
  
  // Log the action
  addAuditLog(`Deleted ${key.replace('nriit_', '')}`, `Deleted ${key.replace('nriit_', '')} with ID ${id}`);
  
  return true;
};

// Generic function to get an item by ID
const getItemById = <T extends { id: string }>(key: string, id: string): T | null => {
  const items = getItems<T>(key);
  const item = items.find(item => item.id === id);
  return item || null;
};

// Function to add an audit log
const addAuditLog = (action: string, details: string): void => {
  const auditLogs = getItems<AuditLog>('nriit_audit_logs');
  const newAuditLog: AuditLog = {
    id: Date.now().toString(),
    action,
    details,
    timestamp: new Date().toISOString(),
  };
  setItems('nriit_audit_logs', [...auditLogs, newAuditLog]);
};

// User specific functions
const getUsers = (): User[] => getItems<User>('nriit_users');
const addUser = (user: Omit<User, 'id'>): User => addItem<User>('nriit_users', user);
const updateUser = (id: string, user: Partial<User>): User | null => updateItem<User>('nriit_users', id, user);
const deleteUser = (id: string): boolean => deleteItem<User>('nriit_users', id);
const getUserById = (id: string): User | null => getItemById<User>('nriit_users', id);

// Class specific functions
const getClasses = (): Class[] => getItems<Class>('nriit_classes');
const addClass = (cls: Omit<Class, 'class_id'>): Class => {
  const classes = getClasses();
  const newId = Date.now().toString();
  const newClass = { ...cls, class_id: newId };
  setItems('nriit_classes', [...classes, newClass]);
  addAuditLog('Added Class', `Added class with ID ${newId}`);
  return newClass;
};
const updateClass = (id: string, cls: Partial<Class>): Class | null => {
  const classes = getClasses();
  const index = classes.findIndex(c => c.class_id === id);
  if (index === -1) return null;
  const updatedClass = { ...classes[index], ...cls };
  classes[index] = updatedClass;
  setItems('nriit_classes', classes);
  addAuditLog('Updated Class', `Updated class with ID ${id}`);
  return updatedClass;
};
const deleteClass = (id: string): boolean => {
  const classes = getClasses();
  const newClasses = classes.filter(c => c.class_id !== id);
  if (newClasses.length === classes.length) return false;
  setItems('nriit_classes', newClasses);
  addAuditLog('Deleted Class', `Deleted class with ID ${id}`);
  return true;
};
const getClassById = (id: string): Class | null => {
  const classes = getClasses();
  return classes.find(c => c.class_id === id) || null;
};

// Slot specific functions
const getSlots = (): Slot[] => getItems<Slot>('nriit_slots');
const addSlot = (slot: Omit<Slot, 'slot_id'>): Slot => {
  const slots = getSlots();
  const newId = Date.now().toString();
  const newSlot = { ...slot, slot_id: newId };
  setItems('nriit_slots', [...slots, newSlot]);
  addAuditLog('Added Slot', `Added slot with ID ${newId}`);
  return newSlot;
};
const updateSlot = (id: string, slot: Partial<Slot>): Slot | null => {
  const slots = getSlots();
  const index = slots.findIndex(s => s.slot_id === id);
  if (index === -1) return null;
  const updatedSlot = { ...slots[index], ...slot };
  slots[index] = updatedSlot;
  setItems('nriit_slots', slots);
  addAuditLog('Updated Slot', `Updated slot with ID ${id}`);
  return updatedSlot;
};
const deleteSlot = (id: string): boolean => {
  const slots = getSlots();
  const newSlots = slots.filter(s => s.slot_id !== id);
  if (newSlots.length === slots.length) return false;
  setItems('nriit_slots', newSlots);
  addAuditLog('Deleted Slot', `Deleted slot with ID ${id}`);
  return true;
};
const getSlotById = (id: string): Slot | null => {
  const slots = getSlots();
  return slots.find(s => s.slot_id === id) || null;
};

// Schedule specific functions
const getSchedules = (): Schedule[] => getItems<Schedule>('nriit_schedules');
const addSchedule = (schedule: Omit<Schedule, 'schedule_id'>): Schedule => {
  const schedules = getSchedules();
  const newId = Date.now().toString();
  const newSchedule = { ...schedule, schedule_id: newId };
  setItems('nriit_schedules', [...schedules, newSchedule]);
  addAuditLog('Added Schedule', `Added schedule with ID ${newId}`);
  return newSchedule;
};
const updateSchedule = (id: string, schedule: Partial<Schedule>): Schedule | null => {
  const schedules = getSchedules();
  const index = schedules.findIndex(s => s.schedule_id === id);
  if (index === -1) return null;
  const updatedSchedule = { ...schedules[index], ...schedule };
  schedules[index] = updatedSchedule;
  setItems('nriit_schedules', schedules);
  addAuditLog('Updated Schedule', `Updated schedule with ID ${id}`);
  return updatedSchedule;
};
const deleteSchedule = (id: string): boolean => {
  const schedules = getSchedules();
  const newSchedules = schedules.filter(s => s.schedule_id !== id);
  if (newSchedules.length === schedules.length) return false;
  setItems('nriit_schedules', newSchedules);
  addAuditLog('Deleted Schedule', `Deleted schedule with ID ${id}`);
  return true;
};
const getScheduleById = (id: string): Schedule | null => {
  const schedules = getSchedules();
  return schedules.find(s => s.schedule_id === id) || null;
};

// Attendance specific functions
const getAttendance = (): Attendance[] => getItems<Attendance>('nriit_attendance');
const addAttendance = (attendance: Omit<Attendance, 'attendance_id'>): Attendance => {
  const attendanceRecords = getAttendance();
  const newId = Date.now().toString();
  const newAttendance = { ...attendance, attendance_id: newId };
  setItems('nriit_attendance', [...attendanceRecords, newAttendance]);
  addAuditLog('Added Attendance', `Added attendance record with ID ${newId}`);
  return newAttendance;
};
const updateAttendance = (id: string, attendance: Partial<Attendance>): Attendance | null => {
  const attendanceRecords = getAttendance();
  const index = attendanceRecords.findIndex(a => a.attendance_id === id);
  if (index === -1) return null;
  const updatedAttendance = { ...attendanceRecords[index], ...attendance };
  attendanceRecords[index] = updatedAttendance;
  setItems('nriit_attendance', attendanceRecords);
  addAuditLog('Updated Attendance', `Updated attendance record with ID ${id}`);
  return updatedAttendance;
};
const deleteAttendance = (id: string): boolean => {
  const attendanceRecords = getAttendance();
  const newAttendanceRecords = attendanceRecords.filter(a => a.attendance_id !== id);
  if (newAttendanceRecords.length === attendanceRecords.length) return false;
  setItems('nriit_attendance', newAttendanceRecords);
  addAuditLog('Deleted Attendance', `Deleted attendance record with ID ${id}`);
  return true;
};
const getAttendanceById = (id: string): Attendance | null => {
  const attendanceRecords = getAttendance();
  return attendanceRecords.find(a => a.attendance_id === id) || null;
};

// Notice specific functions
const getNotices = (): Notice[] => getItems<Notice>('nriit_notices');
const addNotice = (notice: Omit<Notice, 'id'>): Notice => addItem<Notice>('nriit_notices', notice);
const updateNotice = (id: string, notice: Partial<Notice>): Notice | null => updateItem<Notice>('nriit_notices', id, notice);
const deleteNotice = (id: string): boolean => deleteItem<Notice>('nriit_notices', id);
const getNoticeById = (id: string): Notice | null => getItemById<Notice>('nriit_notices', id);

// Event specific functions
const getEvents = (): Event[] => getItems<Event>('nriit_events');
const addEvent = (event: Omit<Event, 'id'>): Event => addItem<Event>('nriit_events', event);
const updateEvent = (id: string, event: Partial<Event>): Event | null => updateItem<Event>('nriit_events', id, event);
const deleteEvent = (id: string): boolean => deleteItem<Event>('nriit_events', id);
const getEventById = (id: string): Event | null => getItemById<Event>('nriit_events', id);

// Alert specific functions
const getAlerts = (): Alert[] => getItems<Alert>('nriit_alerts');
const addAlert = (alert: Omit<Alert, 'id'>): Alert => addItem<Alert>('nriit_alerts', alert);
const updateAlert = (id: string, alert: Partial<Alert>): Alert | null => updateItem<Alert>('nriit_alerts', id, alert);
const deleteAlert = (id: string): boolean => deleteItem<Alert>('nriit_alerts', id);
const getAlertById = (id: string): Alert | null => getItemById<Alert>('nriit_alerts', id);

// Faculty specific functions
const getFaculty = (): Faculty[] => getItems<Faculty>('nriit_faculty');
const addFaculty = (faculty: Omit<Faculty, 'id'>): Faculty => addItem<Faculty>('nriit_faculty', faculty);
const updateFaculty = (id: string, faculty: Partial<Faculty>): Faculty | null => updateItem<Faculty>('nriit_faculty', id, faculty);
const deleteFaculty = (id: string): boolean => deleteItem<Faculty>('nriit_faculty', id);
const getFacultyById = (id: string): Faculty | null => getItemById<Faculty>('nriit_faculty', id);

// Calendar specific functions
const getCalendarEntries = (): CalendarEntry[] => getItems<CalendarEntry>('nriit_calendar');
const addCalendarEntry = (entry: Omit<CalendarEntry, 'id'>): CalendarEntry => addItem<CalendarEntry>('nriit_calendar', entry);
const updateCalendarEntry = (id: string, entry: Partial<CalendarEntry>): CalendarEntry | null => updateItem<CalendarEntry>('nriit_calendar', id, entry);
const deleteCalendarEntry = (id: string): boolean => deleteItem<CalendarEntry>('nriit_calendar', id);
const getCalendarEntryById = (id: string): CalendarEntry | null => getItemById<CalendarEntry>('nriit_calendar', id);

// Complaint specific functions
const getComplaints = (): Complaint[] => getItems<Complaint>('nriit_complaints');
const addComplaint = (complaint: Omit<Complaint, 'id'>): Complaint => addItem<Complaint>('nriit_complaints', complaint);
const updateComplaint = (id: string, complaint: Partial<Complaint>): Complaint | null => updateItem<Complaint>('nriit_complaints', id, complaint);
const deleteComplaint = (id: string): boolean => deleteItem<Complaint>('nriit_complaints', id);
const getComplaintById = (id: string): Complaint | null => getItemById<Complaint>('nriit_complaints', id);

// Audit log specific functions
const getAuditLogs = (): AuditLog[] => getItems<AuditLog>('nriit_audit_logs');

// Course specific functions
const getCourses = (): Course[] => getItems<Course>('nriit_courses');
const addCourse = (course: Omit<Course, 'id'>): Course => addItem<Course>('nriit_courses', course);
const updateCourse = (id: string, course: Partial<Course>): Course | null => updateItem<Course>('nriit_courses', id, course);
const deleteCourse = (id: string): boolean => deleteItem<Course>('nriit_courses', id);
const getCourseById = (id: string): Course | null => getItemById<Course>('nriit_courses', id);

// Database reset function - for testing purposes
const resetDatabase = () => {
  localStorage.removeItem('nriit_db_initialized');
  localStorage.removeItem('nriit_users');
  localStorage.removeItem('nriit_classes');
  localStorage.removeItem('nriit_slots');
  localStorage.removeItem('nriit_schedules');
  localStorage.removeItem('nriit_attendance');
  localStorage.removeItem('nriit_notices');
  localStorage.removeItem('nriit_events');
  localStorage.removeItem('nriit_alerts');
  localStorage.removeItem('nriit_faculty');
  localStorage.removeItem('nriit_calendar');
  localStorage.removeItem('nriit_complaints');
  localStorage.removeItem('nriit_audit_logs');
  localStorage.removeItem('nriit_courses');
  
  // Re-initialize the database
  initializeDatabase();
};

// Export all database functions
const dbService = {
  initializeDatabase,
  // User operations
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  // Class operations
  getClasses,
  addClass,
  updateClass,
  deleteClass,
  getClassById,
  // Slot operations
  getSlots,
  addSlot,
  updateSlot,
  deleteSlot,
  getSlotById,
  // Schedule operations
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleById,
  // Attendance operations
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceById,
  // Notice operations
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
  getNoticeById,
  // Event operations
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  // Alert operations
  getAlerts,
  addAlert,
  updateAlert,
  deleteAlert,
  getAlertById,
  // Faculty operations
  getFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getFacultyById,
  // Calendar operations
  getCalendarEntries,
  addCalendarEntry,
  updateCalendarEntry,
  deleteCalendarEntry,
  getCalendarEntryById,
  // Complaint operations
  getComplaints,
  addComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaintById,
  // Audit log operations
  getAuditLogs,
  addAuditLog,
  // Course operations
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  // Reset database
  resetDatabase,
};

export default dbService;
