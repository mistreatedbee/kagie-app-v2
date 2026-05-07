import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Check,
  MessageSquare,
  ShieldCheck,
  Clock,
  CreditCard,
  ArrowRight,
  FileText,
  Home,
  AlertCircle,
  Users,
  Star,
  Wrench,
} from 'lucide-react';
import { mockUser } from '../../data/mockData';
import {
  fallbackAvatarUrl,
  getEditableProfile,
  type EditableProfile
} from '../../lib/auth';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export function Bookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [countdown, setCountdown] = useState(0);
  const [profile, setProfile] = useState<EditableProfile | null>(null);
  const profileName = profile?.name || 'Kagie User';
  const profileAvatar = profile?.avatar_url || fallbackAvatarUrl;
  const isEmailVerified = profile?.emailVerified ?? false;

  // Simulate a move-in countdown
  useEffect(() => {
    if (mockUser.activeBooking) {
      const moveIn = new Date(mockUser.activeBooking.moveInDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((moveIn - now) / (1000 * 60 * 60 * 24)));
      setCountdown(diff);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getEditableProfile()
      .then((editableProfile) => {
        if (isMounted) setProfile(editableProfile);
      })
      .catch(() => {
        if (isMounted) setProfile(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: mockUser.activeBooking ? 1 : 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'past', label: 'Past', count: 0 },
  ];

  // Dashboard widgets data (simulated, could be live)
  const dashboardMetrics = mockUser.activeBooking
    ? {
        moveInDate: new Date(mockUser.activeBooking.moveInDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        leaseTerm: '10 Months',
        depositPaid: 'R2,500',
        nextPaymentDue: '1 Jun 2026',
        roommates: 2,
        maintenanceOpen: 0,
        amenities: ['WiFi', 'Gym', 'Laundry'],
      }
    : null;

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col pb-12">
      {/* Header with greeting and identity */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 pt-12 pb-4 sticky top-0 z-30 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={profileAvatar}
                alt="Profile"
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatarUrl;
                }}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/10"
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                  {profileName}'s Dashboard
                </p>
                <h1 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
                  My Home
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`hidden sm:flex items-center gap-2 text-xs font-bold bg-gray-50 px-3 py-2 rounded-full border border-gray-100 ${
                  isEmailVerified ? 'text-gray-400' : 'text-gray-500'
                }`}>
                <ShieldCheck
                  size={14}
                  className={isEmailVerified ? 'text-success' : 'text-gray-400'}
                />
                {isEmailVerified ? 'Verified Tenant' : 'Email Not Verified'}
              </div>
            </div>
          </div>

          {/* Tab Pill Selector */}
          <div className="flex gap-1 bg-gray-100/50 p-1.5 rounded-2xl w-full max-w-md border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] ${
                      activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' && mockUser.activeBooking ? (
            <motion.div key="dashboard-view" variants={itemVariants} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              {/* Dashboard summary banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  variants={itemVariants}
                  className="col-span-1 md:col-span-2 bg-dark rounded-[2.5rem] p-6 shadow-xl shadow-dark/10 relative overflow-hidden"
                >
                  <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                  <div className="relative z-10 text-white">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                      <Home size={16} />
                      <span>Your upcoming stay</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{mockUser.activeBooking.listingName}</h2>
                    <p className="flex items-center gap-1.5 text-white/70 mb-5">
                      <MapPin size={15} /> Braamfontein, Johannesburg
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 text-center">
                        <p className="text-xs uppercase tracking-wider opacity-70">Move-in</p>
                        <p className="font-bold text-lg">{dashboardMetrics.moveInDate}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 text-center">
                        <p className="text-xs uppercase tracking-wider opacity-70">Countdown</p>
                        <p className="font-bold text-lg">{countdown} days</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 text-center">
                        <p className="text-xs uppercase tracking-wider opacity-70">Lease</p>
                        <p className="font-bold text-lg">{dashboardMetrics.leaseTerm}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quick stats */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Payment status</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-success/10 rounded-2xl text-success">
                        <Check size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Deposit</p>
                        <p className="font-bold text-gray-900">{dashboardMetrics.depositPaid} paid</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Next: {dashboardMetrics.nextPaymentDue}</p>
                  </div>
                  <button className="w-full bg-primary/10 text-primary font-semibold py-2.5 rounded-2xl hover:bg-primary/20 transition-colors text-sm">
                    View invoice
                  </button>
                </motion.div>
              </div>

              {/* Main booking card + side widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Booking card (larger) */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-56 sm:h-72 relative">
                    <img
                      src={mockUser.activeBooking.image}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-dark uppercase tracking-wider shadow-lg">
                      Ref: KAG-8X29M
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-success/10 text-success px-4 py-1.5 rounded-full text-xs font-black uppercase flex items-center gap-1.5 border border-success/20">
                        <Check size={14} strokeWidth={3} /> Confirmed
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={14} /> Updated 2 days ago
                      </span>
                    </div>

                    {/* Progress timeline */}
                    <div className="grid grid-cols-3 gap-2 mb-8">
                      {[
                        { label: 'Deposit Paid', icon: <CreditCard size={14} />, done: true },
                        { label: 'Contract Signed', icon: <FileText size={14} />, done: true },
                        { label: 'Move-in Ready', icon: <Home size={14} />, done: false },
                      ].map((step, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                          <div className={`h-1.5 rounded-full ${step.done ? 'bg-success' : 'bg-gray-100'}`} />
                          <div className="flex items-center gap-1.5">
                            <span className={step.done ? 'text-success' : 'text-gray-300'}>{step.icon}</span>
                            <span className={`text-[10px] font-bold ${step.done ? 'text-gray-700' : 'text-gray-400'}`}>
                              {step.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-white border-2 border-gray-100 text-gray-900 py-4 rounded-2xl font-bold text-sm hover:border-primary/20 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                        <FileText size={16} /> View Lease
                      </button>
                      <button className="flex-1 bg-dark text-white py-4 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-dark/20 transition-all flex items-center justify-center gap-2">
                        <MessageSquare size={16} /> Message Host
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Side widgets */}
                <motion.div variants={itemVariants} className="space-y-4">
                  {/* Amenities / quick info */}
                  <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Star size={16} className="text-amber-500" /> Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dashboardMetrics.amenities.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Roommates */}
                  <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Users size={16} className="text-primary" /> Roommates
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardMetrics.roommates}
                    </p>
                    <p className="text-xs text-gray-500">other students</p>
                  </div>

                  {/* Maintenance / support */}
                  <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Wrench size={16} className="text-gray-400" /> Maintenance
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3">
                      <AlertCircle size={14} className="text-success" /> All good!
                    </p>
                    <button className="w-full bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-2xl hover:bg-gray-100 transition-colors text-sm">
                      Report issue
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Bottom support card */}
              <motion.div variants={itemVariants} className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Need help?</h4>
                    <p className="text-sm text-gray-500">Our team is available 24/7 for student tenants.</p>
                  </div>
                </div>
                <button className="whitespace-nowrap bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50">
                  Contact Support
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              variants={itemVariants}
              className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6 relative">
                <Calendar size={40} />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Clock size={16} className="text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-2xl mb-2">
                No {activeTab} stays found
              </h3>
              <p className="text-gray-500 max-w-[280px] mb-8 leading-relaxed">
                When you book a place, your personalized dashboard and move-in details will appear here.
              </p>
              <button
                onClick={() => navigate('/listings')}
                className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                Explore Listings <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
