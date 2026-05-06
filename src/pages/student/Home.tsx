import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Home,
  PlusCircle,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { mockListings, mockUser } from '../../data/mockData';
import { ListingCard } from '../../components/listings/ListingCard';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

// Simulated personal stats (could be replaced with real data)
const DASHBOARD_STATS = {
  saved: 5,
  applications: 2,
  viewings: 0,
  lastActivity: '2 hours ago',
};

const quickActions = [
  { label: 'Near Campus', icon: <Compass size={18} />, color: 'bg-blue-50 text-blue-600' },
  { label: 'Private Room', icon: <Star size={18} />, color: 'bg-purple-50 text-purple-600' },
  { label: 'Budget Picks', icon: <Zap size={18} />, color: 'bg-amber-50 text-amber-600' },
  { label: 'With Gym', icon: <Heart size={18} />, color: 'bg-rose-50 text-rose-600' },
];

export function Home() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good morning');
  
  // Simulated upcoming viewings – empty array by default
  const upcomingViewings = []; // Replace with real data if available

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting('Good afternoon');
    else if (hour >= 17) setGreeting('Good evening');
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-28">
      {/* Lightweight header – modern, clean */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={mockUser.avatar}
              className="w-10 h-10 rounded-full ring-2 ring-primary/10 object-cover"
            />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{greeting}</p>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">{mockUser.name}</h1>
            </div>
          </div>
          <button className="relative p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"
      >
        {/* Dashboard Grid – two columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ---- WELCOME & STATS CARD (takes full row on mobile, 2 columns on desktop) ---- */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="relative bg-dark rounded-[2.5rem] p-6 sm:p-8 overflow-hidden shadow-xl shadow-dark/10">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Your dashboard</h2>
                  <p className="text-white/60 text-sm">Everything at a glance</p>
                  
                  {/* Quick search bar */}
                  <div
                    onClick={() => navigate('/listings')}
                    className="mt-5 group flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 p-2 rounded-2xl cursor-pointer hover:bg-white/20 transition-all max-w-md"
                  >
                    <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/30">
                      <Search className="text-white" size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">Search new listings</p>
                      <p className="text-white/50 text-xs">University, suburb, or street</p>
                    </div>
                    <Filter size={18} className="text-white/60 mr-1" />
                  </div>
                </div>

                {/* Stats pills */}
                <div className="flex flex-wrap gap-3 sm:justify-end">
                  {[
                    { icon: <Bookmark size={16} />, value: DASHBOARD_STATS.saved, label: 'Saved' },
                    { icon: <Home size={16} />, value: DASHBOARD_STATS.applications, label: 'Applied' },
                    { icon: <CalendarCheck size={16} />, value: DASHBOARD_STATS.viewings, label: 'Viewings' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 text-white text-center min-w-[80px]">
                      <div className="flex justify-center mb-1 opacity-70">{stat.icon}</div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-[10px] uppercase tracking-wider opacity-60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---- ACTIVE BOOKING CARD (if exists) ---- */}
          {mockUser.activeBooking && (
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Your Active Booking</h3>
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase">Confirmed</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={mockUser.activeBooking.image}
                    className="w-16 h-16 rounded-2xl object-cover"
                    alt="Property"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{mockUser.activeBooking.listingName}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> Move in {new Date(mockUser.activeBooking.moveInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/bookings')}
                    className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ---- QUICK ACTIONS (bento grid) ---- */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-start p-4 bg-white rounded-[1.75rem] border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`p-3 rounded-2xl mb-3 ${action.color}`}>
                    {action.icon}
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ---- UPCOMING VIEWINGS CARD (personal) ---- */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" /> Upcoming Viewings
                </h3>
                <button className="text-xs font-semibold text-primary">Schedule</button>
              </div>
              {upcomingViewings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                    <CalendarCheck size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No viewings yet</p>
                  <button
                    onClick={() => navigate('/listings')}
                    className="mt-3 text-sm font-semibold text-primary flex items-center gap-1 hover:underline"
                  >
                    Browse properties <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                // Render list of viewings here if data exists
                <p className="text-sm text-gray-400">Coming soon...</p>
              )}
            </div>
          </motion.div>

          {/* ---- MARKET INSIGHT / LAST ACTIVITY (personal touch) ---- */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-gray-400" />
                <h3 className="font-bold text-gray-900">Your Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last active</span>
                  <span className="text-sm font-semibold text-gray-700">{DASHBOARD_STATS.lastActivity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Saved listings</span>
                  <span className="text-sm font-semibold text-gray-700">{DASHBOARD_STATS.saved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Applications</span>
                  <span className="text-sm font-semibold text-gray-700">{DASHBOARD_STATS.applications}</span>
                </div>
                <button
                  onClick={() => navigate('/saved')}
                  className="w-full mt-3 py-3 bg-gray-50 text-gray-700 font-semibold rounded-2xl hover:bg-gray-100 transition-colors text-sm"
                >
                  View all saved
                </button>
              </div>
            </div>
          </motion.div>

          {/* ---- RECOMMENDED LISTINGS (full width, horizontal snap) ---- */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Recommended for you</h3>
                  <p className="text-sm text-gray-500">Based on your preferences</p>
                </div>
                <button
                  onClick={() => navigate('/listings')}
                  className="text-sm font-semibold text-primary bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
                >
                  View all
                </button>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-2 -mx-5 px-5 snap-x hide-scrollbar">
                {mockListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    className="w-[280px] shrink-0 snap-center"
                    whileTap={{ scale: 0.98 }}
                  >
                    <ListingCard listing={listing} compact />
                  </motion.div>
                ))}
                {/* Discovery card – prompts to explore more */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-[200px] shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 p-6 text-center cursor-pointer snap-center"
                  onClick={() => navigate('/listings')}
                >
                  <PlusCircle size={28} className="text-gray-300 mb-2" />
                  <p className="text-sm font-medium text-gray-500">Explore more</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.main>

      {/* Floating Map button – polished and integrated */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => navigate('/map')}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-dark text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:scale-105 transition-transform active:scale-95"
      >
        <Map size={18} />
        Explore Map
      </motion.button>
    </div>
  );
}