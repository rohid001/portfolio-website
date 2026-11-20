// Halaman Home: Hero, Featured projects, About, Skills, Contact.
// Bagian Contact disempunakan di Fase 6
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { Skills } from "@/components/home/Skills";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { profile } from "@/content/profile";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";


export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedProjects />

      <About />
      <Skills />

      <Section id="contact" eyebrow="Contact" title="Let's talk">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${profile.email}`} external>
            Email me
          </ButtonLink>
          <ButtonLink href={profile.socials[1].url} variant="secondary" external>
            LinkedIn
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}