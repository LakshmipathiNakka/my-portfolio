import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Rocket } from "lucide-react";
import { BlurText } from "@/components/ui/blur-text";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LogicFlow } from "@/components/ui/VectorAssets";

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

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative" ref={ref}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      {/* Conceptual Vector */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-20 pointer-events-none hidden lg:block">
        <LogicFlow className="text-accent" />
      </div>

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
        <ScrollReveal
          as="p"
          className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-16"
        >
          I'm a software developer focused on building web applications that solve real problems. With expertise in React and modern JavaScript, I turn complex requirements into clean, maintainable code that users actually enjoy using.
        </ScrollReveal>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};
