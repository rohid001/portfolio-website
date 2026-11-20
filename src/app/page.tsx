// Halaman utama sementara (placeholder) untuk mengecek Fase 0.
// Isi lengkap Hero, About, dan Skills dibuat di Fase 3; kartu project di Fase 4.
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { Skills } from "@/components/home/Skills";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { profile } from "@/content/profile";


export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="projects" eyebrow="Work" title="Featured projects">
        <p className="text-zinc-600 dark:text-zinc-400">Project cards are coming soon.</p>
      </Section>

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