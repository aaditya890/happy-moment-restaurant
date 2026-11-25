"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menu } from "@/data/menu";

gsap.registerPlugin(ScrollTrigger);

const dishCount = menu.reduce((n, c) => n + c.items.length, 0);

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const text = `Hot soups and crispy Chinese, paneer from the tandoor, chicken biryani, pizza, mojitos and thick shakes. Over ${Math.floor(dishCount / 10) * 10} dishes, cooked fresh when you order.`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Words light up one by one as you scroll through the paragraph
      gsap.fromTo(
        ".intro-word",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".intro-text", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.from(".intro-note", {
        opacity: 0,
        y: 20,
        scrollTrigger: { trigger: ".intro-note", start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="intro-text font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.18] font-light text-cream">
          {text.split(" ").map((w, i) => (
            <span key={i} className="intro-word">
              {w}{" "}
            </span>
          ))}
        </p>
        <p className="intro-note mt-10 max-w-md border-l-2 border-gold/60 pl-5 text-cream/70">
          Everything is made to order, so please allow about 20 minutes for your meal. It&apos;s worth the wait.
        </p>
      </div>
    </section>
  );
}
