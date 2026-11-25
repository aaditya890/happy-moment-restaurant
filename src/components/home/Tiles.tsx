"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menu, tiles } from "@/data/menu";

gsap.registerPlugin(ScrollTrigger);

const countFor = (ids: string[]) => menu.filter((c) => ids.includes(c.id)).reduce((n, c) => n + c.items.length, 0);

export default function Tiles() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".tile").forEach((tile, i) => {
        // Each photo opens like a curtain, then drifts slowly inside its frame as you scroll
        gsap.fromTo(
          tile,
          { clipPath: "inset(100% 0% 0% 0% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 1.3,
            delay: (i % 3) * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: tile, start: "top 88%" },
          }
        );
        gsap.fromTo(
          tile.querySelector(".tile-img"),
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-5 pb-24 sm:px-8 md:pb-32 lg:pb-44">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] text-gold-soft">Explore the menu</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {tiles.map((t, i) => (
            <Link
              key={t.title}
              href={`/menu#cat-${t.category}`}
              className={`tile group relative isolate block aspect-[4/3] overflow-hidden rounded-[28px] sm:aspect-[4/5] ${i % 3 === 1 ? "lg:translate-y-14" : ""}`}
            >
              <div className="tile-img absolute inset-[-10%] -z-10">
                <Image
                  src={t.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="flex h-full items-end justify-between gap-4 p-6 sm:p-7">
                <div>
                  <p className="font-display text-3xl text-cream sm:text-4xl">{t.title}</p>
                  <p className="mt-1 text-cream/70">{countFor(t.count)} dishes</p>
                </div>
                <span className="grid size-12 flex-none place-items-center rounded-full border border-cream/40 text-cream transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
