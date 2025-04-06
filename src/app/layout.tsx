import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/animations/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "German Innovations | Interactive 3D Experience",
  description: "Explore Germany's rich history of inventions and innovations through interactive 3D models and timelines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Background pattern with very low opacity */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('/assets/svg/pattern-grid.svg')] bg-repeat opacity-5 pointer-events-none"></div>
          </div>
          <Header />
          <main className="flex-grow relative z-10 w-full">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
