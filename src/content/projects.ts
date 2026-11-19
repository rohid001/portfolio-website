// Daftar project untuk halaman Projects dan case study (Fase 4).
// Urutan di array = urutan tampil. Angka diambil dari README tiap repo.
import type { Project } from "@/types/content";

export const projects: Project[] = [
    {
        slug: "olist-data-pipeline",
        title: "Automated E-commerce Data Pipeline",
        category: "Data Engineering",
        year: 2026,
        featured: true,
        summary: "A monthly pipeline that refreshes an e-commerce dashboard automatically, replacing 15 manual steps with scheduled, tested runs.",
        problem: "My earlier e-commerce dashboard needed 15 manual runs of notebooks and SQL files whenever the data changed, and nothing checked whether the numbers were still correct.",
        approach: [
            "Loaded 26 months of orders into PostgreSQL month by month, safe to re-run.",
            "Rebuilt the business logic as 30 tested dbt models, scheduled with Airflow.",
            "Added a Kafka path that replayed orders as live events.",
            "Set up GitHub Actions checks and a public Streamlit dashboard.",
        ],
        results: [
            "26 of 26 monthly runs succeeded; the full history loads in about 8 minutes.",
            "102 automated tests guard the data and the code.",
            "9 of 10 results tables match the original analysis exactly; the 1 difference is explained.",
        ],
        highlights: [
            { value: "15 → 0", label: "manual steps per month" },
            { value: "102", label: "automated tests" },
            { value: "26/26", label: "monthly runs succeeded" },
        ],
        stack: ["Python", "PostgreSQL", "dbt", "Airflow", "Kafka", "Docker", "GitHub Actions", "Streamlit"],
        githubRepo: "olist-data-pipeline",
        liveUrl: "https://olist-data-pipeline.streamlit.app",
    },
    {
        slug: "olist-sql-dashboard",
        title: "E-commerce Business Dashboard with SQL",
        category: "Data Analysis",
        year: 2026,
        featured: true,
        summary: "A 5-page dashboard that shows an online marketplace where its revenue comes from and which customers it is losing.",
        problem: "A Brazilian marketplace with about 99,000 orders needed to know who its valuable customers are, how revenue changes over time, and which customers may stop buying.",
        approach: [
            "Audited the raw data first and found 814 duplicate reviews before any analysis.",
            "Wrote SQL with window functions for customer segments, growth rates, and churn.",
            "Built a Power BI dashboard that reads the SQL results directly.",
        ],
        results: [
            "97% of customers ordered only once, so keeping customers matters more than finding new ones.",
            "Sao Paulo brings in 38.3% of revenue, 2.9 times the next state.",
            "Found and fixed a random scoring bug by checking SQL against Python.",
        ],
        highlights: [
            { value: "99K", label: "orders analysed" },
            { value: "97%", label: "one-time buyers" },
            { value: "5", label: "dashboard pages" },
        ],
        stack: ["SQL (PostgreSQL)", "Python (pandas)", "Power BI"],
        githubRepo: "olist-sql-dashboard",
    },
    {
        slug: "court-decisions-rag",
        title: "Q&A Assistant for Indonesian Court Decisions",
        category: "AI Engineering",
        year: 2026,
        featured: true,
        summary: "An AI assistant that answers questions about 51 court decisions with citations, and calculates statistics with SQL instead of guessing.",
        problem: "Court decisions are long PDF files: 1,333 pages for just 51 cases. Finding a sentence, a legal article, or a statistic across cases means hours of manual reading.",
        approach: [
            "Extracted and cleaned the PDFs, and collected case facts into a database table.",
            "Split each decision by legal section and indexed it for search.",
            "Sent case questions to search plus an LLM, and statistics questions to SQL.",
            "Masked witness names and built an 82-question test set.",
        ],
        results: [
            "Answer accuracy rose from 87% to 94% after a careful error analysis.",
            "Answers backed by the source documents rose from 77% to 96%.",
            "Live demo online, also packaged with Docker.",
        ],
        highlights: [
            { value: "94%", label: "answer accuracy" },
            { value: "96%", label: "answers backed by sources" },
            { value: "82", label: "test questions" },
        ],
        stack: ["Python", "Gemini API", "Chroma", "BM25", "SQLite", "Streamlit", "Docker"],
        githubRepo: "Dataset-Narkotika-RAG",
        liveUrl: "https://rag-putusan-narkotika.streamlit.app/"
    },
    {
    slug: "hoax-detection-revisited",
    title: "Political Hoax Detection, Revisited",
    category: "Data Science",
    year: 2026,
    featured: true,
    summary:
      "I re-examined my own published hoax-detection model, found three hidden flaws, and rebuilt it with honest evaluation.",
    problem:
      "My 2024 paper reported 98% accuracy for detecting political hoax news. A later review showed the model ignored most Indonesian words and leaked test data into training.",
    approach: [
      "Audited the original dataset and code, and documented each flaw.",
      "Rebuilt the model in PyTorch with Indonesian word embeddings (FastText).",
      "Handled the class imbalance on training data only, so no test data leaks.",
    ],
    results: [
      "The rebuilt model catches 99.2% of hoax articles, with 94.1% test accuracy.",
      "Explained why the original 98% result was inflated.",
      "Flagged a remaining risk: 41.7% of hoax articles share one fact-check template.",
    ],
    highlights: [
      { value: "99.2%", label: "of hoaxes caught" },
      { value: "94.1%", label: "test accuracy" },
      { value: "3", label: "flaws found and fixed" },
    ],
    stack: ["Python", "PyTorch", "FastText", "Jupyter"],
    githubRepo: "klasifikasi-hoax-lstm-revisited",
  },
  {
    slug: "hoax-detection-paper",
    title: "Hoax Detection Paper (JEPIN 2024)",
    category: "Data Science",
    year: 2024,
    featured: false,
    summary:
      "The code behind my 2024 journal paper on political hoax classification, kept exactly as published with a documented known issue.",
    problem:
      "Hoax political news spreads fast in Indonesia. The paper tested whether an LSTM model with word embeddings can tell hoax articles from valid ones.",
    approach: [
      "Trained an LSTM model on 9,534 Indonesian political news articles.",
      "Published the results in JEPIN, a SINTA 2 accredited journal.",
    ],
    results: [
      "Reported 98.4% validation accuracy in the published paper.",
      "Added a public note in 2026 explaining the embedding issue found later.",
    ],
    highlights: [
      { value: "9,534", label: "news articles" },
      { value: "SINTA 2", label: "journal rank" },
    ],
    stack: ["Python", "TensorFlow", "Keras", "GloVe"],
    githubRepo: "klasifikasi-hoax-lstm-glove",
  },
  {
    slug: "public-complaints-analytics",
    title: "Public Complaints Analytics",
    category: "Data Science",
    year: 2026,
    featured: false,
    summary:
      "Topic modeling and sentiment analysis of citizen complaint reports, built during my traineeship at the Ministry of Education.",
    problem:
      "A government complaints channel receives many free-text reports. The team needed a quick view of the main topics and how citizens feel about them.",
    approach: [
      "Grouped complaints into topics with topic modeling.",
      "Measured sentiment with IndoBERT and compared it with a lexicon baseline.",
      "Combined topics and sentiment per institution and per month.",
    ],
    results: [
      "Presented the findings to the internal team.",
      "Code and data stay private until data use is approved.",
    ],
    highlights: [
      { value: "2", label: "NLP models compared per task" },
    ],
    stack: ["Python", "IndoBERT", "BERTopic", "pandas"],
    githubRepo: null,
  },
];