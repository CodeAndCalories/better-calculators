import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/calculators/index";
import CalculatorTemplate from "@/components/calculator/CalculatorTemplate";

const SITE_URL = "https://bettercalculators.net";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const def = getCalculatorBySlug(params.slug);
  if (!def) return {};
  const url = `${SITE_URL}/calculators/${def.slug}`;
  return {
    title: def.title,
    description: def.description,
    keywords: def.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${def.title} | Better Calculators`,
      description: def.description,
      url,
      type: "website",
    },
  };
}

export default function CalculatorPage({ params }: Props) {
  const def = getCalculatorBySlug(params.slug);
  if (!def) notFound();

  const url = `${SITE_URL}/calculators/${def.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: def.title,
      description: def.description,
      url,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    ...(def.faqs.length > 0 ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: def.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    }] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorTemplate def={def} />
    </>
  );
}
