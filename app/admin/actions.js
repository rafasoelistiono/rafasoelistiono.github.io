"use server";

import { createAdminSession, destroyAdminSession, verifyLogin } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const ok = await verifyLogin(username, password);
  if (!ok) redirect("/admin?error=invalid");
  await createAdminSession(username);
  redirect("/admin/projects");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin");
}
