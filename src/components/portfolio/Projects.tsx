import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

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
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          Projects
        </motion.p>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group bg-card rounded-xl p-8 border border-border/50 hover:border-border transition-all hover:shadow-lg"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted-foreground hover:text-accent hover:bg-secondary rounded transition-all"
                        aria-label="Live demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted-foreground hover:text-accent hover:bg-secondary rounded transition-all"
                        aria-label="GitHub repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <p className="text-sm text-foreground/80 mb-4">
                    <span className="font-medium">Role:</span> {project.role}
                  </p>

                  {project.credentials && (
                    <p className="text-sm font-mono text-accent mb-4">
                      {project.credentials}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">
                      Key Technical Decisions
                    </h4>
                    <ul className="space-y-2">
                      {project.decisions.map((decision, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-accent mt-1.5">•</span>
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Outcomes:
                      </span>{" "}
                      {project.outcomes}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
