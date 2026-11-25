"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { telLink, whatsappLink, site } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: "Air-conditioned hall", text: "Cool and comfortable seating, even on the hottest afternoons." },
  { title: "Sofa booths for families", text: "Room for the whole family, from kids to grandparents." },
  { title: "Birthdays and get-togethers", text: "Tell us the date and number of guests and we'll get the hall ready." },
];

export default function Hall() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".hall-video").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(18% 18% 18% 18% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: true },
          }
        );
        gsap.to(el, {
          yPercent: i === 0 ? -8 : 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      gsap.from(".hall-feature", {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hall-features", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden border-y border-gold/10 bg-panel px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="font-display text-[clamp(2.3rem,5vw,4rem)] leading-[1.05] text-gold-soft">
            A bright, cool hall to sit back and eat together
          </h2>
          <ul className="hall-features mt-10 space-y-7">
            {features.map((f) => (
              <li key={f.title} className="hall-feature flex gap-4">
                <span className="mt-2 size-2.5 flex-none rotate-45 bg-gold" />
                <div>
                  <p className="font-display text-xl text-cream">{f.title}</p>
                  <p className="mt-1 text-cream/65">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={telLink} className="rounded-full bg-gold px-6 py-3 font-semibold text-black transition-colors hover:bg-gold-soft">
              Call to book
            </a>
            <a
              href={whatsappLink(`Hi ${site.name}, I'd like to book a table / the hall for a party.`)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/30 px-6 py-3 transition-colors hover:border-gold hover:text-gold-soft"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {[1, 2].map((n) => (
            <div key={n} className={`hall-video relative aspect-[9/16] overflow-hidden rounded-[28px] ${n === 2 ? "mt-16" : ""}`}>
              <video
                src={`/videos/hall-${n}.mp4`}
                poster={`/videos/hall-${n}.jpg`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Inside the Happy Moments dining hall"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
