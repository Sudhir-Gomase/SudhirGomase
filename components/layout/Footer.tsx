"use client";

import Link from "next/link";
import { footerNavLinks, footerSocialLinks, siteConfig } from "@/lib/data";

function Icon({ name }: { name: (typeof footerSocialLinks)[number]["icon"] | "location" | "cv" | "arrow-up" }) {
  const props = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true as const };

  switch (name) {
    case "github":
      return (
        <svg {...props} fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.996 8.996 0 0012 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props} fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 4h2l1.5 4-2 1.5a11 11 0 005 5L14.5 13 18.5 14v2a2 2 0 01-2 2A13 13 0 014 8.5 6 6 0 016.5 4z" />
        </svg>
      );
    case "location":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "cv":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-3.5-3.5M12 15l3.5-3.5M5 19h14" />
        </svg>
      );
    case "arrow-up":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      );
  }
}

export default function Footer() {
  const [firstName, ...rest] = siteConfig.name.split(" ");
  const lastName = rest.join(" ");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-navy-dark text-white/70 dark:border-white/10 dark:bg-[#06070d]">
      <div className="section-wrap py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block font-display text-2xl text-white md:text-[1.65rem]">
              {firstName}{" "}
              <span className="text-brand">{lastName}</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-start gap-2.5 text-sm text-white/55">
              <span className="mt-0.5 shrink-0 text-brand">
                <Icon name="location" />
              </span>
              <span>{siteConfig.location} · Open to remote opportunities</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {footerSocialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  data-cursor="hover"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65 transition-all hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
                >
                  <Icon name={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="label-caps text-white/40">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="hover"
                    className="text-sm text-white/60 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="label-caps text-white/40">Get in touch</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  data-cursor="hover"
                  className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand transition-colors group-hover:border-brand/30">
                    <Icon name="mail" />
                  </span>
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  data-cursor="hover"
                  className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand transition-colors group-hover:border-brand/30">
                    <Icon name="phone" />
                  </span>
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.cv}
                  download
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-brand transition-colors hover:text-brand-light"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                    <Icon name="cv" />
                  </span>
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-white/40 sm:text-left">
            © {year} {siteConfig.name}. All rights reserved.
            <span className="mx-2 hidden sm:inline"></span>
            <span className="mt-1 block sm:mt-0 sm:inline"></span>
          </p>
          <a
            href="#hero"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/55 transition-all hover:border-brand/35 hover:text-brand"
          >
            <Icon name="arrow-up" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
