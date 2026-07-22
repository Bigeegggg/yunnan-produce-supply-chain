import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yunnan Plateau Supply Chain — Direct Sourcing · Cold Chain · Traceability",
  description: "Yunnan highland produce supply chain. Serving distributors, supermarkets, and community group-buy with direct sourcing and cold chain delivery.",
  keywords: "Yunnan produce, plateau supply chain, fruit wholesale, vegetable supply, cold chain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
