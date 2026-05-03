import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Trisno Jaya Barokah | Supplier Ayam Segar Premium",
  description: "Trisno Jaya Barokah menyediakan ayam potong segar, higienis, dan halal kualitas terbaik untuk kebutuhan rumah tangga dan bisnis kuliner Anda.",
  keywords: "ayam segar, ayam potong, ayam broiler, telur ayam, supplier ayam, banyumas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className={`${outfit.variable} font-outfit`}>{children}</body>
    </html>
  );
}
