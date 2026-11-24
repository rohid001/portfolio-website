// Unit test untuk fungsi pemilih dan penyaring project (src/lib/projects.ts).
import { describe, expect, it } from "vitest";
import { filterProjects, getCategories, getFeaturedProjects, getProjectBySlug } from "@/lib/projects";
import { makeProject } from "./fixtures";

const projects = [
    makeProject({ slug: "pipeline", category: "Data Engineering", featured: true }),
    makeProject({ slug: "dashboard", category: "Data Analysis", featured: true }),
    makeProject({ slug: "hoax-a", category: "Data Science" }),
    makeProject({ slug: "hoax-b", category: "Data Science", featured: true }),
];

describe("getFeaturedProjects", () => {
    it("returns only featured projects in their original order", () => {
        const slugs = getFeaturedProjects(projects).map((project) => project.slug);
        expect(slugs).toEqual(["pipeline", "dashboard", "hoax-b"]);
    });
});

describe("getProjectBySlug", () => {
    it("finds a project by its slug", () => {
        expect(getProjectBySlug(projects, "dashboard")?.category).toBe("Data Analysis");
    });

    it("returns undefined for an unknown slug", () => {
        expect(getProjectBySlug(projects, "does-not-exist")).toBeUndefined();
    });
});

describe("getCategories", () => {
    it("list each category once, in order of first appearance", () => {
        expect(getCategories(projects)).toEqual(["Data Engineering", "Data Analysis", "Data Science"]);
    });
});

describe("filterProjects", () => {
    it("returns every project for the all filter", () => {
        expect(filterProjects(projects, "All")).toHaveLength(4);
    });

    it("returns only projects in the chosen category", () => {
        const slugs = filterProjects(projects, "Data Science").map((project) => 
        project.slug);
        expect(slugs).toEqual(["hoax-a", "hoax-b"]);
    });

    it("returns an empty list when no project matches", () => {
        expect(filterProjects(projects, "AI Engineering")).toEqual([]);
    });
});