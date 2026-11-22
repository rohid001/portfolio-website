// Halaman /projects: semua project dalam bentuk kartu, dengan filter kategori
import { Container } from "@/components/Container";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/seo";

// Judul tab menjadi "projects | Rohid Aji Sunan" lewat template di layout
export const metadata = createMetadata ({
    title: "Projects",
    description: "Data Analysis, data science, data engineering, and AI projects by Rohid, each with a short case study.",
    path: "/projects",
});

export default function ProjecstPage() {
    return (
        <Container className="py-16 sm:py-24">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
            <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
                {projects.length} projects across data analysis, data science, data engineering, and AI.
                Each card opens a short case study.
            </p>

            <div className="mt-10">
                {/* Judul tersembunyi supaya urutan judul tetap h1 → h2 → h3 (judul kartu) */}
                <h2 className="sr-only">Project list</h2>
                <ProjectFilter projects={projects} />
            </div>
        </Container>
    );
}