import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/calculators/index";
import CalculatorTemplate from "@/components/calculator/CalculatorTemplate";

const SITE_URL = "https://bettercalculators.net";

interface Props {
  params: { slug: string };
}

type Variant = {
  slug: string;
  baseSlug: string;
  title: string;
  description: string;
  prefill: Record<string, string | number | boolean>;
};

const VARIANTS: Variant[] = [
  {
    slug: "time-in-5-minutes",
    baseSlug: "time-in-x-minutes",
    title: "What Time Will It Be in 5 Minutes",
    description: "Find the exact time 5 minutes from now based on your current local time.",
    prefill: { minutes: 5 },
  },
  {
    slug: "time-in-10-minutes",
    baseSlug: "time-in-x-minutes",
    title: "What Time Will It Be in 10 Minutes",
    description: "Calculate the time 10 minutes from now instantly.",
    prefill: { minutes: 10 },
  },
  {
    slug: "time-in-15-minutes",
    baseSlug: "time-in-x-minutes",
    title: "What Time Will It Be in 15 Minutes",
    description: "Calculate the time 15 minutes from now instantly.",
    prefill: { minutes: 15 },
  },
  {
    slug: "time-in-30-minutes",
    baseSlug: "time-in-x-minutes",
    title: "What Time Will It Be in 30 Minutes",
    description: "Find the exact time 30 minutes from now.",
    prefill: { minutes: 30 },
  },
  {
    slug: "time-in-45-minutes",
    baseSlug: "time-in-x-minutes",
    title: "What Time Will It Be in 45 Minutes",
    description: "Find the exact time 45 minutes from now.",
    prefill: { minutes: 45 },
  },
  {
    slug: "time-in-60-minutes",
    baseSlug: "time-in-x-minutes",
    title: "What Time Will It Be in 60 Minutes",
    description: "Find the exact time 60 minutes from now.",
    prefill: { minutes: 60 },
  },
];

function getVariant(slug: string): Variant | undefined {
  return VARIANTS.find((v) => v.slug === slug);
}

export async function generateStaticParams() {
  const base = calculators.map((c) => ({ slug: c.slug }));
  const variants = VARIANTS.map((v) => ({ slug: v.slug }));
  return [...base, ...variants];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = getVariant(params.slug);

  const def = v ? getCalculatorBySlug(v.baseSlug) : getCalculatorBySlug(params.slug);
  if (!def) return {};

  const title = v ? v.title : def.title;
  const description = v ? v.description : def.description;

  const url = `${SITE_URL}/calculators/${v ? v.slug : def.slug}`;

  return {
    title,
    description,
    keywords: def.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Better Calculators`,
      description,
      url,
      type: "website",
    },
  };
}

export default function CalculatorPage({ params }: Props) {
  const v = getVariant(params.slug);

  const def = v ? getCalculatorBySlug(v.baseSlug) : getCalculatorBySlug(params.slug);
  if (!def) notFound();

  const url = `${SITE_URL}/calculators/${v ? v.slug : def.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: v ? v.title : def.title,
      description: v ? v.description : def.description,
      url,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    ...(def.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: def.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CalculatorTemplate
        def={{
          ...def,
          title: v ? v.title : def.title,
          description: v ? v.description : def.description,
        }}
        prefill={v?.prefill}
      />
    </>
  );
}