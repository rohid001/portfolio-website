// Halaman case study: /projects/[slug], satu halaman untuk setiap project.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { GitHubStats, GitHubStatsSkeleton } from "@/components/projects/GitHubStats";
import { Tag } from "@/components/Tag";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getProjectBySlug } from "@/lib/projects";

// Semua slug dibuat menjadi halaman statis saat build
export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

// Judul tab dan deskripsi Google per project
export async function generateMetadata({
    params, 
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(projects, slug);
    if (!project) return {};
    return { title: project.title, description: project.summary };
}

// Judul kecil untuk setiap bagian case study
function CaseSection({ id, title, children}: { id: string; title: string; children: ReactNode }) {
    return (
        <section aria-labelledby={id}>
            <h2 id={id} className="text-2xl font-bold tracking-tight">
                {title}
            </h2>
            <div className="mt-4 text-zinc-600 dark:text-zinc-400">{children}</div>
        </section>
    );
}

// halaman hanya membungkus isi dengan Suspense; params dibaca di dalam CaseStudy
export default function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
    return (
        <Suspense fallback={<CaseStudySkeleton />}>
            <CaseStudy params={params} />
        </Suspense>
    );
}

// Kerangka abu-abu yang tampil sesaat saat pindah antar case study
function CaseStudySkeleton() {
    return(
        <Container className="py-16 sm:py-24">
            <div className="animate-pulse space-y-6" aria-hidden="true">
                <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-6 w-full max-w-2xl rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <p className="sr-only">Loading case study...</p>
        </Container>
    );
}

type CaseStudyParams = PageProps<"/projects/[slug]">["params"];

async function CaseStudy({ params }: { params: CaseStudyParams }) {
    const { slug } = await params;
    const project = getProjectBySlug(projects, slug);

    // Slug tidak dikenal: tampilkan halaman 404
    if (!project) notFound();

    const repoUrl = project.githubRepo ? `https://github.com/${profile.githubUsername}/${project.githubRepo}` : null;

    return (
        <Container className="py-16 sm:py-24">
            <Link
                href="/projects"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
                ← All projects
            </Link>

            <p className="mt-8 text-sm font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
                {project.category} · {project.year}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
                {project.summary}
            </p>

            {/* Angka utama project */}
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {project.highlights.map((highlight) => (
                    <div 
                        key={highlight.label}
                        className="flex flex-col-reverse gap-1 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
                    >
                        <dt className="text-sm text-zinc-600 dark:text-zinc-400">{highlight.label}</dt>
                        <dd className="font-mono text-3xl font-semibold">{highlight.value}</dd>
                    </div>
                ))}
            </dl>

            {project.image && (
                <Image 
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(min-width: 1024px) 976px, 100vw"
                    className="mt-10 w-full rounded-xl border border-zinc-200 dark:border-zinc-800"
                    preload
                />
            )}

            <div className="mt-14 max-w-3xl space-y-12">
                <CaseSection id="problem" title="The problem">
                    <p className="text-lg leading-relaxed">{project.problem}</p>
                </CaseSection>

                <CaseSection id="approach" title="What I did">
                    <ul className="list-disc space-y-2 pl-5">
                        {project.approach.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ul>
                </CaseSection>

                <CaseSection id="results" title="Results">
                    <ul className="list-disc space-y-2 pl-5">
                        {project.results.map((result) => (
                            <li key={result}>{result}</li>
                        ))}
                    </ul>
                </CaseSection>

                <CaseSection id="stack" title="Tech stack">
                    <ul className="flex flex-wrap gap-2">
                        {project.stack.map((tool) => (
                            <li key={tool}>
                                <Tag>{tool}</Tag>
                            </li>
                        ))}
                    </ul>
                </CaseSection>

                {/* Data live dari GitHub; Suspense menampilkan kerangka selama data dimuat */}
                {project.githubRepo && (
                    <Suspense fallback={<GitHubStatsSkeleton />}>
                        <GitHubStats repo={project.githubRepo} />
                    </Suspense>
                )}
            </div>

            {/* Tombol ke demo dan kode; project private hanya menampilkan keterangan */}
            <div className="mt-14 flex flex-wrap gap-3">
                {project.liveUrl && (
                    <ButtonLink href={project.liveUrl} external>
                        View live demo
                    </ButtonLink>
                )}
                {repoUrl && (
                    <ButtonLink href={repoUrl} variant={project.liveUrl ? "secondary" : "primary"} external>
                        View code on GitHub
                    </ButtonLink>
                )}
                {!repoUrl && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        The code and data for this project are private.
                    </p>
                )}
            </div>
        </Container>
    );
}