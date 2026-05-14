import { apiRequest } from '@/services/apiClient';

/**
 * @param {string} token JWT
 * @returns {Promise<unknown[]>}
 */
export function fetchConstructions(token) {
  return apiRequest('/construction', { token });
}
