// Gambar preview khusus tiap case study: judul dan ringkasan project.
// Saat satu case study dibagikan di LinkedIn, gambarnya langsung menjelaskan project itu.
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getProjectBySlug } from "@/lib/projects";

export const alt = "Case study preview with the project title and summary";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satu gambar per slug, dibuat saat build seperti halamannya
export function generateStaticParams(){
    return projects.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(projects, slug);

    // Slug tidak dikenal: pakai judul umum supaya tetap ada gambar
    const eyebrow = project ? `${project.category} · ${project.year}` : "Case study";
    const title = project?.title ?? "Project not found";
    const summary = project?.summary ?? "";
    
    return new ImageResponse(
        (
            <div 
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 80, 
                    background: "#09090b",
                    color: "#fafafa",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 30, color: "#38bdf8", letterSpacing: 2 }}>{eyebrow.toUpperCase()}</div>
                    <div style={{ marginTop: 24, fontSize: 68, lineHeight: 1.1 }}>{title}</div>
                    <div style={{ marginTop: 28, fontSize: 34, color: "#a1a1aa", lineHeight: 1.35 }}>{summary}</div>
                </div>
                <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
                    Case study by {profile.name}
                </div>
            </div>
        ),
        { ...size },
    );
}