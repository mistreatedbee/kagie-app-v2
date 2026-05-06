import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Logo } from '../../components/common/Logo';
import {
  formatAuthError,
  getRoleFromSearch,
  getRoleLandingPath,
  signUpWithEmail,
  validatePassword
} from '../../lib/auth';

export function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = getRoleFromSearch(searchParams.get('role'));
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isWaitingForEmail, setIsWaitingForEmail] = useState(false);

  const passwordIssues = password ? validatePassword(password) : [];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const missingPasswordRules = validatePassword(password);
    if (missingPasswordRules.length > 0) {
      setError(`Password needs ${missingPasswordRules.join(', ')}.`);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await signUpWithEmail(name, email, password, role);

      if (data?.accessToken) {
        navigate(getRoleLandingPath(role), { replace: true });
        return;
      }

      setIsWaitingForEmail(true);
    } catch (authError) {
      setError(formatAuthError(authError));
    } finally {
      setIsLoading(false);
    }
  };

  if (isWaitingForEmail) {
    return (
      <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:flex lg:items-center lg:justify-center">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-center bg-white px-2 py-2 sm:px-0 lg:min-h-0 lg:rounded-3xl lg:border lg:border-border lg:p-10 lg:shadow-card">
          <Logo className="mb-8 h-16 w-36" />
          <h1 className="font-display font-bold text-3xl text-dark mb-3">
            Check your email
          </h1>
          <p className="text-gray-500 mb-8">
            We sent a verification link to {email}. Open it, then sign in to your {role} account.
          </p>
          <Button fullWidth onClick={() => navigate(`/auth/login?role=${role}`)}>
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:flex lg:items-center lg:justify-center">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col rounded-none bg-white px-2 py-2 sm:px-0 lg:min-h-0 lg:max-w-5xl lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-border lg:p-0 lg:shadow-card">
        <div className="hidden bg-dark p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="w-36 h-16 bg-white rounded-xl flex items-center justify-center px-3">
            <Logo className="h-12 w-full" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold mb-3">Create your space</h2>
            <p className="text-white/80">
              Join Kagie Stay as a {role} and continue with a verified account.
            </p>
          </div>
        </div>
        <div className="flex min-h-[calc(100vh-3rem)] flex-col bg-white px-2 py-2 sm:px-0 lg:min-h-0 lg:px-10 lg:py-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-gray-100 transition-colors mb-8">
            <ArrowLeft size={20} />
          </button>
          <Logo className="mb-8 h-14 w-32 lg:hidden" />

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4
            }}
            className="flex-1">
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl text-dark mb-2">
                Create account
              </h1>
              <p className="text-gray-500">
                Sign up as a {role}
              </p>
            </div>

            {error &&
            <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                {error}
              </div>
            }

            <form onSubmit={handleSignup} className="space-y-5 mb-8">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your name"
                leftIcon={<User size={20} />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                leftIcon={<Mail size={20} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                leftIcon={<Lock size={20} />}
                rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-dark transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
              {passwordIssues.length > 0 &&
              <p className="text-xs font-medium text-gray-500">
                  Password needs {passwordIssues.join(', ')}.
                </p>
              }
              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                leftIcon={<Lock size={20} />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required />
              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign Up
              </Button>
            </form>
          </motion.div>

          <div className="mt-auto pt-8 text-center">
            <p className="text-gray-500">
              Already have an account?{' '}
              <button
                onClick={() => navigate(`/auth/login?role=${role}`)}
                className="text-primary font-semibold hover:underline">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
