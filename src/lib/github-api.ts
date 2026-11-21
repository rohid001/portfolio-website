// Pemanggilan GitHub REST API tanpa ketergantungan pada Next.js
// Dipakai oleh website (lewat src/lib/github.ts) dan oleh skrip scripts/check-github.ts.

const GITHUB_API_URL = "https://api.github.com";
// Versi REST API terbaru; field yang kita pakai tidak terkena perubahan di versi ini
const GITHUB_API_VERSION = "2026-03-10";
// Batas waktu tiap request supaya build tidak menggantung bila GitHub lambat
const REQUEST_TIMEOUT_MS = 8000;
// Jumlah bahasa yang ditampilkan per repo
const MAX_LANGUAGES = 3;

export type LanguageShare = {
    name: string;
    percent: number;
};

export type RepoStats = {
    stars: number;
    pushedAt: string;   // tanggal push terakhir. format ISO 8601
    languages: LanguageShare[];
};

// Hasil selalu berbentuk ok/gagal, jadi pemanggil tidak perlu try/catch
export type RepoResult =
    | { ok: true; stats: RepoStats }
    | { ok: false; status: number; message: string };

export type RateLimit = {
    limit: number;
    remaining: number;
};

// Hanya field yang kita pakai dari respons GitHub
type RepoResponse = {
    stargazers_count: number;
    pushed_at: string;
};

// Contoh: { "Python": 52340, "Jupyter Notebook": 10211 } (angka dalam byte)
type LanguagesResponse = Record<string, number>;

// Header standar GitHub: Authorization hanya dikirim bila token tersedia
function buildHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
}

// GET ke GitHub dengan header dan batas waktu yang sama untuk semua request
function githubGet(path: string, token?: string): Promise<Response> {
    return fetch(`${GITHUB_API_URL}${path}`, {
        headers: buildHeaders(token),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
}

// Mengambil pesan error dari GitHub, contoh: "Bad credentials" atau "Not Found"
async function readErrorMessage(response: Response): Promise<string> {
    try {
        const body = (await response.json()) as { message?: string };
        return body.message ?? response.statusText;
    } catch {
        return response.statusText;
    }
}

// Mengubah ukuran byte per bahasa menjadi persentase, diurutkan dari yang terbesar
export function toLanguageShares(bytes: LanguagesResponse, max = MAX_LANGUAGES):
LanguageShare[] {
    const total = Object.values(bytes).reduce((sum, size) => sum + size, 0);
    if (total === 0) return [];

    return Object.entries(bytes)
        .sort(([, a], [, b]) => b - a)
        .slice(0, max)
        .map(([name, size]) => ({ name, percent: Math.round((size / total) * 100) }))
        .filter((language) => language.percent > 0);   
}

// Mengambil statistik satu repo: bintang, push terakhir, dan bahasa utama
export async function fetchRepoStats(owner: string, repo: string, token?: string):
Promise<RepoResult> {
    const path = `/repos/${owner}/${repo}`;

    try {
        // Dua request dijalankan bersamaan supaya lebih cepat
        const [repoResponse, languagesResponse] = await Promise.all([
            githubGet(path, token),
            githubGet(`${path}/languages`, token),
        ]);

        for (const response of  [repoResponse, languagesResponse]) {
            if (!response.ok) {
                return { ok: false, status: response.status, message: await readErrorMessage(response) };
            }
        }

        const repoData = (await repoResponse.json()) as RepoResponse;
        const languages = (await languagesResponse.json()) as LanguagesResponse;

        return {
            ok: true,
            stats: {
                stars: repoData.stargazers_count,
                pushedAt: repoData.pushed_at,
                languages: toLanguageShares(languages),
            },
        };
    } catch (error) {
        // Jaringan putus melewati batas waktu: status 0 menandai tidak ada respons
        const message = error instanceof Error ? error.message : "Unknown network error";
        return { ok: false, status: 0, message };
    }
}

// Sisa kuota request per jam; endpoint ini tidak mengurangi kuota
export async function fetchRateLimit(token?: string): Promise<RateLimit | null> {
    try {
        const response = await githubGet("/rate_limit", token);
        if (!response.ok) return null;
        const body = (await response.json()) as { resources: { core: RateLimit } };
        return { limit: body.resources.core.limit, remaining : body.resources.core.remaining };
    } catch {
        return null;
    }
}