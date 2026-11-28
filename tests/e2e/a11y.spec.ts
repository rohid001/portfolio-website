// Uji aksesibilitas otomatis dengan axe-core, di mode terang dan gelap.
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { projects } from "../../src/content/projects";

const pages = ["/", "/projects", `/projects/${projects[0].slug}`, "/this-page-does-not-exist"];

for (const colorScheme of ["light", "dark"] as const) {
    test.describe(`${colorScheme} mode`, () => {
        test.use({ colorScheme });
        
        for (const path of pages) {
            test(`${path} has no WCAG A/AA violations`, async ({ page }) => {
                await page.goto(path);

                const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();

                // Bila gagal, daftar aturan yang dilanggar ikut tercetak di laporan
                expect(results.violations.map((violation) => violation.id)).toEqual([]);
            });
        }
    });
}