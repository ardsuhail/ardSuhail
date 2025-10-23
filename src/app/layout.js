import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import NavSidebar from "@/component/NavSidebar";
import AdminSidebar from "@/component/AdminSidebar";
import { AppProvider } from "@/component/Context";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Suhail | Full-Stack MERN & Next.js Developer | Shopify Customization Expert",
  description: "Explore Suhail's portfolio – MERN stack apps, Next.js projects, Shopify stores with full customization, Python practice, DSA solutions, and innovative web projects.",
  keywords: "Suhail, ardsuhail, Portfolio, MERN Developer, Next.js, Shopify Customization, Python, DSA, Projects, Web Development, Full-Stack Developer",
  author: "ardsuhail",
  // viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Suhail | Full-Stack MERN & Next.js Developer",
    description: "Check out Suhail's portfolio with MERN, Next.js, Shopify, Python, DSA projects, and more.",
    url: "https://ardsuhail.com", // apna actual portfolio URL dal do
    siteName: "Suhail Portfolio",
    images: [
      {
        url: "/og-image.png", // agar tumhare paas OG image hai
        width: 1200,
        height: 630,
        alt: "Suhail Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suhail | Full-Stack MERN & Next.js Developer",
    description: "Portfolio of Suhail – MERN, Next.js, Shopify, Python, DSA projects.",
    images: ["/og-image.png"], // OG image ka same path use kar sakte ho
    site: "@ardsuhail",
    creator: "@ardsuhail",
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
        <NavSidebar/>
        <AdminSidebar/>
        <Navbar/>
        {children}
        <Footer/>
        </AppProvider>
      </body>
    </html>
  );
}
