import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight, Check } from 'lucide-react';
import { mockUser } from '../../data/mockData';
export function Bookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const tabs = [
  {
    id: 'upcoming',
    label: 'Upcoming'
  },
  {
    id: 'active',
    label: 'Active'
  },
  {
    id: 'past',
    label: 'Past'
  }];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-30 shadow-sm">
        <h1 className="font-display font-bold text-2xl text-dark mb-6">
          My Bookings
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-50 p-1 rounded-2xl border border-border">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-white text-dark shadow-sm' : 'text-gray-500 hover:text-dark'}`}>
            
              {tab.label}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === 'upcoming' && mockUser.activeBooking ?
        <div className="space-y-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border">
              <div className="h-32 relative">
                <img
                src={mockUser.activeBooking.image}
                alt="Booking"
                className="w-full h-full object-cover" />
              
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-dark shadow-sm">
                  Ref: KAG-8X29M
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-dark text-lg">
                      {mockUser.activeBooking.listingName}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> Braamfontein, JHB
                    </p>
                  </div>
                  <span className="bg-success/10 text-success px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Check size={12} /> Confirmed
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center mb-4 border border-border">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Move-in Date
                    </p>
                    <p className="font-bold text-dark flex items-center gap-1.5">
                      <Calendar size={16} className="text-primary" />
                      {new Date(
                      mockUser.activeBooking.moveInDate
                    ).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Duration
                    </p>
                    <p className="font-bold text-dark">10 Months</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gray-100 text-dark py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-hover transition-colors shadow-sm shadow-primary/20">
                    Message Host
                  </button>
                </div>
              </div>
            </div>
          </div> :

        <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="font-bold text-dark text-lg mb-1">
              No {activeTab} bookings
            </h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              You don't have any {activeTab} bookings at the moment.
            </p>
          </div>
        }
      </div>
    </div>);

}