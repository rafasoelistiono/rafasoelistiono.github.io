import Link from "next/link";
import ExperienceItem from "@/components/ExperienceItem";
import SectionHeader from "@/components/SectionHeader";
import { getExperienceItems } from "@/lib/experience";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "My Experience",
  description:
    "Software engineering, reinforcement learning research, and organizational leadership experience from Rafa Soelistiono.",
  alternates: {
    canonical: "/experience"
  },
  openGraph: {
    title: "My Experience | Rafa Soelistiono",
    description:
      "Software engineering, reinforcement learning research, and organizational leadership experience from Rafa Soelistiono.",
    url: absoluteUrl("/experience")
  }
};

const EXPERIENCE_PER_PAGE = 4;

export default async function ExperiencePage({ searchParams }) {
  const items = await getExperienceItems();
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page || 1) || 1);
  const totalPages = Math.max(1, Math.ceil(items.length / EXPERIENCE_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * EXPERIENCE_PER_PAGE;
  const visibleItems = items.slice(start, start + EXPERIENCE_PER_PAGE);

  return (
    <main className="page-shell">
      <SectionHeader
        label="My Experience"
        title="Software engineering, research, and technical leadership in practice."
      />
      <div className="experience-list expanded">
        {visibleItems.map((item, index) => (
          <ExperienceItem key={item.id} item={item} index={start + index} />
        ))}
      </div>
      {totalPages > 1 ? (
        <nav className="pagination-nav" aria-label="Experience pagination">
          <Link
            href={`/experience?page=${Math.max(1, safePage - 1)}`}
            aria-disabled={safePage === 1}
            className={safePage === 1 ? "is-disabled" : ""}
          >
            Previous 4
          </Link>
          <span>
            Page {safePage} / {totalPages}
          </span>
          <Link
            href={`/experience?page=${Math.min(totalPages, safePage + 1)}`}
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
