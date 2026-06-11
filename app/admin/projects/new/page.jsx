import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/app/admin/projects/actions";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <AdminLayout title="New project">
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </AdminLayout>
  );
}
