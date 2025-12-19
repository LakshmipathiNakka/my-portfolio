import { motion } from "framer-motion";

export const SectionDivider = () => {
    return (
        <div className="w-full h-24 relative overflow-hidden flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-7xl px-6 sm:px-12 lg:px-24">
                <div className="relative h-px w-full">
                    {/* Main line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

                    {/* Animated glow */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"
                    />

                    {/* Optional: Subtle particles or nodes on the line */}
                    <div className="absolute inset-x-0 top-0 flex justify-around">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: i * 0.8,
                                    ease: "easeInOut",
                                }}
                                className="w-1 h-1 rounded-full bg-accent/40 blur-[1px]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
