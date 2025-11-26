const getApiBaseUrl = (): string => {
  try {
    return import.meta.env.VITE_API_BASE_URL || '';
  } catch {
    return '';
  }
};

export const customFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const fullUrl = `${getApiBaseUrl()}${url}`;

  const res = await fetch(fullUrl, options);

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data = body ? JSON.parse(body) : {};

  return { data, status: res.status, headers: res.headers } as T;
};

export default customFetch;
