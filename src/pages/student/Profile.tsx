import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  ChevronRight,
  Heart,
  FileText,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut } from
'lucide-react';
import { mockUser } from '../../data/mockData';
export function Profile() {
  const navigate = useNavigate();
  const menuItems = [
  {
    icon: Heart,
    label: 'Saved Listings',
    path: '/saved'
  },
  {
    icon: FileText,
    label: 'My Documents',
    path: '/documents'
  },
  {
    icon: CreditCard,
    label: 'Payment Methods',
    path: '/payments'
  },
  {
    icon: Shield,
    label: 'Privacy & Security',
    path: '/security'
  },
  {
    icon: HelpCircle,
    label: 'Help & Support',
    path: '/support'
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  }];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header Profile Section */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-sm relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h1 className="font-display font-bold text-2xl text-dark">Profile</h1>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-gray-100 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />
            
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
              <span className="text-xs font-bold">+</span>
            </button>
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-dark">
              {mockUser.name}
            </h2>
            <p className="text-sm text-gray-500 mb-1">{mockUser.institution}</p>
            <span className="inline-flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded-md text-xs font-bold">
              <Shield size={12} /> Verified Student
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Menu List */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-border">
          {menuItems.map((item, index) =>
          <button
            key={index}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
            
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm transition-all">
                  <item.icon size={20} />
                </div>
                <span className="font-semibold text-dark">{item.label}</span>
              </div>
              <ChevronRight
              size={20}
              className="text-gray-400 group-hover:text-dark transition-colors" />
            
            </button>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => navigate('/auth/role')}
          className="w-full bg-white border border-border rounded-2xl p-4 flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors shadow-sm">
          
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>);

}