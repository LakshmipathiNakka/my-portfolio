import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export const BlurText = ({
    text,
    className = "",
    delay = 0,
    duration = 0.8,
    as: Component = "p",
}: BlurTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Split text into words
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: duration,
                ease: [0.22, 1, 0.36, 1], // Custom ease-out curve
            },
        },
    };

    return (
        <Component
            ref={ref}
            className={className}
            aria-label={text}
        >
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block"
            >
                {words.map((word, index) => (
                    <motion.span
                        key={`${word}-${index}`}
                        variants={wordVariants}
                        className="inline-block mr-[0.25em] last:mr-0"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Component>
    );
};
