# vanshkashyap.lzworth.in

Source for my portfolio — **[vanshkashyap.lzworth.in](https://vanshkashyap.lzworth.in)**

A static site with no framework and no build step: plain HTML, CSS and vanilla
JavaScript. Content lives in one `content.js` file as a `window.DATA` global, so
the whole site can be opened from the filesystem without a server.

## What's in it

- 11 live web apps and 6 Android apps, each one openable
- Deep-dive write-ups on the products worth explaining
- A [photo page](https://vanshkashyap.lzworth.in/photos) and
  [résumé](https://vanshkashyap.lzworth.in/resume.pdf)

## How it's built

| | |
|---|---|
| **Markup** | Hand-written HTML, one file per page |
| **Content** | `assets/content.js` — a single source of truth, no CMS |
| **Behaviour** | `assets/app.js` — small defensive IIFE modules; each no-ops if its markup is absent |
| **Styling** | CSS custom properties, dark-first with a light theme |
| **Images** | AVIF → WebP → JPEG via `<picture>`, with explicit dimensions to prevent layout shift |
| **Mobile** | An app-mode tab bar that swaps sections instead of scrolling |
| **Structured data** | JSON-LD: Person, Organization, WebSite, BreadcrumbList, FAQPage, SoftwareApplication |
| **Hosting** | Vercel — clean URLs, immutable asset caching, IndexNow on deploy |

No React, no bundler, no node_modules. The whole thing is files.

## Licence

Proprietary — All Rights Reserved. Published for portfolio and demonstration
purposes only. See [LICENSE](LICENSE).

---

Built by **Vansh Kashyap** — full-stack and AI automation developer in New Delhi,
India. Co-founder of [LZ Worth](https://lzworth.in).

[Portfolio](https://vanshkashyap.lzworth.in) · [DEV](https://dev.to/techbyvansh) · [Peerlist](https://peerlist.io/techbyvansh) · [LinkedIn](https://www.linkedin.com/in/techbyvansh)
