// Konfigurasi Playwright untuk uji end-to-end di browser (Fase 7).
// Jalankan 'npm run build' dulu: test memakai server production ('npm run start').
import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const isCI = Boolean(process.env.CI);

export default defineConfig({
    testDir: "tests/e2e",
    fullyParallel: true,
    // Di CI, test.only yang tertinggal dianggap error supaya tidak ada test yang terlewat
    forbidOnly: isCI,
    retries: isCI ? 1 : 0,
    reporter: isCI ? [["list"], ["html", { open: "never" }]] : "list",
    use: {
        baseURL: `http://localhost:${PORT}`,
        // Rekaman langkah demi langkah bila test gagal lalu diulang, untuk dicek di laporan HTML
        trace: "on-first-retry",
    },
    // Setiap test dijalankan di dua ukuran layar
    projects: [
        { name: "desktop", use: { ...devices["Desktop Chrome"]} },
        { name: "mobile", use: { ...devices["Pixel 7"] } },
    ],
    webServer: {
        command: "npm run start",
        url: `http://localhost:${PORT}`,
        // Di laptop, pakai server yang sudah jalan bila ada; di CI selalu mulai baru
        reuseExistingServer: !isCI,
        timeout: 60_000,
    },
});