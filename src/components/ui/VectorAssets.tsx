import React from "react";
import { cn } from "@/lib/utils";

export const TechnicalGrid = ({ className }: { className?: string }) => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={cn("opacity-10 pointer-events-none", className)}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
            </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
    </svg>
);

export const LogicFlow = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 200 200"
        className={cn("opacity-5 pointer-events-none", className)}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="40" cy="40" r="2" fill="currentColor" />
        <circle cx="160" cy="40" r="2" fill="currentColor" />
        <circle cx="100" cy="100" r="2" fill="currentColor" />
        <circle cx="40" cy="160" r="2" fill="currentColor" />
        <circle cx="160" cy="160" r="2" fill="currentColor" />

        <path
            d="M 40 40 L 100 100 L 160 40 M 100 100 L 40 160 M 100 100 L 160 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 2"
        />
    </svg>
);

export const AbstractNodes = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={cn("opacity-5 pointer-events-none", className)}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="20" cy="20" r="1" fill="currentColor" />
        <circle cx="80" cy="20" r="1.5" fill="currentColor" />
        <circle cx="50" cy="50" r="1" fill="currentColor" />
        <circle cx="20" cy="80" r="1.5" fill="currentColor" />
        <circle cx="80" cy="80" r="1" fill="currentColor" />

        <path
            d="M 20 20 Q 50 10 80 20 Q 90 50 80 80 Q 50 90 20 80 Q 10 50 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
        />
    </svg>
);
