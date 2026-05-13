import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { authSession } from '@/services/authSession';
import { RedirectIfAuthenticated, RequireAuth } from './guards';

const Private = () => <div>Conteudo Privado</div>;
const Login = () => <div>Tela de Login</div>;
const FunilProjetos = () => <div>Funil de Projetos</div>;

const renderRoutes = (initialPath, ui) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        {ui}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/funil-projetos" element={<FunilProjetos />} />
      </Routes>
    </MemoryRouter>,
  );

describe('RequireAuth', () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(() => sessionStorage.clear());

  it('redirects unauthenticated users to /auth/login', () => {
    renderRoutes(
      '/private',
      <Route
        path="/private"
        element={
          <RequireAuth>
            <Private />
          </RequireAuth>
        }
      />,
    );

    expect(screen.getByText('Tela de Login')).toBeInTheDocument();
    expect(screen.queryByText('Conteudo Privado')).not.toBeInTheDocument();
  });

  it('renders children when token is present', () => {
    authSession.setToken('jwt-token');
    renderRoutes(
      '/private',
      <Route
        path="/private"
        element={
          <RequireAuth>
            <Private />
          </RequireAuth>
        }
      />,
    );

    expect(screen.getByText('Conteudo Privado')).toBeInTheDocument();
  });
});

describe('RedirectIfAuthenticated', () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(() => sessionStorage.clear());

  it('renders children when there is no token', () => {
    renderRoutes(
      '/auth/login',
      <Route
        path="/auth/login"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />,
    );

    expect(screen.getByText('Tela de Login')).toBeInTheDocument();
  });

  it('redirects authenticated users to /funil-projetos', () => {
    authSession.setToken('jwt-token');
    renderRoutes(
      '/auth/login',
      <Route
        path="/auth/login"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />,
    );

    expect(screen.getByText('Funil de Projetos')).toBeInTheDocument();
  });
});
