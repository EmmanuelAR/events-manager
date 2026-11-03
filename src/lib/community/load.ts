import { readFile } from "node:fs/promises";
import path from "node:path";

export type CommunityConfig = {
  whatsappUrl: string;
};

export async function getCommunityConfig(): Promise<CommunityConfig> {
  const filePath = path.join(process.cwd(), "content", "community.json");
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as CommunityConfig;
}
