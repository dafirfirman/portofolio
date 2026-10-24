"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import type { IconType } from "react-icons";
import {
  ArrowRight, ArrowUpRight, Send, CheckCircle2, Menu, X,
  Sun, Moon, Download, Copy, AlertCircle, Code2
} from "lucide-react";
import {
  SiFlutter, SiDart, SiAndroidstudio, SiNextdotjs, SiReact,
  SiTypescript, SiJavascript, SiTailwindcss, SiHtml5,
  SiPhp, SiPython, SiMysql, SiPostgresql, SiFirebase,
  SiGit, SiGithub, SiPostman, SiFigma, SiScikitlearn
} from "react-icons/si";
import { FaLinkedin, FaYoutube, FaGithub, FaWhatsapp } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";

import { profileData } from "../data/profile";
import { projectsData, Project } from "../data/projects";
import { PublicationsSection } from "../components/publications";

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* ------------------------------------------------------------------ */
const fontDisplay = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const fontBody = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
const WA_NUMBER_INTL = "6281366451989";
const WA_NUMBER_DISPLAY = "0813-6645-1989";
const CV_PATH = "/CV-Firman-Damai-Zebua.pdf";

const waLink = (lang: "id" | "en") => {
  const text =
    lang === "id"
      ? "Halo Firman, saya melihat portofolio Anda dan ingin berdiskusi."
      : "Hi Firman, I saw your portfolio and would like to talk.";
  return `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(text)}`;
};

const TECH_ICONS: Record<string, IconType> = {
  flutter: SiFlutter,
  dart: SiDart,
  "android studio": SiAndroidstudio,
  "next.js": SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  "tailwind css": SiTailwindcss,
  "html/css": SiHtml5,
  php: SiPhp,
  python: SiPython,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  firebase: SiFirebase,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  figma: SiFigma,
  "scikit-learn": SiScikitlearn,
  "vs code": VscCode,
  "rest apis": TbApi,
};

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */
const TechChip = ({ name }: { name: string }) => {
  const Icon = TECH_ICONS[name.toLowerCase()];
  return (
    <span className="chip">
      {Icon ? <Icon size={14} /> : <Code2 size={14} />}
      <span>{name}</span>
    </span>
  );
};

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
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

const Tilt = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt ${className}`}>
      {children}
    </div>
  );
};

const Rotator = ({ words }: { words: string[] }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  const word = words[i % words.length];
  return (
    <span key={`${i}-${word}`} className="rot">
      {word}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* ID card                                                             */
/* ------------------------------------------------------------------ */
const BARS = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2];
const GRAVITY = 1900;
const ROPE_K = 2600;
const ROPE_DAMP = 22;
const AIR_DAMP = 1.1;

type IdCardProps = {
  name: string;
  role: string;
  location: string;
  photo: string;
  hint: string;
  backTitle: string;
  backLines: string[];
  cta: string;
};

const IdCard = ({ name, role, location, photo, hint, backTitle, backLines, cta }: IdCardProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<SVGPathElement>(null);
  const stitchRef = useRef<SVGPathElement>(null);
  const hookRef = useRef<SVGCircleElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);

  const sim = useRef({
    x: 0, y: 0, vx: 0, vy: 0,
    anchorY: -230, L: 300,
    dragging: false, started: false, visible: true, reduced: false,
    px: 0, py: 0, sx: 0, sy: 0, lx: 0, ly: 0, moved: 0,
  });

  useEffect(() => {
    const st = sim.current;
    const stage = stageRef.current;
    const card = cardRef.current;
    const strap = strapRef.current;
    const stitch = stitchRef.current;
    const hook = hookRef.current;
    if (!stage || !card || !strap || !stitch || !hook) return;

    const wide = window.matchMedia("(min-width: 1024px)");
    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setup = () => {
      st.anchorY = wide.matches ? -230 : -44;
      st.L = wide.matches ? 300 : 150;
      if (st.reduced) {
        st.x = 0;
        st.y = st.anchorY + st.L;
      } else {
        st.x = 30;
        st.y = st.anchorY + st.L * 0.35;
      }
      st.vx = 0;
      st.vy = 0;
    };
    setup();
    wide.addEventListener("change", setup);

    const io = new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
    });
    io.observe(stage);

    const startTimer = window.setTimeout(() => {
      st.started = true;
      stage.dataset.on = "1";
    }, 350);

    let raf = 0;
    let last = performance.now();
    let t = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!st.visible && !st.dragging) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      t += dt;
      const { anchorY, L } = st;

      if (st.dragging) {
        const phiNow = Math.atan2(st.x, st.y - anchorY);
        const th = -phiNow;
        const cos = Math.cos(th);
        const sin = Math.sin(th);
        const tx = st.px - (st.lx * cos - st.ly * sin);
        const ty = st.py - (st.lx * sin + st.ly * cos);
        const k = 1 - Math.exp(-dt * 28);
        let nx = st.x + (tx - st.x) * k;
        let ny = st.y + (ty - st.y) * k;
        const dx = nx;
        const dy = ny - anchorY;
        const d = Math.hypot(dx, dy);
        const max = L * 1.3;
        if (d > max) {
          nx = (dx / d) * max;
          ny = anchorY + (dy / d) * max;
        }
        const inv = 1 / Math.max(dt, 1e-4);
        st.vx = st.vx * 0.5 + (nx - st.x) * inv * 0.5;
        st.vy = st.vy * 0.5 + (ny - st.y) * inv * 0.5;
        st.x = nx;
        st.y = ny;
      } else if (st.started) {
        const steps = 4;
        const h = dt / steps;
        for (let i = 0; i < steps; i++) {
          const wind = st.reduced ? 0 : Math.sin(t * 0.9) * 40 + Math.sin(t * 0.37 + 1) * 25;
          let ax = wind;
          let ay = GRAVITY;
          const dx = st.x;
          const dy = st.y - anchorY;
          const d = Math.hypot(dx, dy) || 1;
          if (d > L) {
            const s = d - L;
            const nx = dx / d;
            const ny = dy / d;
            const vr = st.vx * nx + st.vy * ny;
            const f = -ROPE_K * s - ROPE_DAMP * vr;
            ax += nx * f;
            ay += ny * f;
          }
          ax -= AIR_DAMP * st.vx;
          ay -= AIR_DAMP * st.vy;
          st.vx += ax * h;
          st.vy += ay * h;
          st.x += st.vx * h;
          st.y += st.vy * h;
        }
      }

      const dx = st.x;
      const dy = st.y - anchorY;
      const d = Math.hypot(dx, dy) || 1;
      const phi = (Math.atan2(dx, dy) * 180) / Math.PI;
      card.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0) rotate(${(-phi).toFixed(2)}deg)`;

      const sag = Math.max(0, L - d) * 0.5;
      const path = `M0 ${anchorY} Q ${(st.x / 2).toFixed(2)} ${((anchorY + st.y) / 2 + sag).toFixed(2)} ${st.x.toFixed(2)} ${st.y.toFixed(2)}`;
      strap.setAttribute("d", path);
      stitch.setAttribute("d", path);
      hook.setAttribute("cy", String(anchorY));
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(startTimer);
      io.disconnect();
      wide.removeEventListener("change", setup);
    };
  }, []);

  const toStage = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - (r.left + r.width / 2), y: e.clientY - r.top };
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-nodrag]")) return;
    const st = sim.current;
    const p = toStage(e);
    e.currentTarget.setPointerCapture(e.pointerId);
    const th = -Math.atan2(st.x, st.y - st.anchorY);
    const cos = Math.cos(th);
    const sin = Math.sin(th);
    const rx = p.x - st.x;
    const ry = p.y - st.y;
    st.lx = rx * cos + ry * sin;
    st.ly = -rx * sin + ry * cos;
    st.px = p.x;
    st.py = p.y;
    st.sx = p.x;
    st.sy = p.y;
    st.moved = 0;
    st.vx = 0;
    st.vy = 0;
    st.dragging = true;
    if (tiltRef.current) tiltRef.current.style.transform = "";
    setDragging(true);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = sim.current;
    if (st.dragging) {
      const p = toStage(e);
      st.px = p.x;
      st.py = p.y;
      st.moved = Math.max(st.moved, Math.hypot(p.x - st.sx, p.y - st.sy));
      return;
    }
    if (e.pointerType !== "mouse" || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    tiltRef.current.style.transform = `rotateX(${((0.5 - ny) * 10).toFixed(2)}deg) rotateY(${((nx - 0.5) * 14).toFixed(2)}deg)`;
    if (sheetRef.current) {
      sheetRef.current.style.setProperty("--gx", `${(nx * 100).toFixed(1)}%`);
      sheetRef.current.style.setProperty("--gy", `${(ny * 100).toFixed(1)}%`);
    }
  };

  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = sim.current;
    if (!st.dragging) return;
    st.dragging = false;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const cap = 2500;
    st.vx = Math.max(-cap, Math.min(cap, st.vx));
    st.vy = Math.max(-cap, Math.min(cap, st.vy));
    if (st.moved < 6) {
      st.vx += 90;
      setFlipped((f) => !f);
    }
  };

  const onLeave = () => {
    if (tiltRef.current && !sim.current.dragging) tiltRef.current.style.transform = "";
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  return (
    <div ref={stageRef} className="idc-stage relative mx-auto h-[500px] w-full max-w-[460px] lg:h-[560px]">
      <svg className="pointer-events-none absolute left-1/2 top-0 overflow-visible" width="1" height="1" aria-hidden="true">
        <path ref={strapRef} fill="none" stroke="var(--accent)" strokeWidth="14" strokeLinecap="round" />
        <path ref={stitchRef} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" />
        <circle ref={hookRef} cx="0" r="6" fill="none" stroke="var(--muted)" strokeWidth="2" />
      </svg>

      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`${name}, ${role}`}
        className={`idc ${dragging ? "drag" : ""}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onLeave}
        onKeyDown={onKey}
      >
        <span className="idc-clip" />
        <div ref={tiltRef} className="idc-tilt">
          <div className={`idc-flip ${flipped ? "flipped" : ""}`}>
            <div className="idc-face idc-front">
              <div ref={sheetRef} className="idc-sheet">
                <svg className="absolute inset-x-0 top-0 w-full" viewBox="0 0 222 150" aria-hidden="true">
                  <path d="M0 0H222V74C176 112 122 78 72 104C44 118 20 118 0 108Z" fill="var(--accent)" />
                  <path d="M0 0H222V46C164 88 104 50 0 92Z" fill="rgba(0,0,0,0.16)" />
                </svg>
                <span className="idc-slot" />
                <span className="f-display absolute left-4 top-7 text-[15px] font-bold text-white">
                  Firman<span style={{ color: "#150a05" }}>.</span>
                </span>
                <div className="idc-photo">
                  <Image src={photo} alt={name} fill sizes="120px" draggable={false} className="object-cover" />
                </div>
                <div className="absolute inset-x-4 top-[184px] text-center">
                  <p className="f-display text-[19px] font-extrabold leading-tight">{name}</p>
                  <p className="f-mono mt-1.5 text-[10px] uppercase tracking-[0.14em]" style={{ color: "#5f5c52" }}>
                    {role}
                  </p>
                </div>
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <span className="f-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#5f5c52" }}>
                    {location}
                  </span>
                  <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
                    {BARS.map((w, i) => (
                      <span key={i} style={{ width: w, height: i % 3 === 0 ? "100%" : "78%", background: "#14140f" }} />
                    ))}
                  </span>
                </div>
                <span className="idc-glare" />
              </div>
            </div>

            <div className="idc-face idc-back">
              <div className="idc-sheet idc-sheet-dark">
                <span className="idc-slot idc-slot-dark" />
                <div className="absolute inset-x-5 top-12">
                  <p className="f-mono accent text-[10px] uppercase tracking-[0.16em]">{backTitle}</p>
                  <ul className="mt-4 space-y-3">
                    {backLines.map((line) => (
                      <li key={line} className="flex gap-2.5 text-[13px] leading-snug">
                        <span className="accent">—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#contact" data-nodrag className="btn btn-primary absolute inset-x-5 bottom-5" style={{ padding: "0.65rem 1rem" }}>
                  {cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="label absolute inset-x-0 bottom-0 text-center">{hint}</p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Modal scroll helper                                                 */
/* ------------------------------------------------------------------ */
const syncScroll = (el: HTMLDivElement | null, bar: HTMLDivElement | null) => {
  if (!el) return;
  const max = el.scrollHeight - el.clientHeight;
  const top = el.scrollTop;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, top / max) : 0})`;
  el.style.setProperty("--mt", top > 4 ? "32px" : "0px");
  el.style.setProperty("--mb", max - top > 4 ? "32px" : "0px");
};

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */
const t = {
  id: {
    nav: { about: "Tentang", skills: "Skill", projects: "Proyek", publications: "Publikasi", journey: "Perjalanan", services: "Layanan", contact: "Kontak" },
    hero: {
      role: "Web & Mobile Developer",
      status: "Terbuka untuk posisi web & mobile developer",
      lead: "Saya membangun",
      phrases: ["aplikasi mobile.", "website modern.", "API yang andal."],
      bio: "Dari antarmuka sampai API dan database. Saya mengerjakan aplikasi dengan Flutter dan Next.js, sambil mengajar pemrograman di SMK dan menyelesaikan S2 Teknik Informatika.",
      explore: "Lihat proyek",
      chatWA: "Chat WhatsApp",
      downloadCV: "Unduh CV",
      cardHint: "Tarik kartunya, ketuk untuk membalik",
      cardBackTitle: "Tentang saya",
      cardBackLines: ["S2 Teknik Informatika, USU", "Guru Koding & AI di SMK", "Flutter, Next.js, REST API"],
      cardCta: "Hubungi saya",
    },
    about: {
      label: "Tentang",
      title: "Developer yang juga mengajar dan meneliti.",
      desc1: "Saya lulusan S1 Universitas Katolik Santo Thomas dan sedang menempuh S2 Teknik Informatika di Universitas Sumatera Utara, dengan riset machine learning untuk deteksi serangan DDoS.",
      desc2: "Sehari-hari saya mengajar Koding, Kecerdasan Artifisial, dan Pemrograman Dasar di SMK Swasta Yapim Biru-Biru. Di luar kelas, saya membangun aplikasi mobile dan web sampai benar-benar live.",
      downloadCVBtn: "Unduh CV lengkap",
      facts: [
        { k: "Sekarang", v: "Guru SMK dan mahasiswa S2 di USU" },
        { k: "Fokus kerja", v: "Flutter, Next.js, dan REST API" },
        { k: "Riset", v: "Machine learning untuk keamanan jaringan" },
      ],
    },
    skills: {
      label: "Skill",
      title: "Stack yang saya pakai sehari-hari.",
      subtitle: "Alat yang saya pakai untuk membangun aplikasi mobile dan web, dari tampilan sampai server.",
      groups: [
        { title: "Mobile", note: "Aplikasi lintas platform", items: ["Flutter", "Dart"] },
        { title: "Web", note: "Antarmuka cepat dan responsif", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { title: "Backend & Data", note: "API dan penyimpanan data", items: ["PHP", "REST APIs", "MySQL", "Firebase"] },
        { title: "Pendukung", note: "Alur kerja dan otomasi", items: ["Git", "GitHub", "Python"] },
      ],
    },
    projects: {
      label: "Proyek",
      title: "Karya terpilih",
      subtitle: "Aplikasi mobile, sistem full-stack, dan alat belajar berbasis web.",
      sourceCode: "Kode sumber",
      liveDemo: "Lihat demo",
      detail: "Lihat detail",
    },
    modal: { overview: "Gambaran", problem: "Masalah", solution: "Solusi", features: "Fitur utama", tech: "Teknologi" },
    journey: {
      label: "Perjalanan",
      title: "Pengalaman dan pendidikan.",
      items: [
        { role: "Guru SMK", org: "SMK Swasta Yapim Biru-Biru", period: "2026 – Sekarang", desc: "Mengajar Koding, Kecerdasan Artifisial, dan Pemrograman Dasar, lengkap dengan materi dan demo praktik yang saya buat sendiri.", logo: "/yapim.png" },
        { role: "S2 Teknik Informatika", org: "Universitas Sumatera Utara (USU)", period: "2025 – Sekarang", desc: "Meneliti machine learning untuk deteksi serangan DDoS dengan fokus generalisasi lintas dataset.", logo: "/usu.png" },
        { role: "S1 Teknik Informatika (S.Kom.)", org: "Universitas Katolik Santo Thomas", period: "Lulus", desc: "Dasar rekayasa perangkat lunak, algoritma, basis data, dan pengembangan full-stack.", logo: "/unika.png" },
        { role: "Freelance Developer", org: "Mobile & Web", period: "Berjalan", desc: "Membangun aplikasi mobile, sistem berbasis REST API, dan dasbor web untuk kebutuhan sekolah dan bisnis.", logo: "/freelancer-svgrepo-com.svg" },
      ],
    },
    services: {
      label: "Layanan",
      title: "Yang bisa saya kerjakan.",
      items: [
        { title: "Aplikasi Mobile", desc: "Aplikasi Android dan iOS dengan satu basis kode Flutter, termasuk integrasi pembayaran, peta, dan notifikasi.", tags: "Flutter · Dart" },
        { title: "Website & Web App", desc: "Landing page sampai aplikasi web penuh yang cepat, responsif, dan rapi di semua ukuran layar.", tags: "Next.js · React · Tailwind" },
        { title: "Backend & REST API", desc: "API, database, dan sistem admin yang menopang aplikasi Anda agar stabil dan mudah dikembangkan.", tags: "PHP · MySQL · Firebase" },
      ],
    },
    contact: {
      label: "Kontak",
      title: "Punya proyek? Ayo ngobrol.",
      subtitle: "Kirim pesan lewat form atau langsung hubungi lewat WhatsApp.",
      waTitle: "Lewat WhatsApp",
      waDesc: "Respon paling cepat ada di sini.",
      chatWABtn: "Buka WhatsApp",
      copyWA: "Salin nomor",
      copiedWA: "Tersalin",
      nameLabel: "Nama",
      namePlaceholder: "Nama lengkap Anda",
      emailLabel: "Email",
      emailPlaceholder: "nama@email.com",
      subjectLabel: "Subjek",
      subjectPlaceholder: "Kerja sama proyek / lowongan",
      messageLabel: "Pesan",
      messagePlaceholder: "Ceritakan kebutuhan, jadwal, atau pertanyaan Anda...",
      sendBtn: "Kirim pesan",
      sending: "Mengirim...",
      successTitle: "Pesan terkirim",
      successDesc: "Terima kasih. Pesan Anda sudah saya terima dan akan segera saya balas.",
      sendAnother: "Kirim pesan lain",
      netError: "Terjadi gangguan jaringan.",
      failError: "Gagal mengirim pesan. Silakan coba lagi.",
    },
  },
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", publications: "Publications", journey: "Journey", services: "Services", contact: "Contact" },
    hero: {
      role: "Web & Mobile Developer",
      status: "Open to web & mobile developer roles",
      lead: "I build",
      phrases: ["mobile apps.", "modern websites.", "reliable APIs."],
      bio: "From interface to API and database. I work on apps with Flutter and Next.js, while teaching programming at a vocational school and finishing my Master's in Informatics.",
      explore: "See projects",
      chatWA: "Chat on WhatsApp",
      downloadCV: "Download CV",
      cardHint: "Drag the card, tap to flip it",
      cardBackTitle: "About me",
      cardBackLines: ["M.Sc. Informatics, USU", "Coding & AI teacher at a vocational school", "Flutter, Next.js, REST APIs"],
      cardCta: "Contact me",
    },
    about: {
      label: "About",
      title: "A developer who also teaches and researches.",
      desc1: "I hold a Bachelor's from Universitas Katolik Santo Thomas and I'm pursuing a Master's in Informatics at Universitas Sumatera Utara, researching machine learning for DDoS attack detection.",
      desc2: "Day to day I teach Coding, Artificial Intelligence, and Basic Programming at SMK Swasta Yapim Biru-Biru. Outside the classroom, I build mobile and web apps all the way to production.",
      downloadCVBtn: "Download full CV",
      facts: [
        { k: "Right now", v: "Vocational teacher and Master's student at USU" },
        { k: "Work focus", v: "Flutter, Next.js, and REST APIs" },
        { k: "Research", v: "Machine learning for network security" },
      ],
    },
    skills: {
      label: "Skills",
      title: "The stack I use every day.",
      subtitle: "The tools I build mobile and web apps with, from the screen to the server.",
      groups: [
        { title: "Mobile", note: "Cross-platform apps", items: ["Flutter", "Dart"] },
        { title: "Web", note: "Fast, responsive interfaces", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { title: "Backend & Data", note: "APIs and data storage", items: ["PHP", "REST APIs", "MySQL", "Firebase"] },
        { title: "Support", note: "Workflow and automation", items: ["Git", "GitHub", "Python"] },
      ],
    },
    projects: {
      label: "Projects",
      title: "Selected work",
      subtitle: "Mobile apps, full-stack systems, and web-based learning tools.",
      sourceCode: "Source code",
      liveDemo: "Live demo",
      detail: "View details",
    },
    modal: { overview: "Overview", problem: "Problem", solution: "Solution", features: "Key features", tech: "Technologies" },
    journey: {
      label: "Journey",
      title: "Experience and education.",
      items: [
        { role: "Vocational School Teacher", org: "SMK Swasta Yapim Biru-Biru", period: "2026 – Present", desc: "Teaching Coding, Artificial Intelligence, and Basic Programming, with hands-on materials and demos I build myself.", logo: "/yapim.png" },
        { role: "M.Sc. in Informatics", org: "Universitas Sumatera Utara (USU)", period: "2025 – Present", desc: "Researching machine learning for DDoS attack detection, focused on cross-dataset generalization.", logo: "/usu.png" },
        { role: "B.Sc. in Informatics (S.Kom.)", org: "Universitas Katolik Santo Thomas", period: "Graduated", desc: "Foundations in software engineering, algorithms, databases, and full-stack development.", logo: "/unika.png" },
        { role: "Freelance Developer", org: "Mobile & Web", period: "Ongoing", desc: "Building mobile apps, REST API based systems, and web dashboards for schools and businesses.", logo: "/freelancer-svgrepo-com.svg" },
      ],
    },
    services: {
      label: "Services",
      title: "What I can build for you.",
      items: [
        { title: "Mobile Apps", desc: "Android and iOS apps from a single Flutter codebase, including payments, maps, and notifications.", tags: "Flutter · Dart" },
        { title: "Websites & Web Apps", desc: "From landing pages to full web apps that are fast, responsive, and tidy on every screen.", tags: "Next.js · React · Tailwind" },
        { title: "Backend & REST APIs", desc: "The APIs, databases, and admin systems that keep your app stable and easy to extend.", tags: "PHP · MySQL · Firebase" },
      ],
    },
    contact: {
      label: "Contact",
      title: "Got a project? Let's talk.",
      subtitle: "Send a message through the form or reach me directly on WhatsApp.",
      waTitle: "Via WhatsApp",
      waDesc: "The fastest way to reach me.",
      chatWABtn: "Open WhatsApp",
      copyWA: "Copy number",
      copiedWA: "Copied",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Project collaboration / job opening",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your needs, timeline, or questions...",
      sendBtn: "Send message",
      sending: "Sending...",
      successTitle: "Message sent",
      successDesc: "Thank you. I've received your message and will reply shortly.",
      sendAnother: "Send another message",
      netError: "A network error occurred.",
      failError: "Failed to send message. Please try again.",
    },
  },
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Home() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [lang, setLang] = useState<"id" | "en">("id");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" });

  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const modalBarRef = useRef<HTMLDivElement>(null);

  const c = t[lang];
  const categories: string[] = ["All Projects", "Mobile Applications", "Web Development", "Full-Stack"];
  const filteredProjects: Project[] =
    activeCategory === "All Projects" ? projectsData : projectsData.filter((p: Project) => p.category === activeCategory);
  const marqueeItems = c.skills.groups.flatMap((g) => g.items);
  const navKeys = ["about", "skills", "projects", "publications", "journey", "services"] as const;

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => syncScroll(modalBodyRef.current, modalBarRef.current));
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setFormStatus("error");
        setErrorMessage(data.error || c.contact.failError);
      }
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setErrorMessage(c.contact.netError);
    }
  };

  const handleCopyWA = () => {
    navigator.clipboard.writeText("081366451989");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="top"
      ref={rootRef}
      onMouseMove={onMouseMove}
      data-theme={isDark ? "dark" : "light"}
      className={`pf ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} min-h-screen`}
    >
      <style jsx global>{`
        .pf[data-theme="dark"] {
          --bg: #0c0c0b;
          --surface: #141413;
          --fg: #eceae2;
          --muted: #9a988f;
          --line: rgba(236, 234, 226, 0.13);
          --accent: #ff5a1f;
        }
        .pf[data-theme="light"] {
          --bg: #f3f1ea;
          --surface: #fbfaf6;
          --fg: #14140f;
          --muted: #5f5c52;
          --line: rgba(20, 20, 15, 0.15);
          --accent: #ff5a1f;
        }
        html { scroll-behavior: smooth; }
        .pf {
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-body), system-ui, sans-serif;
          transition: background 0.4s ease, color 0.4s ease;
          position: relative;
          overflow-x: hidden;
        }
        .pf ::selection { background: var(--accent); color: #150a05; }
        .f-display { font-family: var(--font-display), sans-serif; letter-spacing: -0.035em; }
        .f-mono { font-family: var(--font-mono), monospace; }
        .muted { color: var(--muted); }
        .accent { color: var(--accent); }
        .hair { border-color: var(--line); }
        .surface { background: var(--surface); }
        .label {
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .progress {
          position: fixed; top: 0; left: 0; width: 100%; height: 2px;
          background: var(--accent); transform-origin: 0 50%; transform: scaleX(0); z-index: 70;
        }
        .glow {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(520px circle at var(--mx, 60%) var(--my, 25%),
            color-mix(in srgb, var(--accent) 11%, transparent), transparent 62%);
        }
        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.05;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        @media (hover: none) { .glow { display: none; } }

        .nav-blur {
          background: color-mix(in srgb, var(--bg) 78%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .nav-link { position: relative; padding: 0.25rem 0; transition: color 0.2s; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -2px; height: 1px; width: 100%;
          background: var(--accent); transform: scaleX(0); transform-origin: 0 50%; transition: transform 0.3s ease;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-link:hover::after { transform: scaleX(1); }

        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.85rem 1.4rem; border-radius: 999px; font-size: 0.875rem; font-weight: 600;
          transition: transform 0.25s ease, background 0.25s, border-color 0.25s, color 0.25s;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary { background: var(--accent); color: #150a05; }
        .btn-primary:hover { background: color-mix(in srgb, var(--accent) 88%, white); }
        .btn-ghost { border: 1px solid var(--line); color: var(--fg); }
        .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
        .icon-btn {
          width: 2.4rem; height: 2.4rem; border-radius: 999px; border: 1px solid var(--line);
          display: inline-flex; align-items: center; justify-content: center; transition: border-color 0.2s, color 0.2s;
        }
        .icon-btn:hover { border-color: var(--accent); color: var(--accent); }

        .chip {
          display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.38rem 0.75rem;
          border: 1px solid var(--line); border-radius: 999px; font-size: 0.78rem;
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .chip:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

        .line { display: block; overflow: hidden; padding-bottom: 0.08em; }
        .line > span {
          display: block; transform: translateY(112%);
          animation: rise 0.95s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: var(--d, 0s);
        }
        .fade-up { opacity: 0; transform: translateY(18px); animation: fadeUp 0.9s ease forwards; animation-delay: var(--d, 0s); }
        .rot {
          display: inline-block; color: var(--accent);
          animation: rotIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
          text-decoration: underline; text-decoration-thickness: 0.06em; text-underline-offset: 0.12em;
          text-decoration-color: color-mix(in srgb, var(--accent) 45%, transparent);
        }
        @keyframes rise { to { transform: translateY(0); } }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes rotIn { from { opacity: 0; transform: translateY(0.5em); filter: blur(6px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes pulseDot { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); } 100% { box-shadow: 0 0 0 10px transparent; } }

        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        .dot-live { width: 8px; height: 8px; border-radius: 999px; background: var(--accent); animation: pulseDot 1.6s infinite; }
        .marquee { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .marquee-track { display: flex; width: max-content; animation: marquee 34s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        .marquee-item { display: inline-flex; align-items: center; gap: 1.1rem; padding: 1.1rem 1.1rem 1.1rem 0; white-space: nowrap; }

        .idc-stage .idc, .idc-stage svg { opacity: 0; transition: opacity 0.4s ease; }
        .idc-stage[data-on="1"] .idc, .idc-stage[data-on="1"] svg { opacity: 1; }
        .idc {
          position: absolute; left: 50%; top: 0; width: 240px; height: 340px; margin-left: -120px;
          transform-origin: 50% 0; perspective: 1000px; touch-action: none; cursor: grab;
          user-select: none; -webkit-user-select: none; z-index: 2; will-change: transform; outline: none;
        }
        .idc.drag { cursor: grabbing; }
        .idc:focus-visible .idc-front { box-shadow: 0 0 0 2px var(--accent); }
        .idc-clip {
          position: absolute; left: 50%; top: -16px; width: 34px; height: 30px; margin-left: -17px; z-index: 3;
          border-radius: 9px 9px 6px 6px; background: linear-gradient(#d4d5d8, #85878d);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.35);
        }
        .idc-clip::after {
          content: ""; position: absolute; left: 50%; top: 6px; width: 10px; height: 10px; margin-left: -5px;
          border-radius: 50%; background: #2a2a2d;
        }
        .idc-tilt { width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.2s ease-out; }
        .idc-flip { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .idc-flip.flipped { transform: rotateY(180deg); }
        .idc-face {
          position: absolute; inset: 0; padding: 9px; border-radius: 22px; background: #18181b;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
          box-shadow: 0 30px 60px -22px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }
        .idc-back { transform: rotateY(180deg); }
        .idc-sheet { position: relative; width: 100%; height: 100%; border-radius: 15px; background: #f6f3ec; color: #14140f; overflow: hidden; }
        .idc-sheet-dark { background: #0e0e10; color: #eceae2; }
        .idc-sheet-dark::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 5px; background: var(--accent); }
        .idc-slot { position: absolute; top: 10px; left: 50%; width: 54px; height: 7px; margin-left: -27px; border-radius: 99px; background: #18181b; z-index: 2; }
        .idc-slot-dark { background: #000; }
        .idc-photo {
          position: absolute; top: 54px; left: 50%; width: 116px; height: 116px; margin-left: -58px;
          border-radius: 50%; overflow: hidden; border: 4px solid #f6f3ec; box-shadow: 0 0 0 2px var(--accent);
        }
        .idc-glare {
          position: absolute; inset: 0; pointer-events: none; opacity: 0; mix-blend-mode: soft-light; transition: opacity 0.3s ease;
          background: radial-gradient(260px circle at var(--gx, 50%) var(--gy, 0%), rgba(255, 255, 255, 0.55), transparent 55%);
        }
        .idc:hover .idc-glare { opacity: 1; }
        .tilt { transition: transform 0.25s ease; will-change: transform; transform-style: preserve-3d; }

        .card { border: 1px solid var(--line); background: var(--surface); border-radius: 1.5rem; overflow: hidden; transition: border-color 0.3s; }
        .card:hover { border-color: var(--accent); }
        .card-img img { transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .card:hover .card-img img { transform: scale(1.05); }

        .row { border-top: 1px solid var(--line); transition: background 0.3s, padding 0.3s; }
        .row:last-child { border-bottom: 1px solid var(--line); }
        .row:hover { background: color-mix(in srgb, var(--accent) 6%, transparent); padding-left: 1rem; padding-right: 1rem; }
        .row .arrow { transition: transform 0.3s ease, color 0.3s; }
        .row:hover .arrow { transform: rotate(45deg); color: var(--accent); }

        .field {
          width: 100%; background: transparent; border: 0; border-bottom: 1px solid var(--line);
          padding: 0.8rem 0; font-size: 0.95rem; color: var(--fg); outline: none; transition: border-color 0.25s;
        }
        .field::placeholder { color: var(--muted); opacity: 0.7; }
        .field:focus { border-bottom-color: var(--accent); }

        .timeline { position: relative; }
        .timeline::before { content: ""; position: absolute; left: 6px; top: 8px; bottom: 8px; width: 1px; background: var(--line); }
        .timeline-dot { position: absolute; left: 0; top: 9px; width: 13px; height: 13px; border-radius: 999px; background: var(--bg); border: 2px solid var(--accent); }

        .modal-overlay { overscroll-behavior: contain; animation: overlayIn 0.3s ease both; }
        .modal-panel {
          position: relative; display: flex; flex-direction: column; width: 100%; max-width: 42rem; max-height: 90vh;
          animation: modalIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .modal-body {
          overflow-y: auto; overscroll-behavior: contain; scroll-behavior: smooth;
          scrollbar-width: none; -ms-overflow-style: none;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 var(--mt, 0px), #000 calc(100% - var(--mb, 32px)), transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0, #000 var(--mt, 0px), #000 calc(100% - var(--mb, 32px)), transparent 100%);
        }
        .modal-body::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .modal-progress {
          position: absolute; left: 0; right: 0; top: 0; height: 2px; z-index: 5;
          background: var(--accent); transform-origin: 0 50%; transform: scaleX(0);
        }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(18px) scale(0.96); } to { opacity: 1; transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .pf *, .pf *::before, .pf *::after { animation: none !important; transition: none !important; }
          .line > span, .fade-up, .reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div ref={barRef} className="progress" />
      <div className="glow" />
      <div className="grain" />

      {/* NAV */}
      <header className="nav-blur hair fixed top-0 inset-x-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="f-display text-xl font-bold">
            Firman<span className="accent">.</span>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm muted">
            {navKeys.map((k) => (
              <a key={k} href={`#${k}`} className="nav-link">
                {c.nav[k]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsDark(!isDark)} className="icon-btn" aria-label="Toggle theme">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="hair f-mono flex items-center rounded-full border p-0.5 text-xs">
              {(["id", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="rounded-full px-2.5 py-1.5 font-semibold uppercase transition-colors"
                  style={lang === l ? { background: "var(--accent)", color: "#150a05" } : { color: "var(--muted)" }}
                >
                  {l}
                </button>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary hidden sm:inline-flex" style={{ padding: "0.6rem 1.1rem" }}>
              {c.nav.contact}
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="icon-btn lg:hidden" aria-label="Menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 px-6 pt-24 pb-10 flex flex-col gap-5" style={{ background: "var(--bg)" }}>
          {navKeys.map((k) => (
            <a key={k} href={`#${k}`} onClick={() => setMenuOpen(false)} className="f-display text-4xl font-bold">
              {c.nav[k]}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="f-display text-4xl font-bold accent">
            {c.nav.contact}
          </a>
        </div>
      )}

      <main className="relative z-10">
        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-44 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="fade-up hair inline-flex items-center gap-2.5 rounded-full border px-4 py-2" style={{ ["--d" as string]: "0.1s" }}>
                <span className="dot-live" />
                <span className="f-mono text-xs muted">{c.hero.status}</span>
              </div>

              <p className="fade-up label mt-8" style={{ ["--d" as string]: "0.2s" }}>
                {profileData.fullName} — {c.hero.role}
              </p>

              <h1 className="f-display mt-4 font-extrabold leading-[0.98] text-[clamp(2.6rem,6.6vw,5.8rem)]">
                <span className="line">
                  <span style={{ ["--d" as string]: "0.25s" }}>{c.hero.lead}</span>
                </span>
                <span className="line">
                  <span style={{ ["--d" as string]: "0.4s" }}>
                    <Rotator words={c.hero.phrases} />
                  </span>
                </span>
              </h1>

              <p className="fade-up muted mt-8 max-w-xl text-lg leading-relaxed" style={{ ["--d" as string]: "0.7s" }}>
                {c.hero.bio}
              </p>

              <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "0.85s" }}>
                <a href="#projects" className="btn btn-primary">
                  <span>{c.hero.explore}</span>
                  <ArrowRight size={16} />
                </a>
                <a href={waLink(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <FaWhatsapp size={16} />
                  <span>{c.hero.chatWA}</span>
                </a>
                <a href={CV_PATH} download className="btn btn-ghost">
                  <Download size={15} />
                  <span>{c.hero.downloadCV}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <IdCard
                name={profileData.fullName}
                role={c.hero.role}
                location={profileData.location}
                photo="/new-profile.jpeg"
                hint={c.hero.cardHint}
                backTitle={c.hero.cardBackTitle}
                backLines={c.hero.cardBackLines}
                cta={c.hero.cardCta}
              />
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="marquee-item f-display text-2xl font-semibold">
                <span>{item}</span>
                <span className="accent">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="py-28">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14">
            <Reveal className="lg:col-span-6">
              <p className="label">(01) {c.about.label}</p>
              <h2 className="f-display mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]">{c.about.title}</h2>
              <div className="muted mt-7 space-y-4 text-base leading-relaxed max-w-xl">
                <p>{c.about.desc1}</p>
                <p>{c.about.desc2}</p>
              </div>
              <a href={CV_PATH} download className="btn btn-ghost mt-8">
                <Download size={15} />
                <span>{c.about.downloadCVBtn}</span>
              </a>
            </Reveal>

            <Reveal className="lg:col-span-6 lg:pt-12" delay={150}>
              <div>
                {c.about.facts.map((f, i) => (
                  <div key={f.k} className="row grid grid-cols-12 gap-4 py-6 items-baseline">
                    <span className="f-mono accent col-span-2 text-xs">0{i + 1}</span>
                    <span className="label col-span-3">{f.k}</span>
                    <span className="f-display col-span-7 text-lg font-semibold leading-snug">{f.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="hair border-y py-28">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <p className="label">(02) {c.skills.label}</p>
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                <h2 className="f-display lg:col-span-7 text-4xl sm:text-5xl font-bold leading-[1.05]">{c.skills.title}</h2>
                <p className="muted lg:col-span-5 max-w-md">{c.skills.subtitle}</p>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.skills.groups.map((g, i) => (
                <Reveal key={g.title} delay={i * 90}>
                  <div className="card h-full p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="f-display text-2xl font-bold">{g.title}</h3>
                        <p className="muted mt-1 text-sm">{g.note}</p>
                      </div>
                      <span className="f-mono accent text-xs">0{i + 1}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <TechChip key={item} name={item} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-28">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <p className="label">(03) {c.projects.label}</p>
              <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div>
                  <h2 className="f-display text-4xl sm:text-6xl font-bold leading-[1.02]">{c.projects.title}</h2>
                  <p className="muted mt-4 max-w-lg">{c.projects.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="f-mono rounded-full border px-4 py-2 text-xs transition-colors"
                      style={
                        activeCategory === cat
                          ? { background: "var(--accent)", color: "#150a05", borderColor: "var(--accent)" }
                          : { borderColor: "var(--line)", color: "var(--muted)" }
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div key={activeCategory} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-7">
              {filteredProjects.map((project: Project, idx: number) => (
                <Reveal key={project.id} delay={(idx % 2) * 90 + Math.floor(idx / 2) * 60}>
                  <Tilt className="h-full">
                    <article className="card flex h-full flex-col">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="card-img hair relative block aspect-[16/11] w-full overflow-hidden border-b text-left"
                        aria-label={`${c.projects.detail}: ${project.title[lang]}`}
                      >
                        <Image
                          src={project.image}
                          alt={project.title[lang]}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <span className="f-mono absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] text-white" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
                          {project.category}
                        </span>
                      </button>

                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="f-display text-2xl font-bold leading-tight">{project.title[lang]}</h3>
                          <span className="f-mono accent mt-1 text-xs">{String(idx + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="muted mt-3 line-clamp-2 text-sm leading-relaxed">{project.shortDescription[lang]}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((tech: string) => (
                            <TechChip key={tech} name={tech} />
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="chip muted">+{project.technologies.length - 5}</span>
                          )}
                        </div>

                        <div className="mt-auto flex flex-wrap items-center gap-5 pt-7 text-sm font-semibold">
                          <button onClick={() => setSelectedProject(project)} className="inline-flex items-center gap-1.5 hover:accent">
                            {c.projects.detail} <ArrowRight size={14} />
                          </button>
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="accent inline-flex items-center gap-1">
                              {c.projects.liveDemo} <ArrowUpRight size={14} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="muted inline-flex items-center gap-1.5 transition-colors hover:text-[var(--fg)]">
                              <FaGithub size={14} /> {c.projects.sourceCode}
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section id="publications" className="hair border-t">
          <PublicationsSection lang={lang} isDark={isDark} />
        </section>

        {/* JOURNEY */}
        <section id="journey" className="hair border-t py-28">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <p className="label">(04) {c.journey.label}</p>
              <h2 className="f-display mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]">{c.journey.title}</h2>
            </Reveal>

            <div className="timeline mt-14 space-y-12">
              {c.journey.items.map((item, i) => (
                <Reveal key={item.role} delay={i * 80}>
                  <div className="relative pl-10">
                    <span className="timeline-dot" />
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="f-mono accent text-xs">{item.period}</span>
                    </div>
                    <div className="mt-2 flex items-start gap-4">
                      <div className="hair surface flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border p-2">
                        <Image src={item.logo} alt={item.org} width={36} height={36} className="object-contain" />
                      </div>
                      <div>
                        <h3 className="f-display text-xl font-bold leading-tight">{item.role}</h3>
                        <p className="muted text-sm">{item.org}</p>
                      </div>
                    </div>
                    <p className="muted mt-3 max-w-xl text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="hair border-t py-28">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <p className="label">(05) {c.services.label}</p>
              <h2 className="f-display mt-5 text-4xl sm:text-5xl font-bold leading-[1.05]">{c.services.title}</h2>
            </Reveal>

            <Reveal className="mt-12" delay={120}>
              <div>
                {c.services.items.map((s, i) => (
                  <div key={s.title} className="row grid grid-cols-12 items-center gap-4 py-8">
                    <span className="f-mono accent col-span-2 text-xs md:col-span-1">0{i + 1}</span>
                    <h3 className="f-display col-span-10 text-2xl font-bold sm:text-3xl md:col-span-4">{s.title}</h3>
                    <p className="muted col-span-10 col-start-3 text-sm leading-relaxed md:col-span-5 md:col-start-auto">{s.desc}</p>
                    <div className="col-span-12 flex items-center justify-between md:col-span-2 md:justify-end md:gap-4">
                      <span className="f-mono muted text-[11px] md:hidden">{s.tags}</span>
                      <ArrowUpRight size={22} className="arrow" />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="hair border-t py-28">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <Reveal className="lg:col-span-5">
              <p className="label">(06) {c.contact.label}</p>
              <h2 className="f-display mt-5 text-4xl sm:text-6xl font-bold leading-[1.02]">{c.contact.title}</h2>
              <p className="muted mt-5 max-w-sm">{c.contact.subtitle}</p>

              <div className="card mt-9 p-6">
                <div className="flex items-center gap-2 font-semibold">
                  <FaWhatsapp size={20} className="accent" />
                  <span>{c.contact.waTitle}</span>
                </div>
                <p className="muted mt-1 text-sm">{c.contact.waDesc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="f-mono text-base font-semibold">{WA_NUMBER_DISPLAY}</span>
                  <button onClick={handleCopyWA} className="chip">
                    <Copy size={12} />
                    <span>{copied ? c.contact.copiedWA : c.contact.copyWA}</span>
                  </button>
                </div>
                <a href={waLink(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full">
                  <FaWhatsapp size={16} />
                  <span>{c.contact.chatWABtn}</span>
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={150}>
              {formStatus === "success" ? (
                <div className="card flex h-full flex-col items-center justify-center gap-4 p-12 text-center">
                  <CheckCircle2 size={44} className="accent" />
                  <h3 className="f-display text-3xl font-bold">{c.contact.successTitle}</h3>
                  <p className="muted max-w-sm">{c.contact.successDesc}</p>
                  <button onClick={() => setFormStatus("idle")} className="btn btn-ghost mt-2">
                    {c.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {formStatus === "error" && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-500">
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <label className="block">
                      <span className="label">{c.contact.nameLabel}</span>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={c.contact.namePlaceholder}
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <span className="label">{c.contact.emailLabel}</span>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={c.contact.emailPlaceholder}
                        className="field"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="label">{c.contact.subjectLabel}</span>
                    <input
                      type="text"
                      required
                      maxLength={150}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={c.contact.subjectPlaceholder}
                      className="field"
                    />
                  </label>

                  <label className="block">
                    <span className="label">{c.contact.messageLabel}</span>
                    <textarea
                      required
                      rows={4}
                      maxLength={3000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={c.contact.messagePlaceholder}
                      className="field resize-none"
                    />
                  </label>

                  <button type="submit" disabled={formStatus === "submitting"} className="btn btn-primary disabled:opacity-50">
                    {formStatus === "submitting" ? (
                      <span>{c.contact.sending}</span>
                    ) : (
                      <>
                        <span>{c.contact.sendBtn}</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="hair relative z-10 border-t py-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 px-6 text-sm md:flex-row">
          <div className="flex items-center gap-3 muted">
            <span className="f-display text-base font-bold" style={{ color: "var(--fg)" }}>
              Firman<span className="accent">.</span>
            </span>
            <span>© {new Date().getFullYear()} Firman Damai Zebua</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={waLink(lang)} target="_blank" rel="noopener noreferrer" className="icon-btn" title="WhatsApp">
              <FaWhatsapp size={16} />
            </a>
            <a href="https://github.com/dafirfirman" target="_blank" rel="noreferrer" className="icon-btn" title="GitHub">
              <FaGithub size={16} />
            </a>
            <a href="https://https://www.linkedin.com/in/firman-damai-zebua-87a113328/?isSelfProfile=true" target="_blank" rel="noreferrer" className="icon-btn" title="LinkedIn">
              <FaLinkedin size={16} />
            </a>
            <a href="https://www.youtube.com/@mr.coding-21" target="_blank" rel="noreferrer" className="icon-btn" title="YouTube">
              <FaYoutube size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="modal-overlay fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelectedProject(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="modal-panel card">
            <div ref={modalBarRef} className="modal-progress" />
            <button onClick={() => setSelectedProject(null)} className="icon-btn absolute right-5 top-5 z-10" aria-label="Close">
              <X size={18} />
            </button>

            <div
              ref={modalBodyRef}
              onScroll={() => syncScroll(modalBodyRef.current, modalBarRef.current)}
              className="modal-body space-y-6 p-6 sm:p-8"
            >
            <div className="space-y-2 pr-12">
              <span className="f-mono accent text-xs">{selectedProject.category}</span>
              <h3 className="f-display text-3xl font-bold leading-tight">{selectedProject.title[lang]}</h3>
            </div>

            <div className="hair relative h-64 w-full overflow-hidden rounded-2xl border sm:h-72">
              <Image src={selectedProject.image} alt={selectedProject.title[lang]} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <h4 className="label mb-1.5">{c.modal.overview}</h4>
                <p className="muted leading-relaxed">{selectedProject.overview[lang]}</p>
              </div>
              <div>
                <h4 className="label mb-1.5">{c.modal.problem}</h4>
                <p className="muted leading-relaxed">{selectedProject.problemStatement[lang]}</p>
              </div>
              <div>
                <h4 className="label mb-1.5">{c.modal.solution}</h4>
                <p className="muted leading-relaxed">{selectedProject.proposedSolution[lang]}</p>
              </div>
              <div>
                <h4 className="label mb-2">{c.modal.features}</h4>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selectedProject.keyFeatures[lang].map((feat, idx) => (
                    <li key={idx} className="hair flex items-center gap-2 rounded-xl border p-2.5">
                      <CheckCircle2 size={14} className="accent shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="label mb-2">{c.modal.tech}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <TechChip key={tech} name={tech} />
                  ))}
                </div>
              </div>
            </div>

            <div className="hair flex flex-wrap gap-3 border-t pt-5">
              {selectedProject.demoUrl && (
                <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <span>{c.projects.liveDemo}</span>
                  <ArrowUpRight size={15} />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <FaGithub size={15} />
                  <span>{c.projects.sourceCode}</span>
                </a>
              )}
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
