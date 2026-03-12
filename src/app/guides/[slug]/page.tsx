import { calculators, getCalculatorBySlug } from "@/calculators";

type Guide = {
  slug: string;
  title: string;
  description: string;
  calculatorSlug: string;
};

const guides: Guide[] = [
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI",
    description: "Learn how body mass index (BMI) is calculated and how to interpret the results.",
    calculatorSlug: "bmi",
  },
  {
    slug: "how-to-calculate-compound-interest",
    title: "How to Calculate Compound Interest",
    description: "Understand the compound interest formula and how to estimate investment growth.",
    calculatorSlug: "compound-interest",
  },
];

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) return null;

  const calculator = getCalculatorBySlug(guide.calculatorSlug);

  return (
    <div className="container">
      <h1>{guide.title}</h1>
      <p>{guide.description}</p>

      {calculator && (
        <div>
          <h2>Try the Calculator</h2>
          <p>
            Use our <a href={`/calculators/${calculator.slug}`}>{calculator.title}</a> to calculate instantly.
          </p>
        </div>
      )}
    </div>
  );
}