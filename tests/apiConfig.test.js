import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveApiBaseUrl } from '../services/apiConfig.js';

test('release defaults to the existing HTTPS production API', () => {
  assert.equal(resolveApiBaseUrl(), 'https://siratalquran.com/api');
});

test('a configured staging API overrides the production default', () => {
  assert.equal(resolveApiBaseUrl({
    configuredUrl: ' https://staging.example.com/api/ ',
  }), 'https://staging.example.com/api');
});

test('development uses the Expo LAN host instead of production', () => {
  assert.equal(resolveApiBaseUrl({
    development: true, platform: 'android', hostUri: '192.168.1.12:8081',
  }), 'http://192.168.1.12:8000/api');
});

test('Android emulator maps the loopback host to its host-machine address', () => {
  assert.equal(resolveApiBaseUrl({
    development: true, platform: 'android', hostUri: 'localhost:8081',
  }), 'http://10.0.2.2:8000/api');
});

test('iOS and web development default to the local API', () => {
  for (const platform of ['ios', 'web']) {
    assert.equal(resolveApiBaseUrl({ development: true, platform }), 'http://localhost:8000/api');
  }
});

test('an explicit development API supports a physical device or tunnel', () => {
  assert.equal(resolveApiBaseUrl({
    development: true, configuredUrl: 'http://192.168.1.5:8000/api',
  }), 'http://192.168.1.5:8000/api');
});

test('release rejects cleartext URLs and unsafe URL metadata', () => {
  for (const configuredUrl of [
    'http://example.com/api', 'ftp://example.com/api', 'not a url',
    'https://user:password@example.com/api', 'https://example.com/api?token=secret',
    'https://example.com/api#fragment',
  ]) {
    assert.throws(() => resolveApiBaseUrl({ configuredUrl }));
  }
});

test('IPv6 Expo host is preserved as a valid API host', () => {
  assert.equal(resolveApiBaseUrl({
    development: true, hostUri: '[2001:db8::1]:8081',
  }), 'http://[2001:db8::1]:8000/api');
});

