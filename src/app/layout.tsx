import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Mesto",
  description: "PWA enabled Next.js app",
  themeColor: "#1673FF",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
