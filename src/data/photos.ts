/**
 * Food photography (free to use under the Unsplash License, https://unsplash.com/license).
 * Images load in full HD from Unsplash's image CDN, sized automatically for each screen.
 * To use your own photo instead: put it in /public/images and change the value to "/images/your-file.jpg".
 */
const u = (id: string) => `https://images.unsplash.com/${id}`;

export const photos = {
  biryaniSpoon: u("photo-1705174299330-939dd03cc864"),
  biryaniPot: u("photo-1697155406055-2db32d47ca07"),
  biryaniBowl: u("photo-1630851840633-f96999247032"),
  paneerMasala: u("photo-1708782341807-ed35fc16b4ea"),
  paneerMasala2: u("photo-1742599361539-f096753d1100"),
  butterChicken: u("photo-1742599361574-6fb156181466"),
  butterChicken2: u("photo-1603894584373-5ac82b2ae398"),
  tandooriPlatter: u("photo-1727280376746-b89107a5b0df"),
  tandooriLemon: u("photo-1693820488674-4f8c98fbc0f9"),
  paneerTikka: u("photo-1666001120694-3ebe8fd207be"),
  noodlesWood: u("photo-1617622141573-2e00d8818f3f"),
  noodlesDark: u("photo-1570898995876-3c8350edada1"),
  noodlesPlate: u("photo-1585032226651-759b368d7246"),
  chilliChicken: u("photo-1702705481217-846e30915076"),
  pizza: u("photo-1513104890138-7c749659a591"),
  pizzas: u("photo-1651981075280-9a9e01acbff0"),
  naanStack: u("photo-1640625314547-aee9a7696589"),
  naan: u("photo-1655979284091-eea0e93405ee"),
  mojito: u("photo-1653542772393-71ffa417b1c4"),
  mojito2: u("photo-1631067451074-27e2826ec83b"),
  oreoShake: u("photo-1572490122747-3968b75cc699"),
  chocoShake: u("photo-1594488506255-a8bbfdeedbaf"),
  burger: u("photo-1651993841930-946a700c1524"),
  friedRice: u("photo-1664717698774-84f62382613b"),
  soup: u("photo-1613844237701-8f3664fc2eff"),
  dal: u("photo-1708782340380-536df8cf6784"),
  pakoda: u("photo-1625242661157-e9e5708ffe5e"),
  kofta: u("photo-1675062521103-2163d664643d"),
} as const;

/** Photo shown beside each menu category on the Menu page (by category id in menu.ts) */
export const categoryPhotos: Record<string, string> = {
  soup: photos.soup,
  "quick-bites": photos.pakoda,
  pizza: photos.pizza,
  burger: photos.burger,
  "chinese-veg": photos.noodlesPlate,
  "chinese-nonveg": photos.chilliChicken,
  noodles: photos.noodlesDark,
  "chinese-rice": photos.friedRice,
  "main-veg": photos.kofta,
  paneer: photos.paneerMasala,
  "tandoori-veg": photos.paneerTikka,
  "tandoori-nonveg": photos.tandooriPlatter,
  chicken: photos.butterChicken,
  dal: photos.dal,
  biryani: photos.biryaniSpoon,
  breads: photos.naanStack,
  mocktails: photos.mojito,
  shakes: photos.oreoShake,
  beverages: photos.chocoShake,
};
