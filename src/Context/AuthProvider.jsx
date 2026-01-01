import { useState, useEffect, useCallback} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [initialized, setInitialized] = useState(false);


  const initializeAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/refresh-token`, { withCredentials: true, });
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (err) {
      console.log("Refresh token invalid or missing", err);
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    setAccessToken(null);
    setUser(null);
  };

  if (!initialized) return null;

  const value = { user, setUser, accessToken, setAccessToken, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};