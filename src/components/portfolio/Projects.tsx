import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronDown, Zap } from "lucide-react";

const projects = [
  {
    name: "Nxt Watch",
    tagline: "Video streaming platform",
    description:
      "A YouTube-inspired platform with authentication, video browsing, search, saved videos, and theme toggle.",
    tech: ["React", "JavaScript", "CSS", "REST APIs"],
    decisions: [
      "Protected routes for authenticated users",
      "Multi-section video browsing (Trending, Gaming, Saved)",
      "Search with REST API integration",
      "Light/Dark theme toggle",
    ],
    outcome: "Multi-route React apps with global UI state management.",
    liveUrl: "https://nxtwatchpathy.ccbp.tech/login",
    githubUrl: "https://github.com/LakshmipathiNakka/NXT-watch.git",
    credentials: "rahul / rahul@2021",
    accentColor: "from-red-500 to-rose-600",
  },
  {
    name: "Nxt Trendz",
    tagline: "E-commerce cart system",
    description:
      "Full cart functionality with quantity management, real-time updates, and protected checkout flow.",
    tech: ["React", "Context API", "CSS", "REST APIs"],
    decisions: [
      "Global cart state with Context API",
      "Quantity-based logic to prevent duplicates",
      "Dynamic total calculation",
      "Protected routes for cart access",
    ],
    outcome: "Global state management and e-commerce cart patterns.",
    liveUrl: "https://nxttrendspathy.ccbp.tech/login",
    githubUrl: "https://github.com/LakshmipathiNakka/NXT-trends-app.git",
    credentials: "rahul / rahul@2021",
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    name: "Jobby App",
    tagline: "Job search platform",
    description:
      "Job search with secure login, filters for salary range and employment type, and detailed job views.",
    tech: ["React", "JavaScript", "CSS", "REST APIs"],
    decisions: [
      "Modular, reusable components",
      "Client-side auth persistence",
      "Protected route architecture",
      "Responsive cross-device layouts",
    ],
    outcome: "Authentication flows and scalable component architecture.",
    liveUrl: "https://jobbypathy.ccbp.tech/login",
    githubUrl: "https://github.com/LakshmipathiNakka/jobby-app.git",
    credentials: "rahul / rahul@2021",
    accentColor: "from-orange-500 to-amber-500",
  },
  {
    name: "IPL Dashboard",
    tagline: "Sports analytics dashboard",
    description:
      "Interactive IPL tracker with team performance, match results, and dynamic route-based navigation.",
    tech: ["React", "React Router", "JavaScript", "REST APIs"],
    decisions: [
      "Client-side routing with React Router",
      "Dynamic routes with path parameters",
      "Async data fetching for teams/matches",
      "404 handling for invalid URLs",
    ],
    outcome: "Dynamic routing and structured SPA navigation.",
    liveUrl: "https://iplbypathy.ccbp.tech/",
    githubUrl: "https://github.com/LakshmipathiNakka/ipl-Dashboard-App",
    credentials: "",
    accentColor: "from-purple-500 to-pink-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-28 relative" ref={ref}>
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading flex items-center gap-3 mb-12"
        >
          <span className="w-8 h-px bg-accent" />
          Projects
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-shadow duration-300 group-hover:shadow-[0_20px_50px_-12px_hsl(var(--accent)/0.25)]">
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${project.accentColor}`} />
                
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{project.tagline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 bg-secondary/80 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                        aria-label="Live demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 bg-secondary/80 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                        aria-label="GitHub repository"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-secondary/60 text-foreground/80 text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Credentials */}
                  {project.credentials && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-accent/5 border border-accent/20 rounded-lg mb-4">
                      <span className="text-xs font-mono text-accent">{project.credentials}</span>
                    </div>
                  )}

                  {/* Expandable section */}
                  <div className="mt-auto">
                    <motion.button
                      onClick={() => setExpandedProject(expandedProject === project.name ? null : project.name)}
                      className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-glow transition-colors w-full justify-between py-2"
                    >
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Technical decisions
                      </span>
                      <motion.span
                        animate={{ rotate: expandedProject === project.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </motion.button>

                    <AnimatePresence>
                      {expandedProject === project.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-border/50 space-y-4">
                            <ul className="space-y-2">
                              {project.decisions.map((decision, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <span className="text-accent mt-0.5">→</span>
                                  {decision}
                                </motion.li>
                              ))}
                            </ul>
                            <div className="pt-3 border-t border-border/30">
                              <p className="text-xs text-foreground/70">
                                <span className="font-semibold text-foreground">Outcome:</span> {project.outcome}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
