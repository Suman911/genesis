"use client";
import "@/styles/neonFloatInput.css";

interface NeonFloatInputProps {
    id: string
    label: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    autoFocus?: boolean
    autoComplete?: string
}

const NeonFloatInput = ({ id, label, type = "text", value, onChange, autoFocus = false, autoComplete }: NeonFloatInputProps) => {
    return (
        <div className="mb-6 py-2 relative">
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    className="peer w-full border px-4 py-4 rounded outline-none focus:border-cyan-400 focus:border-2 transition-all duration-200 bg-transparent text-white placeholder-transparent"
                    placeholder=" "
                    value={value}
                    onChange={onChange}
                    required
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
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
