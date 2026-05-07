import React, { useEffect, useRef, useState } from 'react';
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
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
  EditableProfile,
  fallbackAvatarUrl,
  formatAuthError,
  getEditableProfile,
  signOut,
  updateEditableProfile,
  validateAvatarFile
} from '../../lib/auth';

type ProfileForm = Pick<EditableProfile, 'name' | 'institution' | 'phone'>;

const emptyForm: ProfileForm = {
  name: '',
  institution: '',
  phone: ''
};

export function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<EditableProfile | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
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
          phone: nextProfile.phone
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

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [avatarFile]);

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/role', { replace: true });
  };

  const handleEdit = () => {
    if (!profile) return;
    setError('');
    setSuccess('');
    setAvatarFile(null);
    resetFileInput();
    setForm({
      name: profile.name,
      institution: profile.institution,
      phone: profile.phone
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (profile) {
      setForm({
        name: profile.name,
        institution: profile.institution,
        phone: profile.phone
      });
    }

    setAvatarFile(null);
    resetFileInput();
    setError('');
    setSuccess('');
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateAvatarFile(file);
    if (validationError) {
      setAvatarFile(null);
      resetFileInput();
      setError(validationError);
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');
    setAvatarFile(file);
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
      const nextProfile = await updateEditableProfile(profile, form, avatarFile);
      setProfile(nextProfile);
      setForm({
        name: nextProfile.name,
        institution: nextProfile.institution,
        phone: nextProfile.phone
      });
      setAvatarFile(null);
      resetFileInput();
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
    }
  ];

  const avatarUrl = avatarPreview || profile?.avatar_url || fallbackAvatarUrl;
  const displayName = profile?.name || 'Kagie User';

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="relative z-10 bg-white px-4 pb-8 pt-10 shadow-sm sm:px-6 sm:pt-12 lg:rounded-b-[2.5rem]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-start justify-between">
            <h1 className="font-display text-2xl font-bold text-dark">Profile</h1>
            <button
              onClick={isEditing ? handleCancel : handleEdit}
              disabled={isLoading}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-dark transition-colors hover:bg-gray-100 disabled:opacity-50">
              {isEditing ? <X size={20} /> : <Settings size={20} />}
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 animate-pulse rounded-full bg-gray-100" />
              <div className="space-y-2">
                <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-56 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt={displayName}
                  onError={(e) => {
                    e.currentTarget.src = fallbackAvatarUrl;
                  }}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
                />

                <button
                  onClick={handleEdit}
                  className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-sm">
                  <span className="text-xs font-bold">+</span>
                </button>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-dark">{displayName}</h2>
                <p className="mb-1 text-sm text-gray-500">
                  {profile?.institution || profile?.email}
                </p>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${
                    profile?.emailVerified
                      ? 'bg-success/10 text-success'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                  <Shield size={12} />
                  {profile?.emailVerified ? 'Verified Student' : 'Email Not Verified'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
        {(error || success) && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              error
                ? 'border-primary/20 bg-primary/10 text-primary'
                : 'border-success/20 bg-success/10 text-success'
            }`}>
            {error || success}
          </div>
        )}

        {isEditing && (
          <form
            onSubmit={handleSave}
            className="space-y-5 rounded-3xl border border-border bg-white p-4 shadow-sm sm:p-6">
            <div>
              <h2 className="font-display text-xl font-bold text-dark">Edit profile</h2>
              <p className="text-sm text-gray-500">Update your account details.</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img
                  src={avatarUrl}
                  alt="Profile preview"
                  onError={(e) => {
                    e.currentTarget.src = fallbackAvatarUrl;
                  }}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-semibold text-dark">Profile picture</p>
                  <p className="mb-3 text-sm text-gray-500">PNG, JPG, WebP, or GIF up to 5 MB.</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    leftIcon={<ImageIcon size={16} />}>
                    Choose image
                  </Button>
                  {avatarFile && (
                    <p className="mt-2 text-xs font-medium text-gray-500">{avatarFile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                placeholder="Enter your name"
                leftIcon={<User size={20} />}
                required
              />
              <Input
                label="Institution"
                value={form.institution}
                onChange={(e) =>
                  setForm((current) => ({ ...current, institution: e.target.value }))
                }
                placeholder="University or college"
                leftIcon={<School size={20} />}
              />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                placeholder="Phone number"
                leftIcon={<Phone size={20} />}
              />
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
        )}

        <div className="rounded-3xl border border-border bg-white p-2 shadow-sm lg:grid lg:grid-cols-2 lg:gap-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="group flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-all group-hover:bg-white group-hover:text-primary group-hover:shadow-sm">
                  <item.icon size={20} />
                </div>
                <span className="font-semibold text-dark">{item.label}</span>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-400 transition-colors group-hover:text-dark"
              />
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white p-4 font-bold text-primary shadow-sm transition-colors hover:bg-primary/5">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
}
