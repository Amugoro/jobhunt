import axios from 'axios';

export const signup = async (data) => {
    try {
        const response = await axios.post('/api/users/register', data);
        return { success: true, user: response.data.user };
    } catch (error) {
        return { success: false, message: error.response.data.message };
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post('/api/users/login', data);
        return { success: true, user: response.data.user };
    } catch (error) {
        return { success: false, message: error.response.data.message };
    }
};
