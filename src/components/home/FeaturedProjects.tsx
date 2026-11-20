// Bagian Featured projects di Home: 4 kartu project pilihan + tombol ke semua project.
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import {ProjectCard} from "@/components/projects/ProjectCard";
import { projects } from "@/content/projects";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedProjects() {
    const featured = getFeaturedProjects(projects);

    return (
        <Section id="projects" eyebrow="Work" title="Featured projects">
            <div className="grid gap-6 sm:grid-cols-2">
                {featured.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
            <div className="mt-8">
                <ButtonLink href="/projects" variant="secondary">
                    See all {projects.length} projects
                </ButtonLink>
            </div>
        </Section>
    );
}