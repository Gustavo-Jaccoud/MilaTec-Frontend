import { apiRequest } from '@/services/apiClient';

/**
 * @param {string} email
 * @param {string} [code] código de 5 caracteres após o e-mail
 * @returns {Promise<unknown>} primeiro passo: mensagem em envelope; segundo: objeto com accessToken
 */
export function login(email, code) {
  const body = code ? { email, code } : { email };
  return apiRequest('/auth/login', { method: 'POST', body });
}
