import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Users,
  CreditCard,
  MessageSquare,
  Star,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu } from
'lucide-react';
import { Logo } from '../common/Logo';
import {
  EditableProfile,
  fallbackAvatarUrl,
  getEditableProfile,
  signOut
} from '../../lib/auth';
interface DashboardShellProps {
  role: 'host' | 'admin' | 'support' | 'finance';
}
export function DashboardShell({ role }: DashboardShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [profile, setProfile] = useState<EditableProfile | null>(null);
  const hostNav = [
  {
    icon: LayoutDashboard,
    label: 'Overview',
    path: '/host'
  },
  {
    icon: Building2,
    label: 'My Listings',
    path: '/host/listings'
  },
  {
    icon: Calendar,
    label: 'Calendar',
    path: '/host/calendar'
  },
  {
    icon: Users,
    label: 'Bookings',
    path: '/host/bookings'
  },
  {
    icon: CreditCard,
    label: 'Payments',
    path: '/host/payments'
  },
  {
    icon: MessageSquare,
    label: 'Messages',
    path: '/host/messages'
  },
  {
    icon: Star,
    label: 'Reviews',
    path: '/host/reviews'
  },
  {
    icon: FileText,
    label: 'Documents',
    path: '/host/documents'
  }];

  const adminNav = [
  {
    icon: LayoutDashboard,
    label: 'Overview',
    path: '/admin'
  },
  {
    icon: Users,
    label: 'Users',
    path: '/admin/users'
  },
  {
    icon: Building2,
    label: 'Listings',
    path: '/admin/listings'
  },
  {
    icon: CreditCard,
    label: 'Payments',
    path: '/admin/payments'
  },
  {
    icon: FileText,
    label: 'Reports',
    path: '/admin/reports'
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/admin/settings'
  }];

  const navItems = role === 'host' ? hostNav : adminNav;
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileNavOpen(false);
  };
  const handleLogout = async () => {
    await signOut();
    navigate('/auth/role', { replace: true });
  };

  useEffect(() => {
    let isMounted = true;

    getEditableProfile()
      .then((nextProfile) => {
        if (!isMounted) return;
        setProfile(nextProfile);
      })
      .catch(() => {
        if (!isMounted) return;
        setProfile(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = profile?.name || 'Kagie User';
  const avatarUrl = profile?.avatar_url || fallbackAvatarUrl;

  return (
    <div className="min-h-screen bg-background lg:flex">
      {isMobileNavOpen &&
      <button
        aria-label="Close navigation"
        onClick={() => setIsMobileNavOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" />
      }
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white border-r border-border transition-transform duration-300 flex flex-col lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:transition-all ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} ${isSidebarOpen ? 'lg:w-64' : 'lg:w-20'}`}>
        
        <div className="h-16 flex items-center px-4 border-b border-border">
          <div className="flex w-full items-center justify-center gap-2 text-primary font-display font-bold text-xl">
            <Logo className={isSidebarOpen ? 'h-12 w-32' : 'h-10 w-12'} />
          </div>
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
            {isSidebarOpen ? 'Menu' : '...'}
          </div>
          {navItems.map((item) => {
            const isActive =
            location.pathname === item.path ||
            item.path !== `/${role}` &&
            location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                
                <Icon
                  size={20}
                  className={isActive ? 'text-primary' : 'text-gray-400'} />
                
                {isSidebarOpen && <span>{item.label}</span>}
              </button>);

          })}
        </div>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 w-full transition-colors">
            <LogOut size={20} className="text-gray-400" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileNavOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              
              <Menu size={20} />
            </button>

            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18} />
              
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-48 xl:w-64 transition-all" />
              
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-dark">
                  {displayName}
                </div>
                <div className="text-xs text-gray-500 capitalize">{role}</div>
              </div>
              <img
                src={avatarUrl}
                alt={displayName}
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatarUrl;
                }}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden bg-background p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>);

}
