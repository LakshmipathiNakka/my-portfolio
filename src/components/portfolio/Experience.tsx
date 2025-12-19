import { motion } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPWithCleanup } from "@/hooks/useGSAP";
import { getAnimationConfig } from "@/lib/motionPreferences";
import { easings, durations, staggers } from "@/lib/gsapAnimations";
import { BlurText } from "@/components/ui/blur-text";

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    company: "Actalyst",
    role: "Software Developer",
    duration: "Sep 2025 – Present",
    summary: "Building and shipping production-grade software solutions.",
    highlights: [
      "Owned frontend development for scalable web applications",
      "Applied DSA fundamentals to optimize performance-critical code",
      "Delivered features end-to-end with focus on user experience",
    ],
    current: true,
  },
  {
    company: "NxtWave",
    role: "Technical Content Developer",
    duration: "Oct 2024 – Aug 2025",
    summary: "Created DSA problems and learning materials for 50,000+ students.",
    highlights: [
      "Designed 100+ coding problems aligned with FAANG interview patterns",
      "Shipped content 40% faster using AI tools (Lovable, Cursor, ChatGPT)",
      "Owned quality across C++, Python, and Full Stack modules",
    ],
    current: false,
  },
];

// Framer Motion variants removed - using GSAP for scroll animations

export const Experience = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineLineRef = useRef(null);
  const animConfig = getAnimationConfig();

  // GSAP scroll-triggered animations
  useGSAPWithCleanup(() => {
    if (!sectionRef.current) return;

    // Animate timeline line progressively (heading handled by BlurText)
    if (timelineLineRef.current) {
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: durations.verySlow,
          ease: easings.expo,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }

    // Stagger experience items
    gsap.fromTo(
      ".experience-item",
      { opacity: 0, x: -60 * animConfig.distanceMultiplier },
      {
        opacity: 1,
        x: 0,
        duration: durations.slow,
        ease: easings.expo,
        stagger: staggers.loose * animConfig.staggerMultiplier,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="experience" className="py-28 relative" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10" ref={sectionRef}>
        <div className="section-heading flex items-center gap-3 mb-12">
          <span className="w-8 h-px bg-accent" />
          <BlurText
            text="Experience"
            as="span"
            className="text-sm font-medium uppercase tracking-wider text-accent"
            delay={0}
            duration={0.8}
          />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            ref={timelineLineRef}
            className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-border rounded-full"
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className="experience-item relative pl-16 md:pl-24"
              >
                {/* Timeline node */}
                <div className="absolute left-6 md:left-8 -translate-x-1/2 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${exp.current
                      ? "bg-accent text-accent-foreground shadow-[0_0_20px_hsl(var(--accent)/0.4)]"
                      : "glass-card text-muted-foreground"
                      }`}
                  >
                    <Briefcase className="w-5 h-5" />
                  </motion.div>
                  {exp.current && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 w-12 h-12 rounded-xl bg-accent"
                    />
                  )}
                </div>

                <motion.div
                  whileHover={{ y: -4, x: 4 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-6 lg:p-8 group hover:border-accent/30 hover:shadow-[0_20px_50px_-12px_hsl(var(--accent)/0.15)] transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <BlurText
                          text={exp.role}
                          as="h3"
                          className="text-xl font-bold text-foreground group-hover:text-accent transition-colors"
                          delay={0}
                          duration={0.6}
                        />
                        {exp.current && (
                          <span className="inline-flex items-center px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-1.5 animate-pulse" />
                            Now
                          </span>
                        )}
                      </div>
                      <BlurText
                        text={exp.company}
                        as="p"
                        className="text-lg text-accent font-medium"
                        delay={0.2}
                        duration={0.5}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary/50 px-3 py-1.5 rounded-lg">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Impact highlights */}
                  <div className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-foreground/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
