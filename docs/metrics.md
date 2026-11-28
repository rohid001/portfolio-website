# Metrics log

## Fase 0 baseline (placeholder page)

- Date: 2026-11-18
- URL: https://portfolio-website-nu-eight-10.vercel.app
- Tool: Chrome DevTools Lighthouse, mobile

| Category       | Score |
| -------------- | ----- |
| Performance    | 98    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

## Fase 5 GitHub integration

- Date: 2026-11-21
- Page: /projects/olist-data-pipeline (live site)
- Tool: Chrome DevTools Lighthouse, mobile, Incognito, median of 3 runs

| Metric                              | Before (Fase 4) | After (Fase 5)           |
| ----------------------------------- | --------------- | ------------------------ |
| Public repos with live GitHub data  | 0 of 5          | 5 of 5                   |
| GitHub API quota (requests/hour)    | 60              | 5,000                    |
| GitHub requests per build           | 0               | 10                       |
| Data freshness                      | manual          | revalidate 1h, expire 1d |
| Page still works with a bad token   | n/a             | yes                      |
| Token found in .next or Git         | n/a             | 0                        |
| Lighthouse (P / A / BP / SEO)       | n/a             | 100 / 100 / 100 / 100    |

Home page (same day, same method): 99 / 100 / 100 / 100.

## Fase 6 Contact, CV & SEO

- Date: 2026-11-23
- Site: https://portfolio-website-nu-eight-10.vercel.app

| Metric                                    | Before (Fase 5)                                        | After (Fase 6)                                   |
| ----------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| Pages with a canonical URL                | 0 of 8                                                 | 8 of 8                                           |
| Pages with og:title/description/url/image | 0 of 8                                                 | 8 of 8                                           |
| Open Graph preview images                 | 0                                                      | 7                                                |
| sitemap.xml / robots.txt                  | 404 / 404                                              | 200 (8 URLs) / 200                               |
| Structured data (schema.org)              | none                                                   | Person, 0 errors, 0 warnings                     |
| Clicks from Home to CV                    | no CV                                                  | 1                                                |
| LinkedIn preview (Post Inspector)         | title "Hi, I'm Rohid." from the H1, no image, 3 warnings | image + title + description, canonical detected, 0 warnings |
| Lighthouse SEO (mobile, median of 3)      | 100                                                    | 100                                              |
| Pages indexed by Google                   | pending                                                | 3 of 4 known (sitemap: 8), 1 crawled but not indexed (as of 2026-11-23)         |