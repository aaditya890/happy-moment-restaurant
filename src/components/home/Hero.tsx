"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, telLink } from "@/config/site";
import { favourites } from "@/data/menu";
import LightCurtain from "../LightCurtain";
import { PhoneIcon, PinIcon } from "../Icons";

gsap.registerPlugin(ScrollTrigger);

const GLOW =
  "0 0 6px rgba(255,214,140,0.55), 0 0 22px rgba(240,160,60,0.35), 0 0 60px rgba(240,138,36,0.25)";

/** Dishes that rotate on the hero plate (the first six favourites in menu.ts) */
const plates = favourites.slice(0, 6);
const sides = [
  { src: "mojito", cls: "left-[-4%] top-[6%] w-[20%]", depth: 18 },
  { src: "naan", cls: "right-[-6%] top-[14%] w-[24%]", depth: -24 },
  { src: "shake", cls: "right-[0%] bottom-[0%] w-[19%]", depth: 14 },
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
  const [index, setIndex] = useState(0);
  const current = useRef(0);
  const busy = useRef(false);
  const paused = useRef(false);
  const words = site.name.split(" ");

  // Swap the dish on the plate: the old one spins out, the new one spins in
  const show = useCallback((next: number) => {
    if (busy.current || next === current.current) return;
    const els = gsap.utils.toArray<HTMLElement>(".plate-dish");
    const from = els[current.current];
    const to = els[next];
    if (!to) return;
    busy.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline({ onComplete: () => void (busy.current = false) });
    tl.to(from, { rotate: 120, scale: 0.55, opacity: 0, duration: reduce ? 0 : 0.7, ease: "power3.in" })
      .fromTo(
        to,
        { rotate: -120, scale: 0.55, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: reduce ? 0 : 1.1, ease: "expo.out" },
        "-=0.25"
      )
      .fromTo(".plate-caption", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "<0.15");
    current.current = next;
    setIndex(next);
  }, []);

  // Auto-rotate dishes (pauses while the pointer is over the plate)
  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current || document.hidden) return;
      show((current.current + 1) % plates.length);
    }, 4200);
    return () => clearInterval(id);
  }, [show]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.set(".plate-dish:not(:first-child)", { opacity: 0, scale: 0.55 });

      if (reduce) {
        gsap.set(letters, { color: "#f1d9a0", textShadow: GLOW });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".plate-ring", { scale: 0.6, opacity: 0, rotate: -90, duration: 1.6, ease: "expo.out" }, 0)
        .from(".plate-glow", { opacity: 0, scale: 0.5, duration: 2 }, 0)
        .from(".plate-dish:first-child", { rotate: -160, scale: 0.4, opacity: 0, duration: 1.8, ease: "expo.out" }, 0.3)
        .from(".plate-side", { scale: 0, opacity: 0, rotate: -60, duration: 1.2, stagger: 0.12, ease: "back.out(1.6)" }, 0.9)
        .from(".plate-caption, .plate-dots", { y: 14, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.2);

      // The name lights up letter by letter, with a few flickers like real bulbs
      gsap.utils.shuffle([...letters]).forEach((el, i) => {
        const at = 0.5 + i * 0.08;
        if (i % 4 === 1) {
          tl.to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.05 }, at)
            .to(el, { color: "#3a3122", textShadow: "none", duration: 0.05 }, at + 0.08)
            .to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.05 }, at + 0.2);
        } else {
          tl.to(el, { color: "#f1d9a0", textShadow: GLOW, duration: 0.12 }, at);
        }
      });
      tl.from(".hero-fade", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.3);

      // Slow spin of the rim ticks, side dishes drifting
      gsap.to(".plate-ring-ticks", { rotate: 360, duration: 60, repeat: -1, ease: "none", svgOrigin: "200 200" });
      gsap.utils.toArray<HTMLElement>(".plate-side-float").forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 12 : -12, rotate: i % 2 ? 8 : -8, duration: 3 + i * 0.7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });

      // Pointer parallax
      const onMove = (e: PointerEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".plate-inner", { x: x * 16, y: y * 16, duration: 1, ease: "power2.out", overwrite: "auto" });
        document.querySelectorAll<HTMLElement>(".plate-side").forEach((el) => {
          const d = Number(el.dataset.depth || 0);
          gsap.to(el, { x: x * d * 2, y: y * d, duration: 1.2, ease: "power2.out", overwrite: "auto" });
        });
      };
      window.addEventListener("pointermove", onMove);

      // Scroll parallax
      gsap.to(".hero-copy", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".plate-stage", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      return () => window.removeEventListener("pointermove", onMove);
    }, root);
    return () => ctx.revert();
  }, []);

  const dish = plates[index];

  return (
    <section ref={root} className="relative isolate overflow-hidden">
      {/* Warm light washes */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_74%_52%,rgba(240,138,36,0.15),transparent_70%),radial-gradient(40%_40%_at_12%_8%,rgba(217,180,90,0.09),transparent_70%)]"
      />
      <LightCurtain className="absolute inset-0 -z-10 h-full w-full opacity-70 [mask-image:linear-gradient(to_bottom,#000_0%,#000_22%,transparent_55%)]" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-24">
        {/* Copy */}
        <div className="hero-copy relative z-10">
          <p className="hero-fade mb-7 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-gold/30 bg-black/50 px-4 py-1.5 text-sm backdrop-blur">
            {open !== null && (
              <>
                <span className={`size-2 rounded-full ${open ? "bg-leaf shadow-[0_0_10px_#4caf50]" : "bg-chilli"}`} />
                <span className="font-semibold">{open ? "Open now" : "Closed now"}</span>
              </>
            )}
            <span className="text-cream/70">
              {site.hours.days}, {site.hours.time}
            </span>
          </p>

          <h1 className="font-display text-[clamp(3.6rem,10vw,8.4rem)] leading-[0.88] font-semibold tracking-[-0.02em]">
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
          <p className="hero-fade mt-4 max-w-md text-cream/70">
            Family dining with veg and non-veg dishes, from Chinese and tandoor to biryani, pizza and shakes. Cooked
            fresh when you order.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <Link href="/menu" className="rounded-full bg-gold px-7 py-3.5 font-semibold text-black transition-colors hover:bg-gold-soft">
              See the menu
            </Link>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-black/40 px-7 py-3.5 backdrop-blur transition-colors hover:border-gold hover:text-gold-soft"
            >
              <PhoneIcon className="size-4" /> Book a table
            </a>
          </div>

          <p className="hero-fade mt-8 flex items-start gap-2 text-sm text-muted">
            <PinIcon className="mt-0.5 size-4 flex-none text-gold" />
            {site.address.line1}, {site.address.line2}
          </p>
        </div>

        {/* The plate */}
        <div
          className="plate-stage relative mx-auto w-full max-w-[min(86vw,540px)]"
          onPointerEnter={() => (paused.current = true)}
          onPointerLeave={() => (paused.current = false)}
        >
          <div className="plate-inner relative aspect-square">
            <div
              aria-hidden
              className="plate-glow absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(240,138,36,0.26),rgba(217,180,90,0.07)_55%,transparent_70%)] blur-2xl"
            />

            {/* Gold rim with turning ticks */}
            <svg aria-hidden viewBox="0 0 400 400" className="plate-ring absolute inset-0 h-full w-full text-gold">
              <circle cx="200" cy="200" r="196" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" />
              <circle cx="200" cy="200" r="182" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
              <g className="plate-ring-ticks">
                {Array.from({ length: 72 }, (_, i) => (
                  <line
                    key={i}
                    x1="200"
                    y1="6"
                    x2="200"
                    y2={i % 6 === 0 ? 18 : 12}
                    stroke="currentColor"
                    strokeOpacity={i % 6 === 0 ? 0.8 : 0.35}
                    strokeWidth="1"
                    transform={`rotate(${i * 5} 200 200)`}
                  />
                ))}
              </g>
            </svg>

            {/* Rotating dishes */}
            <div className="absolute inset-[10%]">
              {plates.map((p, i) => (
                <div key={p.image} className="plate-dish absolute inset-0">
                  <Image
                    src={`/images/${p.image}.webp`}
                    alt={i === index ? p.name : ""}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 440px, 76vw"
                    className="dish-img object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Side dishes */}
            {sides.map((s) => (
              <div key={s.src} data-depth={s.depth} className={`plate-side pointer-events-none absolute aspect-square ${s.cls}`}>
                <div className="plate-side-float relative h-full w-full">
                  <Image src={`/images/${s.src}.webp`} alt="" fill sizes="140px" className="dish-img object-contain" />
                </div>
              </div>
            ))}
          </div>

          {/* Caption + dish picker */}
          <div className="mt-3 flex flex-col items-center gap-3 text-center">
            <div className="plate-caption min-h-[3.75rem]" aria-live="polite">
              <p className="flex items-center justify-center gap-2.5 font-display text-2xl text-cream sm:text-[1.7rem]">
                <span className={`mark ${dish.veg ? "text-leaf" : "text-chilli"}`} aria-label={dish.veg ? "Veg" : "Non-veg"} />
                {dish.name}
              </p>
              <p className="mt-0.5 text-lg text-gold">₹{dish.price}</p>
            </div>
            <div className="plate-dots flex gap-1" role="group" aria-label="Choose a dish">
              {plates.map((p, i) => (
                <button
                  key={p.image}
                  onClick={() => show(i)}
                  aria-label={`Show ${p.name}`}
                  aria-pressed={i === index}
                  className="grid h-8 w-8 place-items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-gold" : "w-1.5 bg-cream/35"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
