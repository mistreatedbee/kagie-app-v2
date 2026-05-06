import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../../components/common/Logo';
export function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 0.1,
            scale: 1
          }}
          transition={{
            duration: 1.5
          }}
          className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white blur-3xl" />
        
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 0.05,
            scale: 1
          }}
          transition={{
            duration: 1.5,
            delay: 0.2
          }}
          className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-white blur-3xl" />
        
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        className="flex flex-col items-center z-10">
        
        <div className="w-36 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6 px-4">
          <Logo className="h-20 w-full" />
        </div>

        <h1 className="text-white font-display font-bold text-4xl mb-3 tracking-tight">
          Kagie Stay
        </h1>

        <p className="text-white/80 font-medium text-lg">
          Find student housing near campus
        </p>
      </motion.div>
    </div>);

}
