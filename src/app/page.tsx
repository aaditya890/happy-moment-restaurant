import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Signature from "@/components/home/Signature";
import Tiles from "@/components/home/Tiles";
import Hall from "@/components/home/Hall";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Signature />
      <Tiles />
      <Hall />
      <Contact />
    </>
  );
}
