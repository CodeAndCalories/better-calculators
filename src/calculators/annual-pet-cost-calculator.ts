import type { CalculatorDef, InputValues, ComputeResult } from "@/lib/types";

const def: CalculatorDef = {
  slug: "annual-pet-cost-calculator",
  title: "Annual Pet Cost Calculator",
  shortTitle: "Pet Cost",
  description: "Estimate the total annual cost of owning a pet.",
  longDescription:
    "Owning a pet is a significant financial commitment that many people underestimate. This calculator totals your monthly and one-time annual pet expenses — food, vet, grooming, insurance, and more — so you can budget accurately.",
  category: "life",
  keywords: ["pet cost calculator", "annual dog cost", "cat ownership cost", "pet budget calculator", "how much does a dog cost per year"],
  inputs: [
    { type: "number", key: "foodMonthly", label: "Food & Treats ($/month)", defaultValue: 60, min: 0, step: 5, placeholder: "60" },
    { type: "number", key: "vetAnnual", label: "Vet & Vaccinations ($/year)", defaultValue: 400, min: 0, step: 50, placeholder: "400" },
    { type: "number", key: "groomingMonthly", label: "Grooming ($/month)", defaultValue: 30, min: 0, step: 5, placeholder: "30" },
    { type: "number", key: "insuranceMonthly", label: "Pet Insurance ($/month)", defaultValue: 40, min: 0, step: 5, placeholder: "40" },
    { type: "number", key: "toysSuppliesAnnual", label: "Toys, Supplies & Accessories ($/year)", defaultValue: 200, min: 0, step: 25, placeholder: "200" },
    { type: "number", key: "boardingAnnual", label: "Boarding / Pet Sitting ($/year)", defaultValue: 300, min: 0, step: 50, placeholder: "300" },
  ],
  compute(values: InputValues): ComputeResult {
    const food = Number(values.foodMonthly) * 12;
    const vet = Number(values.vetAnnual);
    const grooming = Number(values.groomingMonthly) * 12;
    const insurance = Number(values.insuranceMonthly) * 12;
    const toys = Number(values.toysSuppliesAnnual);
    const boarding = Number(values.boardingAnnual);
    if ([food, vet, grooming, insurance, toys, boarding].some(isNaN)) {
      return { outputs: [], error: "Please enter valid values." };
    }
    const annual = food + vet + grooming + insurance + toys + boarding;
    const monthly = annual / 12;
    return {
      outputs: [
        { key: "annualCost", label: "Total Annual Cost ($)", value: Number(annual.toFixed(0)), format: "number", highlight: true },
        { key: "monthlyCost", label: "Average Monthly Cost ($)", value: Number(monthly.toFixed(2)), format: "number" },
        { key: "lifetimeCost15yr", label: "15-Year Lifetime Cost ($)", value: Number((annual * 15).toFixed(0)), format: "number" },
      ],
    };
  },
  howItWorks:
    "Converts monthly expenses to annual, adds all annual costs, and divides by 12 for a monthly average. Lifetime cost assumes 15 years, the average lifespan for many dogs and cats.",
  examples: [
    {
      title: "Average Dog Owner",
      description: "$60 food, $400 vet, $30 grooming, $40 insurance, $200 supplies, $300 boarding.",
      inputs: { foodMonthly: 60, vetAnnual: 400, groomingMonthly: 30, insuranceMonthly: 40, toysSuppliesAnnual: 200, boardingAnnual: 300 },
      result: "~$2,980/year — ~$248/month.",
    },
    {
      title: "Cat Owner (Minimal)",
      description: "$40 food, $200 vet, $0 grooming, $20 insurance, $100 supplies, $0 boarding.",
      inputs: { foodMonthly: 40, vetAnnual: 200, groomingMonthly: 0, insuranceMonthly: 20, toysSuppliesAnnual: 100, boardingAnnual: 0 },
      result: "~$1,020/year — ~$85/month.",
    },
  ],
  faqs: [
    { question: "What is the average annual cost of a dog?", answer: "ASPCA estimates $1,500–$3,000+ per year for a medium-sized dog, depending on breed, size, and location." },
    { question: "Is pet insurance worth it?", answer: "Pet insurance makes sense if you want protection against unexpected vet bills, which can easily exceed $3,000–$10,000 for emergencies." },
    { question: "What costs am I missing?", answer: "This covers recurring costs. One-time costs like adoption/purchase fees, spay/neuter, initial supplies, and training can add $500–$2,000+ upfront." },
  ],
  relatedSlugs: ["monthly-budget-calculator", "emergency-fund-calculator"],
};

export default def;
