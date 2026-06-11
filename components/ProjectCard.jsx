import ArrowIcon from "@/components/ArrowIcon";
import AnimatedReveal from "@/components/AnimatedReveal";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <AnimatedReveal as="article" className="project-card project-card-text" delay={index * 80}>
      <span className="item-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="project-content" id={project.slug}>
        <p className="eyebrow">
          {project.category} / {project.year}
        </p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="card-actions">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View project <ArrowIcon className="link-arrow" />
            </a>
          ) : null}
          {project.repository ? (
            <a href={project.repository} target="_blank" rel="noopener noreferrer">
              Repository <ArrowIcon className="link-arrow" />
            </a>
          ) : null}
        </div>
      </div>
    </AnimatedReveal>
  );
}
