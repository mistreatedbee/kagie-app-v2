import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  ChevronRight,
  Heart,
  FileText,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Save,
  X,
  Mail,
  Phone,
  School,
  User,
  Image as ImageIcon } from
'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
  EditableProfile,
  fallbackAvatarUrl,
  formatAuthError,
  getEditableProfile,
  signOut,
  updateEditableProfile
} from '../../lib/auth';

type ProfileForm = Pick<EditableProfile, 'name' | 'institution' | 'phone' | 'avatar_url'>;

const emptyForm: ProfileForm = {
  name: '',
  institution: '',
  phone: '',
  avatar_url: ''
};

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<EditableProfile | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let isMounted = true;

    getEditableProfile()
      .then((nextProfile) => {
        if (!isMounted) return;
        setProfile(nextProfile);
        setForm({
          name: nextProfile.name,
          institution: nextProfile.institution,
          phone: nextProfile.phone,
          avatar_url: nextProfile.avatar_url
        });
      })
      .catch((profileError) => {
        if (!isMounted) return;
        setError(formatAuthError(profileError));
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/role', { replace: true });
  };

  const handleEdit = () => {
    if (!profile) return;
    setError('');
    setSuccess('');
    setForm({
      name: profile.name,
      institution: profile.institution,
      phone: profile.phone,
      avatar_url: profile.avatar_url
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (profile) {
      setForm({
        name: profile.name,
        institution: profile.institution,
        phone: profile.phone,
        avatar_url: profile.avatar_url
      });
    }

    setError('');
    setSuccess('');
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }

    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const nextProfile = await updateEditableProfile(profile, form);
      setProfile(nextProfile);
      setForm({
        name: nextProfile.name,
        institution: nextProfile.institution,
        phone: nextProfile.phone,
        avatar_url: nextProfile.avatar_url
      });
      setIsEditing(false);
      setSuccess('Profile updated.');
    } catch (saveError) {
      setError(formatAuthError(saveError));
    } finally {
      setIsSaving(false);
    }
  };

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

  const avatarUrl = profile?.avatar_url || fallbackAvatarUrl;
  const displayName = profile?.name || 'Kagie User';

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="bg-white px-4 pt-10 pb-8 shadow-sm relative z-10 sm:px-6 sm:pt-12 lg:rounded-b-[2.5rem]">
        <div className="mx-auto max-w-5xl">
          <div className="flex justify-between items-start mb-6">
            <h1 className="font-display font-bold text-2xl text-dark">Profile</h1>
            <button
              onClick={isEditing ? handleCancel : handleEdit}
              disabled={isLoading}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-gray-100 transition-colors disabled:opacity-50">
              {isEditing ? <X size={20} /> : <Settings size={20} />}
            </button>
          </div>

          {isLoading ?
          <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-gray-100 animate-pulse" />
                <div className="h-4 w-56 rounded bg-gray-100 animate-pulse" />
              </div>
            </div> :

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <img
                src={avatarUrl}
                alt={displayName}
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatarUrl;
                }}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />

                <button
                onClick={handleEdit}
                className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm">
                  <span className="text-xs font-bold">+</span>
                </button>
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-dark">
                  {displayName}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  {profile?.institution || profile?.email}
                </p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${profile?.emailVerified ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-500'}`}>
                  <Shield size={12} />
                  {profile?.emailVerified ? 'Verified Student' : 'Email Not Verified'}
                </span>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 mt-6 space-y-6 sm:px-6 lg:px-8">
        {(error || success) &&
        <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${error ? 'border-primary/20 bg-primary/10 text-primary' : 'border-success/20 bg-success/10 text-success'}`}>
            {error || success}
          </div>
        }

        {isEditing &&
        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl p-4 shadow-sm border border-border space-y-5 sm:p-6">
            <div>
              <h2 className="font-display font-bold text-xl text-dark">Edit profile</h2>
              <p className="text-sm text-gray-500">Update your account details.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              placeholder="Enter your name"
              leftIcon={<User size={20} />}
              required />
              <Input
              label="Institution"
              value={form.institution}
              onChange={(e) => setForm((current) => ({ ...current, institution: e.target.value }))}
              placeholder="University or college"
              leftIcon={<School size={20} />} />
              <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
              placeholder="Phone number"
              leftIcon={<Phone size={20} />} />
              <Input
              label="Avatar URL"
              value={form.avatar_url}
              onChange={(e) => setForm((current) => ({ ...current, avatar_url: e.target.value }))}
              placeholder="https://example.com/avatar.jpg"
              leftIcon={<ImageIcon size={20} />} />
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-400">Account Email</p>
                  <p className="text-sm font-medium text-dark">{profile?.email}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isSaving} leftIcon={<Save size={18} />}>
                Save Changes
              </Button>
            </div>
          </form>
        }

        <div className="bg-white rounded-3xl p-2 shadow-sm border border-border lg:grid lg:grid-cols-2 lg:gap-1">
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

        <button
          onClick={handleLogout}
          className="w-full bg-white border border-border rounded-2xl p-4 flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors shadow-sm">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>);
}
