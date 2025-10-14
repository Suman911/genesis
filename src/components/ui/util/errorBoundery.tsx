"use client";
import { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps<T = unknown> {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    resetOnChangeKey?: T;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    errorTime: string | null;
    retryCount: number;
}

class ErrorBoundary<T = unknown> extends Component<ErrorBoundaryProps<T>, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps<T>) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorTime: null,
            retryCount: 0,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
            errorInfo: null,
            errorTime: new Date().toLocaleString(),
            retryCount: 0,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        this.props.onError?.(error, errorInfo);
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps<T>) {
        if (
            this.props.resetOnChangeKey !== prevProps.resetOnChangeKey &&
            this.state.hasError
        ) {
            this.setState({
                hasError: false,
                error: null,
                errorInfo: null,
                errorTime: null,
                retryCount: 0,
            });
        }
    }

    handleReload = () => {
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    handleGoBack = () => {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    };

    handleCopyDetails = () => {
        const { error, errorInfo } = this.state;
        const details = `Error: ${error?.name}: ${error?.message}\n${errorInfo?.componentStack ?? ""}`;
        navigator.clipboard.writeText(details);
    };

    handleRetry = () => {
        this.setState((prev) => ({
            hasError: false,
            error: null,
            errorInfo: null,
            errorTime: null,
            retryCount: prev.retryCount + 1,
        }));
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div
                    style={{
                        padding: "2rem",
                        background: "#fff3f3",
                        border: "1px solid #f5c2c7",
                        borderRadius: "8px",
                        color: "#842029",
                        textAlign: "center",
                    }}
                >
                    <h2>Oops, something went wrong.</h2>
                    <p>
                        Please try reloading the page or going back. If the problem persists, contact support.
                    </p>
                    <ul style={{ textAlign: "left", margin: "1rem auto", maxWidth: 500 }}>
                        <li>Check your internet connection.</li>
                        <li>Try clearing your browser cache.</li>
                        <li>If you&apos;re an admin, check the server logs for details.</li>
                    </ul>
                    <div style={{ margin: "1rem 0", fontSize: "0.95em" }}>
                        <strong>Error time:</strong> {this.state.errorTime}
                    </div>
                    {this.state.error && (
                        <details style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
                            <summary>Error details</summary>
                            <div>
                                <strong>{this.state.error.name}:</strong> {this.state.error.message}
                                {this.state.error?.stack && (
                                    <pre
                                        style={{
                                            marginTop: "0.5rem",
                                            fontSize: "0.9em",
                                            color: "#6c757d",
                                        }}
                                    >
                                        {this.state.error.stack}
                                    </pre>
                                )}
                            </div>
                            <button
                                style={{
                                    marginTop: "0.5rem",
                                    padding: "0.3rem 1rem",
                                    background: "#6c757d",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                                onClick={this.handleCopyDetails}
                            >
                                Copy Details
                            </button>
                        </details>
                    )}
                    <div
                        style={{
                            marginTop: "1.5rem",
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            style={{
                                padding: "0.5rem 1.5rem",
                                background: "#d63384",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={this.handleReload}
                        >
                            Reload Page
                        </button>
                        <button
                            style={{
                                padding: "0.5rem 1.5rem",
                                background: "#198754",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={this.handleGoBack}
                        >
                            Go Back
                        </button>
                        <button
                            style={{
                                padding: "0.5rem 1.5rem",
                                background: "#0d6efd",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={this.handleRetry}
                        >
                            Retry
                        </button>
                    </div>
                    <div style={{ marginTop: "1rem", fontSize: "0.9em", color: "#6c757d" }}>
                        Retry attempts: {this.state.retryCount}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
