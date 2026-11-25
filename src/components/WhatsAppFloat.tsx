"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.8, delay: 2.6, ease: "back.out(2)" });
  }, []);
  if (!site.whatsapp) return null;
  return (
    <a
      ref={ref}
      href={whatsappLink(`Hi ${site.name}! `)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
