// Uji Home seperti yang dilakukan HR: lihat nama, unduh CV, salin email, pakai keyboard.
import { expect, test } from "@playwright/test";
import { profile } from "../../src/content/profile";

test("shows the name adn a working CV download", async ({ page, request }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(profile.shortName);

    const cvLink = page.getByRole("link", { name: "Download CV" }).first();
    await expect(cvLink).toHaveAttribute("href", profile.cv.url);

    // File PDF-nya benar-benar ada di server, bukan link mati
    const response = await request.get(profile.cv.url);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("copies the email address to the clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/#contact");

    const button = page.getByRole("button", { name: "Copy email" });
    await button.click();

    await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe(profile.email);
});

test("lets keyboard users skip straight to the content", async ({ page, isMobile }) => {
    // Perangkat sentuh tidak memakai tombol Tab
    test.skip(isMobile, "keyboard test only on dekstop");
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
});