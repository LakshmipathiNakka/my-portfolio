import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "Ownership",
    description: "I take full responsibility from concept to deployment.",
  },
  {
    icon: Lightbulb,
    title: "Clarity",
    description: "Clean code, clear communication, no ambiguity.",
  },
  {
    icon: Rocket,
    title: "Delivery",
    description: "I ship fast without compromising on quality.",
  },
];

const skills = {
  Frontend: ["HTML", "CSS", "JavaScript", "React.js"],
  Languages: ["C++", "Python", "SQL"],
  "Core Strengths": ["Data Structures & Algorithms", "Problem Solving", "System Thinking"],
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative" ref={ref}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading flex items-center gap-3 mb-12"
        >
          <span className="w-8 h-px bg-accent" />
          About
        </motion.p>

        {/* Strong paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-2xl text-foreground leading-relaxed max-w-3xl mb-16 font-medium"
        >
          I build products that work—fast, clean, and user-first. With strong foundations in 
          React and modern JavaScript, I combine technical depth with product thinking to 
          deliver solutions that matter.
        </motion.p>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className="glass-card p-6 rounded-2xl group hover:border-accent/30 transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4"
              >
                <item.icon className="w-6 h-6 text-accent" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="space-y-8"
        >
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <div key={category}>
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
                      delay: 0.6 + categoryIndex * 0.1 + index * 0.05,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 glass-card text-foreground text-sm font-medium rounded-lg cursor-default hover:border-accent/30 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}

          <motion.a
            href="https://leetcode.com/u/LakshmeepathiNakka/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-3 text-sm font-semibold text-accent hover:text-accent-glow transition-colors"
          >
            <span className="font-mono">LeetCode Profile</span>
            <span className="text-lg">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
