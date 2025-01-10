import { retrieveCredential } from "@/utils";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.31:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    // retrieve credentials
    const credentials = await retrieveCredential("token");

    if (credentials) {
      // attach the token as a cookie if it exists
      if (config.headers) {
        config.headers["Cookie"] = `translation-app-backend=${credentials}`;
      }
      config.withCredentials = true;
    }
  } catch (error) {
    console.error("Error attaching credentials:", error);
  }
  return config;
});

export default api;
