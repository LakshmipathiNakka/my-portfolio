import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, ArrowUpRight, Send, CheckCircle, Loader2 } from "lucide-react";

const contactLinks = [
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

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isBrandCollab: false,
  });

  const getErrors = (): FormErrors => {
    const errors: FormErrors = {};
    if (touched.name && !formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (touched.email) {
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email";
      }
    }
    if (touched.message && !formData.message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const errors = getErrors();
  const isFormValid = formData.name.trim() && formData.email.trim() && validateEmail(formData.email) && formData.message.trim();

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isFormValid) return;
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/mrbnneky", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          brandCollaboration: formData.isBrandCollab ? "Yes" : "No",
          subject: "New message from portfolio",
        }),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "", isBrandCollab: false });
        setTouched({ name: false, email: false, message: false });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetForm = () => {
    setFormStatus("idle");
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] sm:max-w-[600px] h-[150px] sm:h-[300px] bg-accent/5 rounded-full blur-3xl" />

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

        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-center"
          >
            Let's build <span className="text-accent">something together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground text-center mb-10 sm:mb-14 max-w-2xl mx-auto"
          >
            Have a project, idea, or collaboration in mind? Drop a message and I'll get back to you.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {formStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Thanks! Your message has been sent.
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        I'll get back to you as soon as possible.
                      </p>
                      <button
                        onClick={resetForm}
                        className="text-accent hover:text-accent/80 font-medium transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Name field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Name <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur("name")}
                          disabled={formStatus === "submitting"}
                          className={`w-full px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all duration-200 disabled:opacity-50 ${
                            errors.name ? "border-destructive/50 focus:border-destructive" : "border-border/50 focus:border-accent/50"
                          }`}
                          placeholder="Your name"
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-xs text-destructive mt-1.5"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur("email")}
                          disabled={formStatus === "submitting"}
                          className={`w-full px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all duration-200 disabled:opacity-50 ${
                            errors.email ? "border-destructive/50 focus:border-destructive" : "border-border/50 focus:border-accent/50"
                          }`}
                          placeholder="you@example.com"
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-xs text-destructive mt-1.5"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Message field */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message <span className="text-accent">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur("message")}
                          disabled={formStatus === "submitting"}
                          className={`w-full px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all duration-200 resize-none disabled:opacity-50 ${
                            errors.message ? "border-destructive/50 focus:border-destructive" : "border-border/50 focus:border-accent/50"
                          }`}
                          placeholder="Tell me about your project or idea..."
                        />
                        <AnimatePresence>
                          {errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-xs text-destructive mt-1.5"
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Brand collab checkbox */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="isBrandCollab"
                          name="isBrandCollab"
                          checked={formData.isBrandCollab}
                          onChange={handleInputChange}
                          disabled={formStatus === "submitting"}
                          className="mt-1 w-4 h-4 rounded border-border/50 text-accent focus:ring-accent/30 focus:ring-2 bg-background/50 cursor-pointer disabled:opacity-50"
                        />
                        <label htmlFor="isBrandCollab" className="text-sm text-muted-foreground cursor-pointer">
                          This is regarding a brand collaboration
                        </label>
                      </div>

                      {/* Server error */}
                      {formStatus === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          Something went wrong. Please try again.
                        </motion.p>
                      )}

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={formStatus === "submitting" || !isFormValid}
                        whileHover={formStatus !== "submitting" && isFormValid ? { y: -2 } : {}}
                        whileTap={formStatus !== "submitting" && isFormValid ? { scale: 0.98 } : {}}
                        className="w-full btn-primary py-3.5 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group transition-opacity"
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Side Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <div className="glass-card rounded-2xl p-6 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-accent/10 rounded-xl">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">Prefer email?</span>
                </div>
                <p className="text-foreground font-medium text-sm sm:text-base">
                  Reach out directly and I'll respond within 24 hours.
                </p>
              </div>

              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group glass-card rounded-2xl p-5 hover:border-accent/30 hover:shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.2)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                        <link.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                        <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                          {link.label}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all duration-200 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
