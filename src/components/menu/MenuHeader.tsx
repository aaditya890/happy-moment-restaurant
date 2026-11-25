"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/config/site";
import { photos } from "@/data/photos";

const floaters = [
  { src: photos.pizza, cls: "right-[3%] top-[22%] w-52 lg:w-72" },
  { src: photos.paneerMasala2, cls: "right-[26%] top-[46%] w-36 lg:w-48" },
  { src: photos.mojito, cls: "right-[20%] top-[12%] w-24 lg:w-32" },
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
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {floaters.map((f) => (
          <div key={f.src} className={`mh-float absolute aspect-square overflow-hidden rounded-full ring-1 ring-gold/30 ${f.cls}`}>
            <Image src={f.src} alt="" fill sizes="300px" className="object-cover" priority />
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
