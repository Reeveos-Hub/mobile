/**
 * ReeveOS Mobile — Brand Constants
 * Single source of truth for colours, fonts, spacing, and API config.
 * Every screen references this file. Never hardcode brand values elsewhere.
 *
 * Two brands:
 *   ReeveOS (merchant-facing): Rich Black + Gold + White
 *   Reeve Now (consumer-facing): Deep Indigo + Vivid Amber + White
 *
 * This app is the MERCHANT (ReeveOS) brand.
 */

// ─── Merchant Brand (ReeveOS) ────────────────────────────────────────
export const BRAND = {
  // Primary palette
  black: '#111111',       // Rich Black — backgrounds, primary text
  gold: '#C9A84C',        // Gold — accents, CTAs, highlights
  white: '#FFFFFF',       // White — cards, secondary backgrounds

  // Functional colours (consistent across both brands)
  success: '#22C55E',     // Green — confirmations, positive states
  warning: '#F59E0B',     // Amber — caution, pending states
  error: '#EF4444',       // Red — errors, destructive actions, cancellations
  info: '#3B82F6',        // Blue — informational, links

  // Neutral scale (for borders, disabled states, muted text)
  grey50: '#F9FAFB',
  grey100: '#F3F4F6',
  grey200: '#E5E7EB',
  grey300: '#D1D5DB',
  grey400: '#9CA3AF',
  grey500: '#6B7280',
  grey600: '#4B5563',
  grey700: '#374151',
  grey800: '#1F2937',
  grey900: '#111827',
} as const;

// ─── Typography ──────────────────────────────────────────────────────
export const FONT = {
  family: "'Figtree', system-ui, -apple-system, sans-serif",
  size: {
    xs: '0.75rem',    // 12px — labels, captions
    sm: '0.875rem',   // 14px — secondary text
    base: '1rem',     // 16px — body text
    lg: '1.125rem',   // 18px — subheadings
    xl: '1.25rem',    // 20px — section titles
    '2xl': '1.5rem',  // 24px — page titles
    '3xl': '1.875rem',// 30px — hero text
  },
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// ─── Spacing & Layout ───────────────────────────────────────────────
export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
} as const;

export const RADIUS = {
  sm: '0.375rem',  // 6px — small elements (badges, chips)
  md: '0.5rem',    // 8px — cards, inputs
  lg: '0.75rem',   // 12px — modals, sheets
  xl: '1rem',      // 16px — large cards
  full: '9999px',  // Pill shapes, avatars
} as const;

// ─── API Configuration ──────────────────────────────────────────────
export const API = {
  /** Base URL for the portal backend. All API calls go through here. */
  baseUrl: import.meta.env.VITE_API_URL || '/api',

  /** Request timeout in milliseconds */
  timeout: 15_000,

  /** Token refresh buffer — refresh 5 minutes before expiry */
  refreshBuffer: 5 * 60 * 1000,
} as const;

// ─── App Metadata ───────────────────────────────────────────────────
export const APP = {
  name: 'ReeveOS',
  tagline: 'Your Business, Simplified',
  version: '0.1.0',

  /** Minimum password length for auth forms */
  minPasswordLength: 8,

  /** GDPR consent version — bump this when privacy policy changes,
   *  which forces users to re-consent on next launch */
  gdprConsentVersion: 1,
} as const;
