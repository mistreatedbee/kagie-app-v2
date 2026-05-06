import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getCurrentAuthState,
  getRoleLandingPath,
  KagieRole
} from '../../lib/auth';

interface AuthGuardProps {
  allowedRoles: KagieRole[];
  children: React.ReactNode;
}

export function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const location = useLocation();
  const [state, setState] = useState<{
    isLoading: boolean;
    role: KagieRole | null;
    isSignedIn: boolean;
  }>({
    isLoading: true,
    role: null,
    isSignedIn: false
  });

  useEffect(() => {
    let isMounted = true;

    getCurrentAuthState()
      .then(({ user, role }) => {
        if (!isMounted) return;
        setState({
          isLoading: false,
          role,
          isSignedIn: Boolean(user)
        });
      })
      .catch(() => {
        if (!isMounted) return;
        setState({
          isLoading: false,
          role: null,
          isSignedIn: false
        });
      });

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-sm font-medium text-gray-500">Checking your session...</p>
        </div>
      </div>
    );
  }

  if (!state.isSignedIn) {
    return <Navigate to="/auth/role" replace state={{ from: location.pathname }} />;
  }

  if (!state.role) {
    return <Navigate to="/auth/role" replace />;
  }

  if (!allowedRoles.includes(state.role)) {
    return <Navigate to={getRoleLandingPath(state.role)} replace />;
  }

  return <>{children}</>;
}
