"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { signature } from "@/data/menu";

gsap.registerPlugin(ScrollTrigger);

export default function Signature() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        gsap.from(".sig-row", {
          y: 40,
          opacity: 0,
          stagger: 0.07,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sig-list", start: "top 78%" },
        });
        gsap.from(".sig-heading", {
          yPercent: 100,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      }
    }, root);

    // Photo preview follows the cursor on devices with a mouse
    const el = preview.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return () => ctx.revert();
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const rTo = gsap.quickTo(el, "rotate", { duration: 0.8, ease: "power3.out" });
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX - 150);
      yTo(e.clientY - 190);
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!preview.current) return;
    gsap.to(preview.current, {
      scale: active === null ? 0.6 : 1,
      opacity: active === null ? 0 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <section ref={root} className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="overflow-hidden font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] text-gold-soft">
            <span className="sig-heading block">House favourites</span>
          </h2>
          <p className="max-w-xs text-cream/65">The dishes our regulars come back for. Prices are for a full plate.</p>
        </div>

        <ul className="sig-list mt-12 border-t border-gold/20" onPointerLeave={() => setActive(null)}>
          {signature.map((d, i) => (
            <li key={d.name} className="sig-row">
              <Link
                href={`/menu#cat-${d.category}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`group grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-gold/20 py-5 transition-opacity duration-300 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-7 ${
                  active !== null && active !== i ? "sm:opacity-35" : ""
                }`}
              >
                <span className="relative size-16 overflow-hidden rounded-full sm:hidden">
                  <Image src={d.photo} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-3">
                    <span className={`mark ${d.veg ? "text-leaf" : "text-chilli"}`} aria-label={d.veg ? "Veg" : "Non-veg"} />
                    <span className="font-display text-[clamp(1.5rem,3.6vw,3.2rem)] leading-tight text-cream transition-colors duration-300 group-hover:text-gold-soft">
                      {d.name}
                    </span>
                  </span>
                  <span className="mt-1 block pl-7 text-sm text-cream/55 sm:text-base">{d.note}</span>
                </span>
                <span className="font-display text-xl text-gold sm:text-3xl">₹{d.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating preview (desktop only) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-[380px] w-[300px] scale-50 overflow-hidden rounded-[28px] opacity-0 shadow-[0_30px_80px_rgba(0,0,0,0.7)] ring-1 ring-gold/30 sm:block"
      >
        {signature.map((d, i) => (
          <Image
            key={d.name}
            src={d.photo}
            alt=""
            fill
            sizes="300px"
            className={`object-cover transition-[opacity,transform] duration-500 ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
          />
        ))}
      </div>
    </section>
  );
}
