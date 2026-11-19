// Pemeriksa kualitas konten sebelum dipakai di halaman (Fase 3-4).
// Mengecel kelengkapan data dan panjang teks supaya mudah dibaca HR.
// Jalankan dengan: node scripts/check-content.ts
import { profile } from "../src/content/profile.ts";
import { skillGroups } from "../src/content/skills.ts";
import { projects } from "../src/content/projects.ts";
import type { ProjectCategory } from "../src/types/content.ts";

// Batas jumlah kata supaya teks bisa dibaca sekilas
const MAX_SUMMARY_WORDS = 25;
const MAX_PROBLEM_WORDS = 40;
// Slug hanya huruf kecil, angka, dan tanda hubung, contoh: "olist-sql-dashboard"
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const errors: string[] = [];
const warnings: string[] = [];

// Menghitung jumlah kata dalam sebuah teks
function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

// Mencatat error bila URL tidak memakai https
function checkUrl(url: string, where: string): void {
    if (!url.startsWith("https://")) {
        errors.push(`${where}: URL must start with https:// (${url})`);
    }
}

// Mencatat error bila jumlah item di luar batas min-max
function checkCount(count: number, min: number, max: number, where: string): void {
    if (count < min || count > max) {
        errors.push(`${where}: expected ${min}-${max} items, found ${count}`);
    }
}

// --- Tahap 1: profil dan skill ---
checkCount(profile.about.length, 2, 4, "profile.about");
if (!profile.email.includes("@")) errors.push("profile.email: not a valid email");
profile.socials.forEach((link) => checkUrl(link.url, `profile.socials.${link.label}`));
profile.publications.forEach((pub) => checkUrl(pub.url, "profile.publications"));
skillGroups.forEach((group) => checkCount(group.skills.length, 3, 6, `skills.${group.name}`),);

// --- Tahap 2: tiap project ---
const seenSlugs = new Set<string>();
const rows: string[] = [];

for (const project of projects) {
    const where = `projects.${project.slug}`;
    const summaryWords = countWords(project.summary);
    const problemWords = countWords(project.problem);

    if (!SLUG_PATTERN.test(project.slug)) errors.push(`${where}: slug must be kebab-case`);
    if (seenSlugs.has(project.slug)) errors.push(`${where}: duplicate slug`);
    seenSlugs.add(project.slug);

    if (summaryWords > MAX_SUMMARY_WORDS) {
        errors.push(`${where}: summary has ${summaryWords} words (max ${MAX_SUMMARY_WORDS})`);
    }
    if (problemWords > MAX_PROBLEM_WORDS) {
        errors.push(`${where}: problem has ${problemWords} words (max ${MAX_PROBLEM_WORDS})`);
    }
    checkCount(project.approach.length, 2, 4, `${where}.approach`);
    checkCount(project.results.length, 2, 3, `${where}.results`);
    checkCount(project.highlights.length, 1, 3, `${where}.highlights`);
    if (project.stack.length === 0) errors.push(`${where}: stack is empty`);
    if (project.liveUrl) checkUrl(project.liveUrl, `${where}.liveurl`);

    // Hasil tanpa angka masih boleh, tapi diberi peringatan
    const resultWithNumber = project.results.filter((r) => /\d/.test(r)).length;
    if (resultWithNumber === 0) warnings.push(`${where}: no result contains a number`);
    if (project.githubRepo === null) warnings.push(`${where}: private project, no GitHub link`);


    rows.push(
        project.slug.padEnd(30) +
            `${summaryWords}w`.padStart(8) +
            `${problemWords}w`.padStart(9) +
            String(project.approach.length).padStart(10) +
            String(project.results.length).padStart(9) +
            (project.featured ? "   yes" : "    no"),
    );
}

// --- Tahap 3: aturan untuk seluruh daftar project ---
const featured = projects.filter((p) => p.featured);
checkCount(featured.length, 3, 4, "featured projects");
const featuredCategories = new Set(featured.map((p) => p.category));
const allCategories: ProjectCategory[] = [
    "Data Analysis",
    "Data Science",
    "Data Engineering",
    "AI Engineering",
];
for (const category of allCategories) {
    if (!featuredCategories.has(category)) {
        warnings.push(`featured projects: no featured project in ${category}`);
    }
}

// --- Laporan ---
const totalSkills = skillGroups.reduce((sum, group) => sum + group.skills.length, 0);
console.log("content Check");
console.log(`   profile:    ${profile.about.length} about paragraphs, ${profile.socials.length} social links.`);
console.log(`   skills:     ${skillGroups.length} groups, ${totalSkills} skills`);
console.log(`   projects:   ${projects.length} total, ${featured.length} featured`);
console.log("");
console.log(
    "slug".padEnd(30) + "summary".padStart(8) + "problem".padStart(9) +
    "approach".padStart(10) + "results".padStart(9) + " featured",
);
rows.forEach((row) => console.log(row));

if (errors.length > 0) {
    console.log(`\nErrors   (${errors.length}):`);
    errors.forEach((e) => console.log(` -${e}`));
}
if (warnings.length > 0) {
    console.log(`\n Warnings (${warnings.length}):`);
    warnings.forEach((w) => console.log(`   - ${w}`));
}
console.log(`\nResult: ${errors.length} errors, ${warnings.length} warnings`);

// Exit code 1 bila ada error, supaya bisa dipakai di CI (Fase 7)
if (errors.length > 0) process.exitCode = 1;
