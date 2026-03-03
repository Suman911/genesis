'use client'

import React from 'react';

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value">  {
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
}

export function TextArea({ value, onChange, error = null, className = '',required = false, ...props }: TextAreaProps) {
    const borderClass = error ? '!border-red-600' : value.trim() ? '!border-green-400' : '';

    return (
        <div className="w-full relative py-4 px-0 sm:py-4">
            <textarea
                {...props}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`h-32 w-full p-2 outline-none border-2 border-primary rounded-xl ${borderClass} ${className}`}
            />
            <div className={`w-full text-sm text-center absolute left-0 top-full -translate-y-3.5 text-red-500 ${error ? '' : 'hidden'}`}>{error}</div>
        </div>
    );
}

export default TextArea;
