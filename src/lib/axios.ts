import axios from "axios";

// Create an instance of Axios
const httpFetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
httpFetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }

        // Handle custom content types dynamically
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);


httpFetch.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login";
            }
            console.error("API Error:", error.response.data.message || error.message);
        } else {
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default httpFetch;