export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ennoble",
    description:
      "AI operations consulting — audit, build, train, and optimize — for businesses that make real things.",
    url: "https://ennoble.one",
    email: "hello@ennoble.one",
    areaServed: "US",
    priceRange: "$$$$",
    serviceType: [
      "AI Operations Audit",
      "Custom AI Systems",
      "Team Training & Adoption",
      "Fractional AI Operations",
    ],
    founder: {
      "@type": "Person",
      name: "Noble",
      jobTitle: "Founder",
    },
    sameAs: [
      "https://linkedin.com/in/znob",
      "https://twitter.com/znob",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
