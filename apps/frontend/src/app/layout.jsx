import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://www.jevxo.com"),
  title: {
    default: "JEVXO — Global Digital Ecosystem & Enterprise Software Suite",
    template: "%s | JEVXO",
  },
  description:
    "JEVXO empowers businesses with cutting-edge ERP, CRM, HRM, Cloud Infrastructure, and AI Automation. Headquartered at 9th Floor, Silicon Tower, Hi-Tech Park, Rajshahi 6100, Bangladesh.",
  keywords: [
    "JEVXO",
    "Jevxo Rajshahi",
    "JEVXO Software",
    "JEVXO Inc",
    "JEVXO Portal",
    "Software Company Rajshahi",
    "Rajshahi Hi-Tech Park",
    "Silicon Tower Rajshahi",
    "Enterprise Software Bangladesh",
    "AI Automation Suite",
    "CRM ERP HRM Systems",
  ],
  authors: [{ name: "JEVXO Inc.", url: "https://www.jevxo.com" }],
  creator: "JEVXO Inc.",
  publisher: "JEVXO Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.jevxo.com",
  },
  openGraph: {
    title: "JEVXO — Global Digital Ecosystem & Enterprise Software",
    description:
      "Empowering enterprises with Next-Gen CRM, ERP, HRM, Cloud Infrastructure, and AI Automation. Office: 9th Floor, Silicon Tower, Hi-Tech Park, Rajshahi 6100.",
    url: "https://www.jevxo.com",
    siteName: "JEVXO",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.jevxo.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JEVXO Enterprise Software & AI Automation Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JEVXO — Enterprise Software & AI Suite",
    description:
      "Global digital ecosystem empowering businesses with next-gen software, CRM, ERP & AI automation.",
    creator: "@jevxo26",
    images: ["https://www.jevxo.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  // Schema.org LocalBusiness & Organization JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JEVXO",
    legalName: "JEVXO Inc.",
    url: "https://www.jevxo.com",
    logo: "https://www.jevxo.com/logo.png",
    image: "https://www.jevxo.com/og-image.jpg",
    description:
      "JEVXO is a global digital ecosystem that empowers businesses, entrepreneurs, and organizations with platforms, tools, and enterprise automation software.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9th Floor, Sterling Ground Station, Silicon Tower, Hi-Tech Park",
      addressLocality: "Rajshahi",
      postalCode: "6100",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.3636,
      longitude: 88.6241,
    },
    telephone: "+8801410222451",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://facebook.com/jevxo",
      "https://instagram.com/jevxo26",
      "https://linkedin.com/company/jevxo",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${baiJamjuree.variable} antialiased`}>
        <StoreProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" theme="dark" />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
