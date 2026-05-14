export const AUTH_SESSION_KEYS = Object.freeze({
  accessToken: 'milatec:auth:accessToken',
  pendingEmail: 'milatec:auth:pendingEmail',
  userEmail: 'milatec:auth:userEmail',
});

const getStorage = () => {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }

  return sessionStorage;
};

const getItem = key => getStorage()?.getItem(key) || '';

const setItem = (key, value) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  const normalizedValue = String(value ?? '').trim();

  if (!normalizedValue) {
    storage.removeItem(key);
    return;
  }

  storage.setItem(key, normalizedValue);
};

const removeItem = key => {
  getStorage()?.removeItem(key);
};

export const authSession = {
  getToken: () => getItem(AUTH_SESSION_KEYS.accessToken),
  setToken: token => setItem(AUTH_SESSION_KEYS.accessToken, token),
  clearToken: () => removeItem(AUTH_SESSION_KEYS.accessToken),
  getPendingEmail: () => getItem(AUTH_SESSION_KEYS.pendingEmail),
  setPendingEmail: email => setItem(AUTH_SESSION_KEYS.pendingEmail, email),
  clearPendingEmail: () => removeItem(AUTH_SESSION_KEYS.pendingEmail),
  getUserEmail: () => getItem(AUTH_SESSION_KEYS.userEmail),
  setUserEmail: value => setItem(AUTH_SESSION_KEYS.userEmail, value),
  clearUserEmail: () => removeItem(AUTH_SESSION_KEYS.userEmail),
  clear: () => {
    removeItem(AUTH_SESSION_KEYS.accessToken);
    removeItem(AUTH_SESSION_KEYS.pendingEmail);
    removeItem(AUTH_SESSION_KEYS.userEmail);
  },
};
