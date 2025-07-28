import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Mesto",
  description: "PWA enabled Next.js app",
  manifest: "/manifest.json",
  applicationName: "Mesto",
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/icons/icon-192x192.png",
    },
    {
      rel: "icon",
      url: "/icons/icon-192x192.png",
    },
  ],
  appleWebApp: {
    capable: true,
    title: "Mesto",
  },
};

export const viewport = {
  themeColor: "#1673FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} antialiased relative z-[1] text-[14px] font-normal leading-[120%]`}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
