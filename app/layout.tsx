import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interchange Fee Intelligence",
  description:
    "Payment rail analytics and scenario intelligence — Infocreon Internship, Batch 8, POC #2.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}