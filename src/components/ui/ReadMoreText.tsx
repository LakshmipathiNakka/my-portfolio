import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadMoreTextProps {
    text: string;
    className?: string;
    mobileTruncateLength?: number; // Approximate length to truncate at on mobile
}

export const ReadMoreText = ({
    text,
    className,
    mobileTruncateLength = 120
}: ReadMoreTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Logic to determine truncation point
    // 1. Prefer splitting at the first period if it's early enough (e.g. < length + 20%)
    // 2. Otherwise split at the nearest space before length

    const getTruncatedText = (fullText: string, limit: number) => {
        if (fullText.length <= limit) return fullText;

        // Try finding the first sentence end
        const firstSentenceEnd = fullText.indexOf(". ");
        if (firstSentenceEnd !== -1 && firstSentenceEnd <= limit + 40) {
            return fullText.slice(0, firstSentenceEnd + 1);
        }

        // Otherwise find nearest space
        const lastSpace = fullText.lastIndexOf(" ", limit);
        if (lastSpace !== -1) {
            return fullText.slice(0, lastSpace) + "...";
        }

        return fullText.slice(0, limit) + "...";
    };

    const truncatedText = getTruncatedText(text, mobileTruncateLength);
    const shouldTruncate = text.length > truncatedText.length;

    return (
        <div className={cn("text-muted-foreground leading-relaxed", className)}>
            {/* Desktop View (>= lg) - Always full text */}
            <span className="hidden lg:inline">{text}</span>

            {/* Mobile/Tablet View (< lg) */}
            <span className="lg:hidden">
                {isExpanded ? text : truncatedText}
                {shouldTruncate && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering parent clicks (like card expansion)
                            setIsExpanded(!isExpanded);
                        }}
                        className="inline-flex items-center gap-1 ml-1 font-medium text-accent hover:text-accent/80 transition-colors focus:outline-none"
                    >
                        {isExpanded ? "Show less" : "Show more"}
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                )}
            </span>
        </div>
    );
};
