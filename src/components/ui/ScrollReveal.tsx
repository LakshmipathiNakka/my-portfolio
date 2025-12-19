import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useGSAPWithCleanup } from "@/hooks/useGSAP";
import { getAnimationConfig } from "@/lib/motionPreferences";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: string;
    className?: string;
    as?: React.ElementType;
}

export const ScrollReveal = ({
    children,
    className,
    as: Component = "p"
}: ScrollRevealProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const animConfig = getAnimationConfig();

    useGSAPWithCleanup(() => {
        if (!containerRef.current || !animConfig.shouldAnimate) return;

        // Split text into words if not already split
        const words = containerRef.current.querySelectorAll(".scroll-reveal-word");

        gsap.fromTo(
            words,
            {
                opacity: 0.2,
                filter: "blur(4px)",
                y: 10,
                rotateX: -10,
            },
            {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                rotateX: 0,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    end: "top 45%",
                    scrub: true,
                },
            }
        );
    }, [children]);

    const words = children.split(" ");

    return (
        <Component
            ref={containerRef}
            className={cn("scroll-reveal-container perspective-1000", className)}
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    className="scroll-reveal-word inline-block mr-[0.25em] whitespace-nowrap"
                >
                    {word}
                </span>
            ))}
        </Component>
    );
};
