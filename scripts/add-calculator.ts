#!/usr/bin/env ts-node
/**
 * Usage: npm run add-calculator -- --slug my-calculator --title "My Calculator" --category finance
 */
import * as fs from "fs";
import * as path from "path";

const args = process.argv.slice(2);

function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : undefined;
}

const slug = getArg("slug");
const title = getArg("title");
const category = getArg("category");

if (!slug || !title || !category) {
  console.error("Usage: npm run add-calculator -- --slug <slug> --title <title> --category <finance|health|life>");
  process.exit(1);
}

if (!["finance", "health", "life"].includes(category)) {
  console.error("Category must be one of: finance, health, life");
  process.exit(1);
}

const calculatorsDir = path.join(__dirname, "..", "src", "calculators");
const filePath = path.join(calculatorsDir, `${slug}.ts`);

if (fs.existsSync(filePath)) {
  console.error(`Calculator file already exists: ${filePath}`);
  process.exit(1);
}

// camelCase the slug for the variable name
const varName = slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

const template = `import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "${slug}",
  title: "${title}",
  shortTitle: "${title}",
  description: "TODO: Short description of this calculator.",
  longDescription: "TODO: Longer description explaining what this calculator does and why it's useful.",
  category: "${category}",
  keywords: ["${slug}", "${title.toLowerCase()}"],
  inputs: [
    {
      type: "number",
      key: "value",
      label: "Value",
      defaultValue: 100,
      min: 0,
      step: 1,
      placeholder: "100",
    },
  ],
  compute(values: InputValues): ComputeResult {
    const value = Number(values.value);

    // TODO: Implement your calculation logic here
    const result = value;

    return {
      outputs: [
        {
          key: "result",
          label: "Result",
          value: result,
          format: "number",
          highlight: true,
        },
      ],
    };
  },
  howItWorks: "TODO: Explain the formula and calculation method used.",
  examples: [
    {
      title: "Example 1",
      description: "A description of this example scenario.",
      inputs: { value: 100 },
      result: "The result is 100.",
    },
  ],
  faqs: [
    {
      question: "What does this calculator do?",
      answer: "TODO: Answer the most common question about this calculator.",
    },
  ],
  relatedSlugs: [],
};

export default def;
`;

fs.writeFileSync(filePath, template, "utf-8");
console.log(`✅ Created calculator file: ${filePath}`);

// Update the index registry
const indexPath = path.join(calculatorsDir, "index.ts");
let indexContent = fs.readFileSync(indexPath, "utf-8");

// Add import after last import line
const importStatement = `import ${varName} from "./${slug}";`;
const importMatch = indexContent.match(/(import .+ from ".+";)\n\n\/\/ REGISTRY/);
if (importMatch) {
  indexContent = indexContent.replace(
    importMatch[0],
    `${importMatch[1]}\n${importStatement}\n\n// REGISTRY`
  );
} else {
  // Fallback: add import before the calculators array
  indexContent = indexContent.replace(
    "// REGISTRY — add new calculators here",
    `// REGISTRY — add new calculators here\n// (auto-import added below)`
  );
  const lastImportIdx = indexContent.lastIndexOf('import ');
  const lineEnd = indexContent.indexOf('\n', lastImportIdx);
  indexContent = indexContent.slice(0, lineEnd + 1) + importStatement + '\n' + indexContent.slice(lineEnd + 1);
}

// Add to calculators array
indexContent = indexContent.replace(
  "  waterIntake,\n];",
  `  waterIntake,\n  ${varName},\n];`
);

fs.writeFileSync(indexPath, indexContent, "utf-8");
console.log(`✅ Updated registry: src/calculators/index.ts`);
console.log(`\n📝 Next steps:`);
console.log(`  1. Edit src/calculators/${slug}.ts to implement your calculator`);
console.log(`  2. Run npm run dev to preview`);
console.log(`  3. Visit http://localhost:3000/calculators/${slug}`);
