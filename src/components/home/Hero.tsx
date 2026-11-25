"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, telLink } from "@/config/site";
import LightCurtain from "../LightCurtain";
import { PhoneIcon } from "../Icons";

gsap.registerPlugin(ScrollTrigger);

const GLOW =
  "0 0 6px rgba(255,214,140,0.55), 0 0 22px rgba(240,160,60,0.35), 0 0 60px rgba(240,138,36,0.25)";

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
      tl.from(".hero-photo", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)", duration: 1.6, ease: "expo.inOut" }, 0)
        .from(".hero-photo img", { scale: 1.3, duration: 2.2, ease: "expo.out" }, 0.2);

      // Sign lights up letter by letter, with a couple of flickers like real bulbs
      const order = gsap.utils.shuffle([...letters]);
      order.forEach((el, i) => {
        const at = 0.6 + i * 0.09;
        if (i % 4 === 1) {
          tl.to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.05 }, at)
            .to(el, { color: "#3a3122", textShadow: "none", duration: 0.05 }, at + 0.08)
            .to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.05 }, at + 0.2);
        } else {
          tl.to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.12 }, at);
        }
      });
      tl.from(".hero-fade", { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, 1.5);

      // Gentle parallax as you scroll away
      gsap.to(".hero-title", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-photo img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Storefront photo: full background on mobile, tall arch on desktop */}
      <div className="hero-photo absolute inset-0 -z-10 overflow-hidden md:inset-auto md:top-24 md:right-[5%] md:bottom-10 md:w-[34%] md:max-w-[460px] md:rounded-t-full md:border md:border-gold/30">
        <Image
          src="/images/storefront.webp"
          alt="Happy Moments Café & Restaurant lit up at night in Sipat"
          fill
          priority
          sizes="(min-width: 768px) 34vw, 100vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 md:from-black/70 md:via-transparent md:to-transparent" />
      </div>

      <LightCurtain className="absolute inset-0 z-0 h-full w-full [mask-image:linear-gradient(to_bottom,#000_0%,#000_45%,transparent_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pt-28 pb-16 sm:px-8 md:justify-center md:pb-24">
        <div className="md:max-w-[58%]">
          <p className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/50 px-4 py-1.5 text-sm text-cream/85 backdrop-blur">
            {open !== null && (
              <span className={`size-2 rounded-full ${open ? "bg-leaf shadow-[0_0_10px_#4caf50]" : "bg-chilli"}`} />
            )}
            {open !== null && <span className="font-semibold">{open ? "Open now" : "Closed now"}</span>}
            <span className="text-cream/70">
              {site.hours.days}, {site.hours.time}
            </span>
          </p>

          <h1 className="hero-title font-display text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.88] font-semibold tracking-[-0.02em]">
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

          <p className="hero-fade mt-6 font-display text-2xl text-cream/90 italic sm:text-3xl">
            {site.tagline}, Sipat
          </p>
          <p className="hero-fade mt-4 max-w-md text-cream/70">
            Family dining with veg and non-veg dishes, from Chinese and tandoor to biryani, pizza and shakes.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-gold px-7 py-3.5 font-semibold text-black transition-colors hover:bg-gold-soft"
            >
              See the menu
            </Link>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-black/40 px-7 py-3.5 backdrop-blur transition-colors hover:border-gold hover:text-gold-soft"
            >
              <PhoneIcon className="size-4" /> Book a table
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
