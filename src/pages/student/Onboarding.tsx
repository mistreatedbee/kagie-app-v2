import React, { useState, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShieldCheck, Home as HomeIcon } from 'lucide-react';
const slides = [
{
  id: 1,
  title: 'Find accommodation near your institution',
  description:
  'Discover verified student housing within walking distance of your campus.',
  icon: MapPin,
  color: 'bg-primary/10 text-primary',
  image:
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
},
{
  id: 2,
  title: 'Compare prices, distance, and amenities',
  description:
  'Make informed decisions by comparing different options that fit your budget.',
  icon: HomeIcon,
  color: 'bg-accent-blue/10 text-accent-blue',
  image:
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
},
{
  id: 3,
  title: 'Reserve safely and manage your stay',
  description:
  'Secure your room with verified hosts and manage payments all in one place.',
  icon: ShieldCheck,
  color: 'bg-success/10 text-success',
  image:
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/auth/role');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  const handleSkip = () => {
    navigate('/auth/role');
  };
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Top Actions */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-end z-20">
        <button
          onClick={handleSkip}
          className="text-gray-500 font-medium text-sm hover:text-dark transition-colors">
          
          Skip
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between pb-12 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -20
            }}
            transition={{
              duration: 0.3
            }}
            className="flex-1 flex flex-col px-6">
            
            {/* Image Container */}
            <div className="flex-1 relative rounded-[2.5rem] overflow-hidden mb-8 shadow-soft">
              <img
                src={slides[currentSlide].image}
                alt="Onboarding"
                className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Floating Icon Badge */}
              <div className="absolute bottom-6 left-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-lg`}>
                  
                  {createElement(slides[currentSlide].icon, {
                    className: slides[currentSlide].color.split(' ')[1],
                    size: 28
                  })}
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center px-4">
              <h2 className="font-display font-bold text-2xl text-dark mb-4 leading-tight">
                {slides[currentSlide].title}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="px-6 pt-8 flex items-center justify-between">
          {/* Progress Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) =>
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`} />

            )}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center gap-2">
            
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>);

}