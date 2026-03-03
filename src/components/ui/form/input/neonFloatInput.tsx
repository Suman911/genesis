"use client";
import React from "react";
import "@/styles/neonFloatInput.css";

interface NeonFloatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

const NeonFloatInput: React.FC<NeonFloatInputProps> = ({
    id,
    label,
    className,
    required = true,
    ...inputProps
}) => {
    const baseClass =
        "peer w-full border px-4 py-4 rounded outline-none focus:border-cyan-400 focus:border-2 transition-all duration-200 bg-transparent text-white placeholder-transparent";
    const inputClass = [baseClass, className].filter(Boolean).join(" ");

    return (
        <div className="mb-3 py-2 relative">
            <div className="relative">
                <input
                    id={id}
                    className={inputClass}
                    required={required}
                    placeholder=" "
                    {...inputProps}
                />
                <label
                    htmlFor={id}
                    className="absolute left-3 -top-1 text-gray-400 text-sm transition-all duration-200
                    peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300
                    peer-focus:backdrop-blur-3xl peer-focus:bg-cyan-400/60 rounded-full p-1.5
                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-white"
                >
                    {label}
                </label>
            </div>
        </div>
    );
};

export default NeonFloatInput;
