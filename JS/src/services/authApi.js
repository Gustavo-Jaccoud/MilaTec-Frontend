export class AuthApiError extends Error {
  constructor(message, { status, data, cause } = {}) {
    super(message, { cause });
    this.name = 'AuthApiError';
    this.status = status;
    this.data = data;
  }
}

const getApiBaseUrl = () => {
  const viteBaseUrl = import.meta.env?.VITE_API_BASE_URL;

  if (viteBaseUrl) {
    return viteBaseUrl;
  }

  if (typeof process !== 'undefined') {
    return process.env?.VITE_API_BASE_URL || '';
  }

  return '';
};

const normalizeEndpoint = endpoint => {
  if (!endpoint) {
    return '/';
  }

  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
};

const buildAuthUrl = endpoint => {
  const baseUrl = getApiBaseUrl().trim().replace(/\/+$/, '');
  return `${baseUrl}${normalizeEndpoint(endpoint)}`;
};

const parseResponseBody = async response => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const getErrorMessage = data => {
  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  if (Array.isArray(data?.message) && data.message.length > 0) {
    return data.message.join(', ');
  }

  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.error === 'string' && data.error.trim()) {
    return data.error;
  }

  return 'Nao foi possivel concluir a autenticacao.';
};

export const authFetch = async (endpoint, payload, options = {}) => {
  let response;

  try {
    response = await fetch(buildAuthUrl(endpoint), {
      ...options,
      method: options.method || 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: payload === undefined ? options.body : JSON.stringify(payload),
    });
  } catch (error) {
    throw new AuthApiError('Nao foi possivel conectar ao servidor de autenticacao.', {
      cause: error,
    });
  }

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new AuthApiError(getErrorMessage(data), {
      status: response.status,
      data,
    });
  }

  return data;
};

export const requestPin = email => authFetch('/auth/request-pin', { email });

export const verifyPin = (email, pin) => authFetch('/auth/verify-pin', { email, pin });
