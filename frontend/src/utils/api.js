import axios from 'axios';

const API_URL = 'https://jobhunt-b23g.onrender.com/api/auth';

export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || 'Signup failed' };
  }
};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || 'Login failed' };
  }
};

export const forgotPassword = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, formData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Forgot Password failed" };
  }
};