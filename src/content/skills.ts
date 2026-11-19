// Daftar skill per kelompok: dipakai di bagian Skills (Fase 3).
// Hanya tulis tool yang benar-benar dipakai di project.
import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
    {
        name: "Data Analysis",
        skills: ["SQL (PostgreSQL)", "Python (pandas)", "Power BI", "Data quality audits"],
    },
    {
        name: "Data Science & NLP",
        skills: ["PyTorch", "TensorFlow", "scikit-learn", "IndoBERT", "Model evaluation"],
    },
    {
        name: "Data Engineering",
        skills: ["dbt", "Apache Airflow", "Apache Kafka", "Docker", "GitHub Actions"],
    },
    {
        name: "AI Engineering",
        skills: ["RAG", "Vector search (Chroma)", "Gemini API", "Streamlit", "LLM evaluation"],
    },
];