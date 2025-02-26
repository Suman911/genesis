'use client'
import React from "react";
import { RefObject, useRef, useState } from "react";
interface text extends React.HTMLAttributes<HTMLDivElement>{
    children:React.ReactNode
}

export function TextGrid2({ children, className = "", ...props }: text ) {
    return (
        <div {...props} className={`md:grid grid-cols-2 gap-1 ${className}`}>
            {children}
        </div>
    );
}
import { forwardRef, ForwardedRef } from 'react';
import { ValidatorFunction } from "./validation";

// Props interface
interface InputProps {
  type: 'text' | 'password' | 'email' | 'radio';
  label?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  className?: string;
  validator?: ValidatorFunction;
  defaultValue?: string;
  defaultChecked?: boolean;
}

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      type,
      label,
      placeholder,
      name,
      required = false,
      className = '',
      validator,
      defaultValue,
      defaultChecked,
    } = props;
    const messageRef=useRef(null)
    const handleBlur = () => {
      if (validator && ref && 'current' in ref) {
        validator(ref as RefObject<HTMLInputElement>, messageRef);
      }
    };

    return (
      <div className="py-4 relative ">
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
            ${type === 'radio' ? 'w-4 h-4' : 'w-full'}
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
