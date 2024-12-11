import axios from "axios";

const apiClient = axios.create({ baseURL: "/api" });

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401 && error.response.data.message === "jwt expired") {
            // Refresh token logic
            const { data } = await axios.post("/refresh-token", { refreshToken: localStorage.getItem("refreshToken") });
            localStorage.setItem("accessToken", data.accessToken);
            error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
            return axios(error.config); // Retry the failed request
        }
        return Promise.reject(error);
    }
);

export default apiClient;
