import { fetchJson } from '@/lib/utils';

/**
 * Cached Promise to prevent 429 errors from React's `use()` hook.
 * Without this, React may call getUsers() multiple times during Suspense/concurrent
 * rendering, triggering multiple simultaneous API requests and hitting rate limits.
 */
let usersCachePromise: Promise<User[]> | null = null;

export function getUsers(): Promise<User[]> {
  // Return cached promise if it exists
  if (usersCachePromise) {
    return usersCachePromise;
  }

  // Check localStorage first
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('lendsqr_user_data');
    if (cached) {
      usersCachePromise = Promise.resolve(JSON.parse(cached));
      return usersCachePromise;
    }
  }

  // Create and cache the fetch promise
  usersCachePromise = fetchJson<User[]>(
    'https://api.json-generator.com/templates/M9PkTQEpb8MT/data',
    {
      headers: {
        Authorization: 'Bearer xtk7gzo67d2r0n9k6sqojm9thvmuq12nqh9onmhv',
      },
    },
  );

  return usersCachePromise;
}
