// Aturan untuk crawler mesin pencari, tersedia di /robots.txt.
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
    return {
        // Semua crawler boleh membaca semua halaman
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${site.url}/sitemap.xml`,
    };
}
