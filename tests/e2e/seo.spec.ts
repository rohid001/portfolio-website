// Uji SEO dari Fase 6, robots.txx, sitemap, dan tag Open Graph.
import { expect, test } from "@playwright/test";
import { projects } from "../../src/content/projects";
import { site } from "../../src/content/site";

test("robots.txt points to a sitemap that lists every page", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`);

    const sitemap = await (await request.get("/sitemap.xml")).text();
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    // Home + Projects + satu halaman per case study
    expect(urls).toHaveLength(projects.length + 2);

    // Setiap alamat di sitemap benar-benar (dicek di server lokal)
    for (const url of urls) {
        const path = url.replace(site.url, "") || "/";
        expect((await request.get(path)).status(), path).toBe(200);
    }
});

test("each case study its own Open Graph image", async ({ page }) => {
    const project = projects[0];
    await page.goto(`/projects/${project.slug}`);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute("content", new RegExp(`/projects/${project.slug}/opengraph-image`));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${site.url}/projects/${project.slug}`);
});