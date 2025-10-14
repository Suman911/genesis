import { BaseProps } from "@/lib/inputTypes"

export type FloatingSelectProps = BaseProps & {
    children: React.ReactNode
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const FloatingSelect = ({
    label,
    name,
    value,
    required = false,
    className,
    disabled = false,
    onChange,
    children
}: FloatingSelectProps) => {

    const sharedProps = {
        id: name,
        name,
        required,
        className:
            "peer w-full rounded border px-2 py-1 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none bg-transparent",
        disabled,
    }

    return (
        <div className={`relative ${className ?? ""}`}>
            <select {...sharedProps} value={value} onChange={onChange}>
                {children}
            </select>
            <label
                htmlFor={name}
                className="absolute left-2 transition-all duration-200 bg-white px-1 rounded-4xl select-none 
                    -top-2.5 text-xs text-blue-600"
            >
                {label}
            </label>
        </div>
    )
}

export default FloatingSelect
