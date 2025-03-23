import axios, { AxiosError, AxiosResponse } from "axios";

// Get the base URL from environment variables if available, otherwise use default
axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Create an axios instance with custom configuration
const ApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    // Enable sending cookies for cross-site requests
    withCredentials: true,
    // Timeout after 30 seconds
    timeout: 30000
});

// Response interceptor for global error handling
ApiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle specific error cases
        if (error.response) {
            const { status } = error.response;
            
            switch (status) {
                case 401:
                    console.error("Unauthorized request. Please log in again.");
                    // Could redirect to login page or clear auth state here
                    break;
                case 403:
                    console.error("Forbidden request. You don't have permission.");
                    break;
                case 404:
                    console.error("Resource not found.");
                    break;
                case 500:
                    console.error("Server error. Please try again later.");
                    break;
                default:
                    console.error(`Request failed with status: ${status}`);
            }
        } else if (error.request) {
            // The request was made no response received
            console.error("No response received from server.");
        } else {
            // Something happened in setting up request
            console.error("Error in request setup:", error.message);
        }
        
        // Pass the error along to be handled by the component
        return Promise.reject(error);
    }
);

// API routes object matching backend routes
export const API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER_EMPLOYER: '/auth/registerEmployer',
        REGISTER_EMPLOYEE: '/auth/registerEmployee'
    },
    JOBS: {
        GET_JOBS: '/jobs/getJobs',
        POST_JOB: '/jobs/postJobs',
        EDIT_JOB: '/jobs',
        DELETE_JOB: '/jobs'
    },
    USER: {
        GET_USER_INFO: '/userInfo',
        EDIT_USER: '/editUser'
    }
};

export default ApiClient;

