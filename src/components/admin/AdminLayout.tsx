import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Shield,
  UserCog,
  X
} from 'lucide-react';
import { adminNavItems } from '../../data/adminMockData';
import { useAdminData } from '../../context/AdminDataContext';
import { ToastViewport, UserAvatar } from './AdminUI';
import { fallbackAvatarUrl, getEditableProfile, signOut, EditableProfile } from '../../lib/auth';

const logoSrc = '/logo.png';

const pageTitles: Record<string, string> = adminNavItems.reduce<Record<string, string>>((accumulator, item) => {
  accumulator[item.route] = item.label;
  return accumulator;
}, {});

function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col bg-[#111827] text-white">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
        <img src={logoSrc} alt="Kagie Stay" className="h-11 w-11 rounded-2xl bg-white object-contain p-1" />
        <div>
          <p className="text-sm font-black">Kagie Stay</p>
          <p className="text-xs font-semibold text-white/55">Admin Console</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {adminNavItems.map(({ label, route, icon: Icon }) => (
          <NavLink
            key={route}
            to={route}
            end={route === '/admin'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                isActive ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/20' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }>
            <Icon size={18} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white/55">
            <Shield size={14} />
            Security
          </div>
          <p className="text-xs leading-5 text-white/60">
            TODO: add 2FA, session timeout, secure document access, API authentication, and role permissions.
          </p>
        </div>
      </div>
    </aside>
  );
}

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toasts, dismissToast, addToast } = useAdminData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profile, setProfile] = useState<EditableProfile | null>(null);

  useEffect(() => {
    let isMounted = true;

    getEditableProfile()
      .then((nextProfile) => {
        if (isMounted) setProfile(nextProfile);
      })
      .catch(() => {
        if (isMounted) setProfile(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentTitle = pageTitles[location.pathname] || 'Admin';
  const breadcrumbs = useMemo(() => {
    const path = location.pathname.replace('/admin', '').split('/').filter(Boolean);
    return ['Admin', ...path.map((part) => part.replace(/-/g, ' '))];
  }, [location.pathname]);
  const searchMatches = adminNavItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      addToast({
        title: 'Logout failed',
        message: error instanceof Error ? error.message : 'Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#111827]">
      <div className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">
        <AdminSidebar />
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <button className="absolute inset-0 bg-black/45" onClick={() => setSidebarOpen(false)} aria-label="Close admin menu" />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative h-full w-[86vw] max-w-80">
              <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                <X size={19} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
          <div className="flex min-h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#111827] lg:hidden">
              <Menu size={20} />
            </button>

            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Global search pages, users, bookings..."
                className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F5F6FA] pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-[#E50914] focus:bg-white focus:ring-4 focus:ring-[#E50914]/10"
              />
              {searchQuery && (
                <div className="absolute left-0 right-0 top-13 z-30 rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-xl">
                  {searchMatches.slice(0, 6).map((item) => (
                    <button
                      key={item.route}
                      onClick={() => {
                        setSearchQuery('');
                        navigate(item.route);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-bold hover:bg-[#F5F6FA]">
                      <item.icon size={16} className="text-[#E50914]" />
                      {item.label}
                    </button>
                  ))}
                  {searchMatches.length === 0 && <p className="px-3 py-2 text-sm font-semibold text-gray-500">No page matches.</p>}
                </div>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen((current) => !current)}
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#111827] hover:border-[#E50914]/40">
                  <Bell size={19} />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#E50914]" />
                </button>
                {notificationOpen && (
                  <div className="absolute right-0 top-13 z-30 w-80 rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-xl">
                    {['3 host approvals waiting', '2 payment checks need review', '1 urgent support ticket'].map((item) => (
                      <button key={item} className="w-full rounded-xl px-3 py-2 text-left text-sm font-bold hover:bg-[#F5F6FA]">
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen((current) => !current)}
                  className="flex h-11 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-2 text-left hover:border-[#E50914]/40">
                  <UserAvatar name={profile?.name || 'Kagie Admin'} image={profile?.avatar_url || fallbackAvatarUrl} />
                  <span className="hidden text-sm font-black text-[#111827] sm:block">{profile?.name || 'Kagie Admin'}</span>
                  <ChevronDown size={16} className="hidden text-gray-400 sm:block" />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 top-13 z-30 w-64 rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-xl">
                    <div className="mb-2 rounded-xl bg-[#F5F6FA] p-3">
                      <p className="text-sm font-black text-[#111827]">{profile?.name || 'Kagie Admin'}</p>
                      <p className="text-xs font-semibold text-gray-500">{profile?.email || 'admin@kagie.co.za'}</p>
                    </div>
                    <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold hover:bg-[#F5F6FA]">
                      <UserCog size={16} />
                      Role permissions
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#E50914] hover:bg-[#E50914]/10">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold capitalize text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={`${crumb}-${index}`}>
                  {index > 0 && <span>/</span>}
                  <span>{crumb}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#E50914]">Kagie Stay Housing</p>
                <h1 className="mt-1 text-3xl font-black text-[#111827] sm:text-4xl">{currentTitle}</h1>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-gray-500 shadow-sm">
                Mock admin workspace. TODO: connect every mutation to authenticated production APIs.
              </div>
            </div>
          </motion.div>
          <Outlet />
        </main>
      </div>

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
