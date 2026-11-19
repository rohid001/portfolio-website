// Tipe data untuk semua konten website: profil, skill, dan project.
// Konten ditulis di src/content/, tampilannya dibuat di komponen (Fase 2-4)

// Empat jalur karier yang ditampilkan di website
export type ProjectCategory =
    | "Data Analysis"
    | "Data Science"
    | "Data Engineering"
    | "AI Engineering";

// Link ke profil luar, misalnya Linkedin atau GitHub
export type SocialLink = {
    label: string;
    url: string;
};

export type Education = {
    school: string;
    degree: string;
    peroid: string; // contoh "Oct 2020 - Feb 2025"
};

export type Experience= {
    organization: string;
    role: string;
    period: string;
    highlights: string[];
};

export type Publication = {
    title: string;
    vanue: string;
    year: number;
    url: string;
};

export type Profile = {
    name: string;
    shortname: string;
    roles: string[]; // jabatan yang dituju, tampil di Hero
    tagline: string; // satu kalimat pembuka untuk pembaca non-teknis
    location: string;
    about: string[]; // tiap item = satu paragraf di bagian about
    email: string;
    githubUsername: string; // dipakai untuk GitHub API di Fase 5
    socials: SocialLink[];
    education: Education[];
    experience: Experience[];
    publications: Publication[];
};

export type SkillGroup = {
    name: string;
    skills: string[];
};

// Angka besar di kartu project, misalnya { value: "94%", label: "answer accuracy" }
export type ProjectHighlight = {
    value: string;
    label: string;
};

export type Project = {
    slug: string; // bagian URL: /projects/[slug]
    title: string;
    category: ProjectCategory;
    year: number;
    featured: boolean; // tampil di Home jika true
    summary: string; // satu kalimat untuk kartu project
    problem: string; // masalah apa yang diselesaikan
    approach: string[]; // apa yang dikerjakan, 2-4 poin
    results: string[]; // hasil yang bisa diukur, 2-3 poin
    highlights: ProjectHighlight[];
    stack: string[];
    githubRepo: string | null; // nama repo di Github; null bila repo private
    liveUrl?: string; // demo atau dashboard publik (opsional)
};