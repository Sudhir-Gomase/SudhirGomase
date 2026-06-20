"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/lib/data";

const sectionLinks = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#expertise", label: "Expertise" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-surface/85 shadow-soft backdrop-blur-2xl dark:bg-[#0a0a10]/90"
            : "bg-transparent"
        }`}
      >
        <nav className="section-wrap flex h-[var(--nav-h)] items-center justify-between gap-4 sm:gap-6">
          <Link
            href="/"
            className="shrink-0 font-display text-[1.1rem] font-semibold tracking-tight md:text-[1.2rem]"
          >
            <span className="text-ink-heading">Sudhir </span>
            <span className="text-brand-dark dark:text-brand">Gomase</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="hover"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={siteConfig.cv}
              download
              data-cursor="hover"
              className="flex items-center gap-1.5 rounded-full border border-brand/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-dark transition-all hover:border-brand/50 hover:bg-brand/5 dark:text-brand"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              CV
            </a>

            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="hidden text-[12px] font-medium text-ink-muted transition-colors hover:text-brand-dark lg:inline dark:hover:text-brand"
            >
              8108320614
            </a>

            <ThemeToggle />

            <a
              href="#contact"
              data-cursor="hover"
              className="rounded-full bg-ink-heading px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-canvas transition-all hover:shadow-glow dark:bg-brand dark:text-navy-dark dark:hover:bg-brand-light"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-heading"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-[var(--nav-h)] z-[49] border-b border-line bg-surface px-5 py-5 shadow-elevated backdrop-blur-xl dark:bg-[#0c0e16] md:hidden"
          >
            <div className="section-wrap flex flex-col gap-4">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-ink-heading"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-line" />
              <a href={siteConfig.cv} download className="text-sm font-medium text-brand-dark dark:text-brand">
                Download CV
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-sm text-ink-muted">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-ink-muted">
                {siteConfig.email}
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 inline-flex w-fit rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white dark:bg-brand dark:text-[#0c0e16]"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
