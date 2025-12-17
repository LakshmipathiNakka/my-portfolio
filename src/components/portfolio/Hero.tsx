import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Floating accent shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 right-[10%] sm:right-[15%] w-48 sm:w-72 h-48 sm:h-72 bg-accent/5 rounded-full blur-3xl animate-float"
        />
        <motion.div
          style={{ y }}
          className="absolute bottom-32 left-[5%] sm:left-[10%] w-64 sm:w-96 h-64 sm:h-96 bg-accent/3 rounded-full blur-3xl animate-float-delayed"
        />
        <div className="absolute top-1/3 left-[15%] sm:left-[20%] w-3 sm:w-4 h-3 sm:h-4 bg-accent/30 rounded-full animate-glow" />
        <div
          className="absolute top-1/2 right-[20%] sm:right-[25%] w-2 sm:w-3 h-2 sm:h-3 bg-accent/20 rounded-full animate-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <motion.div style={{ opacity }} className="section-container relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-16 py-20 min-h-[calc(100vh-80px)]">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 max-w-2xl text-center md:text-left order-2 md:order-1"
        >
          <motion.p
            variants={itemVariants}
            className="text-accent font-mono text-sm mb-4 flex items-center justify-center md:justify-start gap-2"
          >
            <span className="w-8 h-px bg-accent" />
            Hi, I'm
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 text-balance"
          >
            Lakshmeepathi Nakka
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl sm:text-3xl text-muted-foreground font-medium mb-6"
          >
            Software Developer
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="text-lg text-muted-foreground leading-relaxed mb-8 mx-auto md:mx-0 max-w-2xl"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 mx-auto md:mx-0 max-w-2xl">
              Building scalable, user-centric web applications with React and modern JavaScript.
              I combine strong problem-solving skills with product thinking to deliver clean, performant solutions end-to-end.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center md:justify-start gap-4 mb-10"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Hyderabad, India
            </span>
            <span className="text-border">|</span>
            <span className="text-sm text-accent font-medium">
              Open to remote
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-muted-foreground hover:text-accent glass-card rounded-xl transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}

            <motion.a
              href="https://drive.google.com/file/d/1ZXYWUoqHLpEvyBY4Nxhg0ggETjzpALPj/view"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-2 px-5 py-3 glass-card rounded-xl text-sm font-medium text-foreground hover:text-accent transition-colors flex items-center gap-2"
            >
              View Resume
              <span className="text-accent">→</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="order-1 md:order-2 flex-shrink-0"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/20 rounded-[24px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <motion.img
              src="/profile.jpg"
              alt="Lakshmeepathi Nakka"
              className="relative w-40 h-40 md:w-80 md:h-80 object-cover rounded-[24px] shadow-2xl border border-accent/10"
              whileHover={{ scale: 1.02 }} // Minimal meaningful interaction, essentially no-zoom as requested but keeping slight interactivity
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 glass-card rounded-full text-muted-foreground hover:text-accent transition-colors"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.a>
    </section>
  );
};