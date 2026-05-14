import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/useAuthContext';
import { authSession } from '@/services/authSession';
import LoginPinPage, { PIN_LENGTH, RESEND_COOLDOWN_SECONDS } from './page';
import { requestPin, verifyPin } from '@/services/authApi';

vi.mock('@/services/authApi', () => ({
  requestPin: vi.fn(),
  verifyPin: vi.fn(),
}));

const PENDING_EMAIL = 'usuario@milatec.com';

const renderPin = () =>
  render(
    <MemoryRouter initialEntries={['/auth/login-pin']}>
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<div>Tela de Login</div>} />
          <Route path="/auth/login-pin" element={<LoginPinPage />} />
          <Route path="/funil-projetos" element={<div>Funil de Projetos</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );

const getInputs = () =>
  Array.from({ length: PIN_LENGTH }, (_, index) =>
    screen.getByLabelText(new RegExp(`Digito ${index + 1} do PIN`, 'i')),
  );

const createDeferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

describe('LoginPinPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    authSession.setPendingEmail(PENDING_EMAIL);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    sessionStorage.clear();
  });

  it('renders 4 numeric fields and shows the pending email without phone text', () => {
    renderPin();

    expect(getInputs()).toHaveLength(4);
    expect(screen.getByText(PENDING_EMAIL)).toBeInTheDocument();
    expect(screen.queryByText(/telefone|numero|number|\+ \(/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar novamente/i })).toBeInTheDocument();
  });

  it('redirects to login when there is no pending email', async () => {
    authSession.clearPendingEmail();
    renderPin();
    expect(await screen.findByText('Tela de Login')).toBeInTheDocument();
  });

  it('redirects to funil de projetos when there is already a token', async () => {
    authSession.setToken('existing-token');
    renderPin();
    expect(await screen.findByText('Funil de Projetos')).toBeInTheDocument();
  });

  it('accepts only digits and advances focus while typing', async () => {
    const user = userEvent.setup();
    renderPin();
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard('1');
    await user.keyboard('a');
    await user.keyboard('2');
    await user.keyboard('3');
    await user.keyboard('4');

    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
  });

  it('fills all fields when pasting a 4 digit PIN', async () => {
    const user = userEvent.setup();
    renderPin();
    const inputs = getInputs();

    inputs[0].focus();
    await user.paste('1234');

    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
  });

  it('moves focus and clears previous digit on backspace when current is empty', async () => {
    const user = userEvent.setup();
    renderPin();
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard('12');

    expect(inputs[1]).toHaveValue('2');
    await user.keyboard('{Backspace}');
    expect(inputs[1]).toHaveValue('');

    await user.keyboard('{Backspace}');
    expect(inputs[0]).toHaveValue('');
    expect(inputs[0]).toHaveFocus();
  });

  it('blocks submit with incomplete PIN and shows local validation', async () => {
    const user = userEvent.setup();
    renderPin();
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard('12');
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    expect(await screen.findByText(/Informe os 4 digitos do PIN\./i)).toBeInTheDocument();
    expect(verifyPin).not.toHaveBeenCalled();
  });

  it('verifies PIN, stores the JWT and redirects to funil de projetos on success', async () => {
    const user = userEvent.setup();
    verifyPin.mockResolvedValue({ accessToken: 'jwt-token' });
    renderPin();
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard('1234');
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => expect(verifyPin).toHaveBeenCalledWith(PENDING_EMAIL, '1234'));
    expect(await screen.findByText('Funil de Projetos')).toBeInTheDocument();
    expect(authSession.getToken()).toBe('jwt-token');
    expect(authSession.getPendingEmail()).toBe('');
    expect(authSession.getUserEmail()).toBe(PENDING_EMAIL);
  });

  it('shows the backend error message and resets the fields on failure', async () => {
    const user = userEvent.setup();
    verifyPin.mockRejectedValue(new Error('PIN invalido'));
    renderPin();
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard('1234');
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    expect(await screen.findByText('PIN invalido')).toBeInTheDocument();
    inputs.forEach(input => expect(input).toHaveValue(''));
    expect(authSession.getToken()).toBe('');
  });

  it('disables submit while verification is in flight', async () => {
    const user = userEvent.setup();
    const deferred = createDeferred();
    verifyPin.mockReturnValue(deferred.promise);
    renderPin();
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard('1234');
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    expect(screen.getByRole('button', { name: /validando/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /validando/i }));
    expect(verifyPin).toHaveBeenCalledTimes(1);

    deferred.resolve({ accessToken: 'jwt-token' });
    expect(await screen.findByText('Funil de Projetos')).toBeInTheDocument();
    expect(authSession.getUserEmail()).toBe(PENDING_EMAIL);
  });

  it('triggers resend, applies cooldown countdown and re-enables after timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    requestPin.mockResolvedValue({ message: 'PIN enviado' });

    renderPin();

    fireEvent.click(screen.getByRole('button', { name: /enviar novamente/i }));

    await waitFor(() => expect(requestPin).toHaveBeenCalledWith(PENDING_EMAIL));
    expect(
      await screen.findByRole('button', {
        name: new RegExp(`Aguarde ${RESEND_COOLDOWN_SECONDS}s para reenviar`),
      }),
    ).toBeDisabled();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(
      screen.getByRole('button', {
        name: new RegExp(`Aguarde ${RESEND_COOLDOWN_SECONDS - 1}s para reenviar`),
      }),
    ).toBeDisabled();

    await act(async () => {
      vi.advanceTimersByTime(RESEND_COOLDOWN_SECONDS * 1000);
    });
    expect(screen.getByRole('button', { name: /enviar novamente/i })).toBeEnabled();
  });

  it('shows error feedback when resend fails', async () => {
    const user = userEvent.setup();
    requestPin.mockRejectedValue(new Error('Aguarde 1 minuto para reenviar o PIN'));
    renderPin();

    await user.click(screen.getByRole('button', { name: /enviar novamente/i }));

    expect(
      await screen.findByText('Aguarde 1 minuto para reenviar o PIN'),
    ).toBeInTheDocument();
  });
});
