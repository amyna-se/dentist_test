import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield } from 'lucide-react';
import { useAuth } from '../stores/auth';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (email === 'admin@neurostep.com' && password === 'admin123') {
        await login(email, password);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-neon-purple" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-neon-purple mb-8">
            Admin Access
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark-light border border-neon-purple/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark-light border border-neon-purple/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  required
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition font-semibold"
            >
              Access Admin Dashboard
            </button>

            <div className="text-center text-sm text-gray-400">
              Default admin credentials:<br />
              Email: admin@neurostep.com<br />
              Password: admin123
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}