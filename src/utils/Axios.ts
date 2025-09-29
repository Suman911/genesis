import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    GenericAbortSignal,
} from "axios";

type AnyAbortSignal = (AbortSignal | GenericAbortSignal) & { reason: string };

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    externalControllers?: AbortController[];
    cleanup?: () => void;
    timeoutController?: AbortController;
    timeout?: number;
}

const statusMessages: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
};

const Axios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
});

Axios.interceptors.request.use((cfg) => {
    const config = cfg as CustomAxiosRequestConfig;
    const mergedController = new AbortController();

    const attach = (signal?: AnyAbortSignal) => {
        if (!signal) return;
        if (signal.aborted) {
            mergedController.abort(signal.reason);
            return;
        }
        // GenericAbortSignal may not expose addEventListener in older Node types, so optional‑chain
        (signal as AnyAbortSignal).addEventListener?.("abort", () =>
            mergedController.abort(signal.reason)
        );
    };

    attach(config.signal as AnyAbortSignal);

    (config.externalControllers ?? []).forEach((c) =>
        attach(c.signal as AnyAbortSignal)
    );

    const timeout = config.timeout ?? Axios.defaults.timeout;
    if (timeout && timeout > 0) {
        const tCtrl = new AbortController();
        const id = setTimeout(() => tCtrl.abort("timeout"), timeout);
        config.cleanup = () => clearTimeout(id);
        config.timeoutController = tCtrl;
        attach(tCtrl.signal);
    }

    // cast because AbortSignal ⊆ GenericAbortSignal structurally
    config.signal = mergedController.signal as unknown as GenericAbortSignal;
    return config;
});

Axios.interceptors.response.use(
    (response: AxiosResponse) => {
        (response.config as CustomAxiosRequestConfig).cleanup?.();
        return response.data;
    },
    (error) => {
        (error.config as CustomAxiosRequestConfig)?.cleanup?.();

        let message = "An error occurred. Please try again.";
        if (axios.isCancel(error)) {
            message =
                error.message === "timeout"
                    ? "Request timed out. Please try again."
                    : "Request was cancelled.";
        } else if (error.response) {
            message =
                error.response.data?.message || statusMessages[error.response.status];
        } else if (error.request) {
            message =
                "No response from server. Please check your internet connection.";
        } else {
            message = error.message;
        }

        console.error("Axios error:", error.response.data || error.message || error);
        return Promise.reject(new Error(message));
    }
);

export default Axios;