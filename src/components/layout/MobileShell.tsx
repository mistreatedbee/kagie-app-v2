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
    <div className="min-h-screen bg-background">
      <div className="w-full bg-background min-h-screen relative flex flex-col">
        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-28">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        {!hideBottomNav &&
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-3 sm:px-6 py-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:bottom-6 lg:w-[min(720px,calc(100%-3rem))] lg:rounded-3xl lg:border lg:px-6">
            <div className="mx-auto flex max-w-3xl justify-between items-center gap-1">
              {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1 relative rounded-2xl px-1 py-1 transition-colors hover:bg-gray-50 sm:px-2">
                  
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
                    className={`max-w-full truncate text-[10px] font-medium sm:text-xs ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                    
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
