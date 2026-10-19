import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { resolveApiBaseUrl } from './apiConfig';

const api = axios.create({
  baseURL: resolveApiBaseUrl({
    configuredUrl: process.env.EXPO_PUBLIC_APP_URL,
    development: typeof __DEV__ !== 'undefined' && __DEV__,
    platform: Platform.OS,
    hostUri: Constants.expoConfig?.hostUri,
  }),
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;

