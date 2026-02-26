import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  // 1. Production URL
  return 'https://siratalquran.com/api';

  // 2. Use EXPO_PUBLIC_APP_URL if defined (from .env)
  if (process.env.EXPO_PUBLIC_APP_URL) {
    return process.env.EXPO_PUBLIC_APP_URL;
  }
  
  // Legacy support for APP_URL if configured
  if (process.env.APP_URL) {
    return process.env.APP_URL;
  }

  // Special handling for Android Emulator
  if (Platform.OS === 'android' && !Constants.isDevice) {
    return 'http://10.0.2.2:8000/api';
  }

  // Get the IP address of the machine running the Expo server
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (localhost && localhost !== '0.0.0.0') {
    console.log('Using local host:', localhost);
    return `http://${localhost}:8000/api`;
  }
  
  // Fallback for iOS Simulator or if host detection fails
  // REPLACE THIS WITH YOUR COMPUTER'S LAN IP IF NEEDED
  // Since we are not sure about the IP, we will use a more generic fallback or localhost for simulator
  // But localhost on Android emulator is 10.0.2.2 which is handled above.
  // For iOS simulator, localhost works.
  if (Platform.OS === 'ios' && !Constants.isDevice) {
    return 'http://localhost:8000/api';
  }

  console.log('Using fallback IP:', `http://192.168.100.40:8000/api`);
  return `http://192.168.100.40:8000/api`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

console.log('API Base URL:', getBaseUrl());

// Add error logging
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error(`Network Error connecting to: ${error.config?.baseURL || error.config?.url}`);
      console.error('Troubleshooting guide:');
      console.error('1. Ensure backend is running: php artisan serve --host=0.0.0.0 --port=8000');
      console.error('2. Ensure device is on same Wi-Fi as PC');
      console.error('3. Check Windows Firewall: Allow port 8000 (Inbound)');
      console.error(`   Current target IP: ${getBaseUrl()}`);
    }
    return Promise.reject(error);
  }
);

// Attach token if available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
