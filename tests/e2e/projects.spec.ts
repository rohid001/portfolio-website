// Uji halaman Projects dan case study: filter kategori, membuka kartu, dan alamat yang salah.
import { expect, test } from "@playwright/test";
import { projects } from "../../src/content/projects";

test("filters projects by category", async ({ page }) => {
    const dataScience = projects.filter((project) => project.category === "Data Science");
    await page.goto("/projects");

    await expect(page.getByText(`Showing ${projects.length} of ${projects.length} projects`)).toBeVisible();

    const filterButton = page.getByRole("button", { name: "Data Science" });
    await filterButton.click();

    await expect(filterButton).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText(`Showing ${dataScience.length} of ${projects.length} projects`)).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(dataScience.length);
});

test("opens a case study from its card", async ({ page }) => {
    const project = projects[0];
    await page.goto("/projects");

    await page.getByRole("link", { name: project.title }).click();

    await expect(page).toHaveURL(`/projects/${project.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.getByRole("heading", { name: "The problem" })).toBeVisible();
});

test("shows a helpful page for an unknown address", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "See all projects" })).toBeVisible();
});
