import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { authSession } from '@/services/authSession';
import LoginPage, { validateLoginEmail } from './page';
import { requestPin } from '@/services/authApi';

vi.mock('@/services/authApi', () => ({
  requestPin: vi.fn(),
}));

const renderLogin = () =>
  render(
    <MemoryRouter initialEntries={['/auth/login']}>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/login-pin" element={<div>Tela de PIN</div>} />
        <Route path="/funil-projetos" element={<div>Funil de Projetos</div>} />
      </Routes>
    </MemoryRouter>,
  );

const createDeferred = () => {
  let resolve;
  let reject;

  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
};

describe('LoginPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders only the email login form and PIN action', () => {
    renderLogin();

    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /solicitar pin/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/senha/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/lembrar de mim/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/esqueceu a senha/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cadastrar/i)).not.toBeInTheDocument();
  });

  it('validates email format before calling the API', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/^email$/i), 'email-invalido');
    await user.click(screen.getByRole('button', { name: /solicitar pin/i }));

    expect(await screen.findByText('Informe um email valido.')).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toHaveAttribute('aria-invalid', 'true');
    expect(requestPin).not.toHaveBeenCalled();
  });

  it('shows loading and blocks repeated submit while requesting the PIN', async () => {
    const user = userEvent.setup();
    const deferred = createDeferred();
    requestPin.mockReturnValue(deferred.promise);
    renderLogin();

    await user.type(screen.getByLabelText(/^email$/i), 'usuario@milatec.com');
    await user.click(screen.getByRole('button', { name: /solicitar pin/i }));

    expect(screen.getByRole('button', { name: /solicitando pin/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /solicitando pin/i }));
    expect(requestPin).toHaveBeenCalledTimes(1);

    deferred.resolve({ message: 'PIN enviado para o e-mail.' });
    expect(await screen.findByText('Tela de PIN')).toBeInTheDocument();
  });

  it('shows the backend inactive email error exactly', async () => {
    const user = userEvent.setup();
    requestPin.mockRejectedValue(new Error('Email nao cadastrado ou inativo'));
    renderLogin();

    await user.type(screen.getByLabelText(/^email$/i), 'inativo@milatec.com');
    await user.click(screen.getByRole('button', { name: /solicitar pin/i }));

    expect(await screen.findByText('Email nao cadastrado ou inativo')).toBeInTheDocument();
    expect(authSession.getPendingEmail()).toBe('');
  });

  it('stores pending email and navigates to PIN screen after successful request', async () => {
    const user = userEvent.setup();
    requestPin.mockResolvedValue({ message: 'PIN enviado para o e-mail.' });
    renderLogin();

    await user.type(screen.getByLabelText(/^email$/i), ' usuario@milatec.com ');
    await user.click(screen.getByRole('button', { name: /solicitar pin/i }));

    expect(requestPin).toHaveBeenCalledWith('usuario@milatec.com');
    expect(await screen.findByText('Tela de PIN')).toBeInTheDocument();
    expect(authSession.getPendingEmail()).toBe('usuario@milatec.com');
  });

  it('redirects authenticated users to the funil de projetos', async () => {
    authSession.setToken('jwt-token');

    renderLogin();

    expect(await screen.findByText('Funil de Projetos')).toBeInTheDocument();
  });
});

describe('validateLoginEmail', () => {
  it('returns local validation messages for blank and invalid email', () => {
    expect(validateLoginEmail('')).toBe('Informe seu email.');
    expect(validateLoginEmail('sem-arroba')).toBe('Informe um email valido.');
    expect(validateLoginEmail('usuario@milatec.com')).toBe('');
  });
});
