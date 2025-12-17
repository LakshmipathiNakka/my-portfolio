import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

const skills = [
  { name: "HTML", icon: "vscode-icons:file-type-html", color: "#E34F26" },
  { name: "CSS", icon: "vscode-icons:file-type-css", color: "#1572B6" },
  { name: "JavaScript", icon: "logos:javascript", color: "#F7DF1E" },
  { name: "React", icon: "logos:react", color: "#61DAFB" },
  { name: "TypeScript", icon: "logos:typescript-icon", color: "#3178C6" },
  { name: "Python", icon: "logos:python", color: "#3776AB" },
  { name: "C++", icon: "logos:c-plusplus", color: "#00599C" },
  { name: "SQL", icon: "vscode-icons:file-type-sql", color: "#4479A1" },
  { name: "Git", icon: "logos:git-icon", color: "#F05032" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon", color: "#06B6D4" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading flex items-center gap-3 mb-12"
        >
          <span className="w-8 h-px bg-accent" />
          Skills
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-6 sm:gap-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                {/* Icon container */}
                <div className="relative">
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 glass-card rounded-2xl flex items-center justify-center transition-shadow duration-300"
                    style={{
                      boxShadow: hoveredSkill === skill.name 
                        ? `0 8px 30px -8px ${skill.color}40` 
                        : undefined,
                    }}
                  >
                    <Icon 
                      icon={skill.icon} 
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      y: hoveredSkill === skill.name ? 0 : 10,
                      scale: hoveredSkill === skill.name ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none z-10"
                  >
                    {skill.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                  </motion.div>
                </div>

                {/* Label */}
                <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
