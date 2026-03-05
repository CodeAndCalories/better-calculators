import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/calculators/index";
import CalculatorTemplate from "@/components/calculator/CalculatorTemplate";
import Script from "next/script";
import { VARIANTS } from "@/scripts/generateVariants";

const SITE_URL = "https://bettercalculators.net";

function calculatorJsonLd(title: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: `${SITE_URL}/calculators/${slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

function breadcrumbJsonLd(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${SITE_URL}/calculators`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${SITE_URL}/calculators/${slug}`
      }
    ]
  };
}

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
      "@type": "SoftwareApplication",
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