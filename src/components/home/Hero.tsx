"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, telLink } from "@/config/site";
import { photos } from "@/data/photos";
import { PhoneIcon, PinIcon } from "../Icons";

gsap.registerPlugin(ScrollTrigger);

const GLOW =
  "0 0 6px rgba(255,214,140,0.55), 0 0 22px rgba(240,160,60,0.35), 0 0 60px rgba(240,138,36,0.25)";

/** Three columns of food photos that drift up and down behind the title */
const columns: { src: string; alt: string }[][] = [
  [
    { src: photos.biryaniSpoon, alt: "Biryani being served from the pot" },
    { src: photos.paneerTikka, alt: "Paneer tikka with green chutney" },
    { src: photos.mojito, alt: "Mint mojito" },
    { src: photos.butterChicken, alt: "Butter chicken curry" },
  ],
  [
    { src: photos.tandooriPlatter, alt: "Tandoori chicken platter" },
    { src: photos.noodlesPlate, alt: "Hakka noodles" },
    { src: photos.oreoShake, alt: "Oreo shake" },
    { src: photos.paneerMasala, alt: "Paneer butter masala" },
  ],
  [
    { src: photos.pizza, alt: "Pizza" },
    { src: photos.chilliChicken, alt: "Chilli chicken" },
    { src: photos.naanStack, alt: "Stack of naan" },
    { src: photos.biryaniBowl, alt: "Bowl of biryani" },
  ],
];

function useOpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const hour = Number(
        new Intl.DateTimeFormat("en-IN", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date())
      );
      setOpen(hour >= site.hours.open && hour < site.hours.close);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return open;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const open = useOpenNow();
  const words = site.name.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      if (reduce) {
        gsap.set(letters, { color: "#f1d9a0", textShadow: GLOW });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".mosaic-col", { yPercent: 30, opacity: 0, duration: 1.8, stagger: 0.15, ease: "expo.out" }, 0);

      // The name lights up letter by letter, with a few flickers like real bulbs
      gsap.utils.shuffle([...letters]).forEach((el, i) => {
        const at = 0.4 + i * 0.08;
        if (i % 4 === 1) {
          tl.to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.05 }, at)
            .to(el, { color: "#3a3122", textShadow: "none", duration: 0.05 }, at + 0.08)
            .to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.05 }, at + 0.2);
        } else {
          tl.to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.12 }, at);
        }
      });
      tl.from(".hero-fade", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.2);

      // Endless drift: columns move in opposite directions
      gsap.utils.toArray<HTMLElement>(".mosaic-track").forEach((track, i) => {
        const up = i % 2 === 0;
        gsap.fromTo(
          track,
          { yPercent: up ? 0 : -50 },
          { yPercent: up ? -50 : 0, duration: 46 + i * 8, ease: "none", repeat: -1 }
        );
      });

      // Scroll: the copy rises and fades, the mosaic tilts a little more
      gsap.to(".hero-copy", {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".mosaic", {
        rotate: -14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate h-[100svh] min-h-[640px] overflow-hidden">
      {/* Photo mosaic */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div className="mosaic absolute top-[-30%] right-[-30%] grid h-[160%] w-[130%] rotate-[-9deg] grid-cols-3 gap-3 sm:right-[-12%] sm:w-[95%] sm:gap-4 lg:right-[-6%] lg:w-[64%] lg:gap-5">
          {columns.map((col, ci) => (
            <div key={ci} className="mosaic-col overflow-hidden">
              <div className="mosaic-track flex flex-col gap-3 sm:gap-4 lg:gap-5">
                {[...col, ...col].map((p, i) => (
                  <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-gold/15">
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      priority={i < 2}
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shade so the text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.92)_30%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.15)_80%,rgba(0,0,0,0.35)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.8)_45%,#000_85%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="mx-auto flex h-full max-w-7xl items-end px-5 pt-28 pb-14 sm:px-8 lg:items-center lg:pb-10">
        <div className="hero-copy max-w-2xl">
          <p className="hero-fade mb-7 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-gold/30 bg-black/60 px-4 py-1.5 text-sm backdrop-blur">
            {open !== null && (
              <>
                <span className={`size-2 rounded-full ${open ? "bg-leaf shadow-[0_0_10px_#4caf50]" : "bg-chilli"}`} />
                <span className="font-semibold">{open ? "Open now" : "Closed now"}</span>
              </>
            )}
            <span className="text-cream/75">
              {site.hours.days}, {site.hours.time}
            </span>
          </p>

          <h1 className="font-display text-[clamp(3.8rem,11vw,9rem)] leading-[0.86] font-semibold tracking-[-0.025em]">
            {words.map((word, wi) => (
              <span key={wi} className="block whitespace-nowrap">
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="hero-letter inline-block text-[#3a3122]">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 font-display text-2xl text-cream/90 italic sm:text-3xl">{site.tagline}, Sipat</p>
          <p className="hero-fade mt-4 max-w-md text-cream/75">
            Biryani, tandoor, rich curries, Chinese, pizza and thick shakes, cooked fresh for families and friends.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <Link href="/menu" className="rounded-full bg-gold px-7 py-3.5 font-semibold text-black transition-colors hover:bg-gold-soft">
              See the menu
            </Link>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-black/50 px-7 py-3.5 backdrop-blur transition-colors hover:border-gold hover:text-gold-soft"
            >
              <PhoneIcon className="size-4" /> Book a table
            </a>
          </div>

          <p className="hero-fade mt-8 flex items-start gap-2 text-sm text-cream/60">
            <PinIcon className="mt-0.5 size-4 flex-none text-gold" />
            {site.address.line1}, {site.address.line2}
          </p>
        </div>
      </div>
    </section>
  );
}
