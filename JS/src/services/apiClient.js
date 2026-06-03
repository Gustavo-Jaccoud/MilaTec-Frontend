import { API_BASE_URL } from '@/context/constants';

/**
 * @param {string} path ex.: '/project'
 * @param {{ method?: string, body?: unknown, token?: string | null }} [options]
 * @returns {Promise<unknown>}
 */
export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, token } = options;
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL não está definida. Configure no arquivo .env');
  }
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });
  const parsed = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      parsed?.message ??
      parsed?.error ??
      (Array.isArray(parsed?.message) ? parsed.message.join(', ') : null) ??
      res.statusText;
    throw new Error(typeof msg === 'string' && msg ? msg : `Erro HTTP ${res.status}`);
  }
  if (parsed && typeof parsed === 'object' && 'data' in parsed && 'statusCode' in parsed) {
    return parsed.data;
  }
  return parsed;
}
