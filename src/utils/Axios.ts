import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// Define a custom request config type that extends Axios' internal config
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    externalControllers?: AbortController[];
    cleanup?: () => void;
    timeoutController?: AbortController;
    timeout?: number; // Optional user-defined timeout
}

// map status codes to messages
const statusMessages: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
};

// Create Axios instance
const Axios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // Allow sending cookies
    headers: { "Content-Type": "application/json", },
});

// // Function to create a timeout signal with optional external controllers
// const createTimeoutSignal = (timeout: number = 10000, externalControllers: AbortController[] = []) => {
//     const timeoutController = new AbortController();
//     const timeoutId = setTimeout(() => timeoutController.abort("timeout"), timeout);

//     // If no external controllers, return simple timeout setup
//     if (externalControllers.length === 0) {
//         return {
//             signal: timeoutController.signal,
//             cleanup: () => clearTimeout(timeoutId),
//             timeoutController
//         };
//     }

//     // Combine signals using custom implementation
//     const compositeController = new AbortController();
//     const signals = [timeoutController.signal, ...externalControllers.map(ctrl => ctrl.signal)];
//     const listeners: (() => void)[] = [];

//     // Handle each signal
//     signals.forEach(signal => {
//         if (signal.aborted) {
//             // If already aborted, propagate immediately
//             compositeController.abort(signal.reason);
//         } else {
//             const handleAbort = () => {
//                 compositeController.abort(signal.reason);
//             };
//             signal.addEventListener('abort', handleAbort);
//             listeners.push(() => signal.removeEventListener('abort', handleAbort));
//         }
//     });

//     const cleanupAll = () => {
//         clearTimeout(timeoutId);
//         listeners.forEach(cleanup => cleanup());
//     };

//     return {
//         signal: compositeController.signal,
//         cleanup: cleanupAll,
//         timeoutController
//     };
// };

// // Request Interceptor (Attach signals)
// Axios.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const customConfig = config as CustomAxiosRequestConfig;
//         const externalControllers = customConfig.externalControllers || [];
//         const { signal, cleanup, timeoutController } = createTimeoutSignal(customConfig.timeout ?? 10000, externalControllers);

//         customConfig.signal = signal;
//         customConfig.cleanup = cleanup;
//         customConfig.timeoutController = timeoutController;

//         return customConfig;
//     },
//     (error) => Promise.reject(error)
// );

// Response Interceptor (Handle errors & cleanup)
Axios.interceptors.response.use(
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
            message = error.response.data?.message || statusMessages[error.response.status];
        } else if (error.request) {
            message = "No response from server. Please check your internet connection.";
        } else {
            message = error.message;
        }
        return Promise.reject(new Error(message));
    }
);

export default Axios;