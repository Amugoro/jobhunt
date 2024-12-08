import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, formData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || 'Signup failed' };
  }
};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, formData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || 'Login failed' };
  }
};

export const forgotPassword = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, formData);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Forgot Password failed" };
  }
};

export const createOrUpdateFreelancerProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/freelancer/profile`, formData, {
      headers: {
        // 'content-type': 'multipart/form-data',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error creating profile" };
  }
}