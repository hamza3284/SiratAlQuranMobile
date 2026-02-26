import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const isWeb = Platform.OS === 'web';

export const saveAuth = async (token, user) => {
  if (!token || !user) {
    console.warn('[saveAuth] Missing token or user', { token: !!token, user: !!user });
    return;
  }

  if (isWeb) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Local storage unavailable:', e);
    }
  } else {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('SecureStore save failed:', e);
    }
  }
};

export const getAuth = async () => {
  if (isWeb) {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const user = localStorage.getItem(USER_KEY);
      return {
        token,
        user: user ? JSON.parse(user) : null,
      };
    } catch (e) {
      console.error('Local storage unavailable:', e);
      return { token: null, user: null };
    }
  } else {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const user = await SecureStore.getItemAsync(USER_KEY);
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  }
};

export const clearAuth = async () => {
  if (isWeb) {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Local storage unavailable:', e);
    }
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  }
};

// Keep existing exports for backward compatibility if any files use them
export const getToken = async () => {
  const { token } = await getAuth();
  return token;
};

export const setToken = async (token) => {
  if (isWeb) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (e) {
      console.error('SecureStore unavailable:', e);
    }
  }
};

export const removeToken = async () => {
  if (isWeb) {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (e) {
      console.error('SecureStore unavailable:', e);
    }
  }
};
