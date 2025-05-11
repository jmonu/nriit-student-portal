
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/context/auth-context';
import Layout from '@/components/layout/Layout';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to their dashboard
  if (user) {
    return <Navigate to={`/${user.type}-dashboard`} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNo.trim() || !password) {
      setError('Please enter both roll number and password.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const success = await login(rollNo, password);
      
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideNewsTicker>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg animate-fade-in">
          <div className="text-center mb-6">
            <img 
              src="https://i.ibb.co/q3MZqYJk/3c0e2f5b4c43.jpg" 
              alt="NRIIT Logo" 
              className="h-16 w-auto mx-auto mb-4"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/placeholder.svg';
                console.error('Failed to load logo image');
              }}
            />
            <h1 className="text-2xl font-bold text-primary">NRI Institute of Technology</h1>
            <p className="text-gray-600 dark:text-gray-400">Student Portal Login</p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Roll Number
              </label>
              <input 
                type="text" 
                id="rollNo" 
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                placeholder="Enter your roll number"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700"
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Demo Accounts:
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <p className="font-semibold">Admin</p>
                <p>ADMIN001</p>
                <p>admin123</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <p className="font-semibold">Teacher</p>
                <p>T001</p>
                <p>teacher123</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <p className="font-semibold">Student</p>
                <p>S001</p>
                <p>student123</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Forgot password? <a href="#" className="text-primary hover:underline">Click here</a> to reset.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
