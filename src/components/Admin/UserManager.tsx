import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, X, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useUsers } from '../../stores/users';
import { useAuth } from '../../stores/auth';
import { User, UserRole } from '../../types/user';
import toast from 'react-hot-toast';

interface EditingUser extends User {
  password?: string;
}

export function UserManager() {
  const { users, addUser, updateUser } = useUsers();
  const { addUserCredentials } = useAuth();
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleAddUser = () => {
    setEditingUser({
      id: `user-${Date.now()}`,
      email: '',
      name: '',
      role: 'patient',
      createdAt: new Date().toISOString(),
      profile: {
        type: 'patient',
        assignedPaths: [],
        completedPaths: [],
        progress: {}
      }
    });
    setConfirmPassword('');
    setPasswordError('');
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    // Validate password if it's a new user or if password is being changed
    if (!users[editingUser.id] || editingUser.password) {
      const passwordValidationError = validatePassword(editingUser.password || '');
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        return;
      }

      if (editingUser.password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
    }

    // Add user credentials to auth store
    if (editingUser.password) {
      addUserCredentials(editingUser.email, editingUser.password, editingUser.role);
    }

    if (users[editingUser.id]) {
      // If updating user and password is empty, don't update the password
      const userToUpdate = { ...editingUser };
      if (!userToUpdate.password) {
        delete userToUpdate.password;
      }
      updateUser(editingUser.id, userToUpdate);
      toast.success('User updated successfully');
    } else {
      addUser(editingUser);
      toast.success('User created successfully');
    }
    
    setEditingUser(null);
    setConfirmPassword('');
    setPasswordError('');
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <UserIcon className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">User Management</h2>
        </div>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="space-y-4">
        {Object.values(users).map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark p-4 rounded-lg border border-neon-blue/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-sm">
                  {user.role}
                </span>
                <button
                  onClick={() => setEditingUser(user)}
                  className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {editingUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-dark-light rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {users[editingUser.id] ? 'Edit User' : 'New User'}
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    name: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    email: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    role: e.target.value as UserRole
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                >
                  <option value="patient">Patient</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Password {users[editingUser.id] && '(leave blank to keep current)'}
                </label>
                <input
                  type="password"
                  value={editingUser.password || ''}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    password: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save User</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}