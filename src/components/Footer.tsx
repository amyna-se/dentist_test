import { Brain, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-dark-light border-t border-neon-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-neon-blue" />
              <span className="text-xl font-bold text-neon-blue">NeuroStep</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Innovative learning platform for understanding neurodiversity.
            </p>
          </div>
          
          <div className="sm:ml-auto">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-neon-purple transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-neon-purple transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-neon-purple transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-neon-purple transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-neon-purple transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Social</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neon-blue/10">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} NeuroStep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}