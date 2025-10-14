import { useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const ErrorAlert = ({ message, onClose }: { message: string, onClose: () => void }) => {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed top-6 right-6 z-50 max-w-sm animate-slide-in">
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-2xl shadow-lg flex items-start gap-3">
                <div className="flex-1">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-red-500 hover:text-red-700 transition-colors"
                >
                    <IoCloseCircleOutline size={22} />
                </button>
            </div>
        </div>
    );
};

export default ErrorAlert;
