import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { requestPin, verifyPin } from './authApi.js';

const jsonResponse = (body, init = {}) =>
  new Response(JSON.stringify(body), {
    status: init.status || 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

describe('auth API contract flow', () => {
  beforeEach(() => {
    process.env.VITE_API_BASE_URL = 'http://localhost:3000';
  });

  afterEach(() => {
    delete process.env.VITE_API_BASE_URL;
    delete globalThis.fetch;
  });

  it('keeps request/verify contracts and propagates messages used by screens', async () => {
    const calls = [];

    globalThis.fetch = async (url, options) => {
      calls.push({ url: String(url), body: JSON.parse(options.body) });

      if (String(url).endsWith('/auth/request-pin')) {
        return jsonResponse({
          message: 'PIN enviado para o e-mail.',
          expiresInSeconds: 150,
          resendAvailableInSeconds: 60,
        });
      }

      return jsonResponse({ message: 'Tentativas esgotadas' }, { status: 429 });
    };

    const requestResult = await requestPin('user@milatec.com');

    assert.equal(requestResult.resendAvailableInSeconds, 60);
    await assert.rejects(() => verifyPin('user@milatec.com', '9999'), {
      message: 'Tentativas esgotadas',
      status: 429,
    });
    assert.deepEqual(calls, [
      {
        url: 'http://localhost:3000/auth/request-pin',
        body: { email: 'user@milatec.com' },
      },
      {
        url: 'http://localhost:3000/auth/verify-pin',
        body: { email: 'user@milatec.com', pin: '9999' },
      },
    ]);
  });
});
