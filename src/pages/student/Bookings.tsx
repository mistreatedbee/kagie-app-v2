import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Check, MessageSquare, ShieldCheck } from 'lucide-react';
import { mockUser } from '../../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const tabs = [
  {
    id: 'upcoming',
    label: 'Upcoming'
  },
  {
    id: 'active',
    label: 'Active'
  },
  {
    id: 'past',
    label: 'Past'
  }];

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 pt-10 pb-4 sticky top-0 z-30 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Stay timeline
            </p>
            <h1 className="font-display font-bold text-2xl text-gray-900">
              My Bookings
            </h1>
          </div>

          <div className="flex gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100 shadow-inner">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-white text-dark shadow-sm' : 'text-gray-500 hover:text-dark'}`}>
                {tab.label}
              </button>
            )}
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-5xl flex-1 p-4 sm:p-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="mb-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Upcoming', value: mockUser.activeBooking ? 1 : 0 },
            { label: 'Active', value: 0 },
            { label: 'Past', value: 0 }
          ].map((stat) =>
          <div
            key={stat.label}
            className="rounded-[1.5rem] border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs font-semibold text-gray-500">
                {stat.label} bookings
              </p>
            </div>
          )}
        </motion.div>

        {activeTab === 'upcoming' && mockUser.activeBooking ?
        <motion.div
          variants={itemVariants}
          className="space-y-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6 lg:space-y-0">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
              <div className="h-32 relative">
                <img
                src={mockUser.activeBooking.image}
                alt="Booking"
                className="w-full h-full object-cover" />

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-dark shadow-sm">
                  Ref: KAG-8X29M
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h3 className="font-bold text-dark text-lg">
                      {mockUser.activeBooking.listingName}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> Braamfontein, JHB
                    </p>
                  </div>
                  <span className="bg-success/10 text-success px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Check size={12} /> Confirmed
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-4 mb-4 border border-gray-100 sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Move-in Date
                    </p>
                    <p className="font-bold text-dark flex items-center gap-1.5">
                      <Calendar size={16} className="text-primary" />
                      {new Date(
                      mockUser.activeBooking.moveInDate
                    ).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                    </p>
                  </div>
                  <div className="hidden h-8 w-px bg-border sm:block"></div>
                  <div className="sm:text-right">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Duration
                    </p>
                    <p className="font-bold text-dark">10 Months</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="flex-1 bg-gray-100 text-dark py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-hover transition-colors shadow-sm shadow-primary/20">
                    Message Host
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm lg:block">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-display font-bold text-lg text-dark mb-2">
                Stay Support
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Keep your booking details, move-in date, and host messages close
                while preparing for arrival.
              </p>
              <button className="mt-5 flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-100">
                <MessageSquare size={16} />
                Open support
              </button>
            </div>
          </motion.div> :

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center h-64 text-center rounded-[2rem] border border-gray-100 bg-white shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="font-bold text-dark text-lg mb-1">
              No {activeTab} bookings
            </h3>
            <p className="text-sm text-gray-500 max-w-[220px]">
              You don't have any {activeTab} bookings at the moment.
            </p>
          </motion.div>
        }
      </motion.div>
    </div>);
}
