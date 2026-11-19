// Halaman 404: tampil bila alamat yang dibuka tidak ada.
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

export default function NotFound() {
    return (
        <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
            <p className="text-sm font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
                The page you are looking for does not exist or has moved.
            </p>
            <ButtonLink href="/">Back to home</ButtonLink>
        </Container>
    );
}