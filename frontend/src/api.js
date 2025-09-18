// src/api.js
import axios from "axios";

// Base URL from Vite env
const BASE_URL = import.meta.env.VITE_API_URL;

// Create Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Set/remove JWT token for all requests
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

export default api;
