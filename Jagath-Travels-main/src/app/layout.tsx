// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import FloatingButton from "@/components/common/FloatingButton/FloatButton";
import TawkToChat from "@/components/common/chat/chat";
import SessionWrapper from "./wrappers/SessionWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jagath Travels & Tours - Your Adventure Partner",
  description: "Explore breathtaking destinations with Jagath Travels & Tours. Book your dream adventure today!",
  keywords: "travel, tours, adventure, holiday packages, trips",
  openGraph: {
    title: "Jagath Travels & Tours",
    description: "Plan your next adventure with Jagath Travels & Tours.",
    url: "https://jagathtravels.com",
    siteName: "Jagath Travels & Tours",
    images: [
      {
        url: "https://jagathtravels/assets/images/jagathlogo2.png",
        width: 800,
        height: 600,
        alt: "Jagath Travels & Tours Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper> {/* Use SessionWrapper here */}
          <Providers>{children} <FloatingButton /><TawkToChat /></Providers>
        </SessionWrapper>
      </body>
    </html>
  );
}
