import fs from "node:fs";
import path from "node:path";

const CALC_DIR = path.join(process.cwd(), "src", "calculators");

// turn "credit-utilization-calculator" into "creditUtilizationCalculator"
function toVarName(filename) {
  const base = filename.replace(/\.ts$/, "");
  return base.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

const files = fs
  .readdirSync(CALC_DIR)
  .filter((f) => f.endsWith(".ts"))
  .filter((f) => f !== "index.ts")
  .filter((f) => !f.startsWith("_"))
  .sort((a, b) => a.localeCompare(b));

const imports = files.map((f) => {
  const v = toVarName(f);
  const p = "./" + f.replace(/\.ts$/, "");
  return `import ${v} from "${p}";`;
});

const entries = files.map((f) => `  ${toVarName(f)},`);

console.log("\n// Imports\n" + imports.join("\n"));
console.log("\n\n// calculators array entries\n" + entries.join("\n"));