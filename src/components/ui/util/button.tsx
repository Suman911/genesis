import React from "react";
import clsx from "clsx";

type ColorVariant = "primary" | "gray" | "info" | "danger" | "success" | "warning";
type SizeVariant = "i" | "sm" | "md" | "lg";

const sizeMap: Record<SizeVariant, string> = {
    i: "p-2",
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-3 text-base",
    lg: "py-3 px-4 text-lg"
};

const roundMap = {
    full: "rounded-full",
    md: "rounded-md",
    sm: "rounded-sm",
    lg: "rounded-lg",
    xl: "rounded-xl",
};

const colorMap = {
    primary: {
        bg: "bg-primary",
        border: "border-primary",
        text: "text-primary",
        hoverText: "group-hover:text-primary hover:text-primary",
        hoverBg: "hover:bg-primary group-hover:bg-primary"
    },
    gray: {
        bg: "bg-gray",
        border: "border-gray",
        text: "text-gray",
        hoverText: "group-hover:text-gray hover:text-gray",
        hoverBg: "hover:bg-gray group-hover:bg-gray"
    },
    info: {
        bg: "bg-info",
        border: "border-info",
        text: "text-info",
        hoverText: "group-hover:text-info hover:text-info",
        hoverBg: "hover:bg-info group-hover:bg-info"
    },
    danger: {
        bg: "bg-danger",
        border: "border-danger",
        text: "text-danger",
        hoverText: "group-hover:text-danger hover:text-danger",
        hoverBg: "hover:bg-danger group-hover:bg-danger"
    },
    success: {
        bg: "bg-success",
        border: "border-success",
        text: "text-success",
        hoverText: "group-hover:text-success hover:text-success",
        hoverBg: "hover:bg-success group-hover:bg-success"
    },
    warning: {
        bg: "bg-warning",
        border: "border-warning",
        text: "text-warning",
        hoverText: "group-hover:text-warning hover:text-warning",
        hoverBg: "hover:bg-warning group-hover:bg-warning"
    }
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    color?: ColorVariant;
    outlined?: boolean;
    bordered?: boolean;
    round?: keyof typeof roundMap;
    size?: SizeVariant;
    disabled?: boolean;
}

export default function Button({ children, className = "", color = "primary", outlined = false, bordered = false, round = "full", size = "md", disabled = false, ...props }: ButtonProps) {

    bordered = outlined || bordered;

    const selected = colorMap[color];
    const sizeClass = sizeMap[size]

    const borderClass = bordered
        ? `border-3 ${selected.border}`
        : "border-0";

    const baseClasses = "group relative overflow-hidden font-bold transition-all duration-300 ease-in-out select-none";
    const bgClass = outlined && bordered
        ? `bg-transparent ${selected.hoverBg}`
        : `${selected.bg} group-hover:bg-transparent hover:bg-transparent`;
    const variantClasses = outlined
        ? `${selected.text} group-hover:text-white hover:text-white`
        : `text-white ${selected.hoverText}`;
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

    const roundClass = roundMap[round] || "rounded-full";

    return (
        <button className={clsx(baseClasses, bgClass, borderClass, sizeClass, variantClasses, roundClass, disabledClass, className)} disabled={disabled} {...props} >
            <span className={clsx(
                "absolute inset-0 w-0 transition-all duration-300 ease-in-out group-hover:w-full",
                roundClass,
                outlined ? selected.bg : "bg-white"
            )}></span>

            <span className="relative inset-0 flex items-center justify-center gap-2 transition-colors duration-300">
                {children}
            </span>
        </button>
    );
}