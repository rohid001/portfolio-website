// Halaman /projects: kerangka daftar semua project.
// Fase 4 mengganti daftar sederhana ini dengan kartu dan filter kategori.
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { projects } from "@/content/projects";

// Judul tab menjadi "projects | Rohid Aji Sunan" lewat template di layout
export const metadata: Metadata = {
    title: "Projects",
    description: "Data Analysis, data science, data engineering, and AI projects by Rohid.",
};

export default function ProjectPage() {
    return (
        <Container className="py-16 sm:py-24">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
            <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
                {projects.length} projects across data analysis, data science, data engineering, and AI.
            </p>

            <ul className="mt-10 divide-y divide-zinc-200 dark:divide-zinc-800">
                {projects.map((project) => (
                    <li key={project.slug} className="flex flex-col items-start gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-medium">{project.title}</span>
                        <Tag>{project.category}</Tag>
                    </li>
                ))}
            </ul>
        </Container>
    );
}