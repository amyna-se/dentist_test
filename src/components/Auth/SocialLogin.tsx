import { motion } from 'framer-motion';
import { Facebook, Mail, Github } from 'lucide-react';

export function SocialLogin() {
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Social login implementation will be added here
  };

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-dark text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSocialLogin('google')}
          className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-dark-light border border-neon-blue/10 hover:bg-neon-blue/5 transition"
        >
          <Mail className="w-5 h-5 text-neon-blue" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSocialLogin('facebook')}
          className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-dark-light border border-neon-blue/10 hover:bg-neon-blue/5 transition"
        >
          <Facebook className="w-5 h-5 text-neon-blue" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSocialLogin('github')}
          className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-dark-light border border-neon-blue/10 hover:bg-neon-blue/5 transition"
        >
          <Github className="w-5 h-5 text-neon-blue" />
        </motion.button>
      </div>
    </div>
  );
}