// Bagian pembuka Home: siapa Rohid, apa yang dikerjakan, dan bukti singkat dalam angka.
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getPortfolioStats } from "@/lib/stats";

export function Hero() {
    const stats = getPortfolioStats(projects, profile.publications.length);

    return (
        <Container className="py-20 sm:py-28">
            <p className="text-sm font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
                {profile.roles.join(" · ")}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
                Hi, I&apos;m {profile.shortName}.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
                {profile.tagline}
            </p>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                Based in {profile.location}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/projects">View projects</ButtonLink>
                <ButtonLink href="/#contact" variant="secondary">
                    Contact me
                </ButtonLink>
            </div>

            {/* Angka ringkas: label (dt) ditaruh di bawah angka (dd) lewat flex-col-reverse */}
            <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse gap-1">
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</dt>
                        <dd className="font-mono text-3xl font-semibold">{stat.value}</dd>
                    </div>
                ))}
            </dl>
        </Container>
    );
}