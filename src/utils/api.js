import axios from "axios";
import { requestAiConsent } from "./aiConsent";
import {
  getCurrentUser,
  getRefreshToken,
  saveAuthToken,
  saveRefreshToken,
  clearTokens,
} from "./auth";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_ROOT}/api/v1/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const modifiedConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      return modifiedConfig;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 428 &&
      error.response.data?.code === "ai_consent_required" &&
      !originalRequest.consentRetried
    ) {
      originalRequest.consentRetried = true;
      const account = getCurrentUser()?.email;
      if (await requestAiConsent(error.response.data.policy, account)) {
        if (getCurrentUser()?.email === account) return api(originalRequest);
      }
      return Promise.reject(error);
    }

    // Prevent infinite loops if refresh fails
    if (originalRequest.url.includes("auth/")) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest.hasRetried
    ) {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        clearTokens();
        window.location.href = "/sign_in";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest.hasRetried = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_ROOT}/api/v1/auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        saveAuthToken(data.token);
        if (data.refresh_token) {
          saveRefreshToken(data.refresh_token);
        }

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        processQueue(null, data.token);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        window.location.href = "/sign_in";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("API GET request failed", error.response?.status);
    throw error;
  }
};

const post = async (url, data, headers = {}) => {
  try {
    const response = await api.post(url, data, headers);
    return response.data;
  } catch (error) {
    console.error("API POST request failed", error.response?.status);
    throw error;
  }
};

const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error("API PUT request failed", error.response?.status);
    throw error;
  }
};

const remove = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("API DELETE request failed", error.response?.status);
    throw error;
  }
};

export { get, post, put, remove };
