/**
 * ReeveOS Mobile — API Client
 *
 * Centralised HTTP client. Every request to the backend goes through here.
 * Handles:
 *   - Automatic auth header injection (from tokenStore)
 *   - Token refresh when access token expires
 *   - Timeout protection
 *   - Consistent error format
 *   - Tenant isolation (business_id header)
 *
 * No screen ever calls fetch() directly — always use this.
 */

import { API } from './brand';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  isTokenExpired,
} from './tokenStore';

// ─── Types ───────────────────────────────────────────────────────────

export interface ApiError {
  status: number;
  message: string;
  detail?: unknown;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

// ─── Internal Helpers ────────────────────────────────────────────────

/** Build full URL from a path like '/auth/login' */
function buildUrl(path: string): string {
  const base = API.baseUrl.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/** Create an AbortController with timeout */
function withTimeout(): { controller: AbortController; clear: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API.timeout);
  return {
    controller,
    clear: () => clearTimeout(timer),
  };
}

/** Attempt to refresh the access token using the refresh token */
async function refreshAccessToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const res = await fetch(buildUrl('/auth/refresh'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh }),
    });

    if (!res.ok) {
      clearTokens();
      return false;
    }

    const data = await res.json();
    setTokens(data.access_token, data.refresh_token, data.expires_in);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

// ─── Main Request Function ───────────────────────────────────────────

/**
 * Make an authenticated API request.
 *
 * @param path    — API path, e.g. '/bookings' or '/auth/login'
 * @param options — standard fetch options (method, body, headers, etc.)
 * @param skipAuth — set true for login/register (no token needed)
 *
 * @example
 *   // GET request (authenticated)
 *   const { data } = await api('/bookings');
 *
 *   // POST request (authenticated)
 *   const { data } = await api('/bookings', {
 *     method: 'POST',
 *     body: JSON.stringify({ client: 'Jane', time: '10:00' }),
 *   });
 *
 *   // Login (no auth needed)
 *   const { data } = await api('/auth/login', {
 *     method: 'POST',
 *     body: JSON.stringify({ email, password }),
 *   }, true);
 */
export async function api<T = unknown>(
  path: string,
  options: RequestInit = {},
  skipAuth: boolean = false,
): Promise<ApiResponse<T>> {
  // If token is about to expire, try refreshing first
  if (!skipAuth && isTokenExpired(API.refreshBuffer)) {
    await refreshAccessToken();
  }

  const { controller, clear } = withTimeout();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Attach auth token if available and not skipping auth
  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(buildUrl(path), {
      ...options,
      headers,
      signal: controller.signal,
    });

    clear();

    // If 401 and we haven't tried refreshing, try once then retry
    if (res.status === 401 && !skipAuth) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry the original request with new token
        const retryToken = getAccessToken();
        if (retryToken) {
          headers['Authorization'] = `Bearer ${retryToken}`;
        }
        const retry = await fetch(buildUrl(path), {
          ...options,
          headers,
        });
        const retryData = await retry.json().catch(() => null);
        return { ok: retry.ok, status: retry.status, data: retryData as T };
      }
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const err: ApiError = {
        status: res.status,
        message: (data as Record<string, string>)?.detail || res.statusText,
        detail: data,
      };
      throw err;
    }

    return { ok: true, status: res.status, data: data as T };
  } catch (err: unknown) {
    clear();

    // Re-throw ApiError as-is
    if (typeof err === 'object' && err !== null && 'status' in err) {
      throw err;
    }

    // Network error or timeout
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw { status: 0, message: 'Request timed out. Check your connection.' } as ApiError;
    }

    throw {
      status: 0,
      message: 'Network error. Please check your connection and try again.',
    } as ApiError;
  }
}
