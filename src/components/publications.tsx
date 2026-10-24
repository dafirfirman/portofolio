"use client";

import React, { useEffect, useRef, useState } from "react";
import { publicationsData, Publication } from "../data/projects";
import { Award, ArrowUpRight, ChevronDown, FileText } from "lucide-react";

interface PublicationsProps {
  lang?: "id" | "en";
  isDark?: boolean;
}

const COLLAPSED = 76;

const copy = {
  id: {
    label: "Riset akademis",
    title: "Riset & Publikasi",
    subtitle: "Karya ilmiah seputar rekayasa perangkat lunak, aplikasi mobile, dan machine learning yang telah dipublikasikan.",
    authors: "Penulis",
    abstract: "Abstrak",
    more: "Baca selengkapnya",
    less: "Tutup",
    scholar: "Lihat di Google Scholar",
  },
  en: {
    label: "Academic research",
    title: "Research & Publications",
    subtitle: "Scientific papers on software engineering, mobile applications, and machine learning that have been published.",
    authors: "Authors",
    abstract: "Abstract",
    more: "Read more",
    less: "Close",
    scholar: "View on Google Scholar",
  },
};

const Rise = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
};

const Abstract = ({ text, more, less }: { text: string; more: string; less: string }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(COLLAPSED);
  const [overflowing, setOverflowing] = useState(false);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = boxRef.current;
      if (!el) return;
      const h = el.scrollHeight;
      setFull(h);
      setOverflowing(h > COLLAPSED + 8);
      setMeasured(true);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text]);

  const collapsed = overflowing && !open;

  return (
    <div>
      <div className="relative">
        <div
          ref={boxRef}
          className="overflow-hidden"
          style={{
            maxHeight: !measured ? undefined : collapsed ? COLLAPSED : full,
            transition: "max-height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <p className="muted text-sm leading-relaxed">{text}</p>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--surface))",
            opacity: collapsed ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {overflowing && (
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="f-mono accent mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em]"
        >
          <span>{open ? less : more}</span>
          <ChevronDown size={14} className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
};

export function PublicationsSection({ lang = "id" }: PublicationsProps) {
  const c = copy[lang];

  if (publicationsData.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-28">
      <Rise>
        <p className="label">{c.label}</p>
        <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="f-display text-4xl font-bold leading-[1.02] sm:text-6xl">{c.title}</h2>
            <p className="muted mt-4 max-w-xl">{c.subtitle}</p>
          </div>
          <span className="chip w-fit">
            <Award size={14} className="accent" />
            <span>Google Scholar Indexed</span>
          </span>
        </div>
      </Rise>

      <div className="mt-14 space-y-6">
        {publicationsData.map((pub: Publication, idx: number) => (
          <Rise key={pub.id} delay={idx * 110}>
            <div className="transition-transform duration-500 hover:-translate-y-1">
              <article className="card group relative p-7 sm:p-9">
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <span
                  aria-hidden="true"
                  className="f-display pointer-events-none absolute right-6 top-3 select-none text-[6.5rem] font-extrabold leading-none opacity-[0.06]"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <span className="chip">
                    <FileText size={14} className="accent" />
                    <span>
                      {pub.journalName} · {pub.year}
                    </span>
                  </span>

                  <h3 className="f-display mt-6 max-w-3xl text-2xl font-bold leading-snug transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-3xl">
                    {pub.title}
                  </h3>

                  <p className="mt-4 text-sm">
                    <span className="label mr-2">{c.authors}</span>
                    <span className="muted">{pub.authors}</span>
                  </p>

                  <div className="mt-7 border-l-2 pl-5" style={{ borderColor: "var(--accent)" }}>
                    <span className="label mb-2 block">{c.abstract}</span>
                    <Abstract text={lang === "id" ? pub.abstract.id : pub.abstract.en} more={c.more} less={c.less} />
                  </div>

                  <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {pub.topics.map((topic: string, i: number) => (
                        <span key={`${topic}-${i}`} className="chip f-mono">
                          #{topic}
                        </span>
                      ))}
                    </div>
                    <a href={pub.scholarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-fit shrink-0">
                      <span>{c.scholar}</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </Rise>
        ))}
      </div>
    </div>
  );
}
