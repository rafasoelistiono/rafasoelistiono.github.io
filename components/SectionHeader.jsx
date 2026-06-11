import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import AnimatedReveal from "@/components/AnimatedReveal";

export default function SectionHeader({ label, title, actionHref, actionLabel }) {
  return (
    <AnimatedReveal className="section-header">
      <p className="eyebrow">{label}</p>
      <div>
        <h2>{title}</h2>
        {actionHref && actionLabel ? (
          <Link className="text-link" href={actionHref}>
            {actionLabel} <ArrowIcon className="link-arrow" />
          </Link>
        ) : null}
      </div>
    </AnimatedReveal>
  );
}
