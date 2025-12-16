import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

  return (
    <section id="experience" className="py-24" ref={ref}>
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          Experience
        </motion.p>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="relative pl-8 border-l-2 border-border"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-border">
                {exp.current && (
                  <div className="absolute inset-1 rounded-full bg-accent animate-pulse" />
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.role}
                </h3>
                {exp.current && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded">
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-4">
                <span className="text-muted-foreground font-medium">
                  {exp.company}
                </span>
                <span className="hidden sm:block text-muted-foreground/30">
                  •
                </span>
                <span className="text-sm text-muted-foreground">
                  {exp.duration}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                {exp.description}
              </p>

              {exp.highlights.length > 0 && (
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-accent mt-1">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
