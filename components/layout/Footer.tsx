"use client";

import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-navy-dark py-12 text-white/70 dark:border-white/10 dark:bg-[#06070d]">
      <div className="section-wrap flex flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <p className="font-display text-xl text-white">
            {siteConfig.name.split(" ")[0]}{" "}
            <span className="text-brand">{siteConfig.name.split(" ").slice(1).join(" ")}</span>
          </p>
          <p className="mt-1 text-sm">
            Backend Developer · {siteConfig.location}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm md:gap-8">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            GitHub
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
            LinkedIn
          </a>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white">
            Email
          </a>
        </div>

        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
