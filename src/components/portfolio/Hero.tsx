import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";
import { ParticleBackground } from "./ParticleBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPWithCleanup } from "@/hooks/useGSAP";
import { getAnimationConfig } from "@/lib/motionPreferences";
import { easings, durations, staggers } from "@/lib/gsapAnimations";
import { BlurText } from "@/components/ui/blur-text";
import { DarkVeilShader } from "@/components/effects/DarkVeilShader";
import { TechnicalGrid } from "@/components/ui/VectorAssets";

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const ref = useRef(null);
  const heroContentRef = useRef(null);
  const profileImageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Get animation configuration
  const animConfig = getAnimationConfig();

  // GSAP page load sequence
  useGSAPWithCleanup(() => {
    if (!heroContentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: easings.smooth } });

    // Animate hero content in sequence (skip name and role - handled by BlurText)
    tl.fromTo(
      ".hero-greeting",
      { opacity: 0, y: 30 * animConfig.distanceMultiplier },
      { opacity: 1, y: 0, duration: durations.slow }
    )
      .fromTo(
        ".hero-description",
        { opacity: 0, y: 30 * animConfig.distanceMultiplier },
        { opacity: 1, y: 0, duration: durations.medium },
        `-=${durations.fast}`
      )
      .fromTo(
        ".hero-location",
        { opacity: 0, y: 20 * animConfig.distanceMultiplier },
        { opacity: 1, y: 0, duration: durations.fast },
        `-=${durations.fast * 0.5}`
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 * animConfig.distanceMultiplier },
        { opacity: 1, y: 0, duration: durations.medium },
        `-=${durations.fast * 0.5}`
      );

    // Parallax effect on profile image (scroll-based)
    if (animConfig.enableParallax && profileImageRef.current) {
      gsap.to(profileImageRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* WebGL Shader Background - Lowest layer */}
      <div className="absolute inset-0 z-0">
        <DarkVeilShader />
        <TechnicalGrid className="text-accent/20" />
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating accent shapes - Toned down */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 right-[10%] sm:right-[15%] w-32 sm:w-48 h-32 sm:h-48 bg-accent/5 rounded-full blur-[80px] animate-float"
        />
        <motion.div
          style={{ y }}
          className="absolute bottom-32 left-[5%] sm:left-[10%] w-48 sm:w-64 h-48 sm:h-64 bg-accent/3 rounded-full blur-[100px] animate-float-delayed"
        />
      </div>

      <motion.div style={{ opacity }} className="section-container relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-16 py-20 min-h-[calc(100vh-80px)]">
        {/* Text Content */}
        <div
          ref={heroContentRef}
          className="flex-1 max-w-2xl text-center md:text-left order-2 md:order-1"
        >
          <p
            className="hero-greeting text-accent font-mono text-sm mb-4 flex items-center justify-center md:justify-start gap-2"
          >
            <span className="w-8 h-px bg-accent" />
            Hi, I'm
          </p>

          <BlurText
            text="Lakshmeepathi Nakka"
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 text-balance leading-[1.1]"
            delay={0.3}
            duration={1.0}
          />

          <BlurText
            text="Software Developer"
            as="p"
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-6"
            delay={0.8}
            duration={0.9}
          />

          <BlurText
            text="Building scalable, user-centric web applications with React and modern JavaScript. I combine strong problem-solving skills with product thinking to deliver clean, performant solutions end-to-end."
            as="p"
            className="text-lg text-muted-foreground leading-relaxed mb-8 mx-auto md:mx-0 max-w-2xl"
            delay={1.3}
            duration={0.7}
          />

          <div
            className="hero-location flex items-center justify-center md:justify-start gap-4 mb-10"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Hyderabad, India
            </span>
            <span className="text-border">|</span>
            <span className="text-sm text-accent font-medium">
              Open to remote
            </span>
          </div>

          <div
            className="hero-cta flex flex-col sm:flex-row items-center md:items-start gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-8 py-4 text-base font-semibold group"
            >
              Let's build something
              <motion.span
                className="inline-block ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.a>

            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 text-muted-foreground hover:text-accent glass-card rounded-xl transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.a
            href="https://drive.google.com/file/d/1ZXYWUoqHLpEvyBY4Nxhg0ggETjzpALPj/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors mt-4 group"
          >
            <span>View Resume</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="text-accent"
            >
              →
            </motion.span>
          </motion.a>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="order-1 md:order-2 flex-shrink-0"
        >
          <div className="relative" ref={profileImageRef}>
            <div className="absolute -inset-4 bg-accent/20 rounded-[32px] blur-3xl opacity-40" />
            <div className="absolute -inset-2 bg-gradient-to-tr from-accent/30 via-accent/10 to-transparent rounded-[28px] blur-xl opacity-60" />
            <img
              src="/profile.jpg"
              alt="Lakshmeepathi Nakka"
              className="relative w-48 h-48 md:w-[22rem] md:h-[22rem] lg:w-96 lg:h-96 object-cover rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-accent/20"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as const
        }}
        whileHover={{ y: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 glass-card rounded-full text-muted-foreground hover:text-accent transition-colors group"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
};