import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../stores/auth';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleDashboardClick = () => {
    if (user?.role === 'admin') {
      toast.error('Please logout as admin and login as a user to access the User Dashboard');
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="bg-dark-light border-b border-neon-blue/10 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-neon-blue" />
            <span className="text-lg sm:text-xl font-bold text-neon-blue animate-neon-pulse">
              NeuroStep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-gray-300 hover:text-neon-purple transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-neon-purple transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-neon-purple transition">
              Contact
            </Link>
            
            {isAuthenticated && (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="text-gray-300 hover:text-neon-purple transition"
                >
                  Dashboard
                </button>
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-300 hover:text-neon-purple transition">
                    Admin
                  </Link>
                )}
              </>
            )}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-gray-300 hover:text-neon-purple transition flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="bg-neon-purple/10 text-neon-purple px-3 py-1.5 rounded-lg hover:bg-neon-purple/20 transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-neon-blue/10 transition"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-neon-blue" />
            ) : (
              <Menu className="h-5 w-5 text-neon-blue" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-16 inset-x-0 bg-dark-light border-b border-neon-blue/10"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block text-gray-300 hover:text-neon-purple transition"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-300 hover:text-neon-purple transition"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-neon-purple transition"
                onClick={closeMenu}
              >
                Contact
              </Link>
              
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      handleDashboardClick();
                      closeMenu();
                    }}
                    className="block w-full text-left text-gray-300 hover:text-neon-purple transition"
                  >
                    Dashboard
                  </button>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block text-gray-300 hover:text-neon-purple transition"
                      onClick={closeMenu}
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full text-gray-300 hover:text-neon-purple transition flex items-center justify-center space-x-2 px-4 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="block w-full bg-neon-purple/10 text-neon-purple px-4 py-2 rounded-lg hover:bg-neon-purple/20 transition text-center"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}