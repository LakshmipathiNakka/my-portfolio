import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    company: "Actalyst",
    role: "Software Developer",
    duration: "September 2025 – Present",
    description:
      "Currently working on building and maintaining scalable software solutions. Applying strong frontend fundamentals and problem-solving skills in real-world production systems.",
    highlights: [],
    current: true,
  },
  {
    company: "NxtWave",
    role: "Technical Content Developer",
    duration: "October 2024 – August 2025",
    description:
      "Developed DSA coding problems and technical content across C++, Python, and Full Stack Development. Designed projects and learning materials aligned with real-world software engineering and product-company interviews.",
    highlights: [
      "Leveraged tools like Lovable, Cursor, and ChatGPT to optimize content creation and delivery efficiency",
      "Collaborated cross-functionally to ensure technical accuracy, relevance, and consistency",
      "Delivered high-quality content consistently in a fast-paced environment while managing multiple parallel tasks",
    ],
    current: false,
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-28 relative" ref={ref}>
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
          Experience
        </motion.p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative pl-10 md:pl-20"
              >
                {/* Timeline dot */}
                <div className={cn(
                  "absolute left-2 md:left-8 -translate-x-1/2 w-3 md:w-4 h-3 md:h-4 rounded-full border-2 transition-all duration-300",
                  exp.current 
                    ? "border-accent bg-accent shadow-glow" 
                    : hoveredIndex === index 
                      ? "border-accent bg-accent/20"
                      : "border-border bg-background"
                )}>
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                  )}
                </div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "glass-card rounded-2xl p-6 lg:p-8 transition-all duration-300",
                    hoveredIndex === index && "border-accent/30 shadow-glow"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <span className="text-lg text-accent font-medium">
                      {exp.company}
                    </span>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                    <span className="text-sm text-muted-foreground font-mono">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {exp.highlights.length > 0 && (
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.15 + i * 0.1 }}
                          className="text-sm text-muted-foreground flex items-start gap-3"
                        >
                          <span className="text-accent font-bold mt-0.5">→</span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};