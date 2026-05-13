import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authSession } from '@/services/authSession';

export const REDIRECT_LOGIN_PATH = '/auth/login';
export const REDIRECT_AUTHENTICATED_PATH = '/dashboard';

export const RequireAuth = ({ children }) => {
  const location = useLocation();

  if (!authSession.getToken()) {
    return (
      <Navigate
        to={REDIRECT_LOGIN_PATH}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export const RedirectIfAuthenticated = ({ children }) => {
  if (authSession.getToken()) {
    return <Navigate to={REDIRECT_AUTHENTICATED_PATH} replace />;
  }

  return children;
};
