import type { Metadata } from "next";
import { site } from "@/config/site";
import MenuBrowser from "@/components/menu/MenuBrowser";
import MenuHeader from "@/components/menu/MenuHeader";

export const metadata: Metadata = {
  title: `Menu | ${site.name} ${site.tagline}, Sipat`,
  description: `Full menu and prices at ${site.name}: soups, Chinese, tandoor, paneer, chicken, biryani, breads, pizza, burgers, shakes and mocktails.`,
};

export default function MenuPage() {
  return (
    <>
      <MenuHeader />
      <MenuBrowser />
    </>
  );
}
