export const fetchWithToken = <T>(url: string, token: string): Promise<T> =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json() as T);
