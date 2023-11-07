import axios from "axios";
import { OAuthCredential, OAuthUrl, Perfil } from "./types";

export type { OAuthCredential, OAuthUrl };

export const TOKEN_KEY = "token";

const BASE_URL = process.env.REACT_APP_API_URL;

export const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.response.use((response) => {
  return response;
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

export const getGoogleAuthLink = async () => {
  const response = await client.get<OAuthUrl>("/auth/o/google-oauth2/", {
    params: {
      redirect_uri: process.env.REACT_APP_URL,
    },
    withCredentials: true,
  });
  return response.data;
};

export const getGoogleAuthToken = async (credential: OAuthCredential) => {
  const response = await client.post("/auth/o/google-oauth2/", credential, {
    headers: { "content-type": "application/x-www-form-urlencoded" },
    withCredentials: true,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await client.get<Perfil>("/auth/users/me/");
  return response.data;
};