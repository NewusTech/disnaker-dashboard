/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useRefreshToken } from "./useRefreshToken";
import { axiosPrivateInstance } from "../utils/axios";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err?.config;
        if (err?.response?.status === 403 && !originalRequest.sent) {
          originalRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            setAccessToken(newAccessToken);
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivateInstance(originalRequest);
          } catch (refreshError) {
            // Jika refresh token gagal, hapus accessToken dari localStorage
            setAccessToken("");
            console.log("Token kadaluarsa, hapus dari localStorage.");
            return Promise.reject(refreshError);
          }
        } else if (err?.response?.status === 401) {
          // Jika status 401 (Unauthorized), hapus accessToken
          setAccessToken("");
          console.log("Unauthorized, hapus accessToken.");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;
