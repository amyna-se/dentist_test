// Import necessary libraries and components
import { useState } from 'react'; // React hook for state management
import { motion } from 'framer-motion'; // For animations
import { Plus, Save, X, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react'; // Icons for UI
import { useUsers } from '../../stores/users'; // Custom hook for managing user data
import { useAuth } from '../../stores/auth'; // Custom hook for authentication-related actions
import { User, UserRole } from '../../types/user'; // User type definitions
import toast from 'react-hot-toast'; // For displaying toast notifications

// Extend the User interface to include a password property for editing
interface EditingUser extends User {
  password?: string; // Optional password field
}

/**
 * UserManager Component:
 * Allows admin users to manage users, including adding, updating, and assigning roles.
 */
export function UserManager() {
  // Access user-related actions and state from the `useUsers` store
  const { users, addUser, updateUser } = useUsers();
  const { addUserCredentials } = useAuth(); // Authentication actions
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null); // Currently editing user
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password field
  const [passwordError, setPasswordError] = useState(''); // Tracks password validation errors

  /**
   * Validates a password based on predefined rules.
   * @param password - The password to validate.
   * @returns Error message if invalid, or `null` if valid.
   */
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
    return null; // Password is valid
  };

  /**
   * Prepares a new user object for creation.
   * - Resets password and error states.
   */
  const handleAddUser = () => {
    setEditingUser({
      id: `user-${Date.now()}`, // Unique ID for the new user
      email: '', // Empty email
      name: '', // Empty name
      role: 'patient', // Default role
      createdAt: new Date().toISOString(), // Current timestamp
      profile: {
        type: 'patient', // Default profile type
        assignedPaths: [], // Empty assigned paths
        completedPaths: [], // Empty completed paths
        progress: {} // Empty progress
      }
    });
    setConfirmPassword('');
    setPasswordError('');
  };

  /**
   * Saves the current user being edited.
   * - Handles both new user creation and existing user updates.
   * - Validates password before saving.
   */
  const handleSaveUser = () => {
    if (!editingUser) return;

    // Validate password for new users or if the password is being changed
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

    // Add user credentials to the authentication system if a password is provided
    if (editingUser.password) {
      addUserCredentials(editingUser.email, editingUser.password, editingUser.role);
    }

    if (users[editingUser.id]) {
      // Update existing user
      const userToUpdate = { ...editingUser };
      if (!userToUpdate.password) {
        delete userToUpdate.password; // Do not update password if it's empty
      }
      updateUser(editingUser.id, userToUpdate);
      toast.success('User updated successfully');
    } else {
      // Add a new user
      addUser(editingUser);
      toast.success('User created successfully');
    }

    // Reset editing state and error messages
    setEditingUser(null);
    setConfirmPassword('');
    setPasswordError('');
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      {/* Header Section */}
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

      {/* List of Users */}
      <div className="space-y-4">
        {Object.values(users).map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Final animation state
            className="bg-dark p-4 rounded-lg border border-neon-blue/10"
          >
            <div className="flex items-center justify-between">
              {/* User Information */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* User Role and Edit Button */}
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-sm">
                  {user.role}
                </span>
                <button
                  onClick={() => setEditingUser(user)} // Open edit modal
                  className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Editing Modal */}
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
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {users[editingUser.id] ? 'Edit User' : 'New User'}
              </h3>
              <button
                onClick={() => setEditingUser(null)} // Close modal
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* User Form */}
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      name: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      email: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              {/* Role Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      role: e.target.value as UserRole
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                >
                  <option value="patient">Patient</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Password {users[editingUser.id] && '(leave blank to keep current)'}
                </label>
                <input
                  type="password"
                  value={editingUser.password || ''}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      password: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              {/* Confirm Password Input */}
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

              {/* Password Error Message */}
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingUser(null)} // Cancel action
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser} // Save action
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
