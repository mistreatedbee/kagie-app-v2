import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, ShieldCheck } from 'lucide-react';
interface ListingCardProps {
  listing: any;
  layout?: 'vertical' | 'horizontal';
}
export function ListingCard({
  listing,
  layout = 'vertical'
}: ListingCardProps) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };
  if (layout === 'horizontal') {
    return (
      <motion.div
        whileTap={{
          scale: 0.98
        }}
        onClick={() => navigate(`/listing/${listing.id}`)}
        className="bg-white rounded-3xl p-3 flex min-w-0 gap-3 sm:gap-4 shadow-sm border border-border cursor-pointer">
        
        <div className="relative h-28 w-28 shrink-0 rounded-2xl overflow-hidden sm:h-36 sm:w-36 md:h-40 md:w-40">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover" />
          
          <button
            onClick={handleSave}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-dark hover:text-primary transition-colors z-10">
            
            <Heart
              size={16}
              className={isSaved ? 'fill-primary text-primary' : ''} />
            
          </button>
          {!listing.available &&
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white px-2 py-1 rounded-lg text-xs font-bold text-dark">
                Full
              </span>
            </div>
          }
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <div className="flex justify-between items-start gap-2 mb-1">
              <h3 className="font-bold text-dark text-sm line-clamp-2 sm:text-base">
                {listing.name}
              </h3>
              <div className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                <Star
                  size={14}
                  className="fill-accent-yellow text-accent-yellow" />
                
                <span>{listing.rating}</span>
              </div>
            </div>
            <div className="flex min-w-0 items-center gap-1 text-gray-500 text-xs mb-2">
              <MapPin size={12} className="shrink-0" />
              <span className="line-clamp-1">{listing.location}</span>
              <span className="mx-1">•</span>
              <span className="shrink-0">{listing.distance}km</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {listing.amenities.slice(0, 2).map((amenity: string) =>
              <span
                key={amenity}
                className="text-[10px] px-2 py-1 bg-gray-100 rounded-md text-gray-600 font-medium">
                
                  {amenity}
                </span>
              )}
              {listing.amenities.length > 2 &&
              <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-md text-gray-600 font-medium">
                  +{listing.amenities.length - 2}
                </span>
              }
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-2 mt-2">
            <div>
              <span className="text-base font-bold text-primary sm:text-lg">
                R{listing.price}
              </span>
              <span className="text-xs text-gray-500">/mo</span>
            </div>
            {listing.host.verified &&
            <ShieldCheck size={16} className="text-success" />
            }
          </div>
        </div>
      </motion.div>);

  }
  return (
    <motion.div
      whileTap={{
        scale: 0.98
      }}
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="bg-white rounded-3xl overflow-hidden shadow-card border border-border cursor-pointer flex h-full min-w-0 flex-col">
      
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover" />
        

        <div className="absolute top-3 left-3 flex gap-2">
          {listing.available ?
          <span className="bg-success text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
              Available
            </span> :

          <span className="bg-dark text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
              Fully Booked
            </span>
          }
        </div>

        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-dark hover:text-primary transition-colors shadow-sm">
          
          <Heart
            size={18}
            className={isSaved ? 'fill-primary text-primary' : ''} />
          
        </button>
      </div>

      <div className="p-4 flex min-w-0 flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-dark text-base line-clamp-2 sm:text-lg">
            {listing.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold bg-gray-50 px-1.5 py-0.5 rounded-md">
            <Star size={14} className="fill-accent-yellow text-accent-yellow" />
            <span>{listing.rating}</span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin size={14} className="shrink-0" />
          <span className="line-clamp-1">{listing.location}</span>
          <span className="mx-1">•</span>
          <span className="shrink-0 font-medium text-dark">
            {listing.distance}km
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-lg font-display font-bold text-primary sm:text-xl">
              R{listing.price}
            </span>
            <span className="text-xs text-gray-500 font-medium sm:text-sm"> / month</span>
          </div>
          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
            {listing.type}
          </span>
        </div>
      </div>
    </motion.div>);

}
