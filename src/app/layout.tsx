import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: `${site.name} ${site.tagline} | Sipat`,
  description: `${site.name} ${site.tagline} in Sipat: soups, Chinese, tandoor, biryani, pizza, shakes and more. Open ${site.hours.days}, ${site.hours.time}.`,
  icons: { icon: "/images/logo.webp" },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
