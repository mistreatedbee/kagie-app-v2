import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
export function RoleSelection() {
  const navigate = useNavigate();
  const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Find and book accommodation near your campus.',
    icon: GraduationCap,
    color: 'bg-primary/10 text-primary',
    path: '/auth/login?role=student'
  },
  {
    id: 'host',
    title: 'Host / Landlord',
    description: 'List your property and manage student bookings.',
    icon: Building2,
    color: 'bg-accent-blue/10 text-accent-blue',
    path: '/auth/login?role=host'
  },
  {
    id: 'admin',
    title: 'Platform Admin',
    description: 'Manage users, listings, and platform settings.',
    icon: ShieldCheck,
    color: 'bg-dark/5 text-dark',
    path: '/auth/login?role=admin'
  }];

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
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
          className="mb-10">
          
          <Logo className="mb-6 h-16 w-36" />
          <h1 className="font-display font-bold text-3xl text-dark mb-2">
            Choose your role
          </h1>
          <p className="text-gray-500">How would you like to use Kagie Stay?</p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }}
                onClick={() => navigate(role.path)}
                className="w-full bg-white p-5 rounded-3xl border border-border hover:border-primary/30 hover:shadow-md transition-all group text-left flex items-center gap-4 lg:flex-col lg:items-start lg:min-h-64">
                
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${role.color}`}>
                  
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-dark text-lg mb-1">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-snug">
                    {role.description}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </div>
              </motion.button>);

          })}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <p className="text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-dark font-medium underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-dark font-medium underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>);

}
