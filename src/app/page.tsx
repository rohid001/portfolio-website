// Halaman Home: Hero, Featured projects, About, Skills, Contact.
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";


export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
      <Skills />
      <Contact />
    </>
  );
}