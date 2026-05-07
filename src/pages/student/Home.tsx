import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell,
  Search,
  Map,
  Filter,
  ChevronRight,
  CalendarCheck,
  Zap,
  Star,
  Compass,
  Heart,
  Bookmark,
  Clock,
  TrendingUp,
  Home as HomeIcon,
  PlusCircle,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { mockListings, mockUser } from '../../data/mockData';
import { ListingCard } from '../../components/listings/ListingCard';
import {
  fallbackAvatarUrl,
  getEditableProfile,
  type EditableProfile
} from '../../lib/auth';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const DASHBOARD_STATS = {
  saved: 5,
  applications: 2,
  viewings: 0,
  lastActivity: '2 hours ago'
};

const quickActions = [
  { label: 'Near Campus', icon: <Compass size={18} />, color: 'bg-blue-50 text-blue-600' },
  { label: 'Private Room', icon: <Star size={18} />, color: 'bg-purple-50 text-purple-600' },
  { label: 'Budget Picks', icon: <Zap size={18} />, color: 'bg-amber-50 text-amber-600' },
  { label: 'With Gym', icon: <Heart size={18} />, color: 'bg-rose-50 text-rose-600' }
];

export function Home() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good morning');
  const [profile, setProfile] = useState<EditableProfile | null>(null);
  const profileName = profile?.name || 'Kagie User';
  const profileAvatar = profile?.avatar_url || fallbackAvatarUrl;
  const upcomingViewings: Array<{ id: string; title: string }> = [];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting('Good afternoon');
    else if (hour >= 17) setGreeting('Good evening');
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

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-28">
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={profileAvatar}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/10"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {greeting}
              </p>
              <h1 className="text-lg font-bold leading-tight text-gray-900">{profileName}</h1>
            </div>
          </div>
          <button className="relative rounded-xl bg-gray-50 p-2.5 text-gray-600 transition-all hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
          </button>
        </div>
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-dark p-6 shadow-xl shadow-dark/10 sm:p-8">
              <div className="absolute right-[-10%] top-[-20%] h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="mb-1 text-2xl font-bold text-white sm:text-3xl">Your dashboard</h2>
                  <p className="text-sm text-white/60">Everything at a glance</p>

                  <div
                    onClick={() => navigate('/listings')}
                    className="group mt-5 flex max-w-md cursor-pointer items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-lg transition-all hover:bg-white/20">
                    <div className="rounded-xl bg-primary p-2.5 shadow-lg shadow-primary/30">
                      <Search className="text-white" size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Search new listings</p>
                      <p className="text-xs text-white/50">University, suburb, or street</p>
                    </div>
                    <Filter size={18} className="mr-1 text-white/60" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 sm:justify-end">
                  {[
                    { icon: <Bookmark size={16} />, value: DASHBOARD_STATS.saved, label: 'Saved' },
                    { icon: <HomeIcon size={16} />, value: DASHBOARD_STATS.applications, label: 'Applied' },
                    { icon: <CalendarCheck size={16} />, value: DASHBOARD_STATS.viewings, label: 'Viewings' }
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="min-w-[80px] rounded-2xl bg-white/10 px-4 py-3 text-center text-white backdrop-blur-md">
                      <div className="mb-1 flex justify-center opacity-70">{stat.icon}</div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {mockUser.activeBooking && (
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Your Active Booking
                  </h3>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold uppercase text-green-600">
                    Confirmed
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={mockUser.activeBooking.image}
                    className="h-16 w-16 rounded-2xl object-cover"
                    alt="Booked property"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{mockUser.activeBooking.listingName}</h4>
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={14} />
                      Move in{' '}
                      {new Date(mockUser.activeBooking.moveInDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/bookings')}
                    className="rounded-full bg-gray-50 p-2.5 text-gray-400 transition-all hover:bg-primary hover:text-white">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/listings')}
                  className="flex flex-col items-start rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className={`mb-3 rounded-2xl p-3 ${action.color}`}>{action.icon}</div>
                  <span className="text-sm font-bold text-gray-800">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="h-full rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-gray-900">
                  <Clock size={18} className="text-gray-400" /> Upcoming Viewings
                </h3>
                <button
                  onClick={() => navigate('/listings')}
                  className="text-xs font-semibold text-primary">
                  Schedule
                </button>
              </div>
              {upcomingViewings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                    <CalendarCheck size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No viewings yet</p>
                  <button
                    onClick={() => navigate('/listings')}
                    className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    Browse properties <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400">Coming soon...</p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="h-full rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-gray-400" />
                <h3 className="font-bold text-gray-900">Your Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last active</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {DASHBOARD_STATS.lastActivity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Saved listings</span>
                  <span className="text-sm font-semibold text-gray-700">{DASHBOARD_STATS.saved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Applications</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {DASHBOARD_STATS.applications}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/listings')}
                  className="mt-3 w-full rounded-2xl bg-gray-50 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100">
                  Browse listings
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Recommended for you</h3>
                  <p className="text-sm text-gray-500">Based on your preferences</p>
                </div>
                <button
                  onClick={() => navigate('/listings')}
                  className="rounded-full bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
                  View all
                </button>
              </div>
              <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-2 hide-scrollbar">
                {mockListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    className="w-[280px] shrink-0 snap-center"
                    whileTap={{ scale: 0.98 }}>
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex w-[200px] shrink-0 snap-center cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-gray-200 bg-gray-50 p-6 text-center"
                  onClick={() => navigate('/listings')}>
                  <PlusCircle size={28} className="mb-2 text-gray-300" />
                  <p className="text-sm font-medium text-gray-500">Explore more</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => navigate('/map')}
        className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-dark px-6 py-3.5 font-bold text-white shadow-2xl transition-transform hover:scale-105 active:scale-95 sm:bottom-8">
        <Map size={18} />
        Explore Map
      </motion.button>
    </div>
  );
}
