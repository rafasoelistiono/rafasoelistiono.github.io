import { normalizeSlug, readJsonFile, sortByOrder, writeJsonFile } from "@/lib/data-store";

const FILE_NAME = "projects.json";

export async function getProjects() {
  return sortByOrder(await readJsonFile(FILE_NAME, []));
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).concat(projects.filter((project) => !project.featured));
}

export async function getProject(id) {
  const projects = await getProjects();
  return projects.find((project) => project.id === id || project.slug === id);
}

export async function createProject(formData) {
  const projects = await getProjects();
  const title = String(formData.get("title") || "").trim();
  const slug = normalizeSlug(formData.get("slug") || title);
  const id = slug || `project-${Date.now()}`;
  const project = readProjectForm(formData, id, slug);
  await writeJsonFile(FILE_NAME, [...projects, project]);
  return project;
}

export async function updateProject(id, formData) {
  const projects = await getProjects();
  const existing = projects.find((project) => project.id === id);
  if (!existing) throw new Error("Project not found");
  const title = String(formData.get("title") || existing.title).trim();
  const slug = normalizeSlug(formData.get("slug") || title);
  const next = readProjectForm(formData, existing.id, slug);
  await writeJsonFile(
    FILE_NAME,
    projects.map((project) => (project.id === id ? next : project))
  );
  return next;
}

export async function deleteProject(id) {
  const projects = await getProjects();
  await writeJsonFile(
    FILE_NAME,
    projects.filter((project) => project.id !== id)
  );
}

function readProjectForm(formData, id, slug) {
  return {
    id,
    title: String(formData.get("title") || "").trim(),
    slug,
    category: String(formData.get("category") || "").trim(),
    year: String(formData.get("year") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    image: String(formData.get("image") || "").trim(),
    link: String(formData.get("link") || "").trim(),
    repository: String(formData.get("repository") || "").trim(),
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 0)
  };
}
