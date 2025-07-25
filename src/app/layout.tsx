import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
