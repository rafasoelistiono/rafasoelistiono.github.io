import { siteConfig } from "@/lib/site";

export default function ContactStrip() {
  return (
    <aside className="contact-strip" aria-label="Contact details">
      <span>Available for collaboration</span>
      <a href={siteConfig.url}>rafasoelistiono.tech</a>
      <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
        @rafasoelistiono
      </a>
      <span>2026</span>
    </aside>
  );
}
