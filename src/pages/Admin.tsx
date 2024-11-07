import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/auth';

export function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">User Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
              <div>
                <p className="text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Course Analytics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Total Courses Completed</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
              <div>
                <p className="text-gray-400">Average Completion Rate</p>
                <p className="text-2xl font-bold text-white">0%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Revenue</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white">$0</p>
              </div>
              <div>
                <p className="text-gray-400">Active Subscriptions</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;