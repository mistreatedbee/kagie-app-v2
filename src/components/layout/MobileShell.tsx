import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
export function MobileShell() {
  const location = useLocation();
  const navigate = useNavigate();
  // Don't show bottom nav on certain screens like listing detail or booking flow
  const hideBottomNav =
  location.pathname.includes('/listing/') ||
  location.pathname.includes('/book');
  const navItems = [
  {
    icon: Home,
    label: 'Home',
    path: '/home'
  },
  {
    icon: Search,
    label: 'Search',
    path: '/listings'
  },
  {
    icon: Heart,
    label: 'Saved',
    path: '/saved'
  },
  {
    icon: Calendar,
    label: 'Bookings',
    path: '/bookings'
  },
  {
    icon: User,
    label: 'Profile',
    path: '/profile'
  }];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md bg-background min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        {!hideBottomNav &&
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 pb-safe rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
            <div className="flex justify-between items-center">
              {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-1 relative">
                  
                    <div
                    className={`p-2 rounded-xl transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
                    
                      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                      {isActive &&
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />

                    }
                    </div>
                    <span
                    className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                    
                      {item.label}
                    </span>
                  </button>);

            })}
            </div>
          </div>
        }
      </div>
    </div>);

}