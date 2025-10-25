

import About from "@/component/About";
export const metadata = {
  title: "About ArdSuhail | Full Stack Web Developer & Shopify Expert",
  description:
    "I'm Suhail (@ardsuhail), a Full Stack Web Developer skilled in Next.js, React.js, Node.js, MongoDB, and Shopify API integrations. I build SEO-optimized, high-performance, and modern websites that stand out on Google.",
 keywords: [
  "Suhail",
  "@ardsuhail",
  "Full Stack Web Developer",
  "Next.js Developer",
  "React.js Developer",
  "Shopify Expert",
  "MERN Stack Developer",
  "Frontend Developer India",
  "Backend Developer India",
  "SEO Optimized Websites",
  "Ecommerce Website Developer",
  "Tailwind CSS Developer",
  "Modern Web Developer",
  "Suhail Portfolio",
  "ardsuhail Portfolio",
],

  openGraph: {
    title: "About ArdSuhail | Full Stack Web Developer & Shopify Expert",
    description:
      "Know more about ArdSuhail (@ardsuhail) — a passionate Full Stack Web Developer and Shopify Store Creator skilled in Next.js, React, and Tailwind CSS.",
    url: "https://ardsuhail.com/about",
    siteName: "ArdSuhail Portfolio",
    images: [
      {
        url: "/og-image.jpg", // optional image for social previews
        width: 1200,
        height: 630,
        alt: "ArdSuhail Portfolio - Full Stack Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
   twitter: {
    card: "summary_large_image",
    title: "About ardsuhail | Full-Stack Developer & Shopify Expert",
    description:
      "Check out ardsuhail's About page – learn about full-stack development, Next.js, React.js, Shopify API integrations, and modern web solutions.",
    images: ["/og-image.png"],
    site: "@ardsuhail",
    creator: "@ardsuhail",
  },

};

import React from 'react'

const page = () => {
  return (
    <main>
      <About />
    </main>
  )
}

export default page
