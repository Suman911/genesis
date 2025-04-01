import { MdOutlineFiberNew } from "react-icons/md";

export function NewIcon({ className = "" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <MdOutlineFiberNew className="animate-color-change" />
            <style>
                {`
                @keyframes color-change {
                    0% { color: #3b82f6; }  /* Blue */
                    25% { color: #10b981; } /* Green */
                    50% { color: #f59e0b; } /* Orange */
                    75% { color: #ef4444; } /* Red */
                    100% { color: #3b82f6; } /* Back to Blue */
                }
                .animate-color-change {
                    animation: color-change 1.5s infinite alternate ease-in-out;
                }
                `}
            </style>
        </div>
    );
}
