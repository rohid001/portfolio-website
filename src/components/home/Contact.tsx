// Bagian Contact di home: peran yang dicari, email, CV, dan LinkedIn dalam satu tempat.
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { CopyEmailButton } from "@/components/home/CopyEmailButton";
import { profile } from "@/content/profile";

export function Contact() {
    // Dicari berdasarkan label, bukan urutan, supaya tidak salah bila urutan socials berubah
    const linkedIn = profile.socials.find((link) => link.label === "LinkedIn");

    return (
        <Section id="contact" eyebrow="Contact" title="Let's talk">
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                {profile.availability}
            </p>
            
            {/* Alamat email ditulis sebagai teks supaya bisa dibaca dan disalin tanpa membuka aplikasi email */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
                <a 
                    href={`mailto:${profile.email}`}
                    className="font-mono text-lg underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 dark:decoration-zinc-700 dark:decoration-zinc-100"
                >
                    {profile.email}
                </a>
                <CopyEmailButton email={profile.email} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
                <ButtonLink href={profile.cv.url} variant="secondary" external>
                    Download CV (PDF)
                </ButtonLink>
                {linkedIn && (
                    <ButtonLink href={linkedIn.url} variant="secondary" external>LinkedIn</ButtonLink>
                )}
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">CV last updated {profile.cv.update}</p>
        </Section>
    );
}