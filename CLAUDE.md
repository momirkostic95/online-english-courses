# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static single-page marketing website for "MasterEnglish" (masterenglisheasy.com), promoting online English classes taught by a single instructor in Novi Sad, Serbia. There is no backend, no build step, and no package manager — everything is hand-written HTML/CSS/JS served directly (likely via GitHub Pages, given `CNAME`).

User-facing copy is in Serbian; keep new copy consistent with that.

## Running / previewing

There is no build or test tooling. To preview locally, just serve the directory statically, e.g.:

```
npx serve .
```

or open `index.html` directly in a browser. Changes to `index.html`, `scripts/*.js`, or images are reflected immediately on reload — no compilation step exists.

## Architecture

- `index.html` — the entire site. One large HTML file containing all markup, inline `<style>` CSS (custom properties + Bootstrap overrides), and three `application/ld+json` structured-data blocks (LocalBusiness/EducationalOrganization, Instructor, Course Offerings) used for SEO. Sections are anchor-linked: `#kursevi` (courses), `#o-nama` (about), `#kontakt` (contact).
- `scripts/functions.js` — all interactive page behavior:
  - `adjustNavbarOffset()` keeps the fixed top bar + navbar height in sync with body padding/scroll-padding (mobile vs. desktop heights differ via the `--navbar-height-mobile-collapsed` CSS var).
  - `toggleCourse(detailId, clickedCard, ...)` drives the course-card accordion in `#kursevi`: opening one `.course-details-section` closes the others (with a timed fade via `animationDuration`), and dispatches to `updateA1Display(...)` per course (`detail-a1`/`b1`/`c1`/`d1` map to general/elementary/business/cambridge course lists).
  - `updateA1Display(listId, courseNo, previewImgUrl, clickedElement, descriptionText, modalImgUrl, color, shouldScroll)` updates the interactive checklist UI, swaps the preview image/text with a fade, and updates the "view example" button's `data-current-img-src` (consumed by the Bootstrap image modal `#imageModal`).
  - DOMContentLoaded wiring: scroll-reveal via `IntersectionObserver` on `.reveal` elements, navbar shadow-on-scroll, default-open first course card, off-click closing of the mobile nav menu, and populating `#imageModal`'s `<img>` from the clicked button's `data-current-img-src`.
- `scripts/email.js` — contact form (`#kontakt-forma`) submission handler: honeypot spam check (`#bot_check`), Google reCAPTCHA validation, then sends via EmailJS (`emailjs.sendForm` with hardcoded service/template IDs) with inline status feedback and button spinner.
- `scripts/analytics.js` — wires GA4 (`gtag`) click events for nav/header buttons and the email submit button via a `sendEvent` helper that no-ops (logs to console) if `gtag` isn't loaded.
- `docs/courses/<category>/` — preview/detail images per course category (`general`, `elementary`, `business`, `cambridge`); `docs/courses/elementary/previews/` holds smaller preview variants. Image filenames are referenced directly by ID/path in `index.html`'s `data-current-img-src` attributes and by `toggleCourse`/`updateA1Display` calls — renaming an image file requires updating both.
- `docs/pdf/primer.pdf` — downloadable resource linked from the site.
- `images/` — site-wide assets (logo, header, professor photo) referenced in `<head>` (favicon/OG tags) and the about/header sections.
- `sitemap.xml`, `robots.txt`, `CNAME` — static SEO/hosting config for the custom domain.

## Conventions specific to this repo

- New course types/levels follow the existing pattern of: a `.course-card` in `#kursevi`'s cards row → a matching `.course-details-section` with `id="detail-<x>"` → a branch in `toggleCourse()` calling `updateA1Display()` with that course's image paths, description text, and Bootstrap color class (`text-primary`/`text-success`/`text-warning`/`text-danger`).
- Bootstrap 5.3 and Bootstrap Icons are loaded via CDN (`<link>`/`<script>` in `<head>`), not bundled — don't add a package manager for this.
- SEO structured data (JSON-LD) and meta tags in `index.html`'s `<head>` are deliberately maintained for local search visibility (Novi Sad geo-targeting); keep these in sync if business info (name, address, course offerings) changes.
