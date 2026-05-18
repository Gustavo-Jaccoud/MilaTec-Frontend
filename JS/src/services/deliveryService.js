import { apiRequest } from '@/services/apiClient';

/**
 * @param {string} token JWT
 * @returns {Promise<unknown[]>}
 */
export function fetchDeliveries(token) {
  return apiRequest('/delivery', { token });
}

/**
 * @param {string} token JWT
 * @param {string} id ID da entrega
 * @returns {Promise<Record<string, unknown>>}
 */
export function fetchDeliveryById(token, id) {
  const safeId = encodeURIComponent(id);
  return apiRequest(`/delivery/${safeId}`, { token });
}
