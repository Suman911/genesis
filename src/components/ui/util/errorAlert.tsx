import { useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const ErrorAlert = ({ message, onClose }: { message: string, onClose: () => void }) => {

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [message, onclose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-red-700 hover:text-red-900 font-bold"
      >
        <IoCloseCircleOutline />
      </button>
    </div>
  );
}

export default ErrorAlert;