"use client";
import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export function TextGrid2({ children, className = "", ...props }: TextProps) {
    return (
        <div {...props} className={`md:grid grid-cols-2 gap-1 ${className}`}>
            {children}
        </div>
    );
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
}

export function Input({ label, name, type = "text", placeholder, value, onChange, error = null, required = false, className = "", ...rest }: InputProps) {
    const borderClass = error ? "!border-red-600" : value.trim() ? "!border-green-400" : "";

    return (
        <div className="py-4 relative">
            {label && (
                <label htmlFor={name} className="text-sm font-medium">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className={`px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${type === "radio" ? "w-4 h-4" : "w-full"} ${borderClass} ${className}`}
                {...rest}
            />

            <p className={`w-full text-sm text-center absolute left-0 top-full -translate-y-3.5 text-red-500 ${error ? "" : "hidden"}`}>{error}</p>
        </div>
    );
}

export default Input;
