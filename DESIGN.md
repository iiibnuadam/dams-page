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
  - Background Canvas: `#09090B` (pure carbon black, zero blue/slate AI tint)
  - Card & Surface: `#121212` (elevated matte charcoal) with crisp neutral border `#27272A`
  - Secondary Surface: `#1C1C1C` (solid monochrome container)
  - Foreground: `#FAFAFA` (high-contrast crisp white, 19.06:1 on canvas, passes WCAG AAA)
  - Muted Foreground: `#A3A3A3` (neutral mid-grey, 6.76:1 on `#1C1C1C` and 7.89:1 on `#09090B`, passes WCAG AA)
  - Bright Highlight (`--primary`): Signal Emerald `#10B981` (7.84:1 on `#09090B`, 7.39:1 on `#121212`, with `#09090B` button text at 7.84:1) reserved strictly for focal CTAs, active indicators, and the live status dot.
- **Light Mode**:
  - Background Canvas: `#FAFAFA` (warm architectural paper)
  - Card & Surface: `#FFFFFF` with crisp neutral border `#D4D4D8`
  - Secondary Surface: `#F0F0F0`
  - Foreground: `#09090B` (deep ink black, 19.06:1 on canvas)
  - Muted Foreground: `#525252` (neutral graphite, 6.86:1 on `#F0F0F0` and 7.81:1 on `#FFFFFF`, passes WCAG AA)
  - Highlight (`--primary`): Deep Signal Emerald `#047857` (5.48:1 on `#FFFFFF`, 5.25:1 on `#FAFAFA`, with `#FFFFFF` button text at 5.48:1).
- **Palette & Surface Restriction**: Strictly flat, solid monochrome surfaces (zero radial glow orbs, zero CSS gradients, zero translucent `/10` or `/20` washes, zero backdrop-blur) + 1 bright Signal Emerald highlight (`#10B981` / `#047857`). All tech icons, checkmarks, and metadata badges remain monochrome to eliminate AI slop.

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
