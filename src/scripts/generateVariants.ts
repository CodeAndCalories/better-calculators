type Variant = {
  slug: string
  baseSlug: string
  title: string
  description: string
  prefill: Record<string, number>
}

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

export const VARIANTS = [
  ...generateTimeVariants(),
  ...generatePercentVariants()
]

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