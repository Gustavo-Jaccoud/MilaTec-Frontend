import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const MILLIATEC_TOKEN_KEY = 'miliatec_access_token';

const AuthContext = createContext(undefined);

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth só pode ser usado dentro de AuthProvider');
  }
  return ctx;
};

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(MILLIATEC_TOKEN_KEY);
  });

  const setAccessToken = useCallback((token) => {
    setAccessTokenState(token);
    if (typeof window === 'undefined') return;
    if (token) {
      localStorage.setItem(MILLIATEC_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(MILLIATEC_TOKEN_KEY);
    }
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
  }, [setAccessToken]);

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      logout,
      isAuthenticated: Boolean(accessToken)
    }),
    [accessToken, setAccessToken, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
