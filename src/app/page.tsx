// Halaman Home: Hero, Featured projects, About, Skills, Contact.
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

// Home memakai judul default dari layout; canonical dan Open Graph mengarah ke "/"
export const metadata = createMetadata({ description: site.description, path: "/" });

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