import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "lakshmeepathin184@gmail.com",
    href: "mailto:lakshmeepathin184@gmail.com",
    icon: Mail,
    description: "Drop me a line",
  },
  {
    label: "LinkedIn",
    value: "lakshmeepathinakka",
    href: "https://www.linkedin.com/in/lakshmeepathinakka/",
    icon: Linkedin,
    description: "Let's connect",
  },
  {
    label: "GitHub",
    value: "LakshmipathiNakka",
    href: "https://github.com/LakshmipathiNakka",
    icon: Github,
    description: "Check my code",
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-28 relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent" />
          Contact
        </motion.p>

        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance"
          >
            Let's build{" "}
            <span className="text-accent">something.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground leading-relaxed mb-12"
          >
            I'm currently open to new opportunities and collaborations. 
            Whether you have a project idea, a job opportunity, or just want to say hi — 
            my inbox is always open.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group glass-card rounded-2xl p-6 hover:border-accent/30 hover:shadow-glow transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                    <link.icon className="w-6 h-6 text-accent" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{link.description}</p>
                <p className="text-foreground font-semibold group-hover:text-accent transition-colors">{link.label}</p>
              </motion.a>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 text-center"
          >
            <motion.a
              href="mailto:lakshmeepathin184@gmail.com"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex btn-primary text-lg px-8 py-4"
            >
              Say Hello
              <span className="ml-2">👋</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};