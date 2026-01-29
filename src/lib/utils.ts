import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export const formatNum = (foo: number) => {
  return new Intl.NumberFormat().format(foo);
};

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

export const formatDate = (foo: string) => {
  dayjs.extend(localizedFormat);
  return dayjs(foo).format('lll');
};

export const slice = (foo: string, length: number) => {
  if (foo.length <= length) {
    return foo;
  }

  return foo.slice(0, length - 2) + '...';
};
