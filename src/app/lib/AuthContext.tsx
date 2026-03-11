/**
 * ReeveOS Mobile — Auth Context
 *
 * Wraps the entire app. Any screen can call useAuth() to:
 *   - Check if the user is logged in
 *   - Get user info (name, email, role, business_id)
 *   - Call login() or logout()
 *
 * Login tokens are stored in memory only (via tokenStore).
 * User info is held in React state — never persisted to disk.
 *
 * HIPAA / ICO / GDPR: No credentials or PII stored client-side.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '../lib/apiClient';
import { setTokens, clearTokens, hasTokens } from '../lib/tokenStore';

// ─── Types ───────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  business_id: string | null;
  business_name: string | null;
}

interface AuthState {
  /** The logged-in user, or null if not authenticated */
  user: User | null;
  /** True while we're checking if there's an existing session */
  loading: boolean;
  /** Last auth error message */
  error: string | null;
}

interface AuthContextValue extends AuthState {
  /** Log in with email and password. Returns true on success. */
  login: (email: string, password: string) => Promise<boolean>;
  /** Log out and clear all tokens/state */
  logout: () => void;
  /** Clear the current error */
  clearError: () => void;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true, // Start true — we check for existing session on mount
    error: null,
  });

  // On mount, check if we already have tokens (e.g. from a refresh)
  useEffect(() => {
    if (hasTokens()) {
      // Try to fetch current user with existing token
      api<{ user: User }>('/auth/me')
        .then(({ data }) => {
          setState({ user: data.user, loading: false, error: null });
        })
        .catch(() => {
          // Token invalid — clear everything
          clearTokens();
          setState({ user: null, loading: false, error: null });
        });
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data } = await api<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
        user: User;
      }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }, true); // skipAuth = true (we're logging in, no token yet)

      // Store tokens in memory
      setTokens(data.access_token, data.refresh_token, data.expires_in);

      setState({ user: data.user, loading: false, error: null });
      return true;
    } catch (err: unknown) {
      const message = (err && typeof err === 'object' && 'message' in err)
        ? (err as { message: string }).message
        : 'Login failed. Please check your details and try again.';

      setState({ user: null, loading: false, error: message });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setState({ user: null, loading: false, error: null });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    clearError,
    isAuthenticated: state.user !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────

/**
 * Use this in any screen to access auth state and actions.
 *
 * @example
 *   const { user, isAuthenticated, logout } = useAuth();
 *   if (!isAuthenticated) return <LoginScreen />;
 *   return <Text>Welcome, {user.name}</Text>;
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
