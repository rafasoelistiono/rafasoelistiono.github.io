import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { getProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "My Project",
  description: "Selected backend, full-stack, web mobile, and robotics projects by Rafa Soelistiono.",
  alternates: {
    canonical: "/projects"
  },
  openGraph: {
    title: "My Project | Rafa Soelistiono",
    description: "Selected backend, full-stack, web mobile, and robotics projects by Rafa Soelistiono.",
    url: absoluteUrl("/projects")
  }
};

const PROJECTS_PER_PAGE = 4;

export default async function ProjectsPage({ searchParams }) {
  const projects = await getProjects();
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page || 1) || 1);
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = projects.slice(start, start + PROJECTS_PER_PAGE);

  return (
    <main className="page-shell">
      <SectionHeader
        label="My Project"
        title="A focused archive of backend, full-stack, and robotics systems."
      />
      <div className="project-list">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={start + index} />
        ))}
      </div>
      {totalPages > 1 ? (
        <nav className="pagination-nav" aria-label="Project pagination">
          <Link
            href={`/projects?page=${Math.max(1, safePage - 1)}`}
            aria-disabled={safePage === 1}
            className={safePage === 1 ? "is-disabled" : ""}
          >
            Previous 4
          </Link>
          <span>
            Page {safePage} / {totalPages}
          </span>
          <Link
            href={`/projects?page=${Math.min(totalPages, safePage + 1)}`}
            aria-disabled={safePage === totalPages}
            className={safePage === totalPages ? "is-disabled" : ""}
          >
            Next 4
          </Link>
        </nav>
      ) : null}
    </main>
  );
}
