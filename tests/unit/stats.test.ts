//Unit test untuk angka ringkas di Her (src/lib/stats.ts).
import { describe, expect, it } from "vitest";
import { getPortfolioStats } from "@/lib/stats";
import { makeProject } from "./fixtures";

describe ("getPortfolioStats", () => {
    it("counts projects and distinct career tracks", () => {
        const projects = [
            makeProject({ category: "Data Science" }),
            makeProject({ category: "Data Science" }),
            makeProject({ category: "Data Engineering" }),
        ];
        const [projectCount, tracks] = getPortfolioStats(projects, 1);
        
        expect(projectCount).toEqual({ value: 3, label: "projects" });
        expect(tracks).toEqual({ value: 2, label: "career tracks" });
    });

    it("uses singular and plural labels for papers", () => {
        expect(getPortfolioStats([], 1)[2].label).toBe("published paper");
        expect(getPortfolioStats([], 2)[2].label).toBe("published papers");
    });
});