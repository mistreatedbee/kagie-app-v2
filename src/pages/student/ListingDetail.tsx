import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  ShieldCheck,
  Wifi,
  Dumbbell,
  Shield,
  Car,
  BookOpen,
  Coffee,
  MessageSquare } from
'lucide-react';
import { mockListings } from '../../data/mockData';
import { Button } from '../../components/common/Button';
export function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [activeImage] = useState(0);
  // Find listing or use default
  const listing = mockListings.find((l) => l.id === id) || mockListings[0];
  const images = [
  listing.image,
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'];

  const getAmenityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'wifi':
        return <Wifi size={20} />;
      case 'gym':
        return <Dumbbell size={20} />;
      case 'security':
        return <Shield size={20} />;
      case 'parking':
        return <Car size={20} />;
      case 'study room':
        return <BookOpen size={20} />;
      case 'laundry':
        return <Coffee size={20} />;
      // Placeholder icon
      default:
        return <ShieldCheck size={20} />;
    }
  };
  return (
    <div className="min-h-screen bg-white pb-32 lg:bg-background">
      <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-6 lg:px-6 lg:py-6">
      {/* Image Gallery Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[40vh] w-full bg-gray-100 lg:sticky lg:top-6 lg:h-[calc(100vh-12rem)] lg:min-h-[520px] lg:overflow-hidden lg:rounded-3xl">
        <img
          src={images[activeImage]}
          alt={listing.name}
          className="w-full h-full object-cover" />
        

        {/* Top Overlay Actions */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-dark hover:bg-white transition-colors">
            
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-dark hover:bg-white transition-colors">
              <Share size={18} />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-dark hover:bg-white transition-colors">
              
              <Heart
                size={18}
                className={isSaved ? 'fill-primary text-primary' : ''} />
              
            </button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) =>
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${idx === activeImage ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />

          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 bg-white rounded-t-3xl -mt-6 relative z-20 sm:px-6 lg:mt-0 lg:rounded-3xl lg:border lg:border-border lg:p-8 lg:shadow-sm">
        {/* Title & Rating */}
        <div className="flex flex-col gap-3 mb-2 sm:flex-row sm:justify-between sm:items-start">
          <h1 className="font-display font-bold text-2xl text-dark leading-tight sm:pr-4 lg:text-3xl">
            {listing.name}
          </h1>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
              <Star
                size={16}
                className="fill-accent-yellow text-accent-yellow" />
              
              <span className="font-bold text-dark">{listing.rating}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 underline">
              {listing.reviewsCount} reviews
            </span>
          </div>
        </div>

        {/* Location & Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin size={16} className="text-primary shrink-0" />
          <span>{listing.location}</span>
          <span className="mx-1">•</span>
          <span className="font-semibold text-dark">
            {listing.distance}km to campus
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {listing.host.verified &&
          <span className="flex items-center gap-1 bg-success/10 text-success px-2.5 py-1 rounded-lg text-xs font-bold">
              <ShieldCheck size={14} /> Verified Property
            </span>
          }
          <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold">
            {listing.type}
          </span>
        </div>

        <hr className="border-border mb-6" />

        {/* Description */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-lg text-dark mb-3">
            About this place
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Modern, fully furnished student accommodation located just minutes
            away from campus. Features high-speed uncapped Wi-Fi, 24/7 security
            with biometric access, and dedicated study areas. Perfect for
            students looking for a quiet, secure, and comfortable environment to
            focus on their studies.
          </p>
          <button className="text-primary font-semibold text-sm mt-2 hover:underline">
            Read more
          </button>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-lg text-dark mb-4">
            What this place offers
          </h2>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            {listing.amenities.map((amenity: string) =>
            <div
              key={amenity}
              className="flex items-center gap-3 text-gray-700">
              
                <div className="text-gray-400">{getAmenityIcon(amenity)}</div>
                <span className="text-sm font-medium">{amenity}</span>
              </div>
            )}
          </div>
          <button className="w-full mt-6 py-3 border border-dark rounded-xl font-semibold text-dark hover:bg-gray-50 transition-colors">
            Show all 12 amenities
          </button>
        </div>

        <hr className="border-border mb-6" />

        {/* Room Types Preview */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-bold text-lg text-dark">
              Available Rooms
            </h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-border flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="font-bold text-dark mb-1">Standard Single Room</h3>
              <p className="text-sm text-gray-500">1 Bed • Shared Bathroom</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary text-lg">R{listing.price}</p>
              <p className="text-xs text-gray-500">/month</p>
            </div>
          </div>
        </div>

        <hr className="border-border mb-6" />

        {/* Host Info */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-lg text-dark mb-4">
            Meet your host
          </h2>
          <div className="bg-white border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  className="w-14 h-14 rounded-full object-cover" />
                
                {listing.host.verified &&
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-success rounded-full border-2 border-white flex items-center justify-center text-white">
                    <ShieldCheck size={12} />
                  </div>
                }
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">
                  {listing.host.name}
                </h3>
                <p className="text-sm text-gray-500">Joined in 2021</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </motion.div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 px-6 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex max-w-7xl justify-between items-center gap-4">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">
              Price from
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-2xl text-dark">
                R{listing.price}
              </span>
              <span className="text-sm text-gray-500">/mo</span>
            </div>
          </div>
          <Button onClick={() => navigate(`/book`)} size="lg" className="px-8">
            Reserve Now
          </Button>
        </div>
      </div>
    </div>);

}
