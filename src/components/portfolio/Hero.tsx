import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/LakshmipathiNakka",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/lakshmeepathinakka/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:lakshmeepathin184@gmail.com",
    label: "Email",
  },
];

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="section-container py-20">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground font-mono text-sm mb-4"
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance"
          >
            Lakshmeepathi Nakka
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl text-muted-foreground font-medium mb-6"
          >
            Software Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8"
          >
            Building scalable, user-centric web applications with React and modern JavaScript. 
            I combine strong problem-solving skills with product thinking to deliver clean, performant solutions end-to-end.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-sm text-muted-foreground">
              📍 Hyderabad, India
            </span>
            <span className="text-muted-foreground/30">•</span>
            <span className="text-sm text-accent font-medium">
              Open to remote
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-6"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-all"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1ZXYWUoqHLpEvyBY4Nxhg0ggETjzpALPj/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              View Resume →
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.a>
    </section>
  );
};
