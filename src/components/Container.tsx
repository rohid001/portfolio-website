// Pembungkus lebar konten supaya semua halaman punya batas kiri-kanan yang sama.
import type { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string; // class tambahan, misalnya padding atas-bawah
};

export function Container({ children, className = ""}: ContainerProps) {
    return (
        <div className={`mx-auto w-full max-w-5xl px-6 ${className}`}>{children}</div>
    );
}