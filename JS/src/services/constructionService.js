import { apiRequest } from '@/services/apiClient';

/**
 * @param {string} token JWT
 * @returns {Promise<unknown[]>}
 */
export function fetchConstructions(token) {
  return apiRequest('/construction', { token });
}

/**
 * @param {string} token JWT
 * @param {string} id registro da obra
 * @returns {Promise<Record<string, unknown>>}
 */
export function fetchConstructionById(token, id) {
  const safeId = encodeURIComponent(id);
  return apiRequest(`/construction/${safeId}`, { token });
}
