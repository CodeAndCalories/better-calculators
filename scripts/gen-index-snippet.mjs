import { execSync } from "node:child_process";
import path from "node:path";

function toVarName(filename) {
  const base = filename.replace(/\.ts$/, "");
  return base.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function toImportLine(filePath) {
  const fname = path.basename(filePath);
  const base = fname.replace(/\.ts$/, "");
  const varName = toVarName(fname);
  return { varName, importLine: `import ${varName} from "./${base}";` };
}

const raw = execSync("git diff --name-only", { encoding: "utf8" }).trim();
if (!raw) {
  console.log("No unstaged changes found. If you already staged files, run: git diff --name-only --cached");
  process.exit(0);
}

const files = raw
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean)
  .filter((p) => p.startsWith("src/calculators/"))
  .filter((p) => p.endsWith(".ts"))
  .filter((p) => !p.endsWith("index.ts"))
  .sort((a, b) => a.localeCompare(b));

if (!files.length) {
  console.log("No new calculator .ts files found in src/calculators/.");
  process.exit(0);
}

const imports = files.map((p) => toImportLine(p).importLine);
const entries = files.map((p) => `  ${toImportLine(p).varName},`);

console.log("\n// Imports (new/changed)\n" + imports.join("\n"));
console.log("\n\n// calculators array entries (new/changed)\n" + entries.join("\n"));