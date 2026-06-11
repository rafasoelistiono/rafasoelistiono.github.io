import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "My Experience" },
  { href: "/projects", label: "My Project" },
  { href: "/contact", label: "Contact Me" }
];

export default function Navigation() {
  return (
    <nav aria-label="Primary navigation" className="navigation">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
