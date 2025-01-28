import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_NEXTROUND_BACKEND, // production
    // baseURL: "http://localhost:5000/api/v1",
    timeout: 5000,
    withCredentials: true,
    withXSRFToken: true
});

// Interceptors
API.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
});
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.success === 403 && 
            !originalRequest._retry &&
            localStorage.getItem("refreshToken")
        ) {
            originalRequest._retry = true;
            try {
                const response = await API.post("/auth/refreshToken", 
                    {
                        refreshToken: localStorage.getItem("refreshToken")
                    }
                )

                const {accessToken, refreshToken} = response.data;

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                return axios(originalRequest);

            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default API;