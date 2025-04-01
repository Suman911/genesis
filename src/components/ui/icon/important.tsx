import { PiTriangleFill } from "react-icons/pi";
import { PiExclamationMarkBold } from "react-icons/pi";

export function ImportantIcon({ className = "" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <PiTriangleFill className="text-yellow-400" />
            <PiExclamationMarkBold
                className="absolute text-red-600 animate-aggressive-vibrate"
                style={{ fontSize: "0.7em" }}
            />
            <style>
                {`
                @keyframes aggressive-vibrate {
                    0% { transform: rotate(-15deg) scale(1); }
                    30% { transform: rotate(12deg) scale(1.05); }
                    60% { transform: rotate(-10deg) scale(1.1); }
                    100% { transform: rotate(8deg) scale(1); }
                }
                .animate-aggressive-vibrate {
                    animation: aggressive-vibrate 0.4s infinite alternate ease-in-out;
                }
                `}
            </style>
        </div>
    );
}
