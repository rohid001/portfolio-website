// Navigasi atas: nama di kiri, tiga link di kanan, menempel saat di-scroll.
import Link from "next/link";
import { Container } from "@/components/Container";
import { profile } from "@/content/profile";

// Daftar link navigasi; "/#about" = bagian About di halaman Home
const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
];

export function Navbar() {
    return(
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="font-semibold tracking-tight">
                    {profile.shortName}
                </Link>

                <nav aria-label="Main">
                    <ul className="flex gap-5 text-sm sm:gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}