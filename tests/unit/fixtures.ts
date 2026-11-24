// Data project palsu untuk test, supaya test tidak berubah saat isi project.ts diedit.
import type { Project } from "@/types/content";

// Membuat satu project lengkap; field yang perlu diuji bisa diganti lewat overrides
export function makeProject(overrides: Partial<Project> = {}): Project {
    return {
        slug: "sample-project",
        title: "Sample Project",
        category: "Data Analysis",
        year: 2026,
        featured: false,
        summary: "A short summary.",
        problem: "A short problem.",
        approach: ["Step one", "Step two"],
        results: ["Result with 1 number", "Another result"],
        highlights: [{ value: "10%", label: "faster" }],
        stack: ["Python"],
        githubRepo: "sample-repo",
        ...overrides,
    };
}