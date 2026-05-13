import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { authSession } from '@/services/authSession';
import LogoutPage from './page';

describe('LogoutPage', () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(() => sessionStorage.clear());

  it('clears session storage when mounted', () => {
    authSession.setToken('jwt-token');
    authSession.setPendingEmail('user@milatec.com');

    render(
      <MemoryRouter>
        <LogoutPage />
      </MemoryRouter>,
    );

    expect(authSession.getToken()).toBe('');
    expect(authSession.getPendingEmail()).toBe('');
    expect(screen.getByRole('heading', { name: /voc(e|ê) foi deslogado/i })).toBeInTheDocument();
  });
});
