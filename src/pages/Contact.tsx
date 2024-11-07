import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function Contact() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic here
    // Send to carl@amynna.se
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-blue text-center mb-12">
            Get in Touch
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white">carlpohl@protonmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="mt-1 block w-full rounded-md bg-dark-light border border-neon-blue/10 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md bg-dark-light border border-neon-blue/10 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md bg-dark-light border border-neon-blue/10 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}