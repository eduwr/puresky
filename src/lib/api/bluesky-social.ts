import axios from "axios";
import { getSession } from "./dal";
import { cookies } from "next/headers";

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
    if (session && session.accessJwt) {
      config.headers.Authorization = `Bearer ${session.accessJwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type FetchOptions = {
  body: Record<string, any>;
  method: "get" | "post";
  headers: Record<string, string>;
  baseURL: string;
  redirect: boolean;
};
export const fetchBsky = async (
  path: string,
  options: Partial<FetchOptions> = {},
) => {
  options.baseURL ??= SOCIAL_BASE_URL;
  options.method ??= "get";
  options.headers ??= {};
  options.redirect ??= true;

  const session = getSession({ redirect: options.redirect });

  if (session && session.accessJwt) {
    options.headers["Authorization"] = `Bearer ${session.accessJwt}`;
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  } as const;

  const url = `${options.baseURL}/${path}`;
  return fetch(url, {
    body: options.body ? JSON.stringify(options.body) : null,
    method: options.method,
    headers: new Headers(headers),
  });
};
