// Bagian Skills: satu kartu per kelompok skill, isi berupa label Tag.
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";
import { skillGroups } from "@/content/skills";

export function Skills() {
    return (
        <Section id="skills" eyebrow="Skills" title="What I work with">
            <div className="grid gap-4 sm:grid-cols-2">
                {skillGroups.map((group) => (
                    <div key={group.name} className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
                        <h3 className="font-semibold">{group.name}</h3>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                                <li key={skill}>
                                    <Tag>{skill}</Tag>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}