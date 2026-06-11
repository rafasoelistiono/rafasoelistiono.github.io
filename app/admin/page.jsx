import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { isAdminAuthenticated } from "@/lib/auth";
import { loginAction, logoutAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }) {
  const authed = await isAdminAuthenticated();
  const params = await searchParams;

  if (!authed) {
    return (
      <main className="admin-login">
        <form action={loginAction} className="login-card">
          <p className="eyebrow">Admin</p>
          <h1>Portfolio control room.</h1>
          {params?.error ? <p className="form-status error">Invalid admin credentials.</p> : null}
          <label>
            <span>Username</span>
            <input name="username" autoComplete="username" required />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">Login</button>
        </form>
      </main>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      action={
        <form action={logoutAction}>
          <button type="submit" className="admin-link-button">
            Logout
          </button>
        </form>
      }
    >
      <div className="admin-card-grid">
        <Link className="admin-card" href="/admin/projects">
          <span>01</span>
          <h2>Manage projects</h2>
          <p>Add, edit, remove, and sort project records.</p>
        </Link>
        <Link className="admin-card" href="/admin/experience">
          <span>02</span>
          <h2>Manage experience</h2>
          <p>Add, edit, remove, and sort experience records.</p>
        </Link>
      </div>
    </AdminLayout>
  );
}
