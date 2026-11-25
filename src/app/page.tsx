import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Hall from "@/components/home/Hall";
import Favourites from "@/components/home/Favourites";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Favourites />
      <Hall />
      <Contact />
    </>
  );
}
