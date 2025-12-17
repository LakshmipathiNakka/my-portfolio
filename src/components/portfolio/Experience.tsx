import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Actalyst",
    role: "Software Developer",
    duration: "Sep 2025 – Present",
    summary: "Building and shipping production-grade software solutions.",
    highlights: [
      "Owned frontend development for scalable web applications",
      "Applied DSA fundamentals to optimize performance-critical code",
      "Delivered features end-to-end with focus on user experience",
    ],
    current: true,
  },
  {
    company: "NxtWave",
    role: "Technical Content Developer",
    duration: "Oct 2024 – Aug 2025",
    summary: "Created DSA problems and learning materials for 50,000+ students.",
    highlights: [
      "Designed 100+ coding problems aligned with FAANG interview patterns",
      "Shipped content 40% faster using AI tools (Lovable, Cursor, ChatGPT)",
      "Owned quality across C++, Python, and Full Stack modules",
    ],
    current: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-28 relative" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading flex items-center gap-3 mb-12"
        >
          <span className="w-8 h-px bg-accent" />
          Experience
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-border rounded-full" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                variants={itemVariants}
                className="relative pl-16 md:pl-24"
              >
                {/* Timeline node */}
                <div className="absolute left-6 md:left-8 -translate-x-1/2 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      exp.current 
                        ? "bg-accent text-accent-foreground shadow-[0_0_20px_hsl(var(--accent)/0.4)]" 
                        : "glass-card text-muted-foreground"
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                  </motion.div>
                  {exp.current && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 w-12 h-12 rounded-xl bg-accent"
                    />
                  )}
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
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="inline-flex items-center px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-1.5 animate-pulse" />
                            Now
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-accent font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary/50 px-3 py-1.5 rounded-lg">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Impact highlights */}
                  <div className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-foreground/80">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
