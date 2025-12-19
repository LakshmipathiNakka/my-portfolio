import React from 'react';
import { cn } from "@/lib/utils";

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 5,
    className
}) => {
    const animationDuration = `${speed}s`;

    return (
        <span
            className={cn(
                "shiny-text inline-block bg-clip-text text-transparent",
                disabled ? "disabled" : "",
                className
            )}
            style={{ animationDuration }}
        >
            {text}
        </span>
    );
};
