"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menu, type MenuCategory, type MenuItem } from "@/data/menu";

gsap.registerPlugin(ScrollTrigger);

type Filter = "all" | "veg" | "nonveg";

const isNonVeg = (c: MenuCategory, it: MenuItem) => c.type === "nonveg" || !!it.nv;
const hasNonVegColumns = (c: MenuCategory) => c.type === "both" && !c.items.some((it) => it.nv);

function filterMenu(query: string, filter: Filter) {
  const q = query.trim().toLowerCase();
  return menu
    .map((c) => ({
      ...c,
      items: c.items.filter((it) => {
        if (q && !it.n.toLowerCase().includes(q) && !c.title.toLowerCase().includes(q)) return false;
        if (filter === "veg") return !isNonVeg(c, it);
        if (filter === "nonveg") return isNonVeg(c, it) || hasNonVegColumns(c);
        return true;
      }),
    }))
    .filter((c) => c.items.length > 0);
}

const price = (p: number | string | null) => (p === null ? "–" : typeof p === "number" ? `₹${p}` : `₹${p}`);

export default function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(menu[0].id);
  const list = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const shown = useMemo(() => filterMenu(query, filter), [query, filter]);

  // Scroll animations, rebuilt whenever the visible list changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.utils.toArray<HTMLElement>(".menu-cat").forEach((cat) => {
        ScrollTrigger.create({
          trigger: cat,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(cat.dataset.id!),
        });
        if (reduce) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: cat, start: "top 82%", once: true } });
        tl.from(cat.querySelector(".cat-rule"), { scaleX: 0, duration: 0.9, ease: "expo.out" })
          .from(cat.querySelectorAll(".cat-title"), { yPercent: 100, duration: 0.8, ease: "power4.out" }, 0)
          .from(cat.querySelectorAll(".menu-row"), { y: 16, opacity: 0, stagger: 0.03, duration: 0.5, ease: "power2.out" }, 0.15);
        const img = cat.querySelector(".cat-img");
        if (img) {
          gsap.fromTo(
            img,
            { rotate: -40, scale: 0.7, opacity: 0 },
            { rotate: 0, scale: 1, opacity: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: cat, start: "top 80%", once: true } }
          );
          gsap.to(img, {
            rotate: 35,
            ease: "none",
            scrollTrigger: { trigger: cat, start: "top center", end: "bottom top", scrub: true },
          });
        }
      });
    }, list);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [shown]);

  // Keep the active category chip in view
  useEffect(() => {
    const chip = chips.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (chip && chips.current) {
      const box = chips.current;
      box.scrollTo({ left: chip.offsetLeft - box.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  const jump = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const lenis = window.__lenis;
    lenis ? lenis.scrollTo(el, { offset: -150 }) : window.scrollTo({ top: el.offsetTop - 150, behavior: "smooth" });
  };

  return (
    <div>
      {/* Sticky controls */}
      <div className="sticky top-18 z-40 border-y border-gold/15 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-8 md:flex-row md:items-center">
          <div className="flex gap-2">
            <label className="relative flex-1 md:w-64 md:flex-none">
              <span className="sr-only">Search dishes</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes"
                type="search"
                className="w-full rounded-full border border-gold/30 bg-black px-5 py-2.5 text-cream placeholder:text-muted focus:border-gold focus:outline-none"
              />
            </label>
            <div className="flex rounded-full border border-gold/30 p-1" role="group" aria-label="Filter dishes">
              {(
                [
                  ["all", "All"],
                  ["veg", "Veg"],
                  ["nonveg", "Non-veg"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  aria-pressed={filter === k}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    filter === k ? "bg-gold text-black" : "text-cream/80 hover:text-gold-soft"
                  }`}
                >
                  {k !== "all" && <span className={`mark scale-75 ${k === "veg" ? (filter === k ? "text-black" : "text-leaf") : filter === k ? "text-black" : "text-chilli"}`} />}
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div ref={chips} className="flex gap-2 overflow-x-auto [scrollbar-width:none] md:flex-1">
            {shown.map((c) => (
              <button
                key={c.id}
                data-chip={c.id}
                onClick={() => jump(c.id)}
                className={`flex-none rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors ${
                  active === c.id ? "bg-gold/15 text-gold-soft ring-1 ring-gold/60" : "text-cream/65 hover:text-cream"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div ref={list} className="mx-auto max-w-6xl px-5 pt-14 pb-28 sm:px-8">
        {shown.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-cream">No dishes match &ldquo;{query}&rdquo;</p>
            <p className="mt-3 text-cream/65">Try another word, or clear the search to see the full menu.</p>
            <button
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-6 rounded-full bg-gold px-6 py-3 font-semibold text-black"
            >
              Clear search
            </button>
          </div>
        )}

        {shown.map((c, idx) => (
          <section
            key={c.id}
            id={`cat-${c.id}`}
            data-id={c.id}
            className="menu-cat grid gap-8 border-b border-gold/10 py-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-14"
          >
            <div className={`${idx % 2 ? "md:order-2" : ""}`}>
              <div className="md:sticky md:top-44">
                <div className="overflow-hidden">
                  <h2 className="cat-title font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] text-gold-soft">{c.title}</h2>
                </div>
                <div className="cat-rule mt-4 h-px w-24 origin-left bg-gold" />
                {c.note && <p className="mt-4 text-cream/65 italic">{c.note}</p>}
                {c.image && (
                  <div className="relative mt-6 hidden aspect-square w-full max-w-[300px] md:block">
                    <Image src={`/images/${c.image}.webp`} alt="" fill sizes="300px" className="cat-img dish-img object-contain" />
                  </div>
                )}
              </div>
            </div>

            <div>
              {c.cols.length > 1 && (
                <div className="mb-3 flex justify-end gap-2 text-xs text-muted sm:text-sm">
                  {c.cols.map((col) => (
                    <span key={col} className="w-14 text-right sm:w-16">
                      {col}
                    </span>
                  ))}
                </div>
              )}
              <ul>
                {c.items.map((it) => (
                  <li key={it.n} className="menu-row flex items-baseline gap-3 py-2.5">
                    <span
                      className={`mark translate-y-0.5 ${isNonVeg(c, it) ? "text-chilli" : c.type === "both" && !it.nv && hasNonVegColumns(c) ? "text-gold" : "text-leaf"}`}
                      aria-label={isNonVeg(c, it) ? "Non-veg" : hasNonVegColumns(c) ? "Veg and non-veg" : "Veg"}
                    />
                    <span className="text-[1.05rem] text-cream sm:text-lg">{it.n}</span>
                    <span className="leader" />
                    {it.p.map((p, k) => (
                      <span
                        key={k}
                        className={`text-right font-medium tabular-nums ${c.cols.length > 1 ? "w-14 sm:w-16" : ""} ${p === null ? "text-muted/50" : "text-gold"}`}
                      >
                        {price(p)}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
