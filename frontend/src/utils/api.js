import axios from 'axios';


const API_URL = 'https://jobhunt-server-iota.vercel.app/api';


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
    if (response.data.success) {
      // Store both tokens
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      console.log("Token received by verify function:", response.data.refreshToken);
    }
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Login failed" };
  }
};



// API to refresh token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post('/api/auth/refresh-token', {
      refreshToken: refreshToken
    });

    if (response.data.success) {
      const newAccessToken = response.data.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } else {
      console.error('Failed to refresh token: ', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    if (error.response) {
      // If it's a server error, log it
      console.error('Server error:', error.response.data);
    }
 
    return null;
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
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/freelancer/profile`, formData, {
      headers: {
        // 'content-type': 'multipart/form-data',
        // 'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error creating profile" };
  }
}

// added api to update trade person profile
export const createOrUpdateTradePersonProfile = async (formData) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/tradepersons/profile`, formData, {
      headers: {
        // 'content-type': 'multipart/form-data',
        // 'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error creating profile" };
  }
}

// added api for clients to post jobs
export const clientPostJob = async (formData) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/jobs/post`, formData, {
      headers: {
        // 'content-type': 'multipart/form-data',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error posting job" };
  }
}

// added api for client to get profiles
export const getClientProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/client/profiles`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting profile" };
  }
}

// added api for client to send invation as a client
export const clientSendInvitation = async (formData) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/client/send-invitation`, formData, {
      headers: {
        // 'content-type': 'multipart/form-data',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting profile" };
  }
}

// added api for client to get download resume
export const downloadResume = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/client/download-resume/${id}`, {
      headers: {
        // 'content-type': 'multipart/form-data',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
        responseType: 'blob',
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting profile" };
  }
}

// added api to get trade person profile
export const getTradePersonProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/tradepersons/profile`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting profile" };
  }
}

// added api to get trade person profile
export const getFreelancerProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/freelancer/profile`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting profile" };
  }
}

// added api to get trade person invitations
export const fetchPersonInvitations = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/jobs/invitations`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting invitations" };
  }
}

// added api to get trade person invitations
export const getUserData = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/user/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting user data" };
  }
}

// added api to get all jobs
export const fetchAllJobs = async (params) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/jobs`, {
      params,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Error getting jobs" };
  }
}
// to fetch applied job
export const fetchApplications = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No token found, user is not authenticated');
    return { success: false, jobs: [], message: 'No token found' };
  }

  try {
    const response = await axios.get(`${API_URL}/jobs/applied`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    if (error.response) {
      return { success: false, jobs: [], message: error.response.data.message || 'Failed to fetch applications' };
    } else {
      return { success: false, jobs: [], message: 'Unknown error' };
    }
  }
};
