import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

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

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50 bg-secondary/20">
      <div className="section-container">
        <div className="flex flex-col items-center gap-6">
          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-3 glass-card rounded-xl text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-border" />

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 justify-center">
              Built with <Heart className="w-3.5 h-3.5 text-accent" /> by Lakshmeepathi Nakka
            </p>
            <p className="text-xs text-muted-foreground/70">
              © {currentYear} · Hyderabad, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
