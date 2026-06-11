import Link from "next/link";

export default function AdminLayout({ title, action, children }) {
  return (
    <main className="admin-shell">
      <div className="admin-topbar">
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/experience">Experience</Link>
          <Link href="/">Public site</Link>
        </nav>
      </div>
      <header className="admin-header">
        <h1>{title}</h1>
        {action}
      </header>
      {children}
    </main>
  );
}
