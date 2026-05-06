import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Download, MessageSquare, Home } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { mockListings } from '../../data/mockData';
export function BookingConfirmation() {
  const navigate = useNavigate();
  const listing = mockListings[0];
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white opacity-10 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-white opacity-5 blur-3xl" />
      </div>

      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          bounce: 0.5
        }}
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 z-10">
        
        <motion.div
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            delay: 0.2,
            type: 'spring',
            bounce: 0.5
          }}>
          
          <Check size={48} className="text-primary" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{
          y: 20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.3
        }}
        className="text-center z-10 mb-10">
        
        <h1 className="font-display font-bold text-3xl text-white mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-white/80 text-lg">
          You're all set for your new home.
        </p>
      </motion.div>

      <motion.div
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.4
        }}
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10">
        
        <div className="text-center mb-6 border-b border-border pb-6">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">
            Booking Reference
          </p>
          <p className="font-display font-bold text-2xl text-dark tracking-widest">
            KAG-8X29M
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <img
              src={listing.image}
              alt={listing.name}
              className="w-16 h-16 rounded-2xl object-cover" />
            
            <div>
              <h3 className="font-bold text-dark">{listing.name}</h3>
              <p className="text-sm text-gray-500">Standard Single Room</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">
                Move-in Date
              </p>
              <p className="font-bold text-dark">01 Feb 2024</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium mb-1">
                Payment Status
              </p>
              <p className="font-bold text-success flex items-center gap-1 justify-end">
                <Check size={14} /> Paid
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" fullWidth leftIcon={<Download size={18} />}>
            Download Receipt
          </Button>
          <Button
            variant="outline"
            fullWidth
            leftIcon={<MessageSquare size={18} />}>
            
            Message Host
          </Button>
          <Button
            fullWidth
            leftIcon={<Home size={18} />}
            onClick={() => navigate('/home')}
            className="mt-2">
            
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>);

}