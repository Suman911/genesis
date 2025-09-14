import { useState } from "react"
import { BaseProps } from "@/lib/inputTypes"

export type FloatingInputProps = BaseProps & {
    type?: string
    checked?: boolean
    list?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FloatingInput = ({
    label,
    name,
    value,
    required = false,
    type = "text",
    className,
    disabled = false,
    onChange,
    checked,
    list
}: FloatingInputProps) => {
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
            <input
                type={type}
                {...sharedProps}
                value={value ?? ""}
                onChange={onChange}
                checked={["checkbox", "radio"].includes(type) ? checked : undefined}
                list={list}
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

export default FloatingInput
