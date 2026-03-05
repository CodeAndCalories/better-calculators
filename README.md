# Better Calculators

**bettercalculators.net** — Fast, accurate, free online calculators for finance, health, and everyday life.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Static Export** (`output: "export"`) — fully compatible with Cloudflare Pages
- **CSS Modules** for styling (no UI framework)
- No database, no server, no auth, no environment variables required

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:3000

# 3. Build & export static site
npm run build
# → Output in ./out/

# 4. Lint
npm run lint
```

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (header, footer, metadata)
│   ├── page.tsx                # Home page
│   ├── calculators/
│   │   ├── page.tsx            # /calculators (index with search/filter)
│   │   ├── [slug]/page.tsx     # /calculators/[slug] (individual pages)
│   │   ├── finance/page.tsx    # /calculators/finance
│   │   ├── health/page.tsx     # /calculators/health
│   │   └── life/page.tsx       # /calculators/life
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── sitemap.ts              # Auto-generated sitemap.xml
│   └── robots.ts               # Auto-generated robots.txt
│
├── calculators/                # Calculator definitions (data + compute)
│   ├── index.ts                # Registry — import & export all calculators
│   ├── mortgage.ts
│   ├── loan-payment.ts
│   ├── compound-interest.ts
│   ├── simple-interest.ts
│   ├── credit-card-payoff.ts
│   ├── percentage.ts
│   ├── discount.ts
│   ├── tip.ts
│   ├── age.ts
│   ├── bmi.ts
│   ├── calorie.ts
│   └── water-intake.ts
│
├── components/
│   ├── calculator/
│   │   ├── CalculatorEngine.tsx    # Client-side state & compute runner
│   │   ├── CalculatorInput.tsx     # Renders number/select/toggle inputs
│   │   ├── CalculatorOutput.tsx    # Formats and displays results
│   │   └── CalculatorTemplate.tsx  # Full page layout for calc pages
│   ├── layout/
│   │   ├── Header.tsx / .module.css
│   │   └── Footer.tsx / .module.css
│   └── ui/
│       └── CalculatorCard.tsx / .module.css
│
├── lib/
│   ├── types.ts       # TypeScript interfaces (CalculatorDef, InputSchema, etc.)
│   ├── format.ts      # Number formatting utilities
│   └── validate.ts    # Input validation
│
└── styles/
    └── globals.css    # Global CSS variables, resets, typography

scripts/
└── add-calculator.ts  # Generator script for new calculators

public/
├── favicon.svg
└── _headers           # Cloudflare Pages HTTP headers
```

## Adding a New Calculator

### Automated (recommended)

```bash
npm run add-calculator -- --slug percentage-change --title "Percentage Change Calculator" --category life
```

This creates `src/calculators/percentage-change.ts` with a template and auto-registers it in `src/calculators/index.ts`.

### Manual

1. Create `src/calculators/your-slug.ts` implementing `CalculatorDef`:

```typescript
import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "your-slug",
  title: "Your Calculator Title",
  shortTitle: "Short Title",
  description: "One sentence description for cards and meta.",
  longDescription: "Full description for the page intro.",
  category: "finance",           // "finance" | "health" | "life"
  keywords: ["seo keyword"],
  inputs: [
    { type: "number", key: "amount", label: "Amount", prefix: "$", defaultValue: 1000 },
    { type: "select", key: "term", label: "Term", defaultValue: "12", options: [
      { label: "1 Year", value: "12" },
    ]},
    { type: "toggle", key: "includesTax", label: "Include Tax" },
  ],
  compute(values: InputValues): ComputeResult {
    const amount = Number(values.amount);
    return {
      outputs: [
        { key: "result", label: "Result", value: amount * 2, format: "currency", highlight: true },
      ],
    };
  },
  howItWorks: "Explain the formula here.",
  examples: [{ title: "Example", description: "...", inputs: { amount: 1000 }, result: "..." }],
  faqs: [{ question: "?", answer: "..." }],
  relatedSlugs: ["other-calculator-slug"],
};

export default def;
```

2. Register in `src/calculators/index.ts`:

```typescript
import yourCalc from "./your-slug";

export const calculators: CalculatorDef[] = [
  // ... existing calculators ...
  yourCalc,
];
```

## Input Types

| Type     | Options                                     |
|----------|---------------------------------------------|
| `number` | key, label, defaultValue, min, max, step, prefix, suffix, placeholder, helpText |
| `select` | key, label, defaultValue, options: [{label, value}] |
| `toggle` | key, label, defaultValue (boolean) |

## Output Formats

| Format     | Renders as          |
|------------|---------------------|
| `currency` | $1,234.56           |
| `percentage` | 12.50%            |
| `number`   | 1,234.56            |
| `text`     | raw string          |
| `years`    | 3.5 years           |
| `kg`       | 72.5 kg             |
| `lbs`      | 159.5 lbs           |
| `liters`   | 2.4 L               |
| `oz`       | 81 fl oz            |
| `bmi`      | 24.1                |
| `calories` | 2,450 cal           |

## Cloudflare Pages Deployment

### Build Settings

| Setting | Value |
|---------|-------|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (leave empty) |
| Node.js version | 20 |

### Steps

1. Push this repository to GitHub
2. In Cloudflare Pages dashboard → Create application → Connect to Git
3. Select your repository
4. Apply the build settings above
5. Click **Save and Deploy**

Cloudflare Pages will automatically deploy on every push to main.

### Custom Domain

In Cloudflare Pages → Custom domains → Add `bettercalculators.net` and follow the DNS instructions.
