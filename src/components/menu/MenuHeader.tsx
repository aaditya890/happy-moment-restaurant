"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/config/site";

const floaters = [
  { src: "pizza", cls: "right-[4%] top-[18%] w-44 md:w-64" },
  { src: "noodles", cls: "right-[30%] -bottom-10 w-36 md:w-52" },
  { src: "mojito", cls: "right-[22%] top-[8%] w-20 md:w-28" },
];

export default function MenuHeader() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".mh-line", { yPercent: 110, duration: 1.1, stagger: 0.1 })
        .from(".mh-fade", { opacity: 0, y: 16, duration: 0.8 }, 0.5)
        .from(".mh-float", { scale: 0, rotate: -120, opacity: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" }, 0.2);
      gsap.utils.toArray<HTMLElement>(".mh-float").forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 14 : -14, rotate: i % 2 ? 6 : -6, duration: 3 + i, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden px-5 pt-36 pb-16 sm:px-8 md:pt-44 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden opacity-90 sm:block">
        {floaters.map((f) => (
          <div key={f.src} className={`mh-float absolute aspect-square ${f.cls}`}>
            <Image src={`/images/${f.src}.webp`} alt="" fill sizes="260px" className="dish-img object-contain" priority />
          </div>
        ))}
      </div>
      <div className="relative mx-auto max-w-7xl">
        <h1 className="font-display text-[clamp(3.4rem,10vw,8rem)] leading-[0.92] font-semibold text-gold-soft">
          <span className="block overflow-hidden">
            <span className="mh-line block">Our menu</span>
          </span>
        </h1>
        <p className="mh-fade mt-6 max-w-md text-cream/75">
          Prices in rupees. Green marks veg dishes, red marks non-veg, and gold means the dish comes in both. Everything is cooked to order, so
          please allow about 20 minutes.
        </p>
        <p className="mh-fade mt-3 text-sm text-muted">
          {site.hours.days}, {site.hours.time}
        </p>
      </div>
    </section>
  );
}
