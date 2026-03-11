/**
 * ReeveOS Mobile — Secure Token Store
 *
 * Stores auth tokens in memory ONLY — never localStorage, never sessionStorage,
 * never cookies. When the app closes, tokens are gone. This is intentional:
 *   - Prevents XSS attacks from stealing stored tokens
 *   - Prevents CSRF attacks via cookies
 *   - Forces re-authentication on new sessions (secure by default)
 *
 * HIPAA / ICO / GDPR compliant: no credentials persisted client-side.
 */

let accessToken: string | null = null;
let refreshToken: string | null = null;
let tokenExpiry: number | null = null;

/** Store tokens after successful login */
export function setTokens(access: string, refresh: string, expiresIn: number): void {
  accessToken = access;
  refreshToken = refresh;
  // expiresIn is seconds from now — convert to absolute timestamp
  tokenExpiry = Date.now() + expiresIn * 1000;
}

/** Get the current access token (null if not logged in) */
export function getAccessToken(): string | null {
  return accessToken;
}

/** Get the refresh token for renewing expired sessions */
export function getRefreshToken(): string | null {
  return refreshToken;
}

/** Check if the access token has expired (or will expire within bufferMs) */
export function isTokenExpired(bufferMs: number = 0): boolean {
  if (!tokenExpiry) return true;
  return Date.now() >= tokenExpiry - bufferMs;
}

/** Wipe all tokens — called on logout or auth failure */
export function clearTokens(): void {
  accessToken = null;
  refreshToken = null;
  tokenExpiry = null;
}

/** Check if we have any tokens at all */
export function hasTokens(): boolean {
  return accessToken !== null;
}
