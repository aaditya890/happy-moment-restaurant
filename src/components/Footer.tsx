import Link from "next/link";
import Logo from "./Logo";
import { site, telLink, whatsappLink, instagramLink, mapDirections } from "@/config/site";
import { PhoneIcon, WhatsAppIcon, InstagramIcon, MailIcon, PinIcon, ClockIcon, FacebookIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-gold/20 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <Logo className="size-24 flex-none" />
            <div>
              <p className="font-display text-3xl text-gold-soft">{site.name}</p>
              <p className="text-muted">{site.tagline}, Sipat</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-cream/70">
            Veg and non-veg, Chinese, tandoor, biryani, pizza and shakes. Freshly cooked, so please allow
            about 20 minutes for your meal.
          </p>
        </div>

        <div className="space-y-4 text-cream/85">
          <p className="font-display text-lg text-gold">Visit</p>
          <a href={mapDirections} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-gold-soft">
            <PinIcon className="mt-0.5 size-5 flex-none text-gold" />
            <span>
              {site.address.line1}
              <br />
              {site.address.line2}
            </span>
          </a>
          <p className="flex gap-3">
            <ClockIcon className="mt-0.5 size-5 flex-none text-gold" />
            <span>
              {site.hours.days}
              <br />
              {site.hours.time}
            </span>
          </p>
        </div>

        <div className="space-y-4 text-cream/85">
          <p className="font-display text-lg text-gold">Contact</p>
          {site.phone && (
            <a href={telLink} className="flex items-center gap-3 hover:text-gold-soft">
              <PhoneIcon className="size-5 text-gold" /> {site.phone}
            </a>
          )}
          {site.whatsapp && (
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold-soft">
              <WhatsAppIcon className="size-5 text-gold" /> WhatsApp us
            </a>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-gold-soft">
              <MailIcon className="size-5 flex-none text-gold" /> {site.email}
            </a>
          )}
          {instagramLink && (
            <a href={instagramLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold-soft">
              <InstagramIcon className="size-5 text-gold" /> @{site.instagram}
            </a>
          )}
          {site.facebook && (
            <a href={site.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold-soft">
              <FacebookIcon className="size-5 text-gold" /> Facebook
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-gold/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted sm:px-8">
          <p>
            © {year} {site.name} {site.tagline}
          </p>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-gold-soft">Home</Link>
            <Link href="/menu" className="hover:text-gold-soft">Menu</Link>
            <Link href="/#contact" className="hover:text-gold-soft">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
