/**
 * ============================================================
 *  HAPPY MOMENTS — CONTACT & BUSINESS DETAILS (edit only this)
 * ============================================================
 *  Everything you change here updates the whole website:
 *  header, footer, contact section, WhatsApp form, call buttons
 *  and the map. Leave a value as "" to hide it on the site.
 */
export const site = {
  name: "Happy Moments",
  tagline: "Café & Restaurant",
  slogan: "Keep smile",

  /** Phone number shown on the site */
  phone: "+91 91118 10053",

  /** WhatsApp number: country code + number, digits only (no + or spaces) */
  whatsapp: "919111810053",

  /** Email address. Leave "" to hide it until you add one. */
  email: "",

  /** Instagram username without the @ */
  instagram: "happy_moments_sipat",

  /** Facebook page link. Leave "" to hide it. */
  facebook: "",

  address: {
    line1: "In front of Govt. Madan Lal Shukla College",
    line2: "Sipat, Chhattisgarh",
  },

  /** What Google Maps should search for (used for the map + directions) */
  mapQuery: "Happy Moments Cafe and Restaurant, Sipat, Chhattisgarh",

  hours: {
    days: "Monday to Sunday",
    time: "11 AM – 10 PM",
    /** 24-hour clock, used for the "Open now" badge */
    open: 11,
    close: 22,
  },
} as const;

/* ---- Helpers (no need to edit below this line) ---- */
export const telLink = `tel:${site.phone.replace(/\s/g, "")}`;
export const whatsappLink = (text = "") =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const instagramLink = site.instagram ? `https://instagram.com/${site.instagram}` : "";
export const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
export const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`;
