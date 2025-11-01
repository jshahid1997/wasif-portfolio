import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wasif Shahid | Video Editor & Content Creator",
  description: "Portfolio of Wasif Shahid - Professional video editor specializing in long-form and short-form content creation.",
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

