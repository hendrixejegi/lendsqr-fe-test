import { fetchJson } from '@/lib/utils';

export function getUsers(): Promise<User[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('lendsqr_user_data');
    if (cached) {
      return Promise.resolve(JSON.parse(cached));
    }
  }

  return fetchJson<User[]>(
    'https://api.json-generator.com/templates/M9PkTQEpb8MT/data',
    {
      headers: {
        Authorization: 'Bearer xtk7gzo67d2r0n9k6sqojm9thvmuq12nqh9onmhv',
      },
    },
  );
}
