# Site plan

## Audience

1. Recruiters and HR (non-technical, global): skim in under a minute, want to know what I can do and proof that it works.
2. Hiring managers and engineers: open the case study, then the GitHub repo.

## Sitemap

| URL | Page | Sections |
| --- | --- | --- |
| `/` | Home | Navbar, Hero, Featured Projects (4), About, Skills, Contact, Footer |
| `/projects` | Projects | Title, category filter, all project cards |
| `/projects/[slug]` | Case study | Back link, title, highlights, Problem, What I did, Results, Tech stack, links, screenshot |
| any other URL | 404 | Short message and a link back to Home |

## Wireframes

```text
HOME (/)                         PROJECTS (/projects)            CASE STUDY (/projects/[slug])
+---------------------------+   +---------------------------+   +---------------------------+
| Rohid     Projects Contact|   | Rohid     Projects Contact|   | Rohid     Projects Contact|
+---------------------------+   +---------------------------+   +---------------------------+
| Data Analyst · Scientist  |   | Projects                  |   | <- All projects           |
| Hi, I'm Rohid.            |   | [All][DA][DS][DE][AI]     |   | DATA ENGINEERING · 2026   |
| tagline                   |   | +-----------+-----------+ |   | Project title             |
| [View projects] [CV]      |   | | card      | card      | |   | summary                   |
+---------------------------+   | +-----------+-----------+ |   | [ 15→0 ] [ 102 ] [26/26 ] |
| Featured projects         |   | | card      | card      | |   | Problem                   |
| +--------+ +--------+     |   | +-----------+-----------+ |   | What I did (bullets)      |
| | card   | | card   |     |   +---------------------------+   | Results (bullets)         |
| +--------+ +--------+     |                                   | Tech stack (chips)        |
| [See all projects]        |   CARD                            | [GitHub] [Live demo]      |
+---------------------------+   +---------------------------+   | screenshot                |
| About + education         |   | DATA ANALYSIS             |   +---------------------------+
| Skills (4 groups)         |   | Title                     |
| Contact (email, LinkedIn) |   | one-sentence summary      |
+---------------------------+   | 97% one-time buyers       |
| Footer                    |   | SQL · Power BI            |
+---------------------------+   | Read case study ->        |
                                +---------------------------+
```

## Design tokens

| Token | Light | Dark | Tailwind class |
| --- | --- | --- | --- |
| Background | white | zinc-950 | `bg-white dark:bg-zinc-950` |
| Text | zinc-900 | zinc-100 | `text-zinc-900 dark:text-zinc-100` |
| Muted text | zinc-600 | zinc-400 | `text-zinc-600 dark:text-zinc-400` |
| Accent (links, labels) | sky-700 | sky-400 | `text-sky-700 dark:text-sky-400` |
| Border | zinc-200 | zinc-800 | `border-zinc-200 dark:border-zinc-800` |

- Fonts: Geist Sans for all text, Geist Mono for numbers in highlights (already loaded in `layout.tsx`).
- Type scale: page title `text-4xl sm:text-5xl`, section title `text-2xl sm:text-3xl`, body `text-base`, labels `text-sm`.
- Width: page content `max-w-5xl`, long text `max-w-3xl`.
- Spacing: sections `py-16 sm:py-24`, cards `p-6`, corners `rounded-xl`.
- Dark mode follows the visitor's system setting.

## Writing guide

- Plain English, active voice: "I built", "I found".
- Numbers instead of adjectives: "97% of customers", not "most customers".
- Explain a technical term the first time, for example "RAG (search plus an AI model)".
- Summary: one sentence, at most 25 words. Problem: at most 40 words.
- Every featured project has at least one result with a number.
- Avoid filler words such as "passionate", "hardworking", "cutting-edge".