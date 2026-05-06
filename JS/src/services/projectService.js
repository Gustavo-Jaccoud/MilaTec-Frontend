import { apiRequest } from '@/services/apiClient';

/**
 * @param {string} token JWT
 * @returns {Promise<unknown[]>}
 */
export function fetchProjects(token) {
  return apiRequest('/project', { token });
}
