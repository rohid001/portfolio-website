// Panel data repo yang diambil otomatis dari GitHub (bahasa, update terakhir, bintang).
import type { ReactNode } from "react";
import { getRepoStats } from "@/lib/github";

// Tanggal ISO menjadi teks mudah dibaca, contoh: "Nov 18, 2026"
const dataFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

// Satu kotak, label di atas, nilai di bawah, supaya label antarkotak sejajar
function StatItem({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <dt className="text-sm text-zinc-600 dark:text-zinc-400">{label}</dt>
            <dd className="mt-2 font-semibold">{children}</dd>
        </div>
    );
}

export async function GitHubStats({ repo }: { repo: string }) {
    const stats = await getRepoStats(repo);

    //API gagal: seluruh panel disembunyikan, tombol "View code on GitHub" tetap ada
    if (!stats) return null;

    return (
        <section aria-labelledby="github">
            <h2 id="github" className="text-2xl font-bold tracking-tight">
                On Github
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Pulled automatically from the public repository and refreshed every hour.
            </p>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                {stats.languages.length > 0 && (
                    <StatItem label="Main languages">
                        <ul className="space-y-1">
                            {stats.languages.map((language) => (
                                <li key={language.name} className="flex justify-between gap-3">
                                    <span>{language.name}</span>
                                    <span className="font-mono text-zinc-600 dark:text-zinc-400">{language.percent}%</span>
                                </li>
                            ))}
                        </ul>
                    </StatItem>
                )}
                <StatItem label="Last code update">
                    <time dateTime={stats.pushedAt}>{dataFormatter.format(new Date(stats.pushedAt))}</time>
                </StatItem>
                {/* Bintang hanya ditampilkan bila ada, supaya tidak muncul "0 stars" */}
                {stats.stars > 0 && <StatItem label="Github stars">{stats.stars}</StatItem>}
            </dl>
        </section>
    );
}

// Kerangka abu-abu selama data GitHub dimuat
export function GitHubStatsSkeleton() {
    return (
        <div className="animate-pulse space-y-4" aria-hidden="true">
            <div className="h-7 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
        </div>
    );
}