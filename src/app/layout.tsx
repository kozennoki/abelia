import type { Metadata } from "next";
import { Noto_Sans_JP, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/analytics";
import { WebsiteSchema, CookieConsent } from "@/components/common";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, AUTHOR_NAME } from "@/lib/constants";
import { env } from "@/lib/env";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  verification: env.NEXT_PUBLIC_GSC_VERIFICATION_CODE
    ? { google: env.NEXT_PUBLIC_GSC_VERIFICATION_CODE }
    : undefined,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/kozennoki.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/kozennoki.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${josefinSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
        <WebsiteSchema />
        <Header />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
