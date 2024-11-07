import { motion } from 'framer-motion';
import { Bitcoin, CreditCard, Heart, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface DonationOption {
  id: string;
  title: string;
  icon: typeof Bitcoin;
  placeholder: string;
}

const donationOptions: DonationOption[] = [
  {
    id: 'bitcoin',
    title: 'Bitcoin',
    icon: Bitcoin,
    placeholder: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' // Replace with actual wallet
  },
  {
    id: 'credit-card',
    title: 'Credit Card',
    icon: CreditCard,
    placeholder: 'Stripe integration pending'
  },
  {
    id: 'paypal',
    title: 'PayPal',
    icon: DollarSign,
    placeholder: 'PayPal integration pending'
  }
];

export function DonationCard() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');

  const handleDonate = () => {
    // Implement donation logic based on selectedOption
    console.log(`Donating ${amount} via ${selectedOption}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-light rounded-lg p-6 border border-neon-purple/10"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-neon-purple/10 flex items-center justify-center">
          <Heart className="w-6 h-6 text-neon-purple" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Support Our Mission</h3>
          <p className="text-gray-400">Help us make education accessible to everyone</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {donationOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center space-x-4 ${
              selectedOption === option.id
                ? 'border-neon-purple bg-neon-purple/10'
                : 'border-neon-blue/10 hover:border-neon-purple/50'
            }`}
          >
            <option.icon className={`w-6 h-6 ${
              selectedOption === option.id ? 'text-neon-purple' : 'text-gray-400'
            }`} />
            <span className={selectedOption === option.id ? 'text-neon-purple' : 'text-white'}>
              {option.title}
            </span>
          </button>
        ))}
      </div>

      {selectedOption && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-dark rounded-lg border border-neon-blue/10 text-white focus:outline-none focus:border-neon-purple"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {selectedOption === 'bitcoin' ? 'Wallet Address' : 'Payment Details'}
            </label>
            <div className="p-4 bg-dark rounded-lg border border-neon-blue/10">
              <code className="text-neon-blue break-all">
                {donationOptions.find(opt => opt.id === selectedOption)?.placeholder}
              </code>
            </div>
          </div>

          <button
            onClick={handleDonate}
            className="w-full px-6 py-3 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center justify-center space-x-2"
          >
            <Heart className="w-5 h-5" />
            <span>Complete Donation</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}