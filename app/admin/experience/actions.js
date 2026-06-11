"use server";

import { createExperience, deleteExperience, updateExperience } from "@/lib/experience";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExperienceAction(formData) {
  await requireAdmin();
  await createExperience(formData);
  revalidatePath("/");
  revalidatePath("/experience");
  redirect("/admin/experience");
}

export async function updateExperienceAction(id, formData) {
  await requireAdmin();
  await updateExperience(id, formData);
  revalidatePath("/");
  revalidatePath("/experience");
  redirect("/admin/experience");
}

export async function deleteExperienceAction(id) {
  await requireAdmin();
  await deleteExperience(id);
  revalidatePath("/");
  revalidatePath("/experience");
  redirect("/admin/experience");
}
