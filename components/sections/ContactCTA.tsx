"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animation";

/* ─────────────────────────────────────────────────────────────
   CONTACT / CTA SECTION
   Full-section dark panel with a provocative statement,
   minimal form (name + email + message), and direct links.

   Form is wired to Formspree. To activate:
   1. Go to https://formspree.io and create a free account
   2. Create a new form — Formspree gives you an endpoint like:
      https://formspree.io/f/xyzabcde
   3. Paste that URL into FORMSPREE_ENDPOINT below
───────────────────────────────────────────────────────────── */

/* ▼ PASTE YOUR FORMSPREE ENDPOINT URL HERE ▼ */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdeejnw";
/* ▲ PASTE YOUR FORMSPREE ENDPOINT URL HERE ▲ */

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  /* Reusable fade-up animation with per-element delay */
  const fadeUp = (delay: number) => ({
    initial: { y: 32, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : {},
    transition: { duration: 0.9, delay, ease: EASE_CINEMATIC },
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-canvas px-6 py-32 md:px-10 lg:px-16"
      aria-label="Contact"
    >
      {/* Top border line — reveals left-to-right on scroll */}
      <motion.div
        className="mb-20 h-px bg-border"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left — provocative statement */}
          <div className="flex flex-col justify-between gap-12">
            <div>
              <motion.p className="label mb-6 text-text-muted" {...fadeUp(0.1)}>
                Birlikte Çalışalım
              </motion.p>

              {/* Big headline */}
              <div className="overflow-hidden">
                <motion.h2
                  className="
                    font-display font-semibold leading-[1.05]
                    text-[8vw] sm:text-[6vw] lg:text-[4.5vw]
                    tracking-[-0.02em] text-text
                    max-w-[16ch]
                  "
                  initial={{ y: "100%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.2, ease: EASE_CINEMATIC }}
                >
                  Bir Sonraki Başarı Hikayesi{" "}
                  <span className="text-accent">Sizin Markanız Olabilir.</span>
                </motion.h2>
              </div>

              <motion.p
                className="mt-6 font-body text-sm text-text-muted max-w-[38ch] leading-relaxed"
                {...fadeUp(0.4)}
              >
                Yeni bir proje, yeni bir marka hikayesi veya mevcut çalışmalarınızı büyütmek için bizimle iletişime geçin.
              </motion.p>
            </div>

            {/* Direct contacts */}
            <motion.div
              className="flex flex-col gap-3"
              {...fadeUp(0.6)}
            >
              <a
                href="tel:+905428544838"
                data-cursor-hover
                className="accent-underline font-body text-sm text-text-muted hover:text-text transition-colors duration-300"
              >
                +90 542 854 4838
              </a>
              <a
                href="mailto:hello@studioattach.com"
                data-cursor-hover
                className="accent-underline font-body text-sm text-text-muted hover:text-text transition-colors duration-300"
              >
                hello@studioattach.com
              </a>
              <a
                href="https://www.instagram.com/studioattach"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="accent-underline font-body text-sm text-text-muted hover:text-text transition-colors duration-300"
              >
                @studioattach
              </a>
              <a
                href="https://linkedin.com/company/studioattach/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="accent-underline font-body text-sm text-text-muted hover:text-text transition-colors duration-300"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right — contact form */}
          <motion.div {...fadeUp(0.3)}>
            {status === "sent" ? (
              /* Success state */
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center gap-4">
                <span className="label text-accent">Mesajınız alındı</span>
                <p className="font-body text-xl text-text leading-relaxed">
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="label text-text-muted hover:text-text transition-colors duration-200 mt-4"
                  data-cursor-hover
                >
                  Tekrar gönder →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0" noValidate>

                {/* Name */}
                <div className="border-b border-border py-5 transition-colors duration-300 focus-within:border-accent/60">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Adınız"
                    data-cursor-hover
                    className="w-full bg-transparent font-body text-base text-text placeholder:text-text-muted/50 focus:outline-none"
                    aria-label="Adınız"
                  />
                </div>

                {/* Email */}
                <div className="border-b border-border py-5 transition-colors duration-300 focus-within:border-accent/60">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="E-posta adresiniz"
                    data-cursor-hover
                    className="w-full bg-transparent font-body text-base text-text placeholder:text-text-muted/50 focus:outline-none"
                    aria-label="E-posta adresiniz"
                  />
                </div>

                {/* Message */}
                <div className="border-b border-border py-5 transition-colors duration-300 focus-within:border-accent/60">
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Projenizi anlatın..."
                    data-cursor-hover
                    className="w-full resize-none bg-transparent font-body text-base text-text placeholder:text-text-muted/50 focus:outline-none"
                    aria-label="Proje açıklaması"
                  />
                </div>

                {/* Submit */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor-hover
                    className="
                      group relative overflow-hidden
                      font-label text-[0.6875rem] font-semibold tracking-[0.14em] uppercase
                      bg-accent text-canvas
                      px-8 py-4 rounded-full
                      transition-all duration-300
                      hover:bg-accent-dim
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {status === "sending" ? "Gönderiliyor…" : "Gönder →"}
                  </button>
                </div>

                {status === "error" && (
                  <p className="mt-4 font-body text-xs text-red-400">
                    Bir hata oluştu. Lütfen tekrar deneyin veya bize direkt e-posta gönderin.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
