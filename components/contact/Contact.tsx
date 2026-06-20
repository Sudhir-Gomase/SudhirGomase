"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/lib/data";

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _hp: "",
  });

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".contact-reveal"),
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setFormState("error");
        setErrorMessage(data.error ?? "Could not send message. Please try again.");
        return;
      }

      setFormState("sent");
      setFormData({ name: "", email: "", subject: "", message: "", _hp: "" });
      setTimeout(() => setFormState("idle"), 6000);
    } catch {
      setFormState("error");
      setErrorMessage("Network error. Check your connection or email me directly.");
    }
  };

  return (
    <section id="contact" ref={ref} className="section-muted py-20 md:py-28">
      <div className="section-wrap">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeader
              index="05 — Contact"
              title="Let's work together"
              description="Open to full-time roles, contract work, and consulting. Fill the form — it sends an email to my inbox via Nodemailer."
              className="contact-reveal invisible"
            />

            <div className="space-y-4">
              {[
                { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { label: "Phone", value: siteConfig.phone },
                { label: "Location", value: siteConfig.location },
              ].map((item) => (
                <div key={item.label} className="contact-reveal surface-card invisible flex items-center justify-between p-5">
                  <span className="text-sm text-ink-faint">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-ink-heading hover:text-brand-dark">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-ink-heading">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-reveal surface-card invisible space-y-5 p-7 lg:col-span-3 lg:p-9"
          >
            {/* Honeypot — leave empty */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              value={formData._hp}
              onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-heading">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-heading">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-ink-heading">
                Subject <span className="font-normal text-ink-faint">(optional)</span>
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
                placeholder="Project inquiry, job opportunity..."
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-heading">
                Message
              </label>
              <textarea
                id="message"
                required
                minLength={10}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
                placeholder="Tell me about your project, role, or timeline..."
              />
            </div>

            {formState === "sent" ? (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Message sent — I&apos;ll reply to your email soon.
              </p>
            ) : (
              <>
                {formState === "error" && errorMessage && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                    {errorMessage}
                  </p>
                )}
                <MagneticButton type="submit" disabled={formState === "sending"}>
                  {formState === "sending" ? "Sending..." : "Send message"}
                </MagneticButton>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
