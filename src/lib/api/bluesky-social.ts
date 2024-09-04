import axios from "axios";
import { getSession } from "./dal";

const SOCIAL_BASE_URL = "https://bsky.social/xrpc";
export const blueSkySocialAPI = axios.create({
  baseURL: SOCIAL_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

blueSkySocialAPI.interceptors.request.use(
  (config) => {
    const session = getSession();

    // TODO: test accessing a route without the cookies
    if (session.accessJwt) {
      config.headers.Authorization = `Bearer ${session.accessJwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
