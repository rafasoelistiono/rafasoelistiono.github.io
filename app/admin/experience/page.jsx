import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { getExperienceItems } from "@/lib/experience";
import { requireAdmin } from "@/lib/auth";
import { deleteExperienceAction } from "@/app/admin/experience/actions";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  await requireAdmin();
  const items = await getExperienceItems();

  return (
    <AdminLayout
      title="Experience"
      action={<Link className="admin-action" href="/admin/experience/new">New experience</Link>}
    >
      <div className="admin-list">
        {items.map((item) => (
          <article key={item.id} className="admin-list-item">
            <div>
              <p className="eyebrow">{item.startDate} - {item.endDate}</p>
              <h2>{item.role}</h2>
              <p>{item.company} / {item.location}</p>
            </div>
            <div className="admin-row-actions">
              <Link href={`/admin/experience/${item.id}/edit`}>Edit</Link>
              <form action={deleteExperienceAction.bind(null, item.id)}>
                <button type="submit">Delete</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
}
