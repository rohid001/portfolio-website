"use client";

// Tombol salin alamat email. Berguna bagi HR yang memakai Gmail di browser,
// karena link mailto: sering membuka aplikasi email yang belum diatur.
import { useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const labels: Record<CopyState, string> = {
    idle: "Copy email",
    copied: "Copied!",
    failed: "Copy failed",
};

export function CopyEmailButton({ email }: { email: string }) {
    const [state, setState] = useState<CopyState>("idle");

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(email);
            setState("copied");
        } catch {
            // Clipboard bisa ditolak browser (misalnya bukan https); teks email tetap bisa diblock manual
            setState("failed");
        }
        // Kembali ke label awal setelah 2 detik
        setTimeout(() => setState("idle"), 2000);
    }

    return (
        <>
            <button 
                type="button"
                onClick={handleCopy}
                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition-colors hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-100"
            >
                    {labels[state]}
            </button>
            {/* Pembaca layar mengumumkan hasilnya, karena perubahan label saja tidak selalu dibacakan */}
            <span aria-live="polite" className="sr-only">
                {state === "copied" ? "Email address copied" : state === "failed" ? "Could not copy the email address" : ""}    
            </span>
        </>
    );
}