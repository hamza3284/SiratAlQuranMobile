export function resolveApiBaseUrl({
  configuredUrl,
  development = false,
  platform = 'web',
  hostUri,
} = {}) {
  if (configuredUrl?.trim()) {
    const value = configuredUrl.trim().replace(/\/+$/, '');
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error('EXPO_PUBLIC_APP_URL must be a full API URL, including /api.');
    }
    if (!['http:', 'https:'].includes(url.protocol) || (!development && url.protocol !== 'https:')) {
      throw new Error('Use HTTPS for the production API URL.');
    }
    if (url.username || url.password || url.search || url.hash) {
      throw new Error('The API URL must not contain credentials, a query or a fragment.');
    }
    return value;
  }

  if (!development) return 'https://siratalquran.com/api';

  let hostname;
  if (hostUri) {
    try {
      hostname = new URL(`http://${hostUri}`).hostname;
    } catch {
      throw new Error('Cannot resolve Expo host. Set EXPO_PUBLIC_APP_URL to your development API URL.');
    }
  }

  if (!hostname || ['localhost', '127.0.0.1', '[::1]'].includes(hostname)) {
    hostname = platform === 'android' ? '10.0.2.2' : 'localhost';
  }
  return `http://${hostname}:8000/api`;
}

