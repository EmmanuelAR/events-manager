import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Ambassador } from "./types";

const ambassadorsDir = path.join(process.cwd(), "content", "ambassadors");

export async function getAllAmbassadors(): Promise<Ambassador[]> {
  const files = await readdir(ambassadorsDir);
  const ambassadors = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const raw = await readFile(path.join(ambassadorsDir, file), "utf8");
        return JSON.parse(raw) as Ambassador;
      }),
  );

  return ambassadors.sort((a, b) => a.name.localeCompare(b.name, "es"));
}
