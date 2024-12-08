/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

interface RefreshQueueItem {
  resolve: (value: void | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
const refreshQueue: RefreshQueueItem[] = [];

const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api/v1",
  withCredentials: true,
});

const handleTokenError = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.href = "/login";
};

const handleQueue = (error?: any) => {
  while (refreshQueue.length) {
    const { resolve, reject } = refreshQueue.shift()!;
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  }
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401) {
      // If request is unauthorized and hasn't been retried
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        // Start refreshing process if not already doing so
        if (!isRefreshing) {
          isRefreshing = true;
          const refreshToken = Cookies.get("refreshToken");

          // If no refresh token available, handle token error immediately
          if (!refreshToken) {
            handleTokenError();
            return Promise.reject(error);
          }

          try {
            // Attempt to refresh token
            const response = await api.post("/auth/refresh", { refreshToken });
            console.log(response, "DSf");
            const newAccessToken = response.data.accessToken;

            // Update cookies and retry original request
            Cookies.set("accessToken", newAccessToken);
            handleQueue();
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError: any) {
            handleQueue(refreshError); // Reject all queued requests with the refresh error
            handleTokenError(); // Handle token error by redirecting to login
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
      } else {
        // Queue other requests while refreshing is in progress
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest)) // Retry the original request after token refresh
          .catch((queueError) => {
            handleTokenError(); // If queue fails, handle token error
            return Promise.reject(queueError);
          });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
