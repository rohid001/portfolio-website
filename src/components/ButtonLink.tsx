// Link yang tampil seperti tombol, dengan dua gaya: utama dan sekunder.
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary";
    external?: boolean; // true = buka di tab baru (GitHub, demo, email)
};

// Kelas Tailwind untuk tiap gaya tombol
const variantStyles = {
    primary: "bg-sky-700 text-white hover:bg-sky-800 dark:bg-sky-400 dark:text-zinc-950 dark:hover:bg-sky-300",
    secondary: "border border-zinc-300 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-100",
};

export function ButtonLink({
    href,
    children,
    variant = "primary",
    external = false,
}: ButtonLinkProps) {
    const className =  `inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${variantStyles[variant]}`;

    // Link ke luar website memakai <a> biasa, link internal memakai <link>
    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {children}
            </a>
        );
    }
    
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}