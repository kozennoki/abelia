import type { Metadata } from "next";
import { Noto_Sans_JP, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/analytics";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
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
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
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
        <Header />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
