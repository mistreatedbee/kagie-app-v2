import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Logo } from '../../components/common/Logo';
import { getPendingAuthRedirectRole } from '../../lib/auth';

export function EmailVerificationResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = getPendingAuthRedirectRole() || 'student';
  const status = searchParams.get('insforge_status');
  const type = searchParams.get('insforge_type');
  const errorMessage = searchParams.get('insforge_error') || searchParams.get('error_description');
  const isVerificationResult = type === 'verify_email';
  const isSuccess = status === 'success' && isVerificationResult;

  const title = isSuccess ? 'Email verified' : 'Verification link failed';
  const description = isSuccess
    ? 'Your Kagie Stay account is verified. Sign in to continue to your dashboard.'
    : errorMessage || 'This verification link may be expired or already used. Please sign in or create a new account to request another link.';

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:flex lg:items-center lg:justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-center bg-white px-2 py-2 sm:px-0 lg:min-h-0 lg:rounded-3xl lg:border lg:border-border lg:p-10 lg:shadow-card">
        <Logo className="mb-8 h-16 w-36" />

        <div
          className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${
            isSuccess ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
          }`}>
          {isSuccess ? <CheckCircle size={34} /> : <AlertCircle size={34} />}
        </div>

        <h1 className="mb-3 font-display text-3xl font-bold text-dark">{title}</h1>
        <p className="mb-8 text-gray-500">{description}</p>

        <Button
          fullWidth
          onClick={() => navigate(`/auth/login?role=${role}`, { replace: true })}
          rightIcon={<ArrowRight size={18} />}>
          Sign in
        </Button>

        {!isSuccess && (
          <button
            type="button"
            onClick={() => navigate(`/auth/signup?role=${role}`, { replace: true })}
            className="mt-4 text-sm font-semibold text-primary hover:underline">
            Create a new account
          </button>
        )}
      </motion.div>
    </div>
  );
}
