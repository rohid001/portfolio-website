// Halaman utama sementara (placeholder) untuk mengecek Fase 0.
// Isi lengkap Hero, About, dan Skills dibuat di Fase 3; kartu project di Fase 4.
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";

export default function HomePage() {
  return (
    <>
      {/* Hero sederhana: nama, jabatan, kalimat pembuka, dua tombol */}
      <Container className="py-20 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
          {profile.roles.join(" · ")}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Hi, I&apos;m {profile.shortName}.
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
          {profile.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/projects">View projects</ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">
              Contact me
          </ButtonLink>
        </div>
      </Container>

      <Section id="projects" eyebrow="Work" title="Featured projects">
        <p className="text-zinc-600 dark:text-zinc-400">Project cards are coming soon.</p>
      </Section>

      <Section id="about" eyebrow="About" title="About me">
        <p className="max-w-3xl text-zinc-600 dark:text-zinc-400">{profile.about[0]}</p>
      </Section>

      {/* Sementara hanya nama kelompok skill, sebagai uji komponen Tag */}
      <Section id="skills" eyebrow="Skills" title="What I work with">
        <div className="flex flex-wrap gap-2">
          {skillGroups.map((group) => (
            <Tag key={group.name}>{group.name}</Tag>
          ))}
        </div>
      </Section>

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