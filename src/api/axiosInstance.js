import axios from "axios";
import { useAuth } from "../Context/useAuth";
import { useMemo } from "react";

const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let subscribers = [];

function onRefreshed(token) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

function addSubscriber(cb) {
  subscribers.push(cb);
}

export const useAxios = () => {
  const { accessToken, setAccessToken, setUser, logout } = useAuth();

  const instance = useMemo(() => {
    const axiosInstance = axios.create({ baseURL: API_URL, withCredentials: true, });

    axiosInstance.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalReq = err.config;

        if (err.response?.status === 401 && !originalReq._retry) {
          originalReq._retry = true;

          if (isRefreshing) {
            return new Promise((resolve) => {
              addSubscriber((token) => {
                originalReq.headers.Authorization = `Bearer ${token}`;
                resolve(axiosInstance(originalReq));
              });
            });
          }

          isRefreshing = true;

          try {
            const res = await axiosInstance.get('/auth/refresh-token', { withCredentials: true } );
            setAccessToken(res.data.accessToken);
            setUser(res.data.user);
            onRefreshed(res.data.accessToken);
            originalReq.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return axiosInstance(originalReq);
          } catch (e) {
            logout();
            return Promise.reject(e);
          } finally {
            isRefreshing = false;
          }
        }
        return Promise.reject(err);
      }
    );

    return axiosInstance;
  }, [accessToken, setAccessToken, setUser, logout]);

  return instance;
};
