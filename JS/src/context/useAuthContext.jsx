import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { authSession } from '@/services/authSession';

const AuthContext = createContext(undefined);

const readTokenFromSession = () => {
  if (typeof window === 'undefined') return null;
  const t = authSession.getToken();
  return t ? t : null;
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth só pode ser usado dentro do AuthProvider');
  }
  return ctx;
};

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(readTokenFromSession);

  const setAccessToken = useCallback((token) => {
    const trimmed = token ? String(token).trim() : '';
    if (trimmed) {
      authSession.setToken(trimmed);
      setAccessTokenState(trimmed);
    } else {
      authSession.clearToken();
      setAccessTokenState(null);
    }
  }, []);

  const logout = useCallback(() => {
    authSession.clear();
    setAccessTokenState(null);
  }, []);

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
