import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProjectAction } from "@/app/admin/projects/actions";
import { getProject } from "@/lib/projects";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <AdminLayout title={`Edit ${project.title}`}>
      <ProjectForm action={updateProjectAction.bind(null, project.id)} project={project} submitLabel="Update project" />
    </AdminLayout>
  );
}
