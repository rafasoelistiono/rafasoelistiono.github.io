import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ExperienceForm from "@/components/admin/ExperienceForm";
import { updateExperienceAction } from "@/app/admin/experience/actions";
import { getExperience } from "@/lib/experience";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const item = await getExperience(id);
  if (!item) notFound();

  return (
    <AdminLayout title={`Edit ${item.role}`}>
      <ExperienceForm action={updateExperienceAction.bind(null, item.id)} item={item} submitLabel="Update experience" />
    </AdminLayout>
  );
}
