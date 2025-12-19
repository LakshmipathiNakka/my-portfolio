import { motion } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Award, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPWithCleanup } from "@/hooks/useGSAP";
import { getAnimationConfig } from "@/lib/motionPreferences";
import { easings, durations, staggers } from "@/lib/gsapAnimations";
import { BlurText } from "@/components/ui/blur-text";
import { ShinyText } from "@/components/ui/ShinyText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
    title: "Build Your Own Dynamic Web Application",
    organization: "NxtWave",
    description: "DOM manipulation, API integration, and real frontend logic.",
    credentialUrl: "https://certificates.ccbp.in/academy/dynamic-web-application?id=GLWXHQDFKO",
    year: "2024",
    skills: [
      { icon: "logos:javascript", label: "JavaScript" },
      { icon: "vscode-icons:file-type-html", label: "DOM" },
    ],
    gradient: "from-amber-500 to-yellow-500",
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
  {
    title: "Responsive Web Design Using Flexbox",
    organization: "NxtWave",
    description: "CSS layout competence with Flexbox for responsive designs.",
    credentialUrl: "https://certificates.ccbp.in/academy/responsive-web-design-using-flexbox?id=SEMWPZTLSF",
    year: "2024",
    skills: [{ icon: "vscode-icons:file-type-css", label: "CSS" }],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Build Your Own Responsive Website",
    organization: "NxtWave",
    description: "Bootstrap and responsive design thinking for modern websites.",
    credentialUrl: "https://certificates.ccbp.in/academy/build-your-own-responsive-website?id=JVBIYXPXJH",
    year: "2024",
    skills: [
      { icon: "logos:bootstrap", label: "Bootstrap" },
      { icon: "vscode-icons:file-type-css", label: "CSS" },
    ],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Build Your Own Static Website",
    organization: "NxtWave",
    description: "HTML/CSS foundations for building static websites.",
    credentialUrl: "https://certificates.ccbp.in/academy/static-website?id=QYUFCAMVKR",
    year: "2024",
    skills: [
      { icon: "vscode-icons:file-type-html", label: "HTML" },
      { icon: "vscode-icons:file-type-css", label: "CSS" },
      { icon: "logos:bootstrap", label: "Bootstrap" },
    ],
    gradient: "from-slate-500 to-gray-500",
  },
];

export const Certifications = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const carouselRef = useRef(null);
  const animConfig = getAnimationConfig();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  // GSAP scroll-triggered animations
  useGSAPWithCleanup(() => {
    if (!sectionRef.current) return;

    // Animate carousel container
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 40 * animConfig.distanceMultiplier },
        {
          opacity: 1,
          y: 0,
          duration: durations.medium,
          ease: easings.smooth,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }
  }, []);

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

      <div className="section-container relative z-10" ref={sectionRef}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1">
            <div className="section-heading flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-accent" />
              <BlurText
                text="Certifications"
                as="span"
                className="text-sm font-medium uppercase tracking-wider text-accent"
                delay={0}
                duration={0.8}
              />
            </div>
            <ScrollReveal className="text-muted-foreground max-w-xl">
              Verified learning across React, Node.js, databases, and core fundamentals.
            </ScrollReveal>
          </div>

          <div className="flex items-center gap-8">

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
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="overflow-hidden"
        >
          <div ref={emblaRef}>
            <div className="flex gap-6 py-4">
              {certifications.map((cert, index) => (
                <CertificationCard key={cert.title} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </div>


        {/* Dot indicators - subtle */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                ? "w-4 bg-accent"
                : "bg-border/50 hover:bg-muted-foreground"
                }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>

        {/* "And many more" footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="mt-6">
            <p className="home-many-more">and many more...</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation (max 5 degrees)
    setRotateX(((mouseY - centerY) / (rect.height / 2)) * -5);
    setRotateY(((mouseX - centerX) / (rect.width / 2)) * 5);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-card rounded-2xl overflow-hidden h-full flex flex-col group hover:shadow-[0_20px_50px_-12px_hsl(var(--accent)/0.2)] hover:border-accent/30 transition-all duration-500"
      >
        {/* Gradient header */}
        <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />

        <div className="p-6 flex flex-col flex-1 relative">
          {/* Subtle Glow Background */}
          <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

          <div className="relative z-10 flex flex-col flex-1">
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
              <div className={`p-2 rounded-lg bg-gradient-to-br ${cert.gradient} bg-opacity-10 group-hover:scale-110 transition-transform duration-500 shadow-sm group-hover:shadow-[0_0_15px_hsl(var(--accent)/0.3)]`}>
                <Award className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors" />
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
                    <Icon
                      icon={skill.icon}
                      className={cn(
                        "w-5 h-5",
                        skill.icon === "logos:express" && "dark:invert dark:brightness-200"
                      )}
                    />
                  </motion.div>
                ))}
              </div>
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-glow transition-colors py-1 pl-2"
              >
                View
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
