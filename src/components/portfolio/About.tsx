import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = {
  "Frontend": ["HTML", "CSS", "JavaScript", "React.js"],
  "Languages": ["C++", "Python", "SQL"],
  "Core Strengths": ["Data Structures & Algorithms", "Problem Solving", "System Thinking"],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent" />
          About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-2xl lg:text-3xl text-foreground leading-snug mb-8 font-medium tracking-tight">
              I'm a Software Developer with strong foundations in React and modern JavaScript, 
              combined with solid DSA problem-solving skills.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed mb-6">
              I focus on building applications that are both performant and user-friendly.
              My experience spans from creating technical content and learning materials to 
              building real-world applications.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              I ship with clarity and take end-to-end ownership of the products I work on.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div key={category} variants={itemVariants}>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.3 + categoryIndex * 0.1 + index * 0.05,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 glass-card text-foreground text-sm font-medium rounded-lg cursor-default hover:border-accent/30 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <motion.a
                href="https://leetcode.com/u/LakshmeepathiNakka/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-3 text-sm font-semibold text-accent hover:text-accent-glow transition-colors"
              >
                <span className="font-mono">LeetCode Profile</span>
                <span className="text-lg">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};