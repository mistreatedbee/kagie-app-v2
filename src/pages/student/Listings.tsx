import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Map,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  Compass,
  Star,
  Zap,
  ShieldCheck } from
'lucide-react';
import { mockListings } from '../../data/mockData';
import { ListingCard } from '../../components/listings/ListingCard';
import { FilterSheet } from '../../components/listings/FilterSheet';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const listingHighlights = [
  { label: 'Verified stays', value: '18', icon: ShieldCheck, color: 'bg-green-50 text-green-600' },
  { label: 'Near campus', value: '12', icon: Compass, color: 'bg-blue-50 text-blue-600' },
  { label: 'Top rated', value: '4.8', icon: Star, color: 'bg-amber-50 text-amber-600' },
  { label: 'Quick match', value: '24', icon: Zap, color: 'bg-rose-50 text-rose-600' }
];

export function Listings() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 'grid' : 'list'
  );
  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col pb-28">
      {/* Sticky Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 pt-10 pb-4 sticky top-0 z-30 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Find your fit
            </p>
            <h1 className="font-display text-2xl font-bold text-gray-900">
              Browse listings
            </h1>
          </div>
          <button
            onClick={() => navigate('/map')}
            className="hidden items-center gap-2 rounded-full bg-dark px-4 py-2 text-sm font-bold text-white shadow-lg shadow-dark/10 transition-colors hover:bg-dark/90 sm:flex">
            <Map size={16} />
            Map
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
            <Search className="text-gray-400 ml-1" size={20} />
            <input
              type="text"
              placeholder="Search city, campus..."
              className="bg-transparent border-none outline-none w-full text-dark placeholder:text-gray-400 font-medium"
              defaultValue="University of Cape Town" />
            
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-dark hover:bg-gray-50 transition-colors relative">
            
            <SlidersHorizontal size={20} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Controls Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-dark">24 places</span>
            <span className="text-gray-300">•</span>
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-dark">
              Relevance <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-dark' : 'text-gray-400'}`}>
              
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-dark' : 'text-gray-400'}`}>
              
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Listings Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl flex-1 p-4 pt-4 sm:p-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {listingHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-gray-100 bg-white p-4 shadow-sm">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${item.color}`}>
                  <Icon size={18} />
                </div>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
                <p className="text-xs font-semibold text-gray-500">{item.label}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          variants={containerVariants}
          className={
          viewMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'grid grid-cols-1 gap-4 lg:grid-cols-2'
          }>
          
          {mockListings.map((listing) =>
          <motion.div key={listing.id} variants={itemVariants}>
            <ListingCard
              listing={listing}
              layout={viewMode === 'grid' ? 'vertical' : 'horizontal'} />
          </motion.div>

          )}
          {mockListings.map((listing) =>
          <motion.div key={`${listing.id}-dup`} variants={itemVariants}>
            <ListingCard
              listing={listing}
              layout={viewMode === 'grid' ? 'vertical' : 'horizontal'} />
          </motion.div>

          )}
        </motion.div>
      </motion.div>

      {/* Floating Map Button */}
      <button
        onClick={() => navigate('/map')}
        className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-dark text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-dark/20 flex items-center gap-2 hover:bg-dark/90 transition-colors z-20 lg:bottom-28">
        
        <Map size={18} />
        Map View
      </button>

      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)} />
      
    </div>);

}
