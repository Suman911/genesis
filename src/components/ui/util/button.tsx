import React from "react";
import clsx from "clsx";

type ColorVariant =
    | "primary"
    | "gray"
    | "info"
    | "danger"
    | "success"
    | "warning";

type SizeVariant = "i" | "sm" | "md" | "lg";

const sizeMap: Record<SizeVariant, string> = {
    i: "p-2",
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-3 text-base",
    lg: "py-3 px-4 text-lg"
};

const colorMap = {
    primary: {
        bg: "bg-primary",
        border: "border-primary",
        text: "text-primary",
        hoverText: "hover:text-primary"
    },
    gray: {
        bg: "bg-gray",
        border: "border-gray",
        text: "text-gray",
        hoverText: "hover:text-gray"
    },
    info: {
        bg: "bg-info",
        border: "border-info",
        text: "text-info",
        hoverText: "hover:text-info"
    },
    danger: {
        bg: "bg-danger",
        border: "border-danger",
        text: "text-danger",
        hoverText: "hover:text-danger"
    },
    success: {
        bg: "bg-success",
        border: "border-success",
        text: "text-success",
        hoverText: "hover:text-success"
    },
    warning: {
        bg: "bg-warning",
        border: "border-warning",
        text: "text-warning",
        hoverText: "hover:text-warning"
    }
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    color?: ColorVariant;
    outlined?: boolean;
    bordered?: boolean;
    round?: string
    size?: SizeVariant;
}

export default function Button({
    children,
    className = "",
    color = "primary",
    outlined = false,
    bordered = false,
    round = "full",
    size = "md",
    ...props
}: ButtonProps) {

    bordered = outlined || bordered;

    const selected = colorMap[color];
    const sizeClass = sizeMap[size]

    const borderClass = bordered
        ? `border-3 ${selected.border}`
        : "border-0";

    const baseClasses = "group relative hover:bg-transparent overflow-hidden font-bold transition-all duration-300 ease-in-out select-none";

    const variantClasses = outlined
        ? `bg-transparent ${selected.text} hover:text-white`
        : `${selected.bg} ${selected.hoverText} text-white`;

    const roundClass = `rounded-${round}`;

    return (
        <button className={clsx(baseClasses, borderClass, sizeClass, variantClasses, roundClass, className)} {...props} >
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