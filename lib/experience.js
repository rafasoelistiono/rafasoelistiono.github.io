import { readJsonFile, sortByOrder } from "@/lib/data-store";

const FILE_NAME = "experience.json";

export async function getExperienceItems() {
  return sortByOrder(await readJsonFile(FILE_NAME, []));
}

export async function getExperience(id) {
  const items = await getExperienceItems();
  return items.find((item) => item.id === id);
}
