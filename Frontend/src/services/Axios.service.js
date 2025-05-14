import axios from "axios";
import { doLoginStorage, getAccessToken, getRefreshToken } from "../helper/Auth";

export const publicApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const privateApi = axios.create({
  baseURL: "http://localhost:8000",
});

privateApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await publicApi.post(
            "/auth/refresh",
            null,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          
          doLoginStorage(response.data)
          
          originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
          return privateApi(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);
