// Bagian About: cerita singkat di kiri, pengalaman, pendidikan, dan publikasi di kanan.
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";

// Judul kecil untuk tiap kolom fakta (Experience, Education, Publication)
function FactTitle({ children }: { children: string }) {
    return (
        <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
            {children}
        </h3>
    );
}

export function About() {
    return (
        <Section id="about" eyebrow="About" title="About me">
            <div className="grid gap-12 lg:grid-cols-5">
                {/* Kolom kiri: paragraf About (3/5 lebar di layar besar) */}
                <div className="space-y-4 text-lg leading-relaxed text-zinc-600 lg:col-span-3 dark:text-zinc-400">
                    {profile.about.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>

                {/* Kolom kanan: fakta yang biasa dicari HR */}
                <div className="space-y-10 lg:col-span-2">
                    <div>
                        <FactTitle>Experience</FactTitle>
                        <ul className="mt-4 space-y-6">
                            {profile.experience.map((job) => (
                                <li key={`${job.role}-${job.organization}`}>
                                    <p className="font-medium">{job.role}</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{job.organization}</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{job.period}</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                                        {job.highlights.map((highlight) => (
                                            <li key={highlight}>{highlight}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <FactTitle>Education</FactTitle>
                        <ul className="mt-4 space-y-4">
                            {profile.education.map((edu) => (
                                <li key={edu.school}>
                                    <p className="font-medium">{edu.degree}</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{edu.school}</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{edu.period}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <FactTitle>Publication</FactTitle>
                        <ul className="mt-4 space-y-4">
                            {profile.publications.map((pub) => (
                                <li key={pub.url}>
                                    <a
                                        href={pub.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-sky-700 dark:decoration-zinc-700 dark:hover:decoration-sky-400">
                                        {pub.title}
                                    </a>
                                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                        {pub.venue} · {pub.year}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
}