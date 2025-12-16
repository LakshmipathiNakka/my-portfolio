import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "lakshmeepathin184@gmail.com",
    href: "mailto:lakshmeepathin184@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "lakshmeepathinakka",
    href: "https://www.linkedin.com/in/lakshmeepathinakka/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "LakshmipathiNakka",
    href: "https://github.com/LakshmipathiNakka",
    icon: Github,
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          Contact
        </motion.p>

        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance"
          >
            Let's build something.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-10"
          >
            I'm currently open to new opportunities and collaborations. 
            Whether you have a project idea, a job opportunity, or just want to say hi — 
            my inbox is always open.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="group flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 hover:border-accent/50 hover:bg-card/80 transition-all"
              >
                <div className="p-2 bg-secondary rounded-md group-hover:bg-accent/10 transition-colors">
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{link.label}</p>
                  <p className="text-foreground font-medium">{link.value}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
