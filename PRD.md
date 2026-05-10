# Product Requirements Document: Idhant Fan Club — Waiting List

## Overview

A single-page marketing and registration experience for “The Idhant Fan Club.” Visitors can join a waiting list and view a public leaderboard of the top-ranked members. The product goal is a **polished, intentional visual design** (editorial / membership-club aesthetic), explicitly avoiding generic “template” or overused gradient-heavy UI patterns.

## Goals

1. Communicate exclusivity and enthusiasm for the fan club while remaining tasteful and readable.
2. Drive waiting-list signups via a simple, trustworthy form.
3. Surface social proof: large waitlist scale, ordered leaderboard, and testimonials.

## Non-goals

- Real payment, authentication, or server-backed persistence in v1 (client-only demo is acceptable).
- Mobile app or multi-page IA.

## Personas

- **Prospective fan**: Wants to join; scans leaderboard and testimonials for credibility.
- **Curious visitor**: Wants to see who is “#1” and how big the waitlist is.

## Functional requirements

### FR1 — Hero & positioning

- Clear title: **The Idhant Fan Club**.
- Short subcopy explaining the waiting list.
- Primary CTA: scroll or anchor to signup.

### FR2 — Waitlist scale

- Prominent stat: **2M+** people on the waiting list (display as “2m+” or “2,000,000+” per design).

### FR3 — Public leaderboard (top 50)

- Display **ranked list 1–50** with name and optional subtle rank treatment.
- **Olivia Yu** must be **#1** and visually identified as the top fan / #1 on the list.
- Remaining slots: plausible given names (feminine-presenting names per brief), varied and not repetitive.

### FR4 — Signup

- Collect at minimum: **name** and **email** (or email only if we keep name optional — spec: both for a richer list).
- Validate basic email format client-side.
- On success: confirmation message; persist signup locally (e.g. `localStorage`) so repeat visits can show “you’re already on the list” if same email is used.

### FR5 — Testimonials

- Section titled **Testimonials** with multiple short quotes that are enthusiastically positive (“glaze”) about Idhant and joining the fan club.
- Distinct from leaderboard; quote-style layout.

## Design requirements

### DR1 — Visual quality

- Cohesive **design system**: limited palette, consistent spacing scale, clear type hierarchy.
- **No “vibe coded” defaults**: avoid purple/indigo gradient heroes, excessive glassmorphism, neon glows, and interchangeable stock illustration patterns.
- Prefer: **distinctive but readable** webfonts, generous whitespace, subtle borders or rules, one restrained accent color.

### DR2 — Accessibility

- Sufficient color contrast for body text.
- Semantic HTML (`header`, `main`, `section`, `form`, `label`, `button`).
- Focus states visible on interactive elements.

### DR3 — Responsive layout

- Single column on small screens; leaderboard may use compact rows or two-column split where helpful on large screens.

## Content requirements

- **#1**: Olivia Yu — copy may say she is the “#1 fan” and #1 on the waiting list.
- Stat: **2m+** on the waiting list.
- **50** leaderboard entries total.
- **Testimonials**: at least 4 quotes, tone: excited / grateful / admiring.

## Success metrics (if deployed)

- Form completion rate, time on page, scroll depth to testimonials (analytics optional in v1).

## Technical approach (v1)

- Static site: HTML, CSS, minimal JavaScript.
- No build step required; servable via any static host or local `python -m http.server` / `npx serve`.

## Out of scope / future

- Backend API, email provider integration, admin moderation of leaderboard, anti-spam.

---

*Document version: 1.0 — aligned with initial static implementation in this repository.*
