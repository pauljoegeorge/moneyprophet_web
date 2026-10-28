import axios from "axios";
import { trackApiSuccess } from "../analytics/events";
import { installApiSession } from "./apiSession";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_ROOT}/api/v1/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

installApiSession(api);

const get = async (url) => {
  try {
    const response = await api.get(url);
    trackApiSuccess("get", url);
    return response.data;
  } catch (error) {
    console.error("API GET request failed", error.response?.status);
    throw error;
  }
};

const post = async (url, data, headers = {}) => {
  try {
    const response = await api.post(url, data, headers);
    trackApiSuccess("post", url);
    return response.data;
  } catch (error) {
    console.error("API POST request failed", error.response?.status);
    throw error;
  }
};

const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    trackApiSuccess("put", url);
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
