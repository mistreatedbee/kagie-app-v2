import type { UserSchema } from '@insforge/sdk';
import { insforge } from './insforge';

export type KagieRole = 'student' | 'host' | 'admin';

const PENDING_OAUTH_ROLE_KEY = 'kagie.pendingOAuthRole';
const PENDING_AUTH_REDIRECT_ROLE_KEY = 'kagie.pendingAuthRedirectRole';
const SIGNUP_ROLE_PREFIX = 'kagie.signupRole.';
export const fallbackAvatarUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export interface EditableProfile {
  name: string;
  institution: string;
  phone: string;
  avatar_url: string;
  role: KagieRole | null;
  email: string;
  emailVerified: boolean;
  rawProfile: Record<string, unknown>;
}

export const roleLandingPaths: Record<KagieRole, string> = {
  student: '/home',
  host: '/host',
  admin: '/admin'
};

export const isKagieRole = (role: unknown): role is KagieRole =>
  role === 'student' || role === 'host' || role === 'admin';

export const getRoleFromSearch = (role: string | null): KagieRole =>
  isKagieRole(role) ? role : 'student';

export const getRoleLandingPath = (role: KagieRole) => roleLandingPaths[role];

export const formatAuthError = (error: unknown) => {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message?: unknown }).message || 'Authentication failed.');
  }

  return 'Authentication failed. Please try again.';
};

export const validatePassword = (password: string) => {
  const missing: string[] = [];

  if (password.length < 6) missing.push('at least 6 characters');
  if (!/[a-z]/.test(password)) missing.push('one lowercase letter');
  if (!/[A-Z]/.test(password)) missing.push('one uppercase letter');
  if (!/[0-9]/.test(password)) missing.push('one number');
  if (!/[^A-Za-z0-9]/.test(password)) missing.push('one special character');

  return missing;
};

const getStoredSignupRole = (email: string) => {
  if (typeof window === 'undefined') return null;
  const role = window.localStorage.getItem(`${SIGNUP_ROLE_PREFIX}${email.toLowerCase()}`);
  return isKagieRole(role) ? role : null;
};

export const storeSignupRole = (email: string, role: KagieRole) => {
  window.localStorage.setItem(`${SIGNUP_ROLE_PREFIX}${email.toLowerCase()}`, role);
};

const clearSignupRole = (email: string) => {
  window.localStorage.removeItem(`${SIGNUP_ROLE_PREFIX}${email.toLowerCase()}`);
};

export const storePendingOAuthRole = (role: KagieRole) => {
  window.localStorage.setItem(PENDING_OAUTH_ROLE_KEY, role);
};

export const storePendingAuthRedirectRole = (role: KagieRole) => {
  window.localStorage.setItem(PENDING_AUTH_REDIRECT_ROLE_KEY, role);
};

export const getPendingAuthRedirectRole = () => {
  if (typeof window === 'undefined') return null;
  const role = window.localStorage.getItem(PENDING_AUTH_REDIRECT_ROLE_KEY);
  return isKagieRole(role) ? role : null;
};

export const clearPendingAuthRedirectRole = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PENDING_AUTH_REDIRECT_ROLE_KEY);
};

const takePendingOAuthRole = () => {
  if (typeof window === 'undefined') return null;
  const role = window.localStorage.getItem(PENDING_OAUTH_ROLE_KEY);
  window.localStorage.removeItem(PENDING_OAUTH_ROLE_KEY);
  return isKagieRole(role) ? role : null;
};

export const getProfileRole = (profile: Record<string, unknown> | null | undefined) => {
  const role = profile?.role;
  return isKagieRole(role) ? role : null;
};

const readStringField = (
  profile: Record<string, unknown> | null | undefined,
  field: string,
  fallback = ''
) => {
  const value = profile?.[field];
  return typeof value === 'string' && value.trim() ? value : fallback;
};

export const normalizeEditableProfile = (user: UserSchema): EditableProfile => {
  const profile = (user.profile || {}) as Record<string, unknown>;

  return {
    name: readStringField(profile, 'name', user.email.split('@')[0] || 'Kagie User'),
    institution: readStringField(profile, 'institution'),
    phone: readStringField(profile, 'phone'),
    avatar_url: readStringField(profile, 'avatar_url', fallbackAvatarUrl),
    role: getProfileRole(profile),
    email: user.email,
    emailVerified: user.emailVerified,
    rawProfile: profile
  };
};

export const getEditableProfile = async () => {
  const { data, error } = await insforge.auth.getCurrentUser();

  if (error) throw error;
  if (!data.user) throw new Error('You need to sign in to edit your profile.');

  return normalizeEditableProfile(data.user);
};

export const updateEditableProfile = async (
  currentProfile: EditableProfile,
  updates: Pick<EditableProfile, 'name' | 'institution' | 'phone' | 'avatar_url'>
) => {
  const nextProfile = {
    ...currentProfile.rawProfile,
    name: updates.name.trim(),
    institution: updates.institution.trim(),
    phone: updates.phone.trim(),
    avatar_url: updates.avatar_url.trim(),
    ...(currentProfile.role ? { role: currentProfile.role } : {})
  };

  const { data, error } = await insforge.auth.setProfile(nextProfile);
  if (error) throw error;

  return {
    ...currentProfile,
    ...updates,
    name: updates.name.trim(),
    institution: updates.institution.trim(),
    phone: updates.phone.trim(),
    avatar_url: updates.avatar_url.trim() || fallbackAvatarUrl,
    rawProfile: (data?.profile || nextProfile) as Record<string, unknown>
  };
};

export const ensureProfileRole = async (
  user: UserSchema,
  fallbackRole?: KagieRole,
  fallbackName?: string
) => {
  const profile = user.profile as Record<string, unknown> | null;
  const currentRole = getProfileRole(profile);

  if (currentRole) return currentRole;
  if (!fallbackRole) return null;

  const nextProfile = {
    ...(profile || {}),
    ...(fallbackName && !profile?.name ? { name: fallbackName } : {}),
    role: fallbackRole
  };

  const { data, error } = await insforge.auth.setProfile(nextProfile);
  if (error) throw error;

  return getProfileRole(data?.profile) || fallbackRole;
};

export const signInWithEmail = async (
  email: string,
  password: string,
  selectedRole: KagieRole
) => {
  const { data, error } = await insforge.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data?.user) throw new Error('Sign in did not return a user.');

  const storedRole = getStoredSignupRole(email);
  const role = await ensureProfileRole(data.user, storedRole || selectedRole);
  clearSignupRole(email);

  return role || selectedRole;
};

export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string,
  role: KagieRole
) => {
  storeSignupRole(email, role);
  storePendingAuthRedirectRole(role);

  const redirectTo = `${window.location.origin}/auth/login`;
  const { data, error } = await insforge.auth.signUp({
    name,
    email,
    password,
    redirectTo
  });

  if (error) throw error;

  if (data?.user && data.accessToken) {
    await ensureProfileRole(data.user, role, name);
    clearSignupRole(email);
  }

  return data;
};

export const signInWithOAuth = async (provider: 'google' | 'github', role: KagieRole) => {
  storePendingOAuthRole(role);
  storePendingAuthRedirectRole(role);

  const { error } = await insforge.auth.signInWithOAuth({
    provider,
    redirectTo: `${window.location.origin}/auth/login`
  });

  if (error) throw error;
};

export const getCurrentAuthState = async () => {
  const pendingRole = takePendingOAuthRole();
  const { data, error } = await insforge.auth.getCurrentUser();

  if (error) throw error;
  if (!data.user) return { user: null, role: null };

  const role = await ensureProfileRole(data.user, pendingRole || undefined);
  return { user: data.user, role };
};

export const signOut = async () => {
  const { error } = await insforge.auth.signOut();
  if (error) throw error;
};
