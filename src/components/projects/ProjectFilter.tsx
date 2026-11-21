"use client";

// Daftar project dengan tombol filter kategori.
// "use client": komponen ini berjalan di browser karena butuh state (kategori yang dipilih).
import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { filterProjects, getCategories, type CategoryFilter } from "@/lib/projects";
import type { Project } from "@/types/content";

export function ProjectFilter({ projects }: { projects: Project[] }) {
    // State: filter yang sedang aktif; awalnya "All"
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

    const filters: CategoryFilter[] = ["All", ...getCategories(projects)];
    const visibleProjects = filterProjects(projects, activeFilter);

    return (
        <div>
            <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                    const isActive = filter === activeFilter;
                    return (
                        <button 
                            key={filter} 
                            type="button" 
                            aria-pressed={isActive} 
                            onClick={() => setActiveFilter(filter)}
                            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${isActive ? "border-sky-700 bg-sky-700 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-zinc-950" : 
                                "border-zinc-300 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-100"}`}>
                                    {filter}
                                </button>
                    );
                })}
            </div>

            {/* aria-live: pembaca layar mengumumkan jumlah setiap kali filter berubah */}
            <p aria-live="polite" className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
                Showing {visibleProjects.length} of {projects.length} projects
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {visibleProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </div>
    );
}