// pemeriksa koneksi ke GitHub API untuk setiap project yang punya repo Publik (Fase 5).
// Token dibaca dari .env.local lewat flag --env-file-if-exists di package.json.
// Jalankan dengan: npm run check:github
import { fail } from "assert";
import { profile } from "../src/content/profile.ts";
import { projects } from "../src/content/projects.ts";
import { fetchRateLimit, fetchRepoStats } from "../src/lib/github-api.ts";

const token = process.env.GITHUB_TOKEN;
const rateLimit = await fetchRateLimit(token);

console.log("GitHub Check");
console.log(`   token:      ${token ? "found in .env.local" : "not found (unauthenticated)"}`);
console.log(`   rate limit: ${rateLimit ? `${rateLimit.remaining} of ${rateLimit.limit} requests left this hour` : "unknown"}`,);
console.log("");

let passed = 0;
let failed = 0;

for (const project of projects) {
    // Project private tidak punya repo publik, jadi dilewati
    if (!project.githubRepo) {
        console.log(`   skip ${project.slug} (private)`);
        continue;
    }

    const result = await fetchRepoStats(profile.githubUsername, project.githubRepo, token);

    if (result.ok) {
        passed++;
        const languages = result.stats.languages.map((l) => `${l.name} ${l.percent}%`).join(", ");
        const pushed = result.stats.pushedAt.slice(0, 10);
        console.log(`   ok      ${project.slug}: ${languages || "no languages"} | pushed ${pushed} | ${result.stats.stars} stars`);
    } else {
        failed++;
        console.log(`   FAIL    ${project.slug}: ${result.status} ${result.message}`);
    }
}

console.log(`\nResult: ${passed} ok, ${failed} failed`);

// Exit code 1 bila ada repo yang gagal diambil
if (failed > 0) process.exitCode = 1;
