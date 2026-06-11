import { normalizeSlug, readJsonFile, sortByOrder, writeJsonFile } from "@/lib/data-store";

const FILE_NAME = "experience.json";

export async function getExperienceItems() {
  return sortByOrder(await readJsonFile(FILE_NAME, []));
}

export async function getExperience(id) {
  const items = await getExperienceItems();
  return items.find((item) => item.id === id);
}

export async function createExperience(formData) {
  const items = await getExperienceItems();
  const role = String(formData.get("role") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const id = normalizeSlug(`${company}-${role}`) || `experience-${Date.now()}`;
  const item = readExperienceForm(formData, id);
  await writeJsonFile(FILE_NAME, [...items, item]);
  return item;
}

export async function updateExperience(id, formData) {
  const items = await getExperienceItems();
  const existing = items.find((item) => item.id === id);
  if (!existing) throw new Error("Experience not found");
  const next = readExperienceForm(formData, existing.id);
  await writeJsonFile(
    FILE_NAME,
    items.map((item) => (item.id === id ? next : item))
  );
  return next;
}

export async function deleteExperience(id) {
  const items = await getExperienceItems();
  await writeJsonFile(
    FILE_NAME,
    items.filter((item) => item.id !== id)
  );
}

function readExperienceForm(formData, id) {
  const highlights = String(formData.get("highlights") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    id,
    company: String(formData.get("company") || "").trim(),
    role: String(formData.get("role") || "").trim(),
    startDate: String(formData.get("startDate") || "").trim(),
    endDate: String(formData.get("endDate") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    highlights,
    order: Number(formData.get("order") || 0)
  };
}
