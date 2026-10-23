import React from "react";

const origin = "https://expense.paulworks.net/";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${origin}#website`,
      name: "Money Prophet",
      url: origin,
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id": `${origin}#application`,
      name: "Money Prophet",
      url: origin,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web browser",
      description:
        "A personal expense tracker and budget tracking app for daily purchases, monthly category budgets, and regular bills. No bank connection needed.",
      featureList: [
        "Manual expense entry",
        "Monthly category budgets",
        "Recurring bill planning",
        "Spending reports",
        "Optional AI expense entry",
      ],
    },
  ],
};

export default function StructuredData() {
  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData).replace(/</g, "\\u003c")}
    </script>
  );
}
