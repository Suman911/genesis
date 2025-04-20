'use client';

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

import { forwardRef, useRef } from "react";
import { ValidatorFunction } from "./validation";

interface InputProps {
  type: "text" | "password" | "email" | "radio";
  label?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  className?: string;
  validator?: ValidatorFunction;
  defaultValue?: string;
  defaultChecked?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      label,
      placeholder,
      name,
      required = false,
      className = "",
      validator,
      defaultValue,
      defaultChecked,
    },
    ref
  ) => {
    const messageRef = useRef<HTMLParagraphElement>(null);

    const handleBlur = () => {
      if (validator && ref && "current" in ref) {
        validator(ref as React.RefObject<HTMLInputElement>, messageRef);
      }
    };

    return (
      <div className="py-4 relative">
        {label && (
          <label htmlFor={name} className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          required={required}
          className={`
            px-3 py-2 
            border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${type === "radio" ? "w-4 h-4" : "w-full"}
            ${className}
          `}
          onBlur={handleBlur}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
        />

        <p
          ref={messageRef}
          className="w-full text-sm text-center absolute left-0 top-full -translate-y-3.5 text-red-500 hidden"
        ></p>
      </div>
    );
  }
);

// Fixing the missing display name warning
Input.displayName = "Input";
