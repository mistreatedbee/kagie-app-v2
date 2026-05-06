import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Upload, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { mockListings } from '../../data/mockData';
const STEPS = ['Room', 'Dates', 'Details', 'Docs', 'Payment'];
export function BookingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listing = mockListings[0];
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final submit
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/booking-confirmation');
      }, 2000);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header & Stepper */}
      <div className="bg-white px-4 pt-10 pb-4 sticky top-0 z-30 shadow-sm sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-gray-100 transition-colors">
            
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl text-dark">
              Reserve Room
            </h1>
            <p className="text-xs text-gray-500">{listing.name}</p>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="relative overflow-x-auto hide-scrollbar pb-1">
        <div className="flex min-w-[420px] justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-10 transition-all duration-300"
            style={{
              width: `${currentStep / (STEPS.length - 1) * 100}%`
            }}>
          </div>

          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return (
              <div
                key={step}
                className="flex flex-col items-center gap-1 bg-white px-1">
                
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${isActive ? 'bg-primary text-white ring-4 ring-primary/20' : isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  
                  {isCompleted ? <Check size={12} /> : index + 1}
                </div>
                <span
                  className={`text-[10px] font-medium ${isActive || isCompleted ? 'text-dark' : 'text-gray-400'}`}>
                  
                  {step}
                </span>
              </div>);

          })}
        </div>
        </div>
      </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto p-4 pb-32 sm:p-6 lg:pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
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
            }}>
            
            {/* Step 1: Room Selection */}
            {currentStep === 0 &&
            <div className="space-y-4 lg:max-w-2xl lg:mx-auto">
                <h2 className="font-display font-bold text-xl text-dark mb-4">
                  Select Room Type
                </h2>

                {[
              {
                name: 'Standard Single',
                price: 4500,
                desc: '1 Bed • Shared Bathroom',
                available: true
              },
              {
                name: 'En-suite Single',
                price: 5200,
                desc: '1 Bed • Private Bathroom',
                available: true
              },
              {
                name: 'Shared Twin',
                price: 3800,
                desc: '2 Beds • Shared Bathroom',
                available: false
              }].
              map((room, idx) =>
              <div
                key={idx}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${idx === 0 ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-gray-300'} ${!room.available ? 'opacity-50 pointer-events-none' : ''}`}>
                
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-dark">{room.name}</h3>
                        <p className="text-sm text-gray-500">{room.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">R{room.price}</p>
                        <p className="text-xs text-gray-500">/mo</p>
                      </div>
                    </div>
                    {!room.available &&
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                        Fully Booked
                      </span>
                }
                  </div>
              )}
              </div>
            }

            {/* Step 2: Dates */}
            {currentStep === 1 &&
            <div className="space-y-6 lg:max-w-2xl lg:mx-auto">
                <h2 className="font-display font-bold text-xl text-dark mb-4">
                  When are you moving in?
                </h2>

                <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
                  <Input
                  type="date"
                  label="Move-in Date"
                  defaultValue="2024-02-01"
                  className="mb-4" />
                
                  <Input
                  type="date"
                  label="Move-out Date (Optional)"
                  defaultValue="2024-11-30" />
                
                </div>

                <div className="bg-accent-blue/10 p-4 rounded-2xl flex gap-3 items-start">
                  <ShieldCheck
                  className="text-accent-blue shrink-0 mt-0.5"
                  size={20} />
                
                  <p className="text-sm text-accent-blue font-medium leading-relaxed">
                    Minimum stay is 6 months. You can cancel for free up to 30
                    days before move-in.
                  </p>
                </div>
              </div>
            }

            {/* Step 3: Details */}
            {currentStep === 2 &&
            <div className="space-y-4 lg:max-w-2xl lg:mx-auto">
                <h2 className="font-display font-bold text-xl text-dark mb-4">
                  Student Details
                </h2>

                <div className="bg-white p-5 rounded-2xl border border-border shadow-sm space-y-4">
                  <Input label="Full Name" defaultValue="Alex Johnson" />
                  <Input
                  label="Email Address"
                  type="email"
                  defaultValue="alex.j@example.com" />
                
                  <Input
                  label="Phone Number"
                  type="tel"
                  defaultValue="+27 82 123 4567" />
                
                  <Input
                  label="Institution"
                  defaultValue="University of Cape Town" />
                
                  <Input label="Student Number" defaultValue="JHNALE001" />
                </div>
              </div>
            }

            {/* Step 4: Documents */}
            {currentStep === 3 &&
            <div className="space-y-4 lg:max-w-2xl lg:mx-auto">
                <h2 className="font-display font-bold text-xl text-dark mb-4">
                  Required Documents
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Please upload clear copies of the following documents.
                </p>

                {[
              {
                name: 'ID / Passport',
                status: 'uploaded'
              },
              {
                name: 'Proof of Registration',
                status: 'pending'
              },
              {
                name: 'Proof of Payment (Deposit)',
                status: 'pending'
              }].
              map((doc, idx) =>
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
                
                    <div>
                      <h3 className="font-semibold text-dark text-sm">
                        {doc.name}
                      </h3>
                      <p
                    className={`text-xs mt-1 font-medium ${doc.status === 'uploaded' ? 'text-success' : 'text-primary'}`}>
                    
                        {doc.status === 'uploaded' ?
                    'Uploaded successfully' :
                    'Required'}
                      </p>
                    </div>
                    <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${doc.status === 'uploaded' ? 'bg-success/10 text-success' : 'bg-gray-100 text-dark hover:bg-gray-200'}`}>
                  
                      {doc.status === 'uploaded' ?
                  <Check size={18} /> :

                  <Upload size={18} />
                  }
                    </button>
                  </div>
              )}
              </div>
            }

            {/* Step 5: Payment */}
            {currentStep === 4 &&
            <div className="space-y-6 lg:max-w-2xl lg:mx-auto">
                <h2 className="font-display font-bold text-xl text-dark mb-4">
                  Review & Pay
                </h2>

                {/* Summary Card */}
                <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
                  <h3 className="font-bold text-dark mb-4 border-b border-border pb-2">
                    Booking Summary
                  </h3>

                  <div className="space-y-3 text-sm mb-4 border-b border-border pb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Standard Single Room
                      </span>
                      <span className="font-medium text-dark">R4,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Security Deposit (Refundable)
                      </span>
                      <span className="font-medium text-dark">R4,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="font-medium text-dark">R250</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-dark">Total Due Now</span>
                    <span className="font-display font-bold text-xl text-primary">
                      R9,250
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-bold text-dark mb-3">Payment Method</h3>
                  <div className="bg-white p-4 rounded-2xl border-2 border-primary bg-primary/5 flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-sm">
                        Credit / Debit Card
                      </h4>
                      <p className="text-xs text-gray-500">
                        Pay securely via PayFast
                      </p>
                    </div>
                    <div className="ml-auto w-5 h-5 rounded-full border-4 border-primary bg-white"></div>
                  </div>
                </div>
              </div>
            }
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 px-4 sm:px-6 pb-safe z-50">
        <div className="max-w-2xl mx-auto flex gap-3 sm:gap-4">
          {currentStep > 0 &&
          <Button variant="outline" onClick={handleBack} className="px-6">
              Back
            </Button>
          }
          <Button
            onClick={handleNext}
            className="flex-1"
            isLoading={isSubmitting}>
            
            {currentStep === STEPS.length - 1 ? 'Pay R9,250' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>);

}
