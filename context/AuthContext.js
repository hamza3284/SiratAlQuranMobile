import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, saveAuth, clearAuth } from "../utils/storage";
import api, { setAuthToken } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const { token, user } = await getAuth();
      if (token && user) {
        setAuthToken(token);
        setUser(user);
      }
    } catch (e) {
      console.error('Restoring session failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    
    if (!data.token || !data.user) {
      throw new Error('Invalid login response');
    }

    setAuthToken(data.token);
    setUser(data.user);
    await saveAuth(data.token, data.user);
  };

  const signup = async (payload) => {
    // Registration returns a user, not a session. Use the existing login contract.
    await api.post("/register", payload);
    await login(payload.email, payload.password);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}
    await clearAuth();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

