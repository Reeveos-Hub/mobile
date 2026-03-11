/**
 * ReeveOS Mobile — Login Screen
 *
 * Real login form that authenticates against portal.rezvo.app.
 * Keeps the original Figma visual design but wires to AuthContext.
 *
 * Sign-in only for now — registration will be handled via the web portal
 * to ensure proper business onboarding and verification.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { BRAND, FONT, APP } from '../lib/brand';
import { RMark } from './RMark';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const isValid = email.includes('@') && password.length >= APP.minPasswordLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    clearError();

    const success = await login(email, password);

    if (success) {
      navigate('/', { replace: true });
    }

    setSubmitting(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        backgroundColor: BRAND.white,
        fontFamily: FONT.family,
      }}
    >
      {/* Status bar spacer */}
      <div style={{ height: 52, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 16px' }}>
        <RMark size={44} variant="light" />
        <h1 style={{ marginTop: 12, fontSize: 24, fontWeight: 800, color: BRAND.black, lineHeight: 1.2 }}>
          Welcome back
        </h1>
        <p style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: BRAND.grey400 }}>
          Sign in to ReeveOS
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div
          style={{
            margin: '0 20px 12px',
            padding: '12px 16px',
            borderRadius: 12,
            backgroundColor: '#FEF2F2',
            border: `1px solid ${BRAND.error}20`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="7.5" stroke={BRAND.error} strokeWidth="1.5" />
            <path d="M9 6V9.5" stroke={BRAND.error} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9" cy="12" r="0.75" fill={BRAND.error} />
          </svg>
          <p style={{ fontSize: 13, color: BRAND.error, margin: 0, lineHeight: 1.4 }}>{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError(); }}
          autoComplete="email"
          autoCapitalize="none"
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 14,
            border: `1.5px solid ${BRAND.grey100}`,
            fontSize: 14,
            fontWeight: 500,
            color: BRAND.black,
            backgroundColor: BRAND.white,
            fontFamily: FONT.family,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearError(); }}
            autoComplete="current-password"
            style={{
              width: '100%',
              padding: '14px 56px 14px 16px',
              borderRadius: 14,
              border: `1.5px solid ${BRAND.grey100}`,
              fontSize: 14,
              fontWeight: 500,
              color: BRAND.black,
              backgroundColor: BRAND.white,
              fontFamily: FONT.family,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 4,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: 10,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke={BRAND.grey400} strokeWidth="1.3" />
                <circle cx="9" cy="9" r="2.5" stroke={BRAND.grey400} strokeWidth="1.3" />
                <path d="M3 15L15 3" stroke={BRAND.grey400} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke={BRAND.grey400} strokeWidth="1.3" />
                <circle cx="9" cy="9" r="2.5" stroke={BRAND.grey400} strokeWidth="1.3" />
              </svg>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: BRAND.gold,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: FONT.family,
            }}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={!isValid || submitting}
          style={{
            width: '100%',
            padding: '16px 0',
            marginTop: 4,
            borderRadius: 16,
            border: 'none',
            backgroundColor: isValid && !submitting ? BRAND.black : BRAND.grey200,
            cursor: isValid && !submitting ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          {submitting ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: `2px solid ${BRAND.gold}40`,
                  borderTopColor: BRAND.gold,
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <span style={{ fontSize: 14, fontWeight: 700, color: BRAND.gold }}>Signing in...</span>
            </div>
          ) : (
            <span style={{ fontSize: 14, fontWeight: 700, color: isValid ? BRAND.gold : BRAND.grey400 }}>
              Sign in
            </span>
          )}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
          <div style={{ flex: 1, height: 1, backgroundColor: BRAND.grey100 }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: BRAND.grey400 }}>or</span>
          <div style={{ flex: 1, height: 1, backgroundColor: BRAND.grey100 }} />
        </div>

        <button
          type="button"
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 14,
            border: `1.5px solid ${BRAND.grey100}`,
            fontSize: 13,
            fontWeight: 700,
            color: BRAND.black,
            backgroundColor: BRAND.white,
            fontFamily: FONT.family,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-1.15.69-2.53 1.09-3.91 1.09-3.35 0-6.16-2.25-7.17-5.27l-.02-.06-1.46-1.12-.5.38C5.49 18.48 8.49 21.37 12.14 21.37c1.65 0 3.22-.52 4.56-1.5l-.02-.01-1.63-1.58z" fill="#34A853"/>
            <path d="M12.14 9.73c1.68 0 2.81.72 3.45 1.33l2.52-2.46C16.52 7.15 14.52 6.23 12.14 6.23c-3.65 0-6.65 2.89-8.15 6.07l1.98 1.53c.73-2.18 2.77-4.1 6.17-4.1z" fill="#EA4335"/>
            <path d="M20.25 12.23c0-.71-.06-1.24-.2-1.78H12.14v3.24h4.66c-.1.64-.59 1.61-1.7 2.26l1.63 1.58c1.56-1.44 2.52-3.56 2.52-5.3z" fill="#4285F4"/>
            <path d="M4 12.14c0-.68.12-1.34.32-1.96l-1.98-1.53A9.94 9.94 0 001 12.14c0 1.59.39 3.09 1.07 4.42l1.97-1.53c-.22-.59-.34-1.22-.34-1.89h.3z" fill="#FBBC05"/>
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 14,
            border: `1.5px solid ${BRAND.grey100}`,
            fontSize: 13,
            fontWeight: 700,
            color: BRAND.black,
            backgroundColor: BRAND.white,
            fontFamily: FONT.family,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={BRAND.black}>
            <path d="M17.05 12.536c-.024-2.416 1.98-3.584 2.072-3.64-1.132-1.652-2.892-1.876-3.516-1.904-1.488-.156-2.928.892-3.684.892-.768 0-1.932-.876-3.18-.852-1.62.024-3.132.96-3.972 2.424-1.716 2.964-.436 7.344 1.212 9.744.82 1.176 1.788 2.496 3.06 2.448 1.236-.048 1.7-.792 3.192-.792 1.476 0 1.908.792 3.192.768 1.32-.024 2.16-1.188 2.952-2.376.948-1.356 1.332-2.688 1.344-2.76-.024-.012-2.568-1.008-2.592-3.952h-.08zM14.628 5.492c.66-.816 1.116-1.932.996-3.06-.96.048-2.16.66-2.856 1.464-.624.72-1.176 1.896-1.032 3.012 1.08.084 2.184-.552 2.892-1.416z"/>
          </svg>
          Continue with Apple
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 12, padding: '0 20px 32px' }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: BRAND.grey400 }}>
          Don't have an account?{' '}
          <span style={{ fontWeight: 700, color: BRAND.gold }}>Sign up at reeveos.app</span>
        </p>
      </div>
    </div>
  );
}
