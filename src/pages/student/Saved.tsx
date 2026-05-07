import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Search } from 'lucide-react';
import { mockListings } from '../../data/mockData';
import { ListingCard } from '../../components/listings/ListingCard';

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

const savedListings = mockListings.filter((listing) => ['1', '2', '4'].includes(listing.id));

export function Saved() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-28">
      <div className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 px-4 pb-5 pt-10 backdrop-blur-xl sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Your shortlist
              </p>
              <h1 className="font-display text-2xl font-bold text-gray-900">
                Saved listings
              </h1>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Heart size={16} className="fill-primary" />
              {savedListings.length}
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:px-8">
        {savedListings.length > 0 ? (
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-5 rounded-[2rem] border border-primary/10 bg-primary/5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900">
                    Places you liked
                  </h2>
                  <p className="text-sm text-gray-500">
                    Keep comparing your favorite student stays.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/listings')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm transition-colors hover:bg-gray-50">
                  Browse more <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {savedListings.map((listing) => (
                <motion.div key={listing.id} variants={itemVariants}>
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="flex min-h-[420px] flex-col items-center justify-center rounded-[3rem] border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 text-gray-300">
              <Heart size={40} />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold text-gray-900">
              No saved listings yet
            </h2>
            <p className="mb-8 max-w-[280px] text-gray-500">
              Tap the heart on listings you like and they will appear here.
            </p>
            <button
              onClick={() => navigate('/listings')}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105">
              <Search size={18} />
              Browse Listings
            </button>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
