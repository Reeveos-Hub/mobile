/**
 * ReeveOS Mobile — useApi Hook
 *
 * Reusable data-fetching hook for every screen.
 * Handles loading states, error handling, and refetching.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi<BookingList>('/dashboard/business/123/today');
 *
 * The hook:
 *   - Fetches data on mount (or when the path changes)
 *   - Shows a loading state while fetching
 *   - Catches and formats errors
 *   - Exposes refetch() so screens can pull-to-refresh
 *   - Does NOT store anything in the browser — data lives in React state (memory only)
 *
 * HIPAA / ICO / GDPR: No API responses cached to disk. All data in-memory only.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { api, ApiError } from './apiClient';

// ─── Types ───────────────────────────────────────────────────────────

export interface UseApiResult<T> {
  /** The fetched data, or null if not yet loaded / on error */
  data: T | null;
  /** True while the initial fetch is in progress */
  loading: boolean;
  /** True while a refetch is in progress (data still shown from last fetch) */
  refreshing: boolean;
  /** Error message if the fetch failed, or null */
  error: string | null;
  /** Call this to re-fetch the data (e.g. pull-to-refresh) */
  refetch: () => void;
}

// ─── Hook ────────────────────────────────────────────────────────────

/**
 * Fetch data from the backend API.
 *
 * @param path  — API path, e.g. '/dashboard/business/123/today'
 * @param skip  — If true, don't fetch (useful when business_id isn't available yet)
 *
 * @example
 *   const { businessId } = useAuth();
 *   const { data, loading, error } = useApi<{ bookings: Booking[] }>(
 *     businessId ? `/dashboard/business/${businessId}/today` : null
 *   );
 */
export function useApi<T = unknown>(path: string | null): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(path !== null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Track the current path to avoid stale responses
  const currentPath = useRef(path);
  currentPath.current = path;

  const fetchData = useCallback(
    async (isRefresh: boolean = false) => {
      if (!path) {
        setData(null);
        setLoading(false);
        setRefreshing(false);
        setError(null);
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
        setError(null);
      }

      try {
        const response = await api<T>(path);

        // Only update state if the path hasn't changed while we were fetching
        if (currentPath.current === path) {
          setData(response.data);
          setError(null);
        }
      } catch (err: unknown) {
        if (currentPath.current === path) {
          const message =
            err && typeof err === 'object' && 'message' in err
              ? (err as ApiError).message
              : 'Something went wrong. Please try again.';
          setError(message);

          // On refresh failure, keep old data visible
          if (!isRefresh) {
            setData(null);
          }
        }
      } finally {
        if (currentPath.current === path) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [path],
  );

  // Fetch on mount and when path changes
  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  return { data, loading, refreshing, error, refetch };
}
