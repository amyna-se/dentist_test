import { motion } from 'framer-motion';
import { DonationCard } from '../components/Donation/DonationCard';
import { MembershipCard } from '../components/Membership/MembershipCard';

export function Support() {
  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-blue text-center mb-12">
            Support NeuroStep
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <DonationCard />
            <MembershipCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
}