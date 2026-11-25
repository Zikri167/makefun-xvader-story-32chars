import { writeFileSync } from "node:fs";
import { join } from "node:path";

const NAME = "WiFi Down, We Talked For Once";

if (NAME.length > 32) {
  throw new Error(`Entry must be at most 32 characters, got ${NAME.length}.`);
}

const locations = new Set();
if (process.env.OUTPUT_DIR) {
  locations.add(join(process.env.OUTPUT_DIR, "entry.txt"));
}
if (process.env._OUTPUT_DIR) {
  locations.add(join(process.env._OUTPUT_DIR, "entry.txt"));
}
if (process.env.MAKEFUN_OUTPUT_DIR) {
  locations.add(join(process.env.MAKEFUN_OUTPUT_DIR, "entry.txt"));
}
locations.add("/output/entry.txt");
locations.add("./entry.txt");

for (const location of locations) {
  try {
    writeFileSync(location, NAME, "utf8");
  } catch {
    // Read-only location: ignore and try the next one.
  }
}

console.log(NAME);
