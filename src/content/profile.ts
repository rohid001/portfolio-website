// Data profil: dipakai di Hero, about, Contact, dan metadata website.
import type { Profile } from "@/types/content";

export const profile: Profile = {
    name: "Rohid Aji Sunan",
    shortName: "Rohid",
    roles: ["Data Analyst", "Data Scientist", "Data Engineer"],
    tagline: "I turn raw data into dashboards, pipelines, and AI tools that people can trust.",
    location: "Malang, Indonesia",
    about: [
        "I build end-to-end data projects: cleaning raw data and writing SQL, training language models for Bahasa Indonesia, and automating pipelines that run on their own.",
        "I hold a bachelor's degree in Informatics from Universitas Muhammadiyah Malang and completed a Data Science Trainee program at Pusdatin, Indonesia's Ministry of Primary and Secondary Education.",
        "I care about results that hold up. I check my own work for hidden mistakes, such as test data leaking into training, and I write down what I fixed.",
    ],
    email: "rohidajisunan185@gmail.com",
    githubUsername: "rohid001",
    socials: [
        { label: "GitHub", url: "https://github.com/rohid001"},
        { label: "LinkedIn", url: "https://www.linkedin.com/in/rohidajisunan/"},
    ],
    education: [
        {
            school: "Universitas Muhammadiyah Malang",
            degree: "Bachelor's degree in Informatics",
            period: "Oct 2020 - Feb 2025",
        },
    ],
    experience: [
        {
            organization: "Pusdatin, Ministry of Primary and Secondary Education (Kemendikdasmen)",
            role: "Data Science Trainee",
            period: "May 2026 - Jul 2026",
            highlights: [
                "Analysed citizen complaint reports with topic modeling and IndoBERT sentiment analysis.",
                "Presented the findings to the internal team.",
            ],
        },
    ],
    publications: [
        {
            title: "Klasifikasi Hoax Berita Politik Menggunakan Algoritma LSTM dengan Penambahan Fitur Embedding GloVe",
            venue: "JEPIN Vol. 10 No. 2 (SINTA 2)",
            year: 2024,
            url: "https://doi.org/10.26418/jp.v10i2.76042",
        },
    ],
    availability: "I'm open to Data Analyst, Data Scientist, and Data Engineer roles. Based in Malang, open to relocation or remote work.",
    cv: {
        url: "/cv/rohid-aji-sunan-cv.pdf",
        update: "Nov 2026"
    },
};