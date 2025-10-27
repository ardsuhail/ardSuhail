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
  maximumScale: 1,
  minimumScale: 1,
  userScalable: "no",
  viewportFit: "cover",
};



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://www.ardsuhail.com'),
  title: "ardsuhail | Full-Stack MERN & Next.js Developer | Shopify Customization Expert",
  description:
    "Discover ardsuhail (@ardsuhail) – a skilled Full-Stack Web Developer specializing in Next.js, React.js, Node.js, MongoDB, and Shopify API integrations. I build high-performance, SEO-friendly websites, custom Shopify stores, and modern digital solutions that rank on Google.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  keywords:
    "ardsuhail, Full-Stack Developer, MERN Stack, Next.js Developer, React.js Developer, Node.js Developer, MongoDB Developer, Shopify Expert, Shopify API, SEO Optimized Website, Tailwind CSS, Modern Web Developer, Portfolio Website, B.Tech Computer Science, Web Applications, High Performance Web Apps, Custom Shopify Store, Responsive Web Design, UI/UX Developer, Suhail ahmed",
  author: "ardsuhail",
  robots: "index, follow",
  openGraph: {
    title: "ardsuhail | Full-Stack MERN & Next.js Developer",
    description:
      "Explore ardsuhail's portfolio and projects – MERN stack apps, Next.js websites, custom Shopify stores, and innovative digital solutions built with SEO, speed, and modern UI/UX in mind.",
    url: "https://ardsuhail.com", // replace with your actual portfolio URL
    siteName: "ardsuhail Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ardsuhail Portfolio Preview - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ardsuhail | Full-Stack MERN & Next.js Developer",
    description:
      "Check out ardsuhail's portfolio – MERN, Next.js, React.js projects, custom Shopify stores, and modern web solutions that are SEO-friendly and high-performance.",
    images: ["/og-image.png"],
    site: "@ardsuhail",
    creator: "@ardsuhail",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen overflow-x-hidden `}
      >
        <AppProvider>
          <NavSidebar />
          <AdminSidebar />
          <Navbar />
          {children}
          <Footer />
        </AppProvider>
           <Script id="insta-fix" strategy="afterInteractive">
          {`
            (function() {
              const ua = navigator.userAgent || navigator.vendor || window.opera;
              if (ua.toLowerCase().includes("instagram")) {
                document.body.classList.add("insta-fix");
                const meta = document.querySelector('meta[name="viewport"]');
                if (meta) {
                  meta.setAttribute(
                    "content",
                    "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
                  );
                }
              }
            })();
          `}
        </Script>

      </body>
    </html>
  );
}
