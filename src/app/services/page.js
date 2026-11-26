
import Services from "@/component/public/Services";

export const metadata = {
  title: "Web Development & Digital Services | ArdSuhail",

  description:
    "Professional website development, website maintenance, Google Maps setup, WhatsApp Business setup, digital visiting cards, product catalogues and basic SEO services by ArdSuhail.",

  keywords: [
    "ArdSuhail",
    "Website Development Services",
    "Web Developer in Purqazi",
    "Web Developer in Muzaffarnagar",
    "Freelance Web Developer",
    "Website Maintenance",
    "Google Business Profile Setup",
    "Google Maps Business Listing",
    "WhatsApp Business Setup",
    "Digital Visiting Card",
    "Digital Product Catalogue",
    "Local SEO Services",
    "Digital Services for Small Businesses",
  ],

  alternates: {
    canonical: "https://www.ardsuhail.com/services",
  },

  openGraph: {
    title: "Web Development & Digital Services | ArdSuhail",
    description:
      "Practical digital solutions for businesses. Explore website development, Google Business setup, WhatsApp Business, digital catalogues and more.",
    url: "https://www.ardsuhail.com/services",
    siteName: "ArdSuhail",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArdSuhail Web Development and Digital Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Web Development & Digital Services | ArdSuhail",
    description:
      "Helping businesses establish a professional online presence.",
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  return <Services />;
}
