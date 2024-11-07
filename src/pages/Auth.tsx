import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, Github, User } from 'lucide-react';
import { useAuth } from '../stores/auth';
import { motion } from 'framer-motion';

export function Auth() {
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password, isAdmin);
        navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
      } else {
        await register(formData.email, formData.password, formData.name);
        navigate('/dashboard');
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-neon-blue" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? 'Sign in to continue your learning journey' : 'Join us to start learning'}
          </p>
        </div>

        {(error || formError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm"
          >
            {error || formError}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center">
              <input
                id="admin-login"
                name="admin-login"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-4 w-4 text-neon-purple focus:ring-neon-purple border-gray-700 rounded bg-gray-900"
              />
              <label htmlFor="admin-login" className="ml-2 block text-sm text-gray-400">
                Admin Login
              </label>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-neon-blue hover:bg-neon-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormError('');
                  setIsAdmin(false);
                }}
                className="font-medium text-neon-blue hover:text-neon-blue/90"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}