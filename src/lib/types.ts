
export interface User {
  id: string;
  roll_no: string;
  name: string;
  email: string;
  phone: string;
  type: 'student' | 'teacher' | 'admin';
  branch?: 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';
  year?: 1 | 2 | 3 | 4;
  photo?: string;
}

export interface Class {
  class_id: string;
  name: string;
  semester: string;
}

export interface Slot {
  slot_id: string;
  name: string;
  time: string;
}

export interface Schedule {
  schedule_id: string;
  class_id: string;
  slot_id: string;
  teacher_id: string;
  subject: string;
}

export interface Attendance {
  attendance_id: string;
  student_id: string;
  class_id: string;
  slot_id: string;
  date: string;
  status: 'present' | 'absent';
}

export interface Notice {
  id: string;
  text: string;
  image?: string;
  date: string;
}

export interface Event {
  id: string;
  text: string;
  image?: string;
  date: string;
}

export interface Alert {
  id: string;
  text: string;
  image?: string;
  date: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  bio: string;
  photo?: string;
}

export interface CalendarEntry {
  id: string;
  entry: string;
  date: string;
}

export interface Complaint {
  id: string;
  student_id: string;
  subject: string;
  message: string;
  date: string;
}

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
}
