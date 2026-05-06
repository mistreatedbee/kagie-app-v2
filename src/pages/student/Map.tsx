import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { mockListings } from '../../data/mockData';
import { ListingCard } from '../../components/listings/ListingCard';
export function Map() {
  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState(mockListings[0]);
  return (
    <div className="h-screen w-full relative bg-gray-100 overflow-hidden flex flex-col">
      {/* Map Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Map"
          className="w-full h-full object-cover opacity-80" />
        
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 px-4 pt-12 pb-4 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-dark hover:bg-gray-50 transition-colors shrink-0">
          
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 bg-white rounded-2xl shadow-md p-3 flex items-center gap-3">
          <Search className="text-gray-400 ml-1" size={20} />
          <input
            type="text"
            placeholder="Search area..."
            className="bg-transparent border-none outline-none w-full text-dark placeholder:text-gray-400 font-medium"
            defaultValue="University of Cape Town" />
          
        </div>
        <button className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-dark hover:bg-gray-50 transition-colors shrink-0">
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Map Pins (Mocked) */}
      <div className="relative flex-1 z-0">
        {/* Pin 1 */}
        <button
          onClick={() => setSelectedListing(mockListings[0])}
          className={`absolute top-[30%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 transition-all ${selectedListing.id === mockListings[0].id ? 'scale-110 z-20' : 'z-10 hover:scale-105'}`}>
          
          <div
            className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1 ${selectedListing.id === mockListings[0].id ? 'bg-primary text-white' : 'bg-white text-dark'}`}>
            
            R4.5k
          </div>
          <div
            className={`w-3 h-3 rotate-45 mx-auto -mt-1.5 ${selectedListing.id === mockListings[0].id ? 'bg-primary' : 'bg-white'}`}>
          </div>
        </button>

        {/* Pin 2 */}
        <button
          onClick={() => setSelectedListing(mockListings[1])}
          className={`absolute top-[45%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 transition-all ${selectedListing.id === mockListings[1].id ? 'scale-110 z-20' : 'z-10 hover:scale-105'}`}>
          
          <div
            className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1 ${selectedListing.id === mockListings[1].id ? 'bg-primary text-white' : 'bg-white text-dark'}`}>
            
            R5.2k
          </div>
          <div
            className={`w-3 h-3 rotate-45 mx-auto -mt-1.5 ${selectedListing.id === mockListings[1].id ? 'bg-primary' : 'bg-white'}`}>
          </div>
        </button>

        {/* Pin 3 */}
        <button
          onClick={() => setSelectedListing(mockListings[3])}
          className={`absolute top-[60%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 transition-all ${selectedListing.id === mockListings[3].id ? 'scale-110 z-20' : 'z-10 hover:scale-105'}`}>
          
          <div
            className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1 ${selectedListing.id === mockListings[3].id ? 'bg-primary text-white' : 'bg-white text-dark'}`}>
            
            R6.5k
          </div>
          <div
            className={`w-3 h-3 rotate-45 mx-auto -mt-1.5 ${selectedListing.id === mockListings[3].id ? 'bg-primary' : 'bg-white'}`}>
          </div>
        </button>

        {/* Campus Marker */}
        <div className="absolute top-[50%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-accent-blue text-white rounded-full flex items-center justify-center shadow-lg">
              <MapPin size={16} />
            </div>
          </div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-dark whitespace-nowrap shadow-sm">
            Campus
          </span>
        </div>
      </div>

      {/* Bottom Listing Preview */}
      <div className="relative z-10 p-4 pb-8">
        <div className="flex justify-between items-center mb-4 px-2">
          <button
            onClick={() => navigate('/listings')}
            className="bg-dark text-white px-5 py-2.5 rounded-full font-semibold shadow-lg flex items-center gap-2 hover:bg-dark/90 transition-colors">
            
            <List size={16} />
            List View
          </button>
          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-dark hover:bg-gray-50">
            <MapPin size={18} />
          </button>
        </div>

        {selectedListing &&
        <div className="shadow-2xl rounded-3xl">
            <ListingCard listing={selectedListing} layout="horizontal" />
          </div>
        }
      </div>
    </div>);

}