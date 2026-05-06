import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell,
  Search,
  Map,
  Filter,
  ChevronRight,
  CalendarCheck } from
'lucide-react';
import { mockListings, mockUser } from '../../data/mockData';
import { ListingCard } from '../../components/listings/ListingCard';
export function Home() {
  const navigate = useNavigate();
  const quickFilters = [
  {
    label: 'Near Campus',
    icon: '🎓'
  },
  {
    label: 'Private Room',
    icon: '🚪'
  },
  {
    label: 'Under R5000',
    icon: '💰'
  },
  {
    label: 'With Gym',
    icon: '🏋️'
  }];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header Section */}
      <div className="bg-white px-4 pt-10 pb-6 shadow-sm relative z-10 sm:px-6 sm:pt-12 lg:rounded-b-[2.5rem]">
        <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src={mockUser.avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover" />
            
            <div>
              <p className="text-sm text-gray-500 font-medium">Good morning,</p>
              <h1 className="text-xl font-display font-bold text-dark">
                {mockUser.name}
              </h1>
            </div>
          </div>
          <button className="relative w-10 h-10 rounded-full border border-border flex items-center justify-center text-dark hover:bg-gray-50 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Search Bar */}
        <div
          onClick={() => navigate('/listings')}
          className="bg-gray-50 border border-border rounded-2xl p-3 flex items-center gap-3 cursor-text shadow-inner">
          
          <Search className="text-gray-400 ml-1" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium text-dark">Where to?</p>
            <p className="text-xs text-gray-500">City, campus, or residence</p>
          </div>
          <div className="flex gap-2 border-l border-border pl-3">
            <button className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-dark hover:text-primary transition-colors">
              <Filter size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/map');
              }}
              className="w-9 h-9 rounded-xl bg-dark text-white shadow-sm flex items-center justify-center hover:bg-dark/90 transition-colors">
              
              <Map size={18} />
            </button>
          </div>
        </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 mt-6 space-y-8 sm:px-6 lg:px-8">
        {/* Active Booking Card */}
        {mockUser.activeBooking &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="bg-primary rounded-3xl p-1 relative overflow-hidden shadow-lg shadow-primary/20">
          
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="bg-white/10 backdrop-blur-md rounded-[1.35rem] p-4 flex items-center gap-4">
              <img
              src={mockUser.activeBooking.image}
              alt="Booking"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
            
              <div className="flex-1 text-white">
                <div className="flex items-center gap-1.5 mb-1">
                  <CalendarCheck size={14} className="text-white/80" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Upcoming Stay
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-1">
                  {mockUser.activeBooking.listingName}
                </h3>
                <p className="text-sm text-white/90">
                  Moves in{' '}
                  {new Date(
                  mockUser.activeBooking.moveInDate
                ).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
                </p>
              </div>
              <button
              onClick={() => navigate('/bookings')}
              className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-md">
              
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        }

        {/* Quick Filters */}
        <div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:px-0">
            {quickFilters.map((filter, index) =>
            <button
              key={index}
              className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-2xl whitespace-nowrap shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
              
                <span className="text-lg">{filter.icon}</span>
                <span className="text-sm font-semibold text-dark">
                  {filter.label}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Recommended Section */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-dark">
                Recommended for you
              </h2>
              <p className="text-sm text-gray-500">Based on your institution</p>
            </div>
            <button
              onClick={() => navigate('/listings')}
              className="text-sm font-semibold text-primary hover:underline">
              
              See all
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 snap-x sm:-mx-6 sm:px-6 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:mx-0 lg:grid-cols-3 lg:px-0 xl:grid-cols-4">
            {mockListings.map((listing) =>
            <div key={listing.id} className="w-[280px] shrink-0 snap-center md:w-auto">
                <ListingCard listing={listing} />
              </div>
            )}
          </div>
        </div>

        {/* Nearby Section */}
        <div>
          <h2 className="font-display font-bold text-xl text-dark mb-4">
            Nearby Campus
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {mockListings.slice(0, 3).map((listing) =>
            <ListingCard
              key={listing.id}
              listing={listing}
              layout="horizontal" />

            )}
          </div>
        </div>
      </div>
    </div>);

}
