// Unit test untuk metadata halaman (src/lib/seo.ts).
import { describe, expect, it } from "vitest";
import { createMetadata } from "@/lib/seo";

describe("createMetadata", () => {
    it("builds canonical and Open Graph data for a page", () => {
        const metadata = createMetadata({ title: "Projects", description: "All projects.", path: "/projects" });

        expect(metadata.title).toBe("Projects");
        expect(metadata.alternates?.canonical).toBe("/projects");
        expect(metadata.openGraph).toMatchObject({
            url: "/projects",
            title: "Projects | Rohid Aji Sunan",
            description: "All projects.",
        });
    });

    it("uses the full site title for Home", () => {
        const metadata = createMetadata({ description: "Home page.", path: "/" });

        expect(metadata.title).toEqual({ absolute: "Rohid Aji Sunan | Data Portfolio" });
        expect(metadata.openGraph?.title).toBe("Rohid Aji Sunan | Data Portfolio");
    });

    it("never sets Open Graph images, so each page keeps its own opengraph-image file", () => {
        const metadata = createMetadata({ title: "Any", description: "Any page.", path: "/any" });
        
        expect(metadata.openGraph).not.toHaveProperty("images");
    });
});