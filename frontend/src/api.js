// src/api.js
import axios from "axios";

// Browser-safe way to read env variables
const BASE_URL = import.meta.env.VITE_API_URL;

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Set/remove JWT token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Auth APIs
export const signupUser = (data) => api.post("/auth/signup", data);
export const loginUser = (data) => api.post("/auth/login", data);

// Notes APIs
export const getNotes = () => api.get("/notes");
export const addNote = (data) => api.post("/notes", data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);

export default api;
