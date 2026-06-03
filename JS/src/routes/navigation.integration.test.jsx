import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes, Link } from 'react-router-dom';
import { authSession } from '@/services/authSession';
import { RedirectIfAuthenticated, RequireAuth } from './guards';

const FunilProjetos = () => (
  <div>
    <h2>Funil de Projetos</h2>
    <Link to="/auth/logout">Sair</Link>
  </div>
);

const Login = () => <div>Tela de Login</div>;
const LoginPin = () => <div>Tela de PIN</div>;
const Public = () => <div>Pagina Publica</div>;

const Logout = () => {
  React.useEffect(() => {
    authSession.clear();
  }, []);
  return <div>Voce foi deslogado</div>;
};

const renderApp = initialPath =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/funil-projetos"
          element={
            <RequireAuth>
              <FunilProjetos />
            </RequireAuth>
          }
        />
        <Route
          path="/auth/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/auth/login-pin"
          element={
            <RedirectIfAuthenticated>
              <LoginPin />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="/public" element={<Public />} />
      </Routes>
    </MemoryRouter>,
  );

describe('Navigation guards integration', () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(() => sessionStorage.clear());

  it('blocks /funil-projetos when there is no token', () => {
    renderApp('/funil-projetos');
    expect(screen.getByText('Tela de Login')).toBeInTheDocument();
  });

  it('allows /funil-projetos when authenticated', () => {
    authSession.setToken('jwt');
    renderApp('/funil-projetos');
    expect(screen.getByRole('heading', { name: 'Funil de Projetos' })).toBeInTheDocument();
  });

  it('redirects authenticated users away from /auth/login', () => {
    authSession.setToken('jwt');
    renderApp('/auth/login');
    expect(screen.getByRole('heading', { name: 'Funil de Projetos' })).toBeInTheDocument();
  });

  it('redirects authenticated users away from /auth/login-pin', () => {
    authSession.setToken('jwt');
    renderApp('/auth/login-pin');
    expect(screen.getByRole('heading', { name: 'Funil de Projetos' })).toBeInTheDocument();
  });

  it('allows public routes regardless of authentication state', () => {
    renderApp('/public');
    expect(screen.getByText('Pagina Publica')).toBeInTheDocument();
  });

  it('logout clears token and blocks subsequent funil access', async () => {
    const user = userEvent.setup();
    authSession.setToken('jwt');
    authSession.setPendingEmail('user@milatec.com');

    renderApp('/funil-projetos');
    expect(screen.getByRole('heading', { name: 'Funil de Projetos' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /sair/i }));

    expect(screen.getByText('Voce foi deslogado')).toBeInTheDocument();
    expect(authSession.getToken()).toBe('');
    expect(authSession.getPendingEmail()).toBe('');
  });
});
