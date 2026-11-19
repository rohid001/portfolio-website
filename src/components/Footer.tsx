// Footer di bawah semua halaman: hak cipta dan link profil.
import { cacheLife } from "next/cache";
import { Container } from "@/components/Container";
import { profile } from "@/content/profile";

// Tahun dihitung saat build lalu disimpan ("use cache") selama mungkin ("max").
// Tanpa "use cache", Cache Components menolak new Date() saat prerender.
async function getCopyrightYear() {
    "use cache";
    cacheLife("max");
    return new Date().getFullYear();
}

export async function Footer(){
    const year = await getCopyrightYear();

    return(
        <footer className="border-t border-zinc-200 dark:border-zinc-800">
            <Container className="flex flex-col gap-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
                <p>
                    © {year} {profile.name}
                </p>

                {/* Link profil luar dibuka di tab baru */}
                <ul className="flex gap-5">
                    {profile.socials.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href={`mailto:${profile.email}`}
                            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                            Email
                        </a>
                    </li>
                </ul>
            </Container>
        </footer>
    );
}