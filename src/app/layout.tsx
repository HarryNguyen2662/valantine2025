import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentine — Gallery kỉ niệm của chúng ta",
  description: "Lưu trữ và chia sẻ kỉ niệm — Intro, Gallery & Lời chúc Valentine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-sans bg-valentine-cream text-stone-800">
        {children}
      </body>
    </html>
  );
}
