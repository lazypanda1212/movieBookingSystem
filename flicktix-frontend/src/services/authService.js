import axios from 'axios';

const API_BASE = 'http://localhost:8080/api'; // adjust as needed

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_BASE}/auth/signup`, userData);
  return response.data;
}