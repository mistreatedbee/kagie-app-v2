import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../common/Button';
interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function FilterSheet({ isOpen, onClose }: FilterSheetProps) {
  const [priceRange, setPriceRange] = useState([2000, 10000]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const roomTypes = [
  'Single Room',
  'Shared Room',
  'Studio',
  'Private Apartment'];

  const amenities = [
  'Wifi',
  'Gym',
  'Laundry',
  'Security',
  'Parking',
  'Study Room',
  'Pool',
  'Balcony'];

  const toggleSelection = (
  item: string,
  list: string[],
  setList: React.Dispatch<React.SetStateAction<string[]>>) =>
  {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
        

          {/* Bottom Sheet */}
          <motion.div
          initial={{
            y: '100%'
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200
          }}
          className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white rounded-t-[2rem] z-50 flex flex-col max-h-[85vh]">
          
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-dark" />
                <h2 className="font-display font-bold text-xl text-dark">
                  Filters
                </h2>
              </div>
              <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-dark hover:bg-gray-200 transition-colors">
              
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-dark">Price Range (Monthly)</h3>
                  <span className="text-sm font-semibold text-primary">
                    R{priceRange[0]} - R{priceRange[1]}+
                  </span>
                </div>
                {/* Placeholder for a real range slider */}
                <div className="h-2 bg-gray-200 rounded-full relative mb-6">
                  <div className="absolute left-[20%] right-[30%] h-full bg-primary rounded-full"></div>
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md"></div>
                  <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md"></div>
                </div>
              </div>

              {/* Room Type */}
              <div>
                <h3 className="font-bold text-dark mb-4">Room Type</h3>
                <div className="flex flex-wrap gap-3">
                  {roomTypes.map((type) =>
                <button
                  key={type}
                  onClick={() =>
                  toggleSelection(type, selectedType, setSelectedType)
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedType.includes(type) ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-border text-gray-600 hover:border-gray-300'}`}>
                  
                      {type}
                    </button>
                )}
                </div>
              </div>

              {/* Distance */}
              <div>
                <h3 className="font-bold text-dark mb-4">
                  Distance from Campus
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {['< 1km', '< 2km', '< 5km', 'Any'].map((dist, i) =>
                <button
                  key={dist}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all border ${i === 1 ? 'bg-dark text-white border-dark' : 'bg-white border-border text-gray-600 hover:border-gray-300'}`}>
                  
                      {dist}
                    </button>
                )}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-bold text-dark mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {amenities.map((amenity) =>
                <button
                  key={amenity}
                  onClick={() =>
                  toggleSelection(
                    amenity,
                    selectedAmenities,
                    setSelectedAmenities
                  )
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedAmenities.includes(amenity) ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-border text-gray-600 hover:border-gray-300'}`}>
                  
                      {amenity}
                    </button>
                )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-white flex gap-4 pb-safe">
              <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setSelectedType([]);
                setSelectedAmenities([]);
                setPriceRange([2000, 10000]);
              }}>
              
                Clear All
              </Button>
              <Button className="flex-1" onClick={onClose}>
                Show 24 Results
              </Button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}