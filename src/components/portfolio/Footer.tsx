import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="py-8 border-t border-border"
    >
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Lakshmeepathi Nakka. Built with care.
          </p>
          <p className="text-sm text-muted-foreground">
            Hyderabad, India
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
