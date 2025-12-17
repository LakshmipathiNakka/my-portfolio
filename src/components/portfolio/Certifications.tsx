import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SkillIcon {
    icon: string;
    label: string;
}

interface Certification {
    title: string;
    organization: string;
    description: string;
    credentialUrl: string;
    year: string;
    skills: SkillIcon[];
}

const certifications: Certification[] = [
    {
        title: "Frontend Development (React JS)",
        organization: "NxtWave",
        description: "Built stateful React applications using components, props, state, hooks, routing, forms, conditional rendering, and API-driven UI.",
        credentialUrl: "https://certificates.ccbp.in/academy/react-js?id=HWTMVWZYKS",
        year: "2024",
        skills: [
            { icon: "logos:react", label: "React JS" },
        ],
    },
    {
        title: "Backend Development (Node.js)",
        organization: "NxtWave",
        description: "Developed backend applications using Node.js and Express, including REST APIs, middleware, authentication, authorization, and secure API design.",
        credentialUrl: "https://certificates.ccbp.in/academy/node-js?id=UXZIAJXGTI",
        year: "2024",
        skills: [
            { icon: "logos:nodejs-icon", label: "Node.js" },
            { icon: "logos:express", label: "Express.js" },
        ],
    },
    {
        title: "JavaScript Essentials",
        organization: "NxtWave",
        description: "Learned core JavaScript fundamentals and asynchronous programming concepts used to build dynamic, interactive web applications.",
        credentialUrl: "https://certificates.ccbp.in/academy/javascript-essentials?id=YCZTSMCIDN",
        year: "2024",
        skills: [
            { icon: "logos:javascript", label: "JavaScript" },
        ],
    },
    {
        title: "Programming Foundations with Python",
        organization: "NxtWave",
        description: "Developed strong programming fundamentals using Python, including data structures, control flow, and object-oriented programming.",
        credentialUrl: "https://certificates.ccbp.in/academy/programming-foundations-with-python?id=IXBFLVOJJS",
        year: "2024",
        skills: [
            { icon: "logos:python", label: "Python" },
        ],
    },
    {
        title: "Developer Foundations",
        organization: "NxtWave",
        description: "Covered core software engineering fundamentals including operating systems, networking basics, command-line usage, and Git-based collaboration.",
        credentialUrl: "https://certificates.ccbp.in/academy/developer-foundations?id=RYQKRCFWCS",
        year: "2024",
        skills: [
            { icon: "logos:git-icon", label: "Git" },
            { icon: "logos:bash-icon", label: "Command Line" },
        ],
    },
    {
        title: "Introduction to Databases",
        organization: "NxtWave",
        description: "Learned relational and non-relational database fundamentals, SQL querying, data modeling, and basic MongoDB operations.",
        credentialUrl: "https://certificates.ccbp.in/academy/introduction-to-databases?id=TPCXGEUUYP",
        year: "2024",
        skills: [
            { icon: "logos:postgresql", label: "SQL" },
            { icon: "logos:mongodb-icon", label: "MongoDB" },
        ],
    },
    {
        title: "Build Your Own Dynamic Web Application",
        organization: "NxtWave",
        description: "Built dynamic web applications using JavaScript with DOM manipulation, events, local storage, and API data integration.",
        credentialUrl: "https://certificates.ccbp.in/academy/dynamic-web-application?id=GLWXHQDFKO",
        year: "2024",
        skills: [
            { icon: "logos:javascript", label: "JavaScript" },
        ],
    },
    {
        title: "Responsive Web Design Using Flexbox",
        organization: "NxtWave",
        description: "Designed responsive layouts using CSS Flexbox and media queries to adapt UI across different screen sizes.",
        credentialUrl: "https://certificates.ccbp.in/academy/responsive-web-design-using-flexbox?id=SEMWPZTLSF",
        year: "2024",
        skills: [
            { icon: "logos:css-3", label: "CSS Flexbox" },
        ],
    },
    {
        title: "Build Your Own Responsive Website",
        organization: "NxtWave",
        description: "Created responsive websites using HTML, CSS, Bootstrap, and media queries with a mobile-first approach.",
        credentialUrl: "https://certificates.ccbp.in/academy/build-your-own-responsive-website?id=JVBIYXPXJH",
        year: "2024",
        skills: [
            { icon: "logos:bootstrap", label: "Bootstrap" },
            { icon: "logos:css-3", label: "Flexbox" },
        ],
    },
    {
        title: "Build Your Own Static Website",
        organization: "NxtWave",
        description: "Built and published static websites from scratch using core web technologies with clean structure and styling.",
        credentialUrl: "https://certificates.ccbp.in/academy/static-website?id=QYUFCAMVKR",
        year: "2024",
        skills: [
            { icon: "logos:html-5", label: "HTML" },
            { icon: "logos:css-3", label: "CSS" },
            { icon: "logos:bootstrap", label: "Bootstrap" },
        ],
    },
];

export const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        skipSnaps: false,
        dragFree: false,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section id="certifications" className="py-28 relative" ref={ref}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

            <div className="section-container relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-heading flex items-center gap-3"
                >
                    <span className="w-8 h-px bg-accent" />
                    Certifications
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-muted-foreground text-lg mb-12 max-w-3xl"
                >
                    Verified learning across React, Data Structures, Full-Stack Development, and modern web technologies.
                </motion.p>

                <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={cert.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                                >
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col hover:border-accent/30 hover:shadow-glow transition-all duration-300"
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground mb-2">
                                                {cert.title}
                                            </h3>
                                            <p className="text-accent font-medium mb-1">
                                                {cert.organization}
                                            </p>
                                            {cert.year && (
                                                <p className="text-sm text-muted-foreground font-mono mb-4">
                                                    {cert.year}
                                                </p>
                                            )}
                                            <p className="text-muted-foreground leading-relaxed mb-6">
                                                {cert.description}
                                            </p>

                                            {/* Skill Icons */}
                                            <TooltipProvider>
                                                <div className="flex items-center gap-3 mb-6">
                                                    {cert.skills.map((skill, skillIndex) => (
                                                        <Tooltip key={skill.label} delayDuration={200}>
                                                            <TooltipTrigger asChild>
                                                                <motion.div
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                                                    transition={{
                                                                        duration: 0.4,
                                                                        delay: 0.4 + index * 0.1 + skillIndex * 0.05,
                                                                    }}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    className="p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-default hover:shadow-md"
                                                                >
                                                                    <Icon icon={skill.icon} width="32" height="32" aria-label={skill.label} />
                                                                </motion.div>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-sm">{skill.label}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ))}
                                                </div>
                                            </TooltipProvider>
                                        </div>

                                        <motion.a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: 4 }}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-glow transition-colors mt-auto"
                                        >
                                            View Certificate
                                            <ExternalLink className="w-4 h-4" />
                                        </motion.a>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons - Only show if more than 3 certifications */}
                    {certifications.length > 3 && (
                        <>
                            <button
                                onClick={scrollPrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-3 glass-card rounded-full text-foreground hover:text-accent hover:border-accent/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                                aria-label="Previous certification"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-3 glass-card rounded-full text-foreground hover:text-accent hover:border-accent/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                                aria-label="Next certification"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
