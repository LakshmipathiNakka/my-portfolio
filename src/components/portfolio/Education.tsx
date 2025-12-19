import { motion } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPWithCleanup } from "@/hooks/useGSAP";
import { getAnimationConfig } from "@/lib/motionPreferences";
import { easings, durations, staggers } from "@/lib/gsapAnimations";
import { BlurText } from "@/components/ui/blur-text";

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const educationData = [
    {
        institution: "Vishnu Institute of Technology",
        degree: "B.Tech in Electronics and Communication Engineering (ECE)",
        duration: "June 2021 – Aug 2024",
        result: "CGPA: 8.37",
        highlights: [
            "Bridged hardware-level logic with software-based problem solving and system design.",
            "Active participant in full-stack development challenges and algorithm-focused symposiums."
        ],
        current: true,
    },
    {
        institution: "Andhra Polytechnic, Kakinada",
        degree: "Diploma in Electronics and Communication Engineering (ECE)",
        duration: "June 2018 – March 2021",
        result: "Percentage: 86%",
        highlights: [
            "Developed robust engineering logic and systematic debugging skills through hands-on technical labs.",
            "Mastered low-level programming and microprocessor architectures, gaining deep insights into hardware-software interfaces."
        ],
        current: false,
    },
];

export const Education = () => {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const timelineLineRef = useRef(null);
    const animConfig = getAnimationConfig();

    // GSAP scroll-triggered animations
    useGSAPWithCleanup(() => {
        if (!sectionRef.current) return;

        // Animate timeline line progressively
        if (timelineLineRef.current) {
            gsap.fromTo(
                timelineLineRef.current,
                { scaleY: 0, transformOrigin: "top" },
                {
                    scaleY: 1,
                    duration: durations.verySlow,
                    ease: easings.expo,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );
        }

        // Stagger education items
        gsap.fromTo(
            ".education-item",
            { opacity: 0, x: -60 * animConfig.distanceMultiplier },
            {
                opacity: 1,
                x: 0,
                duration: durations.slow,
                ease: easings.expo,
                stagger: staggers.loose * animConfig.staggerMultiplier,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    once: true,
                },
            }
        );
    }, []);

    return (
        <section id="education" className="py-28 relative" ref={ref}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

            <div className="section-container relative z-10" ref={sectionRef}>
                <div className="section-heading flex items-center gap-3 mb-12">
                    <span className="w-8 h-px bg-accent" />
                    <BlurText
                        text="Education"
                        as="span"
                        className="text-sm font-medium uppercase tracking-wider text-accent"
                        delay={0}
                        duration={0.8}
                    />
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div
                        ref={timelineLineRef}
                        className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-border rounded-full"
                    />

                    <div className="space-y-8">
                        {educationData.map((edu, index) => (
                            <div
                                key={edu.institution}
                                className="education-item relative pl-16 md:pl-24"
                            >
                                {/* Timeline node */}
                                <div className="absolute left-6 md:left-8 -translate-x-1/2 flex flex-col items-center">
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${edu.current
                                            ? "bg-accent text-accent-foreground shadow-[0_0_20px_hsl(var(--accent)/0.4)]"
                                            : "glass-card text-muted-foreground"
                                            }`}
                                    >
                                        <GraduationCap className="w-5 h-5" />
                                    </motion.div>
                                </div>

                                <motion.div
                                    whileHover={{ y: -4, x: 4 }}
                                    transition={{ duration: 0.3 }}
                                    className="glass-card rounded-2xl p-6 lg:p-8 group hover:border-accent/30 hover:shadow-[0_20px_50px_-12px_hsl(var(--accent)/0.15)] transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <BlurText
                                                    text={edu.degree}
                                                    as="h3"
                                                    className="text-xl font-bold text-foreground group-hover:text-accent transition-colors"
                                                    delay={0}
                                                    duration={0.6}
                                                />
                                            </div>
                                            <BlurText
                                                text={edu.institution}
                                                as="p"
                                                className="text-lg text-accent font-medium"
                                                delay={0.2}
                                                duration={0.5}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary/50 px-3 py-1.5 rounded-lg">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {edu.duration}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-accent font-semibold bg-accent/5 px-3 py-1.5 rounded-lg self-end sm:self-auto">
                                                <Award className="w-3.5 h-3.5" />
                                                {edu.result}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="space-y-3 mt-4">
                                        {edu.highlights.map((highlight, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 text-sm"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                                <span className="text-foreground/80">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
