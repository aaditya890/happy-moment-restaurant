/**
 * Image loader: Unsplash photos are resized by Unsplash's CDN (sharp, fast, modern formats).
 * Local images (starting with "/") are served as they are.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    return `${src}?auto=format&fit=crop&w=${width}&q=${quality || 78}`;
  }
  return src;
}
