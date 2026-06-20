# Sudhir Gomase — Backend Developer Portfolio

Production-ready Next.js 15 portfolio with scroll-driven 3D avatar, GSAP animations, working contact form, and smooth Lenis scrolling.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **GSAP + ScrollTrigger**
- **React Three Fiber + Three.js** (3D avatar)
- **Lenis** (smooth scrolling)
- **Framer Motion** (cursor & UI motion)
- **Resend** (contact form emails)

## Requirements

- **Node.js 18+** (recommended: 20 LTS)
- **npm** 9+
- **Resend account** (free tier) for contact form — [resend.com](https://resend.com)

## Getting Started

```bash
git clone https://github.com/Sudhir-Gomase/Sudhir-Portfolio-2.git
cd Sudhir-Portfolio-2
npm install

# Copy env template and add your Resend API key
cp .env.example .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` from `.env.example`:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | **Yes** (for contact form) | API key from [Resend dashboard](https://resend.com/api-keys) |
| `CONTACT_EMAIL` | No | Inbox for form submissions (defaults to site email) |
| `EMAIL_FROM` | No | Sender address — use `onboarding@resend.dev` for testing |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL for sitemap/OG (e.g. `https://yoursite.vercel.app`) |

### Contact form setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key → paste into `RESEND_API_KEY`
3. For testing, use `EMAIL_FROM=Portfolio Contact <onboarding@resend.dev>`
4. For production, verify your domain in Resend and set `EMAIL_FROM=Portfolio Contact <hello@yourdomain.com>`

## Production Build

```bash
npm run build
npm start
```

## Deploy (Vercel — recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables: `RESEND_API_KEY`, `CONTACT_EMAIL`, `EMAIL_FROM`, `NEXT_PUBLIC_SITE_URL`
4. Deploy — Vercel auto-detects Next.js

Works on Netlify, Railway, or any Node host with `npm run build` + `npm start`.

## Page Sections

| Section | ID | Content source |
|---------|-----|----------------|
| Hero | `#hero` | `lib/data.ts` — name, stats, typing phrases |
| Tech stack | `#skills` | `techStackGroups` in `lib/data.ts` |
| About | `#about` | `aboutContent` |
| Journey | `#journey` | `professionalJourney`, `educationJourney` |
| Expertise | `#expertise` | `pillars` |
| Projects | `#projects` | `projects` |
| Contact | `#contact` | Form → `/api/contact` → your email |

## Content Guide — What to Add

Edit **`lib/data.ts`** with your real content. Suggested sections:

### Professional journey (`professionalJourney`)
- Current role at WE-Matter (already filled)
- Previous internships / jobs — company, dates, 2–3 bullet achievements
- Freelance or open-source (optional)

### Education journey (`educationJourney`)
- Degree — university, field, graduation year, CGPA (optional)
- Relevant coursework: DSA, DBMS, OS, Cloud
- Certifications: AWS, Docker, etc.
- Hackathons / college projects (optional)

### Optional sections you can add later
- **Certifications** — badge grid
- **Open source** — GitHub repos with stars/contributions
- **Testimonials** — quotes from managers/colleagues
- **Blog / writing** — technical articles
- **Speaking** — meetups, conferences

Send your content and we can plug it into `lib/data.ts`.

## Project Structure

```
app/
  api/contact/route.ts   # Email API (Resend)
  layout.tsx             # Root layout, providers
  page.tsx               # Home page sections
  robots.ts / sitemap.ts # SEO
components/
  hero/                  # Hero, About, skills, 3D character
  journey/               # Professional + education timeline
  layout/                # Navbar, Footer, avatar, cursor
  projects/              # Featured projects
  scroll-story/          # Engineering pillars
  contact/               # Contact form
lib/
  data.ts                # All portfolio content
public/
  models/avatar.glb      # 3D character
  Resume.pdf
  projects/              # Screenshots
```

## Notes

- 3D avatar zoom runs in the hero section on scroll; hidden after hero.
- If dev server misbehaves on Windows: delete `.next-dev` and run `npm run dev` again.
- Project tags show **highlights** only — full stacks appear in Frontend/Backend blocks (no duplicate Node.js).

## License

Private portfolio — © Sudhir Gomase
