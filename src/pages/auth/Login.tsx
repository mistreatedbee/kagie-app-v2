import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Github,
  Lock,
  Mail
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Logo } from '../../components/common/Logo';
import {
  formatAuthError,
  clearPendingAuthRedirectRole,
  getCurrentAuthState,
  getPendingAuthRedirectRole,
  getRoleLandingPath,
  isKagieRole,
  signInWithEmail,
  signInWithOAuth
} from '../../lib/auth';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const role = isKagieRole(roleParam) ? roleParam : getPendingAuthRedirectRole() || 'student';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthProvider, setOauthProvider] = useState<'google' | 'github' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isVerified =
    searchParams.get('insforge_status') === 'success' &&
    searchParams.get('insforge_type') === 'verify_email';
  const verificationError =
    searchParams.get('insforge_status') === 'error' &&
    searchParams.get('insforge_type') === 'verify_email';

  useEffect(() => {
    let isMounted = true;

    if (!getPendingAuthRedirectRole() && !window.location.search.includes('insforge_code')) {
      return undefined;
    }

    getCurrentAuthState()
      .then(({ user, role: savedRole }) => {
        if (!isMounted || !user || !savedRole) return;
        clearPendingAuthRedirectRole();
        navigate(getRoleLandingPath(savedRole), { replace: true });
      })
      .catch((authError) => {
        if (!isMounted) return;
        setError(formatAuthError(authError));
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const savedRole = await signInWithEmail(email, password, role);
      clearPendingAuthRedirectRole();
      navigate(getRoleLandingPath(savedRole), { replace: true });
    } catch (authError) {
      setError(formatAuthError(authError));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setError('');
    setOauthProvider(provider);

    try {
      await signInWithOAuth(provider, role);
    } catch (authError) {
      setError(formatAuthError(authError));
      setOauthProvider(null);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:flex lg:items-center lg:justify-center">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col rounded-none bg-white px-2 py-2 sm:px-0 lg:min-h-0 lg:max-w-5xl lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-border lg:p-0 lg:shadow-card">
        <div className="hidden bg-primary p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="w-36 h-16 bg-white rounded-xl flex items-center justify-center px-3">
            <Logo className="h-12 w-full" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold mb-3">Kagie Stay</h2>
            <p className="text-white/80">
              Find verified student accommodation and manage your stay from one
              place.
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
                Welcome back
              </h1>
              <p className="text-gray-500">
                Sign in to your {role} account to continue
              </p>
            </div>

            {isVerified &&
            <div className="mb-5 rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm font-medium text-success">
                Email verified. Sign in to continue.
              </div>
            }
            {verificationError &&
            <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                Verification failed. Please request a new verification link.
              </div>
            }
            {error &&
            <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                {error}
              </div>
            }

            <form onSubmit={handleLogin} className="space-y-5 mb-8">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                leftIcon={<Mail size={20} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />

              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                className="mt-4">
                Sign In
              </Button>
            </form>

            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative bg-white px-4 text-sm text-gray-500">
                Or continue with
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                fullWidth
                isLoading={oauthProvider === 'google'}
                onClick={() => handleOAuth('google')}
                leftIcon={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4" />
                    <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853" />
                    <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05" />
                    <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335" />
                  </svg>
                }>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                fullWidth
                isLoading={oauthProvider === 'github'}
                onClick={() => handleOAuth('github')}
                leftIcon={<Github size={20} />}>
                GitHub
              </Button>
            </div>
          </motion.div>

          <div className="mt-auto pt-8 text-center">
            <p className="text-gray-500">
              Don't have an account?{' '}
              <button
                onClick={() => navigate(`/auth/signup?role=${role}`)}
                className="text-primary font-semibold hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>);
}
