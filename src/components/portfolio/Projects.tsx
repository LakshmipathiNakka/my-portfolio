import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight, ChevronDown, Zap, Target, Rocket, Video, ShoppingBag, Briefcase, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPWithCleanup } from "@/hooks/useGSAP";
import { getAnimationConfig } from "@/lib/motionPreferences";
import { easings, durations } from "@/lib/gsapAnimations";
import { BlurText } from "@/components/ui/blur-text";
import { ReadMoreText } from "@/components/ui/ReadMoreText";
import { ShinyText } from "@/components/ui/ShinyText";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    name: "Nxt Watch",
    tagline: "Premium Video Streaming Platform",
    description:
      "A sophisticated YouTube-inspired platform delivering a seamless video browsing experience with real-time features and personalized navigation.",
    role: "Full-stack Developer",
    tech: ["React", "JavaScript", "Styled Components", "REST APIs"],
    decisions: [
      "Implemented Route Guard patterns for secure authentication",
      "Optimized video search with debounced API calls",
      "Engineered a state-driven theme engine for instant palette shifts",
      "Developed a 'Saved Videos' feature using global state persistence"
    ],
    outcome: "Achieved a fluid, single-page application feel with 100% route protection and interactive content discovery.",
    liveUrl: "https://nxtwatchpathy.ccbp.tech/login",
    githubUrl: "https://github.com/LakshmipathiNakka/NXT-watch.git",
    credentials: "rahul / rahul@2021",
    accentColor: "from-red-500 to-rose-600",
    icon: Video,
  },
  {
    name: "Nxt Trendz",
    tagline: "Enterprise E-commerce Solution",
    description:
      "A high-performance e-commerce engine focusing on complex cart management, real-time inventory logic, and secure checkout flows.",
    role: "Frontend Engineer",
    tech: ["React", "Context API", "CSS Modules", "REST APIs"],
    decisions: [
      "Leveraged Context API for scalable global cart state management",
      "Architected complex quantity management logic to handle edge cases",
      "Designed dynamic pricing computation with real-time tax/discount logic",
      "Built a resilient product filtering system with persistent state"
    ],
    outcome: "Reduced checkout friction and successfully handled multi-item cart synchronization with high performance.",
    liveUrl: "https://nxttrendspathy.ccbp.tech/login",
    githubUrl: "https://github.com/LakshmipathiNakka/NXT-trends-app.git",
    credentials: "rahul / rahul@2021",
    accentColor: "from-blue-500 to-cyan-500",
    icon: ShoppingBag,
  },
  {
    name: "Jobby App",
    tagline: "Career Discovery Ecosystem",
    description:
      "A comprehensive job search platform bridging the gap between talent and opportunity with advanced filtering and deep career insights.",
    role: "Lead UI Developer",
    tech: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
    decisions: [
      "Engineered an multi-criteria filter system for targeted job discovery",
      "Integrated secure JWT-based authentication with high-integrity persistence",
      "Optimized component rendering for search results through virtualization",
      "Developed detailed, dynamic job specification views with rich media"
    ],
    outcome: "Empowered users with precise job discovery tools and a stable, high-trust authentication ecosystem.",
    liveUrl: "https://jobbypathy.ccbp.tech/login",
    githubUrl: "https://github.com/LakshmipathiNakka/jobby-app.git",
    credentials: "rahul / rahul@2021",
    accentColor: "from-orange-500 to-amber-500",
    icon: Briefcase,
  },
  {
    name: "IPL Dashboard",
    tagline: "Real-time Sports Analytics Hub",
    description:
      "An interactive data visualization dashboard providing deep dives into IPL team historical performance and match statistical trends.",
    role: "Data Interaction Specialist",
    tech: ["React", "React Router", "ApexCharts", "REST APIs"],
    decisions: [
      "Utilized route-based parameters for dynamic data fetching of team stats",
      "Implemented complex match logic to process and display historical results",
      "Designed an intuitive navigation layout for cross-team performance comparisons",
      "Integrated responsive charts for mobile-first analytical displays"
    ],
    outcome: "Translated raw sports data into actionable insights through localized, interactive visualizations.",
    liveUrl: "https://iplbypathy.ccbp.tech/",
    githubUrl: "https://github.com/LakshmipathiNakka/ipl-Dashboard-App",
    credentials: "",
    accentColor: "from-purple-500 to-pink-500",
    icon: Trophy,
  },
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [showAllDecisions, setShowAllDecisions] = useState(false);
  const animConfig = getAnimationConfig();

  // Reset expansion when slide changes
  useEffect(() => {
    setShowAllDecisions(false);
  }, [currentIndex]);

  useGSAPWithCleanup(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 * animConfig.distanceMultiplier },
      {
        opacity: 1,
        y: 0,
        duration: durations.slow,
        ease: easings.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      }
    );
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="section-container" ref={containerRef}>
        <div className="flex items-center justify-between mb-16 px-4">
          <div className="section-heading flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            <BlurText
              text="Featured Projects"
              as="span"
              className="text-sm font-medium uppercase tracking-wider text-accent"
              delay={0}
              duration={0.8}
            />
          </div>

          {/* Navigation buttons - Certifications style */}
          <div className="hidden sm:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="p-3 glass-card rounded-xl text-foreground hover:text-accent hover:border-accent/30 transition-all flex items-center justify-center"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="p-3 glass-card rounded-xl text-foreground hover:text-accent hover:border-accent/30 transition-all flex items-center justify-center"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          {/* Main Carousel View */}
          <div className="relative min-h-[600px] md:min-h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="w-full"
              >
                <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border-white/5 dark:border-white/10 flex flex-col md:flex-row h-full">
                  {/* Left Column: Visual & Tech */}
                  <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-border/50 bg-secondary/20 bg-clip-padding backdrop-blur-sm relative overflow-hidden">
                    {/* Background Domain Pattern */}
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-[0.03] pointer-events-none rotate-12">
                      <currentProject.icon className="w-full h-full" />
                    </div>

                    <div className="relative z-10">
                      <div className={`w-12 h-1 bg-gradient-to-r ${currentProject.accentColor} rounded-full mb-8`} />
                      <div className="flex items-center gap-3 mb-4">
                        <currentProject.icon className="w-6 h-6 text-accent" />
                        <BlurText
                          text={currentProject.name}
                          as="h3"
                          className="text-3xl md:text-4xl font-bold text-foreground"
                          delay={0.1}
                        />
                      </div>
                      <p className="text-sm text-accent font-mono mb-8">{currentProject.tagline}</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 flex items-center gap-2">
                          <Zap className="w-3 h-3 text-accent" />
                          Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-background/50 text-foreground/80 text-xs font-medium rounded-lg border border-border/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <motion.a
                          href={currentProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 btn-primary py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 group"
                        >
                          Live App <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </motion.a>
                        <motion.a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-secondary/80 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      </div>

                      {currentProject.credentials && (
                        <div className="text-[10px] font-mono text-muted-foreground bg-accent/5 p-3 rounded-lg border border-accent/10">
                          <span className="text-accent">Credentials:</span> {currentProject.credentials}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Deep Dive */}
                  <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BlurText text="The Mission" as="span" className="opacity-70" delay={0.2} />
                      </h4>
                      <div className="text-muted-foreground text-lg leading-relaxed italic">
                        <ReadMoreText
                          text={currentProject.description}
                          className="text-muted-foreground text-lg leading-relaxed italic"
                          mobileTruncateLength={80}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4 flex items-center gap-2">
                          <Target className="w-3 h-3 text-accent" />
                          Role & Logic
                        </h4>
                        <div className="text-sm font-medium text-foreground mb-3">{currentProject.role}</div>

                        {/* Decision List: Responsive Truncation */}
                        <ul className="space-y-3">
                          {currentProject.decisions.map((decision, i) => (
                            <li
                              key={i}
                              className={cn(
                                "text-xs text-muted-foreground flex items-start gap-2 transition-all duration-300",
                                !showAllDecisions && i >= 2 && "hidden sm:flex"
                              )}
                            >
                              <span className="text-accent mt-1 opacity-50">•</span>
                              {decision}
                            </li>
                          ))}
                        </ul>

                        {currentProject.decisions.length > 2 && (
                          <button
                            onClick={() => setShowAllDecisions(!showAllDecisions)}
                            className="sm:hidden mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors focus:outline-none"
                          >
                            {showAllDecisions ? "Show less" : "Show more"}
                            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showAllDecisions && "rotate-180")} />
                          </button>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4 flex items-center gap-2">
                          <Rocket className="w-3 h-3 text-accent" />
                          The Result
                        </h4>
                        <div className="text-sm text-muted-foreground leading-relaxed bg-accent/5 p-4 rounded-2xl border border-accent/10">
                          <ReadMoreText
                            text={currentProject.outcome}
                            className="text-sm text-muted-foreground leading-relaxed"
                            mobileTruncateLength={60}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12 mb-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="group relative p-2"
                aria-label={`Go to project ${index + 1}`}
              >
                <div className={`h-1.5 transition-all duration-500 rounded-full ${index === currentIndex ? "w-8 bg-accent" : "w-1.5 bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                  }`} />
              </button>
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
      </div>
    </section>
  );
};

