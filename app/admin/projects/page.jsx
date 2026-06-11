import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects } from "@/lib/projects";
import { requireAdmin } from "@/lib/auth";
import { deleteProjectAction } from "@/app/admin/projects/actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await getProjects();

  return (
    <AdminLayout
      title="Projects"
      action={<Link className="admin-action" href="/admin/projects/new">New project</Link>}
    >
      <div className="admin-list">
        {projects.map((project) => (
          <article key={project.id} className="admin-list-item">
            <div>
              <p className="eyebrow">{project.category} / {project.year}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
            <div className="admin-row-actions">
              <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
              <form action={deleteProjectAction.bind(null, project.id)}>
                <button type="submit">Delete</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
}
