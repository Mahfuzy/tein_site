import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEIN - Tertiary Education Institutions Network | NDC Student Wing",
  description: "Join the official student wing of the National Democratic Congress (NDC). Empowering students and building the future of Ghana through civic education, leadership, and progressive values.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <Navbar />
          {children}
          <Toaster richColors position="top-right" />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
