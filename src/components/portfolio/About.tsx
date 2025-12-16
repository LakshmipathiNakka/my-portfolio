import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = {
  "Frontend": ["HTML", "CSS", "JavaScript", "React.js"],
  "Languages": ["C++", "Python", "SQL"],
  "Core Strengths": ["Data Structures & Algorithms", "Problem Solving", "System Thinking"],
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24" ref={ref}>
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a Software Developer with strong foundations in React and modern JavaScript, 
              combined with solid DSA problem-solving skills. I focus on building applications 
              that are both performant and user-friendly.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My experience spans from creating technical content and learning materials to 
              building real-world applications. I ship with clarity and take end-to-end ownership 
              of the products I work on.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-foreground mb-3">
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
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-md"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <a
                href="https://leetcode.com/u/LakshmeepathiNakka/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                <span className="font-mono">LeetCode Profile</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
