"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, telLink, whatsappLink, instagramLink, mapEmbed, mapDirections } from "@/config/site";
import { PhoneIcon, WhatsAppIcon, InstagramIcon, MailIcon, PinIcon, ClockIcon } from "../Icons";

gsap.registerPlugin(ScrollTrigger);

const reasons = ["Book a table", "Birthday or party booking", "Ask about food or an order", "Feedback"];

const field =
  "w-full rounded-xl border border-gold/25 bg-black/60 px-4 py-3 text-cream placeholder:text-muted/70 transition-colors focus:border-gold focus:outline-none";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [reason, setReason] = useState(reasons[0]);
  const [sent, setSent] = useState(false);
  const needsDate = reason === reasons[0] || reason === reasons[1];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".contact-col", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Hello ${site.name}!`,
      ``,
      `*${reason}*`,
      `Name: ${f.get("name")}`,
      f.get("phone") ? `Phone: ${f.get("phone")}` : "",
      needsDate && f.get("date") ? `Date: ${f.get("date")}` : "",
      needsDate && f.get("time") ? `Time: ${f.get("time")}` : "",
      needsDate && f.get("guests") ? `Guests: ${f.get("guests")}` : "",
      f.get("message") ? `\n${f.get("message")}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="contact" ref={root} className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-2xl font-display text-[clamp(2.3rem,5vw,4rem)] leading-[1.05] text-gold-soft">
          Book a table or send us a message
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Details + map */}
          <div className="contact-col space-y-8">
            <ul className="space-y-5 text-lg">
              <li>
                <a href={mapDirections} target="_blank" rel="noreferrer" className="flex gap-4 hover:text-gold-soft">
                  <PinIcon className="mt-1 size-6 flex-none text-gold" />
                  <span>
                    {site.address.line1}
                    <br />
                    <span className="text-cream/70">{site.address.line2}</span>
                  </span>
                </a>
              </li>
              <li className="flex gap-4">
                <ClockIcon className="mt-1 size-6 flex-none text-gold" />
                <span>
                  {site.hours.days}
                  <br />
                  <span className="text-cream/70">{site.hours.time}</span>
                </span>
              </li>
              {site.phone && (
                <li>
                  <a href={telLink} className="flex items-center gap-4 hover:text-gold-soft">
                    <PhoneIcon className="size-6 text-gold" /> {site.phone}
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-4 break-all hover:text-gold-soft">
                    <MailIcon className="size-6 flex-none text-gold" /> {site.email}
                  </a>
                </li>
              )}
              {instagramLink && (
                <li>
                  <a href={instagramLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-gold-soft">
                    <InstagramIcon className="size-6 text-gold" /> @{site.instagram}
                  </a>
                </li>
              )}
            </ul>

            <div className="overflow-hidden rounded-3xl border border-gold/20">
              <iframe
                src={mapEmbed}
                title={`Map showing ${site.name}, Sipat`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-72 w-full grayscale-[0.4] invert-[0.9] hue-rotate-180"
              />
            </div>
            <a href={mapDirections} target="_blank" rel="noreferrer" className="inline-block text-gold underline-offset-4 hover:underline">
              Get directions in Google Maps
            </a>
          </div>

          {/* WhatsApp form */}
          <div className="contact-col rounded-3xl border border-gold/20 bg-panel p-6 sm:p-9">
            <form onSubmit={onSubmit} className="space-y-5">
              <fieldset>
                <legend className="mb-3 text-cream/80">What can we help with?</legend>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setReason(r)}
                      aria-pressed={reason === r}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        reason === r ? "border-gold bg-gold text-black" : "border-gold/30 text-cream/80 hover:border-gold"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-cream/70">Your name</span>
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-cream/70">Phone (optional)</span>
                  <input name="phone" type="tel" autoComplete="tel" className={field} />
                </label>
              </div>

              {needsDate && (
                <div className="grid gap-5 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-cream/70">Date</span>
                    <input name="date" type="date" min={today} className={`${field} [color-scheme:dark]`} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-cream/70">Time</span>
                    <input name="time" type="time" min="11:00" max="21:30" className={`${field} [color-scheme:dark]`} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-cream/70">Guests</span>
                    <input name="guests" type="number" min={1} max={200} className={field} />
                  </label>
                </div>
              )}

              <label className="block">
                <span className="mb-1.5 block text-sm text-cream/70">Message</span>
                <textarea name="message" rows={4} className={field} placeholder="Anything we should know?" />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25d366] px-7 py-4 font-semibold text-black transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <WhatsAppIcon className="size-5" /> Send on WhatsApp
              </button>
              <p className="text-sm text-muted" aria-live="polite">
                {sent
                  ? "WhatsApp opened with your message. Tap send there and we'll reply soon."
                  : "This opens WhatsApp with your message ready, so you just tap send."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
