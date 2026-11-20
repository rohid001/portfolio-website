// Angka ringkas untuk Hero, dihitung dari data konten (bukin ditulis manual),
// sehingga otomatis berubah saat project atau publikasi ditambah.
import type { Project } from "@/types/content";

export type Stat = {
    value: number;
    label: string;
};

export function getPortfolioStats(projects: Project[], publicationCount: number): Stat[] {
    // Set menyimpan nilai unik: jumlah kategori berbeda = jumlah jalur karier
    const tracks = new Set(projects.map((project) => project.category));

    return [
        { value: projects.length, label: "projects" },
        { value: tracks.size, label: "career tracks" },
        {
            value: publicationCount,
            label: publicationCount === 1 ? "published paper" : "published papers", 
        },
    ];
}