// Membuat metadata satu halaman: judul, deskripsi, canonical, dan Open Graph.
// Dipakai semua halaman supaya preview LinkedIn selalu sesuai halaman yang dibagikan.
import { Metadata } from "next";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

type PageSeo = {
    title?: string; // kosongkan untuk Home; halaman lain cukup judul pendek, contoh "Projects"
    description: string;
    path: string; // alamat halaman tanpa domain, contoh "/projects"
};

export function createMetadata({ title, description, path }: PageSeo): Metadata {
    // Judul lengkap untuk preview media sosial; template di layout tidak berlaku untuk Open Graph
    const fullTitle= title ? `${title} | ${profile.name}` : site.title;

    return {
        title: title ?? { absolute: site.title },
        description,
        alternates: { canonical: path },
        openGraph: {
            type: "website",
            siteName: site.title,
            locale: site.locale,
            url: path,
            title: fullTitle,
            description,
            // images sengaja tidak diisi: gambar  diambil dari file opengraph-image di folder halaman.
            // Bila diisi di sini, gambar khusus case study akan tertimpa.
        },
    };

}