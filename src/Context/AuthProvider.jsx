import { useState, useEffect} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [initialized, setInitialized] = useState(false);


useEffect(() => {
  const init = async () => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      try {
        const res = await axios.post(`${API_URL}/auth/refresh-token`, { token });
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        if (res.data.refreshToken) localStorage.setItem("refreshToken", res.data.refreshToken);
      } catch (err) {
        console.log("Refresh token invalid or missing", err);
        localStorage.removeItem("refreshToken");
      }
    }
    setInitialized(true);
  };

  init();
}, []);


  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    localStorage.setItem("refreshToken", res.data.refreshToken);
  };

  const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`);
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("refreshToken");
  };

  if (!initialized) return null;

  const value = { user, setUser, accessToken, setAccessToken, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};