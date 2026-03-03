import { useEffect } from "react";
import { IoCheckmarkCircleOutline, IoClose } from "react-icons/io5";
import Portal from "./portal";

type SuccessAlertProps = {
    message: string;
    onClose: () => void;
    open: boolean;
    duration?: number;
};

const SuccessAlert = ({
    message,
    onClose,
    open,
    duration = 5000,
}: SuccessAlertProps) => {
    useEffect(() => {
        if (!open) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [open, duration, onClose]);

    if (!open) return null;

    return (
        <Portal open={open}>
            <div className="w-full max-w-sm px-4">
                <div
                    role="alert"
                    aria-live="assertive"
                    className="group relative overflow-hidden rounded-2xl 
                                bg-white/80 backdrop-blur-md 
                                border border-emerald-200 
                                shadow-xl shadow-emerald-100
                                p-4 flex items-start gap-3
                                animate-[slideIn_0.35s_ease-out]"
                >
                    {/* Left Icon */}
                    <div className="pt-1 text-emerald-600">
                        <IoCheckmarkCircleOutline size={26} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <p className="font-semibold text-emerald-700">
                            Success
                        </p>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-400 
                                    hover:bg-gray-100 
                                    hover:text-gray-600 
                                    transition-all duration-200"
                    >
                        <IoClose size={18} />
                    </button>

                    {/* Bottom Progress Bar */}
                    <div
                        className="absolute bottom-0 left-0 h-1 bg-emerald-500 
                                    animate-[progress_linear_forwards]"
                        style={{ animationDuration: `${duration}ms` }}
                    />
                </div>
            </div>
        </Portal>
    );
};

export default SuccessAlert;