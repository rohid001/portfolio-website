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