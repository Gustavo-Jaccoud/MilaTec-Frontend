import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { AUTH_SESSION_KEYS, authSession } from './authSession.js';

const createMemoryStorage = () => {
  const store = new Map();

  return {
    getItem: key => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
    clear: () => store.clear(),
  };
};

describe('authSession', () => {
  beforeEach(() => {
    globalThis.sessionStorage = createMemoryStorage();
  });

  afterEach(() => {
    delete globalThis.sessionStorage;
  });

  it('stores, reads and removes the JWT token in sessionStorage', () => {
    authSession.setToken(' jwt-token ');

    assert.equal(authSession.getToken(), 'jwt-token');
    assert.equal(sessionStorage.getItem(AUTH_SESSION_KEYS.accessToken), 'jwt-token');

    authSession.clearToken();

    assert.equal(authSession.getToken(), '');
  });

  it('stores, reads and removes the pending email in sessionStorage', () => {
    authSession.setPendingEmail(' user@milatec.com ');

    assert.equal(authSession.getPendingEmail(), 'user@milatec.com');
    assert.equal(sessionStorage.getItem(AUTH_SESSION_KEYS.pendingEmail), 'user@milatec.com');

    authSession.clearPendingEmail();

    assert.equal(authSession.getPendingEmail(), '');
  });

  it('clears only MilaTec auth session keys', () => {
    sessionStorage.setItem('unrelated:key', 'keep');
    authSession.setToken('jwt-token');
    authSession.setPendingEmail('user@milatec.com');
    authSession.setUserEmail('user@milatec.com');

    authSession.clear();

    assert.equal(authSession.getToken(), '');
    assert.equal(authSession.getPendingEmail(), '');
    assert.equal(authSession.getUserEmail(), '');
    assert.equal(sessionStorage.getItem('unrelated:key'), 'keep');
  });

  it('stores, reads and removes the session user email in sessionStorage', () => {
    authSession.setUserEmail(' maria@milatec.com ');

    assert.equal(authSession.getUserEmail(), 'maria@milatec.com');
    assert.equal(sessionStorage.getItem(AUTH_SESSION_KEYS.userEmail), 'maria@milatec.com');

    authSession.clearUserEmail();

    assert.equal(authSession.getUserEmail(), '');
  });

  it('removes values when empty input is provided', () => {
    authSession.setToken('jwt-token');
    authSession.setPendingEmail('user@milatec.com');
    authSession.setUserEmail('user@milatec.com');

    authSession.setToken('');
    authSession.setPendingEmail(null);
    authSession.setUserEmail('');

    assert.equal(authSession.getToken(), '');
    assert.equal(authSession.getPendingEmail(), '');
    assert.equal(authSession.getUserEmail(), '');
  });
});
