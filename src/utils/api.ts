import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// Define a custom request config type that extends Axios' internal config
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    externalControllers?: AbortController[];
    cleanup?: () => void;
    timeoutController?: AbortController;
    timeout?: number; // Optional user-defined timeout
}

// Create Axios instance
const Api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true, // Allow sending cookies
    headers: { "Content-Type": "application/json", },
});

// Function to create a timeout signal with optional external controllers
const createTimeoutSignal = (timeout: number = 5000, externalControllers: AbortController[] = []) => {
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort("timeout"), timeout);

    return {
        signal: externalControllers.length
            ? AbortSignal.any([timeoutController.signal, ...externalControllers.map(ctrl => ctrl.signal)])
            : timeoutController.signal, // Use timeout signal if no external controllers
        cleanup: () => clearTimeout(timeoutId),
        timeoutController
    };
};

// Request Interceptor (Attach signals)
Api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const customConfig = config as CustomAxiosRequestConfig;

        const externalControllers = customConfig.externalControllers || [];

        const { signal, cleanup, timeoutController } = createTimeoutSignal(customConfig.timeout ?? 5000, externalControllers);

        customConfig.signal = signal;
        customConfig.cleanup = cleanup;
        customConfig.timeoutController = timeoutController;

        return customConfig;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Handle errors & cleanup)
Api.interceptors.response.use(
    (response: AxiosResponse) => {
        (response.config as CustomAxiosRequestConfig).cleanup?.(); // Cleanup timeout
        return response.data;
    },
    (error) => {
        (error.config as CustomAxiosRequestConfig)?.cleanup?.(); // Cleanup timeout

        let message = "An error occurred. Please try again.";

        if (axios.isCancel(error)) {
            message = error.message === "timeout" ? "Request timed out. Please try again." : "Request was cancelled.";
        } else if (error.response) {
            message = error.response.data?.message || `Error: ${error.response.status}`;
        } else if (error.request) {
            message = "No response from server. Please check your internet connection.";
        } else {
            message = error.message;
        }

        console.error("API Error:", message);
        return Promise.reject(new Error(message));
    }
);

export default Api;
