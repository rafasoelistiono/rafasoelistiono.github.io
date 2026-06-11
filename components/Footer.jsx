import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <ArrowIcon className="footer-arrow" />
        <h2>Rafa Portfolio</h2>
        <div className="footer-links">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/contact">Contact</Link>
        </div>
        <p>All rights reserved by Rafa Soelistiono - 2026</p>
      </div>
    </footer>
  );
}
