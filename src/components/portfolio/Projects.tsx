import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    name: "Jobby Application",
    description:
      "A job search platform that allows users to securely log in, explore job opportunities, and filter results based on salary range and employment type.",
    role: "Owned the frontend development end-to-end, from component design to API integration and state management.",
    tech: ["React", "JavaScript", "CSS", "REST APIs"],
    decisions: [
      "Built modular, reusable React components for login, job listings, and job detail views",
      "Implemented client-side storage to persist authentication state",
      "Managed API calls and authorization flow for protected routes",
      "Designed responsive layouts for seamless experience across devices",
    ],
    outcomes:
      "Strengthened understanding of React component architecture, authentication flows, and translating product requirements into scalable UI components.",
    liveUrl: "https://jobbypathy.ccbp.tech/login",
    githubUrl: "https://github.com/LakshmipathiNakka/jobby-app.git",
    credentials: "Login: rahul / rahul@2021",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
];

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
          className="section-heading flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent" />
          Projects
        </motion.p>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-5 sm:p-8 lg:p-10 overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-secondary/80 text-secondary-foreground text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 glass-card rounded-xl text-muted-foreground hover:text-accent transition-colors"
                        aria-label="Live demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 glass-card rounded-xl text-muted-foreground hover:text-accent transition-colors"
                        aria-label="GitHub repository"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <p className="text-foreground/80 mb-4">
                    <span className="font-semibold text-foreground">Role:</span> {project.role}
                  </p>

                  {project.credentials && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg mb-6">
                      <span className="text-sm font-mono text-accent">
                        {project.credentials}
                      </span>
                    </div>
                  )}

                  {/* Expandable Details */}
                  <motion.button
                    onClick={() => setExpandedProject(expandedProject === project.name ? null : project.name)}
                    className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-glow transition-colors mb-4"
                  >
                    {expandedProject === project.name ? "Hide details" : "Show details"}
                    {expandedProject === project.name ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </motion.button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedProject === project.name ? "auto" : 0,
                      opacity: expandedProject === project.name ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6 pt-4 border-t border-border/50">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          Key Technical Decisions
                        </h4>
                        <ul className="space-y-2">
                          {project.decisions.map((decision, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-3"
                            >
                              <span className="text-accent mt-0.5">→</span>
                              {decision}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-border/30">
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          Outcomes
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.outcomes}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};