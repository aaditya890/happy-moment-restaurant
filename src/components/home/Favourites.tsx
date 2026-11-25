"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { favourites } from "@/data/menu";

gsap.registerPlugin(ScrollTrigger);

export default function Favourites() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Desktop: the section pins and the dishes slide sideways as you scroll
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 64;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".fav-img").forEach((img) => {
          gsap.fromTo(
            img,
            { rotate: -25, scale: 0.8 },
            {
              rotate: 10,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            }
          );
        });
      });
      // Mobile: swipe sideways, dishes spin in as they appear
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".fav-card", {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
      <div className="mx-auto mb-12 flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <h2 className="font-display text-[clamp(2.3rem,5vw,4rem)] leading-none text-gold-soft">What people order most</h2>
        <Link href="/menu" className="rounded-full border border-gold/50 px-6 py-3 text-gold-soft transition-colors hover:bg-gold hover:text-black">
          Full menu
        </Link>
      </div>

      <div className="overflow-x-auto md:overflow-visible [scrollbar-width:none]">
        <div ref={track} className="flex w-max gap-6 px-5 sm:px-8 md:gap-10 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {favourites.map((d) => (
            <article key={d.name} className="fav-card w-[68vw] max-w-[320px] flex-none sm:w-[300px]">
              <div className="relative aspect-square">
                                <Image
                  src={`/images/${d.image}.webp`}
                  alt={d.name}
                  fill
                  sizes="320px"
                  className="fav-img dish-img object-contain"
                />
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span className={`mark mt-1.5 ${d.veg ? "text-leaf" : "text-chilli"}`} aria-label={d.veg ? "Veg" : "Non-veg"} />
                <div className="flex-1">
                  <h3 className="font-display text-2xl leading-tight text-cream">{d.name}</h3>
                  <p className="mt-1 text-lg text-gold">₹{d.price}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
