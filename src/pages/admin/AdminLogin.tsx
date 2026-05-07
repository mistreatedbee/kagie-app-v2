import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import {
  clearPendingAuthRedirectRole,
  formatAuthError,
  getCurrentAuthState,
  signInWithEmail
} from '../../lib/auth';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [alreadyAdmin, setAlreadyAdmin] = useState(false);

  React.useEffect(() => {
    let isMounted = true;
    getCurrentAuthState()
      .then(({ role }) => {
        if (!isMounted) return;
        setAlreadyAdmin(role === 'admin');
      })
      .catch(() => {
        if (!isMounted) return;
        setAlreadyAdmin(false);
      })
      .finally(() => {
        if (isMounted) setIsCheckingSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Enter your admin email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const role = await signInWithEmail(email.trim(), password, 'admin');
      clearPendingAuthRedirectRole();

      if (role !== 'admin') {
        setError('This account is not an admin. Please use an admin account.');
        return;
      }

      if (rememberMe) {
        window.localStorage.setItem('kagie.adminRememberEmail', email.trim());
      } else {
        window.localStorage.removeItem('kagie.adminRememberEmail');
      }

      navigate('/admin', { replace: true });
    } catch (authError) {
      setError(formatAuthError(authError));
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const rememberedEmail = window.localStorage.getItem('kagie.adminRememberEmail');
    if (rememberedEmail) setEmail(rememberedEmail);
  }, []);

  if (!isCheckingSession && alreadyAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#111827]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden bg-[#111827] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Kagie Stay" className="h-14 w-14 rounded-2xl bg-white object-contain p-2" />
            <div>
              <p className="text-xl font-black">Kagie Stay</p>
              <p className="text-sm font-semibold text-white/55">Housing Admin Console</p>
            </div>
          </div>
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-[#E50914] px-3 py-1 text-xs font-black uppercase tracking-[0.24em]">
              Secure admin access
            </p>
            <h1 className="text-5xl font-black leading-tight">Manage students, hosts, bookings, payouts, and trust.</h1>
            <p className="mt-5 text-lg leading-8 text-white/65">
              A dedicated workspace for Kagie platform operations with mock data now and clear backend integration points next.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
            TODO: require two-factor authentication, enforce session timeout, and apply granular admin role permissions before production launch.
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-8 text-center">
              <img src="/logo.png" alt="Kagie Stay" className="mx-auto mb-4 h-16 w-16 rounded-2xl object-contain" />
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E50914]/10 text-[#E50914]">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-2xl font-black text-[#111827]">Admin Login</h1>
              <p className="mt-2 text-sm font-semibold text-gray-500">Sign in with an admin Kagie account.</p>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <label>
                <span className="mb-1 block text-sm font-black text-[#111827]">Email</span>
                <span className="relative block">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E5E7EB] pl-10 pr-3 text-sm font-semibold outline-none focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10"
                    placeholder="admin@kagie.co.za"
                  />
                </span>
              </label>

              <label>
                <span className="mb-1 block text-sm font-black text-[#111827]">Password</span>
                <span className="relative block">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E5E7EB] pl-10 pr-12 text-sm font-semibold outline-none focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#E50914] focus:ring-[#E50914]"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setError('Password reset is a production TODO. Ask a platform owner to reset the admin account for now.')}
                className="text-sm font-black text-[#E50914] hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isCheckingSession}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#E50914] text-sm font-black text-white shadow-lg shadow-[#E50914]/20 transition hover:bg-[#c90812] disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>

            <p className="mt-6 text-center text-sm font-semibold text-gray-500">
              Need student access?{' '}
              <Link to="/auth/role" className="font-black text-[#E50914] hover:underline">
                Use the app login
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
