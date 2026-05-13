import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { AuthApiError, requestPin, verifyPin } from './authApi.js';

const jsonResponse = (body, init = {}) =>
  new Response(JSON.stringify(body), {
    status: init.status || 200,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

const mockFetch = handler => {
  const calls = [];

  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), options });
    return handler(url, options, calls.length);
  };

  return calls;
};

describe('authApi', () => {
  beforeEach(() => {
    process.env.VITE_API_BASE_URL = 'http://localhost:3000/';
  });

  afterEach(() => {
    delete process.env.VITE_API_BASE_URL;
    delete globalThis.fetch;
  });

  it('requestPin calls the configured API URL with email payload', async () => {
    const calls = mockFetch(() =>
      jsonResponse({
        message: 'PIN enviado para o e-mail.',
        expiresInSeconds: 150,
        resendAvailableInSeconds: 60,
      }),
    );

    const result = await requestPin('user@milatec.com');

    assert.equal(calls[0].url, 'http://localhost:3000/auth/request-pin');
    assert.equal(calls[0].options.method, 'POST');
    assert.equal(calls[0].options.headers.Accept, 'application/json');
    assert.equal(calls[0].options.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(calls[0].options.body), {
      email: 'user@milatec.com',
    });
    assert.equal(result.expiresInSeconds, 150);
  });

  it('verifyPin calls the configured API URL with email and pin payload', async () => {
    const calls = mockFetch(() =>
      jsonResponse({
        accessToken: 'jwt-token',
      }),
    );

    const result = await verifyPin('user@milatec.com', '1234');

    assert.equal(calls[0].url, 'http://localhost:3000/auth/verify-pin');
    assert.deepEqual(JSON.parse(calls[0].options.body), {
      email: 'user@milatec.com',
      pin: '1234',
    });
    assert.equal(result.accessToken, 'jwt-token');
  });

  it('uses relative URLs when VITE_API_BASE_URL is not configured', async () => {
    delete process.env.VITE_API_BASE_URL;
    const calls = mockFetch(() => jsonResponse({ message: 'ok' }));

    await requestPin('user@milatec.com');

    assert.equal(calls[0].url, '/auth/request-pin');
  });

  it('preserves backend error messages', async () => {
    mockFetch(() =>
      jsonResponse(
        {
          message: 'PIN invalido',
        },
        { status: 401 },
      ),
    );

    await assert.rejects(() => verifyPin('user@milatec.com', '0000'), error => {
      assert.ok(error instanceof AuthApiError);
      assert.equal(error.message, 'PIN invalido');
      assert.equal(error.status, 401);
      assert.deepEqual(error.data, { message: 'PIN invalido' });
      return true;
    });
  });

  it('joins backend validation message arrays', async () => {
    mockFetch(() =>
      jsonResponse(
        {
          message: ['email must be an email', 'pin must match /^\\d{4}$/'],
        },
        { status: 400 },
      ),
    );

    await assert.rejects(() => verifyPin('invalid', '12'), {
      message: 'email must be an email, pin must match /^\\d{4}$/',
      status: 400,
    });
  });
});
