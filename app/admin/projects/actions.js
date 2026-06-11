"use server";

import { createProject, deleteProject, updateProject } from "@/lib/projects";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(formData) {
  await requireAdmin();
  await createProject(formData);
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProjectAction(id, formData) {
  await requireAdmin();
  await updateProject(id, formData);
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(id) {
  await requireAdmin();
  await deleteProject(id);
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}
