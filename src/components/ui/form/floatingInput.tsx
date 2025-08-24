import { useState } from "react";

export type FloatingInputProps = {
    label: string;
    name: string;
    type?: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    required?: boolean;
    as?: "input" | "select";
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
};


export default function FloatingInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = false,
    as = "input",
    children,
    className,
    disabled = false,
}: FloatingInputProps) {
    const [focused, setFocused] = useState(false);

    const sharedProps = {
        id: name,
        name,
        value,
        onChange,
        required,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        className: 'peer w-full rounded border px-2 py-1 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none bg-transparent',
        disabled,
    };

    return (
        <div className={`relative ${className}`}>
            {as === "input" ? (
                <input type={type} {...sharedProps} />
            ) : (
                <select {...sharedProps}>{children}</select>
            )}
            <label
                htmlFor={name}
                className={`absolute left-2 transition-all duration-200 bg-white px-1 rounded-4xl select-none
                        ${focused || value || as == "select"
                        ? "-top-2.5 text-xs text-blue-600"
                        : "top-1 text-gray-400"}`}
            >
                {label}
            </label>
        </div>
    );
}