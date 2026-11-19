// Pembungkus satu bagian halaman (About, Skills, ...) dengan judul dan jarak yang seragam.
import type { ReactNode } from "react";
import { Container } from "@/components/Container";

type SectionProps = {
    id: string; // dipakai untuk link seperti /#about
    title: string;
    eyebrow?: string; // label kecil di atas judul (opsional)
    children: ReactNode;
};

export function Section({ id, title, eyebrow, children }: SectionProps) {
    const headingID = `${id}-title`;

    return (
        // scroll-mt-20 memberi jarak supaya judul tidak tertutup navbar saat dilompati
        <section id={id} aria-labelledby={headingID} className="scroll-mt-20 py-16 sm:py-24">
            <Container>
                {eyebrow && (
                    <p className="text-sm font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
                        {eyebrow}
                    </p>
                )}
                <h2 id={headingID} className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {title}
                </h2>
                <div className="mt-8">{children}</div>
            </Container>
        </section>
    );
}