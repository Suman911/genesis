import React from "react";
import clsx from "clsx";

type ColorVariant = "primary" | "info" | "warning" | "danger" | "success";
type SizeVariant = "sm" | "md" | "lg";

const sizeMap: Record<SizeVariant, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-11 px-8 text-lg"
};

const colorMap: Record<ColorVariant, {
    base: string,
    hover: string,
    border: string,
    glow: string
}> = {
    primary: {
        base: "bg-primary/10 text-primary",
        hover: "hover:bg-primary/20",
        border: "border-primary/30",
        glow: "shadow-[0_0_15px_rgba(124,58,237,0.5)]"
    },
    info: {
        base: "bg-info/10 text-info",
        hover: "hover:bg-info/20",
        border: "border-info/30",
        glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    },
    warning: {
        base: "bg-warning/10 text-warning",
        hover: "hover:bg-warning/20",
        border: "border-warning/30",
        glow: "shadow-[0_0_15px_rgba(234,179,8,0.5)]"
    },
    danger: {
        base: "bg-danger/10 text-danger",
        hover: "hover:bg-danger/20",
        border: "border-danger/30",
        glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]"
    },
    success: {
        base: "bg-success/10 text-success",
        hover: "hover:bg-success/20",
        border: "border-success/30",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.5)]"
    }
};

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    color?: ColorVariant;
    size?: SizeVariant;
    outlined?: boolean;
    glow?: boolean;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
    ({ 
        children, 
        className = "", 
        color = "primary", 
        size = "md",
        outlined = false,
        glow = false,
        disabled = false,
        ...props 
    }, ref) => {
        const selectedColor = colorMap[color];
        const sizeClass = sizeMap[size];

        return (
            <button
                ref={ref}
                className={clsx(
                    // Base styles
                    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    "[&_svg]:size-4 [&_svg]:shrink-0",
                    
                    // Size
                    sizeClass,
                    
                    // Color and effects
                    selectedColor.base,
                    selectedColor.hover,
                    
                    // Outline variant
                    outlined && [
                        "border-2",
                        selectedColor.border
                    ],
                    
                    // Glow effect
                    glow && [
                        "transition-shadow duration-200",
                        selectedColor.glow
                    ],
                    
                    // Disabled state
                    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                    
                    // Custom classes
                    className
                )}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);

NeonButton.displayName = "NeonButton";

export default NeonButton;
