import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

// Define and load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Aldenaire Shoe Shop",
  description: "Shop the best footwear for men, women, and kids.",
  keywords: "shoes, online store, sneakers, footwear",
  openGraph: {
    title: "Aldenaire Shoe Shop",
    description: "Shop the best footwear for men, women, and kids.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
