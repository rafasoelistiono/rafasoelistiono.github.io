import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { getProjects } from "@/lib/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = {
  title: "Projects - Web Dev, Backend, and Robotics",
  description:
    "Projects by Rafa Soelistiono (rafasoelistiono), a software engineer and web developer working across backend services, full-stack web, mobile platforms, and robotics.",
  alternates: {
    canonical: "/projects"
  },
  openGraph: {
    title: "Projects - Web Dev, Backend, and Robotics | Rafa Soelistiono",
    description:
      "Selected software engineering, web dev, backend, and robotics projects by Rafa Soelistiono.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Rafa Soelistiono",
    description: metadata.description,
    url: absoluteUrl("/projects"),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.alternateName,
      url: siteConfig.url
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.link || project.repository || absoluteUrl("/projects"),
          keywords: project.category
        }
      }))
    }
  };

  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
