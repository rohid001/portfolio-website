// Kartu ringkas satu project: dipakai di Home (featured) dan halaman Projects.
import Link from "next/link";
import { Tag } from "@/components/Tag";
import type { Project } from "@/types/content";

// Jumlah maksimal label tool di kartu; sisanya diringkas menjadi "+N more"
const MAX_TAGS = 4;

export function ProjectCard({ project }: { project: Project }) {
    const [mainHighlight] = project.highlights;
    const hiddenTags = project.stack.length - MAX_TAGS;

    return (
        <article className="relative flex flex-col rounded-xl border border-zinc-200 p-6 transition-colors hover:border-sky-700 dark:border-zinc-800 dark:hover:border-sky-400">
            <p className="text-xs font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
                {project.category} · {project.year}
            </p>

            <h3 className="mt-2 text-lg font-semibold">
                {/* after:absolute after:insert-0 membuat seluruh kartu bisa diklik lewat satu link */}
                <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
                    {project.title}
                </Link>
            </h3>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.summary}</p>

            {mainHighlight && (
                <p className="mt-5">
                    <span className="font-mono text-2xl font-semibold">{mainHighlight.value}</span>{" "}
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{mainHighlight.label}</span>
                </p>
            )}

            <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, MAX_TAGS).map((tool) => (
                    <li key={tool}>
                        <Tag>{tool}</Tag>
                    </li>
                ))}
                {hiddenTags > 0 && (
                    <li>
                        <Tag>+{hiddenTags} more</Tag>
                    </li>
                )}
            </ul>

            {/* Hanya penanda visual; link sebenarnya ada di judul, jadi disembunyikan dari pembaya layar */}
            <p aria-hidden="true" className="mt-auto pt-6 text-sm font-semibold text-sky-700 dark:text-sky-400">
                Read case study →
            </p>
        </article>
    );
}