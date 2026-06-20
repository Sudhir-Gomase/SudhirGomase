# Sudhir Gomase — Backend Developer Portfolio

Production-ready Next.js 15 portfolio with scroll-driven 3D avatar, GSAP animations, and smooth Lenis scrolling.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **GSAP + ScrollTrigger** (scroll animations, hero pin)
- **React Three Fiber + Three.js** (3D avatar)
- **Lenis** (smooth scrolling)
- **Framer Motion** (custom cursor, UI motion)

## Requirements

- **Node.js 18+** (recommended: 20 LTS)
- **npm** 9+

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Sudhir-Gomase/Sudhir-Portfolio-2.git
cd Sudhir-Portfolio-2

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx              # Root layout, providers, navbar
  page.tsx                # Home page sections
  globals.css             # Theme + utilities
components/
  hero/                   # Hero, About, 3D character, skills marquee
  layout/                 # Navbar, Footer, CharacterCompanion, cursor
  projects/               # Featured projects grid
  scroll-story/           # Engineering pillars
  contact/                # Contact form
lib/
  data.ts                 # Portfolio content
  characterConfig.ts      # 3D avatar settings
  characterJourney.ts     # Scroll journey per section
public/
  models/avatar.glb       # 3D character model
  Resume.pdf              # Downloadable resume
  projects/               # Project screenshots
```

## Notes

- The 3D avatar journey runs on **desktop (md+)**. Mobile shows content without the floating character.
- After cloning, always run `npm install` — `node_modules` is not committed (standard for Node projects).
- If the dev server misbehaves, delete `.next` and restart: `npm run dev`

## License

Private portfolio — © Sudhir Gomase
