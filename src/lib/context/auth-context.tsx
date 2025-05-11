
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (roll_no: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('nriit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app this would call an API
  const login = async (roll_no: string, password: string) => {
    // Mock API call - in real app this would call the login API endpoint
    setLoading(true);
    
    try {
      // Mock authentication logic - would be replaced with actual API call
      if (roll_no === 'ADMIN001' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          roll_no: 'ADMIN001',
          name: 'Admin User',
          email: 'admin@nriit.edu',
          phone: '9876543210',
          type: 'admin',
          photo: 'https://i.pravatar.cc/150?img=1'
        };
        setUser(adminUser);
        localStorage.setItem('nriit_user', JSON.stringify(adminUser));
        return true;
      } else if (roll_no === 'T001' && password === 'teacher123') {
        const teacherUser: User = {
          id: '2',
          roll_no: 'T001',
          name: 'Teacher User',
          email: 'teacher@nriit.edu',
          phone: '9876543211',
          type: 'teacher',
          photo: 'https://i.pravatar.cc/150?img=2'
        };
        setUser(teacherUser);
        localStorage.setItem('nriit_user', JSON.stringify(teacherUser));
        return true;
      } else if (roll_no === 'S001' && password === 'monmad') {
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
        setUser(studentUser);
        localStorage.setItem('nriit_user', JSON.stringify(studentUser));
        return true;
      }
      
      // Check for dynamically created students with password "monmad"
      const storedUsersJSON = localStorage.getItem('nriit_users');
      if (storedUsersJSON) {
        const storedUsers = JSON.parse(storedUsersJSON);
        const matchedUser = storedUsers.find((u: User) => 
          u.roll_no === roll_no && u.type === 'student'
        );
        
        if (matchedUser && password === 'monmad') {
          setUser(matchedUser);
          localStorage.setItem('nriit_user', JSON.stringify(matchedUser));
          return true;
        }
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nriit_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
