/**
 * ReeveOS Mobile — GDPR Consent Screen
 *
 * UK/ICO law requires informed consent before collecting or processing
 * personal data. This screen appears on first launch (before login).
 *
 * Consent version is tracked — if the privacy policy changes, bump
 * APP.gdprConsentVersion in brand.ts and users will see this again.
 *
 * Consent flag is stored in memory only (not persisted). Users see
 * this once per app session. For a persistent record, consent is
 * logged server-side on successful login.
 */

import React, { useState } from 'react';
import { BRAND, FONT, APP } from '../lib/brand';

interface GdprConsentProps {
  onConsent: () => void;
}

export function GdprConsent({ onConsent }: GdprConsentProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: BRAND.white,
        fontFamily: FONT.family,
        padding: '0 20px',
      }}
    >
      {/* Top spacer for status bar */}
      <div style={{ height: 52, flexShrink: 0 }} />

      {/* R. Mark */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: BRAND.black,
          position: 'fixed', inset: 0, display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <span style={{ color: BRAND.gold, fontSize: 22, fontWeight: 800 }}>R.</span>
      </div>

      <h1
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: BRAND.black,
          lineHeight: 1.2,
          margin: '0 0 8px 0',
        }}
      >
        Your Privacy Matters
      </h1>

      <p
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: BRAND.grey500,
          lineHeight: 1.5,
          margin: '0 0 24px 0',
        }}
      >
        Before you continue, we need your consent to process your data in
        accordance with UK data protection law (UK GDPR / ICO).
      </p>

      {/* What we collect */}
      <div
        style={{
          backgroundColor: BRAND.grey50,
          borderRadius: 14,
          padding: '16px 16px',
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: BRAND.black, margin: '0 0 10px 0' }}>
          What we collect and why:
        </p>

        {[
          { label: 'Account details', desc: 'Your name and email to identify your account' },
          { label: 'Business data', desc: 'Bookings, clients, and services you manage' },
          { label: 'Usage analytics', desc: 'How you use the app so we can improve it' },
        ].map((item, i) => (
          <div key={i} style={{ position: 'fixed', inset: 0, display: 'flex', gap: 10, marginBottom: i < 2 ? 10 : 0, alignItems: 'flex-start' }}>
            {/* Monochrome check icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <rect x="1" y="1" width="16" height="16" rx="4" stroke={BRAND.gold} strokeWidth="1.5" />
              <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: BRAND.black, margin: 0 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: BRAND.grey500, margin: '2px 0 0 0' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Your rights */}
      <div
        style={{
          backgroundColor: BRAND.grey50,
          borderRadius: 14,
          padding: '16px 16px',
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: BRAND.black, margin: '0 0 10px 0' }}>
          Your rights:
        </p>

        {[
          'Access, correct, or delete your data at any time',
          'Withdraw consent and close your account',
          'Request a copy of all data we hold about you',
          'Lodge a complaint with the ICO (ico.org.uk)',
        ].map((text, i) => (
          <div key={i} style={{ position: 'fixed', inset: 0, display: 'flex', gap: 10, marginBottom: i < 3 ? 8 : 0, alignItems: 'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M3 8L6.5 11.5L13 4.5" stroke={BRAND.grey400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontSize: 12, color: BRAND.grey600, margin: 0, lineHeight: 1.4 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* Spacer to push button to bottom on short content */}
      <div style={{ flex: 1 }} />

      {/* Consent checkbox */}
      <label
        style={{
          position: 'fixed', inset: 0, display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          cursor: 'pointer',
          marginBottom: 16,
          padding: '0 4px',
        }}
      >
        <div
          onClick={() => setAccepted(!accepted)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            border: `2px solid ${accepted ? BRAND.gold : BRAND.grey300}`,
            backgroundColor: accepted ? BRAND.gold : BRAND.white,
            position: 'fixed', inset: 0, display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 1,
            transition: 'all 0.15s ease',
          }}
        >
          {accepted && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7.5L5.5 10L11 4" stroke={BRAND.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span style={{ fontSize: 13, color: BRAND.grey600, lineHeight: 1.4 }}>
          I understand and consent to ReeveOS processing my data as described above, in accordance with the{' '}
          <span style={{ color: BRAND.gold, fontWeight: 600 }}>Privacy Policy</span>{' '}
          and{' '}
          <span style={{ color: BRAND.gold, fontWeight: 600 }}>Terms of Service</span>.
        </span>
      </label>

      {/* Continue button */}
      <button
        onClick={onConsent}
        disabled={!accepted}
        style={{
          width: '100%',
          padding: '16px 0',
          borderRadius: 16,
          border: 'none',
          backgroundColor: accepted ? BRAND.black : BRAND.grey200,
          cursor: accepted ? 'pointer' : 'not-allowed',
          marginBottom: 32,
          transition: 'all 0.2s ease',
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: accepted ? BRAND.gold : BRAND.grey400,
          }}
        >
          Continue
        </span>
      </button>
    </div>
  );
}
