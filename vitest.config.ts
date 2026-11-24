// Konfigurasi Vitest untuk unit test (Fase 7).
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        // Membaca alias "@/..." dari tsconfig.json, sama seperti Next.js
        tsconfigPaths: true,
    },
    test: {
        // Hanya folder unit; test browser (e2e) dijalankan Playwright
        include: ["tests/unit/**/*.test.ts"],
        environment: "node",
    },
});