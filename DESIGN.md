# Design Direction: Ibnu Adam Portfolio

## Identity & Character
- **Role**: Frontend Developer & Core Systems Engineer.
- **Background**: Proven track record in building complex web apps, enterprise design systems (Morpheme UI), and high-performance interactive interfaces at Pegadaian, GITS Indonesia, Telkom Indonesia, and UNY.
- **Target Audience**: Engineering hiring managers, tech leads, agency founders, and clients seeking a solid, detail-oriented frontend craftsman who can turn complex specs into polished, interactive products.

## Dials (Liveliness Toolkit)
- **ENERGY**: 2 (Balanced: confident, refined, welcoming, without overwhelming sensory clutter)
- **RHYTHM**: 3 (Varied: alternating between editorial hero, interactive stack explorer, structured timeline, interactive project showcase, and dynamic contact dock)
- **MOTION**: 3 (Choreographed GSAP animations: magnetic elements, smooth stagger reveals, interactive card expansion, interactive inquiry builder)

## Color Palette & Theme
- **Dark Mode (Default & Primary)**:
  - Background Canvas: `oklch(0.12 0.02 250)` (#0d131f / deep obsidian slate)
  - Card & Surface: `oklch(0.16 0.02 250)` (#151c2c) with clean crisp border `oklch(0.24 0.02 250)`
  - Foreground: `oklch(0.98 0.01 250)` (high-contrast off-white, passes WCAG AAA)
  - Muted Foreground: `oklch(0.72 0.02 250)` (readable slate text, passes WCAG AA 4.5:1)
  - Accent Color: Emerald / Mint `oklch(0.72 0.17 155)` (#10b981) for live status, action focus, and technical precision.
  - Secondary Accent: Azure Blue `oklch(0.68 0.16 240)` (#38bdf8) for interactive tech tags.
- **Light Mode**:
  - Background Canvas: `oklch(0.98 0.01 240)` (crisp off-white / porcelain)
  - Card & Surface: `oklch(1 0 0)` with clean subtle borders `oklch(0.90 0.01 240)`
  - Foreground: `oklch(0.15 0.02 250)` (deep charcoal slate)
  - Muted Foreground: `oklch(0.42 0.02 250)` (crisp mid-slate, 4.5:1+)
- **Palette Restriction**: Exactly 2 core neutrals + 1 primary accent (Emerald) + 1 tech accent (Azure). No uncontrolled rainbow colors.

## Typography
- **Heading**: Inter / Geist Sans with crisp tracking and distinct weight hierarchy (Bold 700 / SemiBold 600).
- **Body**: Clean readable Sans (Geist / Inter) with generous line-height (`1.65`).
- **Data & Status**: Monospace (Geist Mono / Fira) used strictly for real metadata (timezones, git commits, metrics, duration, tech tags), not for decorative gimmicks.

## GSAP & Motion Principles
1. **Interactive Experience**:
   - GSAP timeline reveals upon initial load.
   - Interactive Tech Stack Explorer: Clicking or hovering a technology highlights where and how it was applied in actual work experience and projects.
   - Project Spotlight: Expanding interactive cards with direct live demo links and technical impact details.
   - Live Status & Jakarta Timezone Widget: Real-time clock and live availability indicator.
   - Quick Contact Drawer & Dock: Interactive topic selector ("New Web Project", "Full-time Role", "Quick Consultation") that automatically generates a contextual email mailto or copies with visual haptic feedback.
2. **Accessible Motion**:
   - All animations must respect `prefers-reduced-motion`.
   - GSAP instances properly cleaned up in React `useEffect` / `useGSAP` contexts.

## Anti-Slop Enforcement
- No em dashes (`—`) anywhere in copywriting (use commas, colons, or hyphens).
- No generic buzzwords ("revolutionary", "cutting-edge", "seamless", "AI-powered").
- All statistics and facts derive 100% from real CV and portfolio data.
- Every button, card, and tab has a functional destination or interactive behavior.
