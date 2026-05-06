import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Map,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List } from
'lucide-react';
import { mockListings } from '../../data/mockData';
import { ListingCard } from '../../components/listings/ListingCard';
import { FilterSheet } from '../../components/listings/FilterSheet';
export function Listings() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 'grid' : 'list'
  );
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header */}
      <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-30 shadow-sm sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-7xl">
        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-gray-50 border border-border rounded-2xl p-3 flex items-center gap-3">
            <Search className="text-gray-400 ml-1" size={20} />
            <input
              type="text"
              placeholder="Search city, campus..."
              className="bg-transparent border-none outline-none w-full text-dark placeholder:text-gray-400 font-medium"
              defaultValue="University of Cape Town" />
            
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-12 h-12 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center text-dark hover:bg-gray-50 transition-colors relative">
            
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

          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-border">
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
      <div className="mx-auto w-full max-w-7xl flex-1 p-4 pt-4 sm:p-6 lg:px-8">
        <div
          className={
          viewMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'grid grid-cols-1 gap-4 lg:grid-cols-2'
          }>
          
          {mockListings.map((listing) =>
          <ListingCard
            key={listing.id}
            listing={listing}
            layout={viewMode === 'grid' ? 'vertical' : 'horizontal'} />

          )}
          {mockListings.map((listing) =>
          <ListingCard
            key={`${listing.id}-dup`}
            listing={listing}
            layout={viewMode === 'grid' ? 'vertical' : 'horizontal'} />

          )}
        </div>
      </div>

      {/* Floating Map Button */}
      <button
        onClick={() => navigate('/map')}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-dark text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-dark/20 flex items-center gap-2 hover:bg-dark/90 transition-colors z-20 lg:bottom-28">
        
        <Map size={18} />
        Map View
      </button>

      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)} />
      
    </div>);

}
