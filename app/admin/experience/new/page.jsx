import AdminLayout from "@/components/admin/AdminLayout";
import ExperienceForm from "@/components/admin/ExperienceForm";
import { createExperienceAction } from "@/app/admin/experience/actions";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewExperiencePage() {
  await requireAdmin();
  return (
    <AdminLayout title="New experience">
      <ExperienceForm action={createExperienceAction} submitLabel="Create experience" />
    </AdminLayout>
  );
}
