// Unit test untuk pemanggil GitHub API (src/lib/github-api.ts)
// fetch diganti versi palsu, jadi test tidak butuh internet maupun token.
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRepoStats, toLanguageShares } from "@/lib/github-api";

// Membuat Response JSON palsu seperti yang dikirim GitHub
function jsonResponse(status: number, body: unknown): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
    });
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("toLanguageShares", () => {
    it("converts bytes to rounded percentages, largest first, top 3 only", () => {
        const shares = toLanguageShares({ Shell: 300, Python: 82000, Dockerfile: 900, "Jupyter Notebook": 15000 });
        expect(shares).toEqual([
            { name: "Python", percent: 84 },
            { name: "Jupyter Notebook", percent: 15 },
            { name: "Dockerfile", percent: 1 },
        ]);
    });

    it("drops languages that round to 0%", () => {
        expect(toLanguageShares({ "Jupyter Notebook": 210000, Python: 50 })).toEqual([
            { name: "Jupyter Notebook", percent: 100 },
        ]);
    });

    it("returns an empty list for a repo without code", () => {
        expect(toLanguageShares({})).toEqual([]);
    });
});

describe("fetchRepoStats", () => {
    it("returns stars, push date, and languages when GitHub answers", async () => {
        const fetchMock = vi.fn(async (url:string) => 
            url.endsWith("/languages") 
                ? jsonResponse(200, { Python: 3, Shell: 1 })
                : jsonResponse(200, { stargazers_count: 2, pushed_at: "2026-11-20T08:00:00Z" }),);
        vi.stubGlobal("fetch", fetchMock);

        const result = await fetchRepoStats("rohid001", "olist-data-pipeline", "test-token");

        expect(result).toEqual({
            ok: true,
            stats: {
                stars: 2,
                pushedAt: "2026-11-20T08:00:00Z",
                languages: [
                    { name: "Python", percent: 75 },
                    { name: "Shell", percent: 25 },
                ],
            },
        });
        // Token dikirim sebagai header Authorization
        const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
        expect((init.headers as Record<string, string>).Authorization).toBe("Bearer test-token");
    });

    it("reports GitHub's error message, for example a bad token", async () => {
        vi.stubGlobal("fetch", vi.fn(async () => jsonResponse(401, { message: "Bad credentials" })));

        const result = await fetchRepoStats("rohid001", "olist-data-pipeline", "wrong-token");

        expect(result).toEqual({ ok: false, status: 401, message: "Bad credentials" });
    });

    it("returns status 0 when the network fails", async () => {
        vi.stubGlobal("fetch", vi.fn(async () => {
            throw new TypeError("fetch failed");
        }));

        const result = await fetchRepoStats("rohid001", "olist-data-pipeline");
        
        expect(result).toEqual({ ok: false, status: 0, message: "fetch failed" });
    });
});