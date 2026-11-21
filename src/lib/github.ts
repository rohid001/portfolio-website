// Data GitHub untuk halaman website, disimpan di cache Next.js.
// "server-only" membuat build gagal bila file ini ikut terbawa browser, jadi token aman.
import "server-only";
import { cacheLife } from "next/cache";
import { profile } from "@/content/profile";
import { fetchRepoStats, type RepoStats } from "@/lib/github-api";

// Hasil berhasil disimpan 1 jam; hasil gagal hanya 1 menit supaya cepat dicoba lagi
export async function getRepoStats(repo: string): Promise<RepoStats | null> {
    "use cache";

    // Token hanya dibaca di server; tanpa token tetap jalan dengan kuota 60 request/jam
    const result = await fetchRepoStats(profile.githubUsername, repo, process.env.GITHUB_TOKEN);
    

    if (!result.ok) {
        console.warn(`[github] ${repo}: ${result.status} ${result.message}`);
        cacheLife("minutes")
        return null;
    }

    cacheLife("hours");
    return result.stats;
}