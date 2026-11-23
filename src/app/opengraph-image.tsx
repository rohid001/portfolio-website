// Gambar preview 1200x360 saat link website dibagikan (LinkedIn, Whatsapp, X).
// Dibuat dari kode saat build, jadi selalu sesuai isi profile.ts
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export const alt = `${profile.name}: ${profile.roles.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";


export default function OpengraphImage() {
    return new ImageResponse(
        (
            // Satori (mesin ImageResponse) hanya mendukung flexbox: setiap div berisi > 1 child wajib display: flex
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 80,
                    background: "#09090b", // zinc-950
                    color: "#fafafa", // zinc-50
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 30, color: "#38bdf8", letterSpacing: 2 }}>
                        {profile.roles.join(" · ").toUpperCase()}
                    </div>
                    <div style={{ marginTop: 24, fontSize: 84 }}>{profile.name}</div>
                    <div style={{ marginTop: 24, fontSize: 38, color: "#a1a1aa", maxWidth: 950 }}>
                        {profile.tagline}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a1a1aa" }}>
                    <div>{profile.location}</div>
                    <div>{site.url.replace("https://", "")}</div>
                </div>
            </div>
        ),
        { ...size },
    );
}