/**
 * Full menu (from Menu Card 2026). Edit prices or dishes here.
 * prices: one number per column in `cols`. Use null where a size isn't available.
 * type: "veg" | "nonveg" | "both" (both = category has veg and non-veg columns)
 * nv: true marks a non-veg dish inside a mixed category.
 */
import { photos } from "./photos";

export type MenuItem = { n: string; p: (number | string | null)[]; nv?: boolean };
export type MenuCategory = {
  id: string;
  title: string;
  type: "veg" | "nonveg" | "both";
  cols: string[];
  image?: string;
  note?: string;
  items: MenuItem[];
};

const i = (n: string, ...p: (number | string | null)[]): MenuItem => ({ n, p });
const nv = (n: string, ...p: (number | string | null)[]): MenuItem => ({ n, p, nv: true });

export const menu: MenuCategory[] = [
  {
    id: "soup", title: "Soups", type: "both", cols: ["Veg", "Non-veg"],
    items: [
      i("Manchow Soup", 110, 150), i("Hot & Sour Soup", 110, 150), i("Lemon Coriander Soup", 110, 150),
      i("Cream of Mushroom Soup", 120, null), i("Tomato Soup", 120, null), i("Sweet Corn Soup", 100, 140),
      i("Lemon Garlic Soup", 120, 160),
    ],
  },
  {
    id: "quick-bites", title: "Quick bites", type: "veg", cols: ["Price"],
    items: [
      i("Veg Pakoda", 140), i("Paneer Pakoda", 160), i("Chana Roast", 140), i("Chhole Bhature", 120),
      i("Chhole Kulche", 120), i("French Fries", 100), i("Masala French Fries", 120),
      i("Green Peas Roast", 140), i("Hara Bhara Kabab", 180),
    ],
  },
  {
    id: "pizza", title: "Pizza", type: "veg", cols: ["Price"],
    items: [
      i("Margherita Pizza", 190), i("Veg Cheese Pizza", 210), i("Corn Cheese Pizza", 200),
      i("Farm House Pizza", 270), i("Paneer Paradise Pizza", 250), nv("Chicken Pizza", 250), i("Extra Cheese", 70),
    ],
  },
  {
    id: "burger", title: "Burgers", type: "veg", cols: ["Price"],
    items: [i("Veg Burger", 90), i("Veg Cheese Burger", 100), i("Kurkure Burger", 120), nv("Chicken Burger", 150)],
  },
  {
    id: "sandwich", title: "Sandwiches", type: "veg", cols: ["Price"],
    items: [
      i("Veg Sandwich", 90), i("Veg Cheese Grilled Sandwich", 100), i("Cheese Corn Sandwich", 100),
      i("Bombay Sandwich", 130), i("Paneer Tikka Sandwich", 160), i("Chocolate Sandwich", 120),
    ],
  },
  {
    id: "maggi", title: "Maggi", type: "veg", cols: ["Price"],
    items: [i("Veg Maggi", 80), i("Plain Maggi", 60), i("Veg Cheese Maggi", 90), i("Corn Cheese Maggi", 90)],
  },
  {
    id: "chinese-veg", title: "Chinese veg", type: "veg", cols: ["Price"],
    items: [
      i("Veg Manchurian", 160), i("Veg Manchurian Gravy", 190), i("Veg Crispy", 180), i("Veg Lollipop", 200),
      i("Veg Bullet", 180), i("Veg Spring Roll", 150), i("Corn Chilli", 200), i("Crispy Corn", 180),
      i("Baby Corn Chilli", 200), i("Chana Chilli", 180), i("Potato Chilli", 180), i("Honey Chilli Potato", 200),
      i("Mushroom Chilli", 260), i("Mushroom Pepper", 260), i("Paneer Chilli", 250), i("Paneer Chilli Gravy", 280),
      i("Paneer 65", 250), i("Schezwan Paneer", 270), i("Paneer Majestic", 260), i("Dragon Paneer", 300),
      i("Paneer Manchurian", 250), i("Crispy Paneer", 250),
    ],
  },
  {
    id: "chinese-nonveg", title: "Chinese non-veg", type: "nonveg", cols: ["Half", "Full"],
    items: [
      i("Chicken Chilli", 180, 340), i("Chicken Chilli Gravy", 220, 370), i("Chicken 65", 180, 340),
      i("Schezwan Chicken", 180, 340), i("Garlic Chicken", 200, 360), i("Crispy Chicken", null, 360),
      i("Chicken Lollipop", null, 240), i("Egg Chilli", null, 200), i("Egg 65", null, 200), i("Egg Manchurian", null, 200),
    ],
  },
  {
    id: "noodles", title: "Noodles", type: "both", cols: ["Veg", "Egg", "Chicken"],
    items: [
      i("Chowmein", 100, 140, 200), i("Hakka Noodles", 120, 160, 220),
      i("Schezwan Noodles", 140, 180, 240), i("Chilli Garlic Noodles", 150, 180, 240),
    ],
  },
  {
    id: "chinese-rice", title: "Chinese rice", type: "both", cols: ["Veg", "Egg", "Chicken"],
    items: [
      i("Fried Rice", 140, 180, 240), i("Schezwan Rice", 160, 190, 250), i("Manchurian Rice", 180, 250, 280),
      i("Triple Fried Rice", 200, 250, 300), i("Mushroom Fried Rice", 200, null, null),
      i("Chilli Garlic Fried Rice", 170, 220, 280), i("Mix Fried Rice", 220, null, null),
    ],
  },
  {
    id: "combo", title: "Chinese veg combos", type: "veg", cols: ["Price"],
    items: [
      i("Veg Manchurian + Chowmein", 200), i("Veg Manchurian + Fried Rice", 200),
      i("Paneer Chilli + Chowmein", 250), i("Paneer Chilli + Fried Rice", 250),
    ],
  },
  {
    id: "main-veg", title: "Main course veg", type: "veg", cols: ["Price"],
    items: [
      i("Mix Veg", 200), i("Veg Kadhai", 230), i("Veg Patiyala", 250), i("Chana Masala", 180),
      i("Green Peas Masala", 180), i("Aalu Jeera", 120), i("Aalu Gobhi Matar", 180), i("Aalu Dum Punjabi", 220),
      i("Aalu Dum", 180), i("Mushroom Masala", 260), i("Mushroom Kadhai", 300), i("Corn Methi Masala", 240),
      i("Methi Matar Malai", 240), i("Veg Kofta", 220), i("Rajasthani Kofta", 260), i("Malai Kofta", 340),
    ],
  },
  {
    id: "paneer", title: "Paneer main course", type: "veg", cols: ["Price"],
    items: [
      i("Matar Paneer", 240), i("Paneer Masala", 240), i("Paneer Lazeez", 280), i("Paneer Butter Masala", 260),
      i("Paneer Tikka Masala", 350), i("Paneer Lababdar", 260), i("Kadhai Paneer", 280), i("Paneer Amritsari", 280),
      i("Paneer Do Pyaza", 280), i("Paneer Pasanda", 300), i("Paneer Rimjhim", 300), i("Paneer Lakhnawi", 300),
      i("Shahi Paneer (white gravy)", 300), i("Shahi Paneer (yellow gravy)", 340), i("Paneer Kalegi", 320),
      i("Paneer Rajwada", 340), i("Tawa Paneer", 360),
    ],
  },
  {
    id: "tandoori-veg", title: "Tandoori veg", type: "veg", cols: ["Price"],
    items: [
      i("Paneer Tikka", 350), i("Paneer Achari Tikka", 350), i("Paneer Lahsuni Tikka", 350),
      i("Stuffed Paneer Tikka", 380), i("Paneer Malai Tikka", 400), i("Mushroom Tikka", 300),
      i("Stuffed Mushroom Tikka", 350), i("Tandoori Aalu", 250),
    ],
  },
  {
    id: "tandoori-nonveg", title: "Tandoori non-veg", type: "nonveg", cols: ["Half", "Full"],
    items: [
      i("Tandoori Chicken", 220, 400), i("Chicken Tikka", null, 350), i("Chicken Achari Tikka", null, 350),
      i("Chicken Lahsuni Tikka", null, 350), i("Fish Tikka", null, 350), i("Chicken Seekh Kabab", null, 380),
      i("Chicken Banjara Kebab", null, 320),
    ],
  },
  {
    id: "chicken", title: "Chicken main course", type: "nonveg", cols: ["Half", "Full"],
    items: [
      i("Chicken Curry", 140, 240), i("Chicken Masala", 160, 260), i("Chicken Kadhai", 170, 280),
      i("Chicken Maratha", 170, 280), i("Chicken Rara Masala", 170, 280), i("Chicken Punjabi", 170, 280),
      i("Chicken Kolhapuri", 170, 280), i("Chicken Butter Masala", 170, 280), i("Tandoori Chicken Masala", null, 350),
      i("Chicken Bhuna", 140, 240), i("Chicken Handi", 170, 270), i("Chicken Maharaja", null, 270),
      i("Kaleji Masala", null, 220), i("Chicken Amritsari", 160, 260), i("Extra Gravy", 100, 160),
    ],
  },
  {
    id: "egg", title: "Egg", type: "nonveg", cols: ["Price"],
    items: [
      i("Egg Curry", 100), i("Egg Masala", 120), i("Egg Bhurji Curry", 120), i("Egg Bhurji", 70),
      i("Masala Omelette", 70), i("Egg Roll", 80), i("Chicken Roll", 100),
    ],
  },
  {
    id: "rice", title: "Rice", type: "veg", cols: ["Half", "Full"],
    items: [
      i("Plain Rice", 60, 100), i("Jeera Rice", 70, 120), i("Jeera Tomato Onion Rice", 90, 160),
      i("Tomato Rice", null, 160), i("Lemon Rice", null, 160), i("Curd Rice", null, 140), i("Dal Khichdi", null, 200),
    ],
  },
  {
    id: "dal", title: "Dal", type: "veg", cols: ["Price"],
    items: [i("Dal Fry", 120), i("Dal Butter Fry", 140), i("Dal Tadka", 140), i("Dal Makhni", 200), i("Dal Punjabi Dhaba", 180)],
  },
  {
    id: "biryani", title: "Biryani & pulao", type: "both", cols: ["Half", "Full"],
    note: "Gravy & raita served once",
    items: [
      i("Veg Biryani", 130, 230), i("Veg Hyderabadi Biryani", 140, 240), i("Veg Pulao", 110, 200),
      i("Kashmiri Pulao", 140, 260), i("Paneer Biryani", 160, 280), nv("Chicken Biryani", 160, 280),
      nv("Chicken Roast Biryani", 170, 300), nv("Chicken Hyderabadi Biryani", 170, 300),
      nv("Tandoori Chicken Biryani", null, 350), nv("Egg Biryani", null, 130), i("Extra Gravy", null, 30),
    ],
  },
  {
    id: "breads", title: "Breads", type: "veg", cols: ["Price"],
    items: [
      i("Tawa Roti", 15), i("Tawa Butter Roti", 20), i("Tandoori Roti", 15), i("Tandoori Butter Roti", 20),
      i("Butter Naan", 60), i("Plain Naan", 45), i("Garlic Naan", 90), i("Masala Kulcha", 100),
      i("Laccha Paratha", 50), i("Paneer Paratha", 100), i("Paneer Kulcha", 100), i("Aalu Paratha", 70),
      i("Mix Veg Paratha", 70),
    ],
  },
  {
    id: "papad-salad", title: "Papad, salad & raita", type: "veg", cols: ["Price"],
    items: [
      i("Roasted Papad", 20), i("Fry Papad", 25), i("Masala Papad", 50), i("Green Salad", 80),
      i("Onion Salad", 50), i("Kachumbar Salad", 90), i("Veg Raita", 90), i("Boondi Raita", 80),
    ],
  },
  {
    id: "mocktails", title: "Mocktails", type: "veg", cols: ["Price"],
    items: [i("Virgin Mojito", 140), i("Mint Mojito", 140), i("Blue Lagoon", 140), i("Kala Khatta", 140)],
  },
  {
    id: "shakes", title: "Shakes", type: "veg", cols: ["Price"],
    items: [
      i("Pineapple Shake", 140), i("Strawberry Shake", 140), i("Butterscotch Shake", 130),
      i("Oreo Shake", 150), i("Chocolate Shake", 150), i("Vanilla Shake", 140),
    ],
  },
  {
    id: "beverages", title: "Beverages", type: "veg", cols: ["Price"],
    items: [
      i("Tea / Coffee", "30 / 40"), i("Cold Coffee", 140), i("Cold Coffee with Ice Cream", 170),
      i("Masala Cold Drink", 40), i("Lemon Soda", 40), i("Lassi", 50), i("Buttermilk", 50), i("Black Tea", 20),
    ],
  },
  {
    id: "ice-cream", title: "Ice cream", type: "veg", cols: ["Price"],
    items: [i("Butterscotch", 50), i("Vanilla", 40), i("Chocolate", 50), i("Strawberry", 40)],
  },
];

/** "House favourites" on the home page (photo, menu section it links to, and a short note) */
export const signature = [
  { name: "Chicken Hyderabadi Biryani", price: 300, veg: false, photo: photos.biryaniBowl, category: "biryani", note: "Long-grain rice, slow-cooked chicken, served with gravy and raita" },
  { name: "Paneer Butter Masala", price: 260, veg: true, photo: photos.paneerMasala, category: "paneer", note: "Soft paneer in a rich, buttery tomato gravy" },
  { name: "Tandoori Chicken", price: 400, veg: false, photo: photos.tandooriPlatter, category: "tandoori-nonveg", note: "Spiced and charred in the tandoor" },
  { name: "Paneer Tikka", price: 350, veg: true, photo: photos.paneerTikka, category: "tandoori-veg", note: "Smoky paneer cubes with peppers and mint chutney" },
  { name: "Chicken Butter Masala", price: 280, veg: false, photo: photos.butterChicken, category: "chicken", note: "Creamy and mildly spiced, great with butter naan" },
  { name: "Chicken Chilli", price: 340, veg: false, photo: photos.chilliChicken, category: "chinese-nonveg", note: "Crispy chicken tossed with peppers, onion and soy" },
  { name: "Hakka Noodles", price: 120, veg: true, photo: photos.noodlesPlate, category: "noodles", note: "Wok-tossed with crunchy vegetables" },
  { name: "Oreo Shake", price: 150, veg: true, photo: photos.oreoShake, category: "shakes", note: "Thick, cold and loaded with cookies" },
];

/** Big photo tiles on the home page that open a menu section */
export const tiles = [
  { title: "Tandoor", photo: photos.tandooriLemon, category: "tandoori-nonveg", count: ["tandoori-veg", "tandoori-nonveg"] },
  { title: "Biryani & rice", photo: photos.biryaniSpoon, category: "biryani", count: ["biryani", "rice"] },
  { title: "Curries", photo: photos.butterChicken2, category: "paneer", count: ["main-veg", "paneer", "chicken", "dal", "egg"] },
  { title: "Chinese", photo: photos.noodlesDark, category: "chinese-veg", count: ["chinese-veg", "chinese-nonveg", "noodles", "chinese-rice", "combo"] },
  { title: "Pizza & burgers", photo: photos.pizzas, category: "pizza", count: ["pizza", "burger", "sandwich", "maggi", "quick-bites"] },
  { title: "Shakes & mocktails", photo: photos.mojito2, category: "mocktails", count: ["mocktails", "shakes", "beverages", "ice-cream"] },
];
