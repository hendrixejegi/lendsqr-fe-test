export const formatNum = (foo: number) => new Intl.NumberFormat().format(foo);

export async function fetchJson<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw res;
  }

  return res.json() as Promise<T>;
}

export function countActiveUsers(arr: User[]) {
  return arr.filter((user) => user.status === 'active').length;
}
