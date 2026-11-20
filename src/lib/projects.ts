// Fungsi bantu untuk memilih dan menyaring project.
// Semua fungsi menerima daftar project sebagai input, jadi mudah diuji (Fase 7).
import type { Project, ProjectCategory } from "@/types/content";

// "All" = tanpa filter; selain itu salah satu kategori project
export type CategoryFilter = ProjectCategory | "All";

// Project yang tampil di Home, urutannya sama dengan di project.ts
export function getFeaturedProjects(projects: Project[]): Project[] {
    return projects.filter((project) => project.featured);
}

// Satu project berdasarkan slug di URL; undefined bila tidak ditemukan
export function getProjectBySlug(projects: Project[], slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

// Daftar kategori unik sesuai urutan kemunculan, untuk tombol filter
export function getCategories(projects: Project[]): ProjectCategory[] {
    return [...new Set(projects.map((project) => project.category))];
}

// Menyaring project menurut kategori yang dipilih
export function filterProjects(projects: Project[], filter: CategoryFilter): Project[] {
    if (filter === "All") return projects;
    return projects.filter((project) => project.category === filter);
}