"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, telLink } from "@/config/site";
import { PhoneIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      className={`relative px-1 py-2 transition-colors hover:text-gold-soft ${active ? "text-gold-soft" : "text-cream/80"}`}
    >
      {label}
      <span
        className={`absolute inset-x-1 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0"}`}
      />
    </Link>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-b border-gold/15 bg-black/75 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image src="/images/logo.webp" alt="" width={44} height={44} className="size-10 rounded-full sm:size-11" priority />
          <span className="font-display text-lg leading-none whitespace-nowrap text-gold-soft sm:text-xl">
            {site.name}
            <span className="mt-1 hidden font-body sm:block text-[0.7rem] tracking-[0.08em] text-muted">{site.tagline}</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3 text-[0.95rem] sm:gap-7">
          {link("/", "Home", pathname === "/")}
          {link("/menu", "Menu", pathname === "/menu")}
          <span className="hidden sm:inline">{link("/#contact", "Contact", false)}</span>
          <a
            href={telLink}
            aria-label={`Call ${site.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-3 py-2 sm:px-4 text-gold-soft transition-colors hover:bg-gold hover:text-black"
          >
            <PhoneIcon className="size-4" />
            <span className="hidden md:inline">Call {site.phone}</span>
            <span className="hidden sm:inline md:hidden">Call</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
