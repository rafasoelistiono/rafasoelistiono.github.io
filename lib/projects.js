import { readJsonFile, sortByOrder } from "@/lib/data-store";

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
