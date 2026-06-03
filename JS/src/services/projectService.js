import { apiRequest } from '@/services/apiClient';



/**

 * @param {string} token JWT

 * @returns {Promise<unknown[]>}

 */

export function fetchProjects(token) {

  return apiRequest('/project', { token });

}



/**

 * @param {string} token JWT

 * @param {string} id Project ID

 * @returns {Promise<unknown>}

 */

export function fetchProjectById(token, id) {

  return apiRequest(`/project/${id}`, { token });

}

