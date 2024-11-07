import { motion } from 'framer-motion';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../stores/auth';

interface EmailVerificationProps {
  email: string;
}

export function EmailVerification({ email }: EmailVerificationProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { verifyEmail } = useAuth();

  const handleResendVerification = async () => {
    setIsResending(true);
    // Simulate sending verification email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setResendSuccess(true);
    setIsResending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
          <Mail className="w-6 h-6 text-neon-blue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Verify Your Email</h3>
          <p className="text-gray-400">Check your inbox to complete registration</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-neon-purple flex-shrink-0 mt-1" />
          <div>
            <p className="text-gray-300">
              We've sent a verification link to:
              <br />
              <span className="text-neon-blue font-bold">{email}</span>
            </p>
          </div>
        </div>

        {resendSuccess && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center space-x-2 text-neon-green"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Verification email resent!</span>
          </motion.div>
        )}

        <button
          onClick={handleResendVerification}
          disabled={isResending}
          className="w-full px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isResending ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-neon-purple border-t-transparent rounded-full"
              />
              <span>Resending...</span>
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              <span>Resend Verification Email</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}