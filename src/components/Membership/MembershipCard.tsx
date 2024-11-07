import { motion } from 'framer-motion';
import { Star, Mail, ExternalLink } from 'lucide-react';

const GOOGLE_FORM_URL = 'https://forms.google.com/your-form-id'; // Replace with actual form URL

const memberBenefits = [
  'Early access to new courses',
  'Monthly newsletter with exclusive content',
  'Priority support',
  'Member-only webinars',
  'Special discounts on premium courses'
];

export function MembershipCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-light rounded-lg p-6 border border-neon-green/10"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-neon-green/10 flex items-center justify-center">
          <Star className="w-6 h-6 text-neon-green" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Become a Member</h3>
          <p className="text-gray-400">Join our community of learners</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {memberBenefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Star className="w-4 h-4 text-neon-green" />
            <span className="text-gray-400">{benefit}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-3 rounded-lg bg-neon-green/20 text-neon-green hover:bg-neon-green/30 transition flex items-center justify-center space-x-2"
        >
          <span>Apply for Membership</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <Mail className="w-4 h-4" />
          <span>You'll receive updates at your registered email</span>
        </div>
      </div>
    </motion.div>
  );
}