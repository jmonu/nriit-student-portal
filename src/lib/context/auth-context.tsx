
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types';
import dbService from '../database/db-service';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize database
    dbService.initializeDatabase();
    
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('nriit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (roll_no: string, password: string) => {
    setLoading(true);
    
    try {
      // Get all users from the database
      const users = dbService.getUsers();
      
      // Find user with matching roll number
      const matchedUser = users.find(u => u.roll_no === roll_no);
      
      // Check if it's an admin or teacher with specific credentials
      if (roll_no === 'ADMIN001' && password === 'admin123' && matchedUser) {
        setUser(matchedUser);
        localStorage.setItem('nriit_user', JSON.stringify(matchedUser));
        dbService.addAuditLog('User Login', `Admin user logged in: ${roll_no}`);
        return true;
      } else if (roll_no === 'T001' && password === 'teacher123' && matchedUser) {
        setUser(matchedUser);
        localStorage.setItem('nriit_user', JSON.stringify(matchedUser));
        dbService.addAuditLog('User Login', `Teacher user logged in: ${roll_no}`);
        return true;
      } else if (matchedUser && matchedUser.type === 'student' && password === 'monmad') {
        // All students use the common password
        setUser(matchedUser);
        localStorage.setItem('nriit_user', JSON.stringify(matchedUser));
        dbService.addAuditLog('User Login', `Student user logged in: ${roll_no}`);
        return true;
      }
      
      dbService.addAuditLog('Login Failed', `Failed login attempt for user: ${roll_no}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (user) {
      dbService.addAuditLog('User Logout', `User logged out: ${user.roll_no}`);
    }
    setUser(null);
    localStorage.removeItem('nriit_user');
    navigate('/'); // Navigate to home page on logout
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
