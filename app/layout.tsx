import type { Metadata } from "next";
import { Geist, Geist_Mono, Gasoek_One, Dokdo } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gasoekOne = Gasoek_One({
  variable: "--font-gasoek-one",
  subsets: ["latin"],
  weight: "400",
});

const dokdo = Dokdo({
  variable: "--font-dokdo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Chu's Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gasoekOne.variable} ${dokdo.variable} antialiased bg-[#0C121B]`}
      >
        <SmoothScrolling />

        {children}
      </body>
    </html>
  );
}
