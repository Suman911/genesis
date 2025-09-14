import { useState } from "react"
import { BaseProps } from "@/lib/inputTypes"

export type FloatingTextareaProps = BaseProps & {
    rows?: number
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FloatingTextarea = ({
    label,
    name,
    value,
    required = false,
    className,
    disabled = false,
    onChange,
    rows = 3
}: FloatingTextareaProps) => {
    const [focused, setFocused] = useState(false)

    const sharedProps = {
        id: name,
        name,
        required,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        className:
            "peer w-full rounded border px-2 py-1 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none bg-transparent",
        disabled,
    }

    return (
        <div className={`relative ${className ?? ""}`}>
            <textarea
                {...sharedProps}
                value={value ?? ""}
                onChange={onChange}
                rows={rows}
            />
            <label
                htmlFor={name}
                className={`absolute left-2 transition-all duration-200 bg-white px-1 rounded-4xl select-none
                ${focused || value
                        ? "-top-2.5 text-xs text-blue-600"
                        : "top-1 text-gray-400"}`}
            >
                {label}
            </label>
        </div>
    )
}

export default FloatingTextarea
