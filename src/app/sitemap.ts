// Daftar semua halaman untuk mesin pencari, tersedia di /sitemap.xml.
// Halaman project baru otomatis masuk karena dibuat dari projects.ts.
import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = ["/", "/projects", ...projects.map((project) => `/projects/${project.slug}`)];

    // Google mengabaikan priority dan changefreq, jadi cukup alamat lengkapnya.
    // Home ditulis tanpa "/" di akhir supaya sama persis dengan canonical-nya.
    return pages.map((path) => ({ url: path === "/" ? site.url : `${site.url}${path}` }));
}