import { motion, useInView } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Award } from "lucide-react";
import { Icon } from "@iconify/react";

interface SkillIcon {
  icon: string;
  label: string;
}

interface Certification {
  title: string;
  organization: string;
  description: string;
  credentialUrl: string;
  year: string;
  skills: SkillIcon[];
  gradient: string;
}

const certifications: Certification[] = [
  {
    title: "Frontend Development (React JS)",
    organization: "NxtWave",
    description: "Built stateful React apps with hooks, routing, and API-driven UI.",
    credentialUrl: "https://certificates.ccbp.in/academy/react-js?id=HWTMVWZYKS",
    year: "2024",
    skills: [{ icon: "logos:react", label: "React" }],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Backend Development (Node.js)",
    organization: "NxtWave",
    description: "Built REST APIs with Express, auth, and secure backend patterns.",
    credentialUrl: "https://certificates.ccbp.in/academy/node-js?id=UXZIAJXGTI",
    year: "2024",
    skills: [
      { icon: "logos:nodejs-icon", label: "Node.js" },
      { icon: "logos:express", label: "Express" },
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "JavaScript Essentials",
    organization: "NxtWave",
    description: "Core JS fundamentals and async programming for dynamic web apps.",
    credentialUrl: "https://certificates.ccbp.in/academy/javascript-essentials?id=YCZTSMCIDN",
    year: "2024",
    skills: [{ icon: "logos:javascript", label: "JavaScript" }],
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Programming Foundations with Python",
    organization: "NxtWave",
    description: "Python fundamentals including data structures and OOP.",
    credentialUrl: "https://certificates.ccbp.in/academy/programming-foundations-with-python?id=IXBFLVOJJS",
    year: "2024",
    skills: [{ icon: "logos:python", label: "Python" }],
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Developer Foundations",
    organization: "NxtWave",
    description: "OS, networking, CLI, and Git-based version control.",
    credentialUrl: "https://certificates.ccbp.in/academy/developer-foundations?id=RYQKRCFWCS",
    year: "2024",
    skills: [
      { icon: "logos:git-icon", label: "Git" },
      { icon: "logos:bash-icon", label: "CLI" },
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Introduction to Databases",
    organization: "NxtWave",
    description: "SQL querying, data modeling, and MongoDB basics.",
    credentialUrl: "https://certificates.ccbp.in/academy/introduction-to-databases?id=TPCXGEUUYP",
    year: "2024",
    skills: [
      { icon: "logos:postgresql", label: "SQL" },
      { icon: "logos:mongodb-icon", label: "MongoDB" },
    ],
    gradient: "from-purple-500 to-pink-500",
  },
];

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <section id="certifications" className="py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <p className="section-heading flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-accent" />
              Certifications
            </p>
            <p className="text-muted-foreground max-w-xl">
              Verified learning across React, Node.js, databases, and core fundamentals.
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-3 glass-card rounded-xl text-foreground hover:text-accent hover:border-accent/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-3 glass-card rounded-xl text-foreground hover:text-accent hover:border-accent/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl overflow-hidden h-full flex flex-col group hover:shadow-[0_20px_50px_-12px_hsl(var(--accent)/0.2)] transition-all duration-300"
                >
                  {/* Gradient header */}
                  <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-2">
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-accent font-medium">{cert.organization}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground font-mono">{cert.year}</span>
                        </div>
                      </div>
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${cert.gradient} bg-opacity-10`}>
                        <Award className="w-5 h-5 text-foreground/80" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {cert.description}
                    </p>

                    {/* Skills + Link */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        {cert.skills.map((skill) => (
                          <motion.div
                            key={skill.label}
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            className="p-1.5 rounded-lg bg-secondary/50 cursor-default"
                            title={skill.label}
                          >
                            <Icon icon={skill.icon} className="w-6 h-6" />
                          </motion.div>
                        ))}
                      </div>
                      <motion.a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-glow transition-colors"
                      >
                        View
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dot indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 bg-accent"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
