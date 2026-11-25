"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -80 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // On page change: jump to top (or to #hash) and re-measure scroll animations
  useEffect(() => {
    const hash = window.location.hash;
    const lenis = window.__lenis;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) lenis ? lenis.scrollTo(el as HTMLElement, { offset: -80 }) : el.scrollIntoView();
      }, 300);
    } else {
      lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
