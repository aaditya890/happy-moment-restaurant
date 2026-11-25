# Happy Moments Café & Restaurant: website

Next.js + Tailwind CSS + GSAP (animations) + Lenis (smooth scrolling).
Two pages: **Home** (`/`) and **Menu** (`/menu`).

## Run it on your computer

1. Install Node.js (version 20 or newer) from https://nodejs.org
2. Open a terminal in this folder and run:

```
npm install
npm run dev
```

3. Open http://localhost:3000 in your browser.

## Change contact details (phone, email, WhatsApp, address, hours)

Edit **one file**: `src/config/site.ts`

Whatever you change there updates the header, footer, contact section,
WhatsApp form, call buttons and the map, everywhere on the site.
The email is empty for now. Add it between the quotes and it appears automatically.

## Change the menu or prices

Edit `src/data/menu.ts`. Each dish looks like `i("Paneer Tikka", 350)`.
Dishes with half/full prices look like `i("Chicken Curry", 140, 240)`.
The "What people order most" list on the home page is at the bottom of the same file.

## Photos and videos

- Images: `public/images/` (dish photos, logo, storefront)
- Videos: `public/videos/` (dining hall)

To swap a photo, replace the file and keep the same name.

## Put it online (free)

Push this folder to GitHub and import it at https://vercel.com, or run
`npm run build` and host the result on any Node.js hosting.
