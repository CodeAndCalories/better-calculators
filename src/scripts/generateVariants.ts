export type Variant = {
  slug: string
  baseSlug: string
  title: string
  description: string
  prefill: Record<string, number>
}

// ─── Existing: Time variants ──────────────────────────────────────────────────

function generateTimeVariants(): Variant[] {
  const variants: Variant[] = []

  for (let i = 1; i <= 120; i++) {
    variants.push({
      slug: `time-in-${i}-minutes`,
      baseSlug: "time-in-x-minutes",
      title: `What Time Will It Be in ${i} Minutes`,
      description: `Find the exact time ${i} minutes from now using this simple calculator.`,
      prefill: { minutes: i }
    })
  }

  return variants
}

// ─── Existing: Percent variants ───────────────────────────────────────────────

function generatePercentVariants(): Variant[] {
  const percents = [5,10,15,20,25,30,40,50];
  const numbers = [10,25,50,100,200,500];

  const variants: Variant[] = [];

  for (const p of percents) {
    for (const n of numbers) {
      variants.push({
        slug: `${p}-percent-of-${n}`,
        baseSlug: "percentage-of-number-calculator",
        title: `What is ${p}% of ${n}?`,
        description: `Calculate ${p} percent of ${n} instantly.`,
        prefill: { percent: p, number: n }
      });
    }
  }

  return variants;
}

// ─── New: Conversion variants ─────────────────────────────────────────────────

const CONVERSION_VALUES = [1, 5, 10, 20, 25, 50, 100, 200, 500, 1000];

const CONVERSION_CONFIGS: {
  baseSlug: string;
  inputKey: string;
  title: (v: number) => string;
  description: (v: number) => string;
}[] = [
  {
    baseSlug: "kg-to-lbs",
    inputKey: "kilograms",
    title: (v) => `${v} kg to lbs Calculator`,
    description: (v) => `Convert ${v} kilograms to pounds instantly. ${v} kg = ${(v * 2.20462).toFixed(2)} lbs.`,
  },
  {
    baseSlug: "lbs-to-kg",
    inputKey: "pounds",
    title: (v) => `${v} lbs to kg Calculator`,
    description: (v) => `Convert ${v} pounds to kilograms instantly. ${v} lbs = ${(v / 2.20462).toFixed(2)} kg.`,
  },
  {
    baseSlug: "miles-to-km",
    inputKey: "miles",
    title: (v) => `${v} Miles to Kilometers Calculator`,
    description: (v) => `Convert ${v} miles to kilometers instantly. ${v} miles = ${(v * 1.60934).toFixed(2)} km.`,
  },
  {
    baseSlug: "inches-to-cm",
    inputKey: "inches",
    title: (v) => `${v} Inches to Centimeters Calculator`,
    description: (v) => `Convert ${v} inches to centimeters instantly. ${v} in = ${(v * 2.54).toFixed(2)} cm.`,
  },
  {
    baseSlug: "hours-to-seconds",
    inputKey: "hours",
    title: (v) => `${v} Hours to Seconds Calculator`,
    description: (v) => `Convert ${v} hours to seconds instantly. ${v} hours = ${(v * 3600).toLocaleString()} seconds.`,
  },
];

function generateConversionVariants(): Variant[] {
  const variants: Variant[] = [];

  for (const config of CONVERSION_CONFIGS) {
    for (const value of CONVERSION_VALUES) {
      variants.push({
        slug: `${config.baseSlug}-${value}`,
        baseSlug: config.baseSlug,
        title: config.title(value),
        description: config.description(value),
        prefill: { [config.inputKey]: value },
      });
    }
  }

  return variants;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const VARIANTS = [
  ...generateTimeVariants(),
  ...generatePercentVariants(),
  ...generateConversionVariants(),  // new — remove this line to disable
]
