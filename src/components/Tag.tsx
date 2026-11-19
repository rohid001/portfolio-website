// Label kecil berbentuk pil, untuk kategori project dan nama tool.
import type { ReactNode } from "react";

export function Tag({ children } : {children: ReactNode}) {
    return (
        <span className="inline-flex rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
            {children}
        </span>
    );
}