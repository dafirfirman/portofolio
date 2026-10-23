"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Code2, Smartphone, Globe, Server, Cpu, Terminal, 
  ArrowRight, Mail, Send, CheckCircle2, 
  Menu, X, ExternalLink, MapPin, Layers, GraduationCap, Sparkles, Database, BrainCircuit, Wrench, Briefcase, BookOpen, FileText, Sun, Moon,
  Download, Copy, AlertCircle
} from "lucide-react";

import { 
  SiFlutter, SiDart, SiAndroidstudio, SiNextdotjs, SiReact, 
  SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss, 
  SiPhp, SiPython, SiMysql, SiPostgresql, SiFirebase, 
  SiGit, SiGithub, SiPostman, SiFigma, SiScikitlearn
} from "react-icons/si";

import { 
  FaLinkedin, FaYoutube, FaTiktok, FaInstagram, FaGithub, FaWhatsapp 
} from "react-icons/fa";

import { VscCode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";
import { Zap } from "lucide-react";

import { profileData } from "../data/profile";
import { projectsData, Project } from "../data/projects";
import { PublicationsSection } from "../components/publications";

const WA_LINK = "https://api.whatsapp.com/qr/L3BIJYBOS2PVM1?autoload=1&app_absent=0";
const WA_NUMBER_DISPLAY = "0813-6645-1989";
const CV_PATH = "/CV-Firman-Damai-Zebua.pdf";

const TechBadge = ({ name, isDark }: { name: string; isDark: boolean }) => {
  const getTechIcon = (techName: string) => {
    switch (techName.toLowerCase()) {
      case "flutter": return <SiFlutter className="text-[#02569B]" size={14} />;
      case "dart": return <SiDart className="text-[#0175C2]" size={14} />;
      case "android studio": return <SiAndroidstudio className="text-[#3DDC84]" size={14} />;
      case "provider": return <Layers className="text-[#02569B]" size={14} />;
      case "riverpod": return <Cpu className="text-[#00B4D8]" size={14} />;
      case "getx": return <Zap className="text-[#FFB703]" size={14} />;
      case "next.js": return <SiNextdotjs className={isDark ? "text-white" : "text-slate-900"} size={14} />;
      case "react": return <SiReact className="text-[#61DAFB]" size={14} />;
      case "typescript": return <SiTypescript className="text-[#3178C6]" size={14} />;
      case "javascript": return <SiJavascript className="text-[#F7DF1E]" size={14} />;
      case "tailwind css": return <SiTailwindcss className="text-[#06B6D4]" size={14} />;
      case "html/css": 
        return (
          <div className="flex items-center gap-0.5">
            <SiHtml5 className="text-[#E34F26]" size={13} />
            <SiCss className="text-[#1572B6]" size={13} />
          </div>
        );
      case "php": return <SiPhp className="text-[#777BB4]" size={16} />;
      case "python": return <SiPython className="text-[#3776AB]" size={14} />;
      case "ai engineering": return <BrainCircuit className="text-[#A855F7]" size={14} />;
      case "prompt engineering": return <Sparkles className="text-[#38BDF8]" size={14} />;
      case "rest apis": return <TbApi className="text-[#00E676]" size={16} />;
      case "mysql": return <SiMysql className="text-[#4479A1]" size={16} />;
      case "postgresql": return <SiPostgresql className="text-[#4169E1]" size={14} />;
      case "firebase": return <SiFirebase className="text-[#FFCA28]" size={14} />;
      case "git": return <SiGit className="text-[#F05032]" size={14} />;
      case "github": return <SiGithub className={isDark ? "text-white" : "text-slate-900"} size={14} />;
      case "vs code": return <VscCode className="text-[#007ACC]" size={16} />;
      case "postman": return <SiPostman className="text-[#FF6C37]" size={14} />;
      case "figma": return <SiFigma className="text-[#F24E1E]" size={14} />;
      case "scikit-learn": return <SiScikitlearn className="text-[#F7931E]" size={14} />;
      default: return <Code2 className="text-blue-500" size={14} />;
    }
  };

  return (
    <span className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all duration-300 shadow-sm ${
      isDark 
        ? "bg-zinc-900/90 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white" 
        : "bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900"
    }`}>
      {getTechIcon(name)}
      <span>{name}</span>
    </span>
  );
};

const ScrollReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [lang, setLang] = useState<"id" | "en">("id");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);

  // Form State
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" });

  const categories: string[] = ["All Projects", "Mobile Applications", "Web Development", "Full-Stack"];

  const filteredProjects: Project[] = activeCategory === "All Projects" 
    ? projectsData 
    : projectsData.filter((p: Project) => p.category === activeCategory);

  // Integrasi Submit Form via API Route Resend
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
        setErrorMessage(data.error || (lang === "id" ? "Gagal mengirim pesan. Silakan coba lagi." : "Failed to send message. Please try again."));
      }
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setErrorMessage(lang === "id" ? "Terjadi kesalahan koneksi jaringan." : "A network error occurred.");
    }
  };

  const handleCopyWA = () => {
    navigator.clipboard.writeText("081366451989");
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  // Kamus Bahasa (ID & EN)
  const t = {
    id: {
      nav: { about: "Tentang", skills: "Keahlian", projects: "Proyek", publications: "Publikasi", journey: "Pengalaman", services: "Layanan", contact: "Kontak" },
      hero: {
        greeting: "Halo, Saya",
        bio: "Saya adalah pengembang perangkat lunak dengan latar belakang Teknologi Informasi dan minat kuat dalam membangun produk digital yang bermanfaat. Fokus pekerjaan saya meliputi pengembangan aplikasi mobile, aplikasi web, integrasi API, dan sistem berbasis basis data.",
        explore: "Lihat Portofolio",
        research: "Publikasi Ilmiah",
        chatWA: "Hubungi via WhatsApp",
        downloadCV: "Unduh CV"
      },
      about: {
        badge: "Tentang Saya",
        title: "Mengembangkan solusi teknologi & pendidikan vokasi.",
        desc: "Saat ini saya sedang menempuh studi Magister Teknik Informatika di Universitas Sumatera Utara (USU) setelah menyelesaikan gelar Sarjana di Universitas Katolik Santo Thomas. Selain rekayasa perangkat lunak, saya aktif mengajar sebagai guru kejuruan di SMK Swasta Yapim Biru-Biru pada bidang Koding, Kecerdasan Artifisial, dan Pemrograman Dasar.",
        downloadCVBtn: "Unduh CV Lengkap",
        c1Title: "Mobile Development",
        c1Desc: "Membangun aplikasi lintas platform menggunakan Flutter & Dart untuk pengalaman native yang mulus.",
        c2Title: "AI & Prompt Engineering",
        c2Desc: "Merancang alur kerja cerdas, struktur prompt, dan aplikasi terintegrasi machine learning.",
        c3Title: "Aplikasi Web",
        c3Desc: "Mengembangkan platform web responsif dengan Next.js, React, dan Tailwind CSS.",
        c4Title: "Pendidikan Vokasi",
        c4Desc: "Mengajar Koding, AI, dan Pemrograman Dasar di SMK Swasta Yapim Biru-Biru."
      },
      skills: {
        badge: "Keahlian",
        title: "Teknologi & Tools",
        subtitle: "Stack dan utilitas yang saya gunakan untuk mewujudkan ide ke dalam produksi.",
        s1: "Mobile Dev",
        s2: "AI & Prompt Eng",
        s3: "Backend & Web",
        s4: "Tools & Workflow"
      },
      projects: {
        badge: "Portofolio",
        title: "Daftar Proyek Aplikasi",
        subtitle: "Jelajahi aplikasi seluler, sistem full-stack, dan alat pembelajaran web.",
        sourceCode: "Kode Sumber",
        liveDemo: "Lihat Demo"
      },
      journey: {
        badge: "Timeline",
        title: "Pengalaman & Pendidikan",
        subtitle: "Tonggak akademik, karier mengajar, dan perkembangan pengembangan perangkat lunak.",
        j1Role: "Guru SMK",
        j1Desc: "Mengajar siswa kejuruan dalam bidang Koding, Kecerdasan Artifisial, Prompt Engineering, dan Pemrograman Dasar untuk tahun ajaran.",
        j2Role: "S2 Teknik Informatika",
        j2Desc: "Fokus pada penerapan machine learning tingkat lanjut dalam keamanan siber dan model klasifikasi lalu lintas jaringan.",
        j3Role: "S1 Ilmu Komputer (S.Kom.)",
        j3Desc: "Menyelesaikan perkuliahan dasar rekayasa perangkat lunak, algoritma, sistem basis data, dan pengembangan full-stack.",
        j4Role: "Freelance & Software Engineer",
        j4Desc: "Membangun aplikasi mobile, sistem REST API full-stack, dan dashboard web kustom untuk klien."
      },
      services: {
        badge: "Layanan",
        title: "Layanan & Kemampuan",
        subtitle: "Bagaimana saya dapat membantu mewujudkan proyek digital dan program pembelajaran Anda.",
        srv1Title: "Mobile & Web Apps",
        srv1Desc: "Aplikasi lintas platform kustom menggunakan Flutter dan platform web responsif yang dibangun dengan Next.js dan Tailwind CSS.",
        srv2Title: "Konsultasi AI & ML",
        srv2Desc: "Prompt engineering, skrip otomatisasi Python, dan integrasi model klasifikasi untuk alat penelitian atau bisnis.",
        srv3Title: "Instruksi Koding",
        srv3Desc: "Workshop, mentoring, dan panduan kurikulum vokasi dalam pemrograman dasar, Python, dan fondasi AI."
      },
      contact: {
        badge: "Hubungi",
        title: "Mari Bekerja Sama",
        subtitle: "Punya proyek, pertanyaan riset, atau ide kolaborasi? Kirimkan pesan atau hubungi langsung via WhatsApp.",
        waBoxTitle: "Respon Cepat via WhatsApp",
        waBoxDesc: "Klik tombol di bawah ini untuk membuka percakapan langsung di WhatsApp.",
        chatWABtn: "Hubungi via WhatsApp",
        copyWA: "Salin Nomor",
        copiedWA: "Tersalin!",
        nameLabel: "Nama Anda",
        namePlaceholder: "Masukkan nama lengkap Anda",
        emailLabel: "Alamat Email",
        emailPlaceholder: "contoh@email.com",
        subjectLabel: "Subjek",
        subjectPlaceholder: "Kerja Sama Proyek / Pertanyaan Riset",
        messageLabel: "Pesan",
        messagePlaceholder: "Tuliskan rincian proyek, lini masa, atau pertanyaan Anda di sini...",
        sendBtn: "Kirim Pesan",
        sending: "Mengirim...",
        successTitle: "Pesan Terkirim, Terima Kasih!",
        successDesc: "Terima kasih telah menghubungi. Saya telah menerima pesan Anda dan akan segera membalasnya.",
        sendAnother: "Kirim Pesan Lain"
      }
    },
    en: {
      nav: { about: "About", skills: "Skills", projects: "Projects", publications: "Publications", journey: "Journey", services: "Services", contact: "Let's Talk" },
      hero: {
        greeting: "Hi, I am",
        bio: profileData.bio,
        explore: "Explore My Work",
        research: "Research Publications",
        chatWA: "Chat on WhatsApp",
        downloadCV: "Download CV"
      },
      about: {
        badge: "About",
        title: "Turning technical concepts into reliable applications & education.",
        desc: "I am currently pursuing my Master's Degree in Informatics Engineering at Universitas Sumatera Utara (USU) after completing my Bachelor's degree at Universitas Katolik Santo Thomas. Alongside software engineering, I serve as a vocational teacher at SMK Swasta Yapim Biru-Biru, instructing students in Coding, Artificial Intelligence, and Basic Programming.",
        downloadCVBtn: "Download Full CV",
        c1Title: "Mobile Development",
        c1Desc: "Building cross-platform apps using Flutter & Dart for smooth native experiences.",
        c2Title: "AI & Prompt Engineering",
        c2Desc: "Designing intelligent workflows, prompt structures, and ML-integrated applications.",
        c3Title: "Web Applications",
        c3Desc: "Developing responsive web platforms with Next.js, React, and Tailwind CSS.",
        c4Title: "Vocational Education",
        c4Desc: "Teaching Coding, AI, and Basic Programming at SMK Swasta Yapim Biru-Biru."
      },
      skills: {
        badge: "Expertise",
        title: "Technologies & Tools",
        subtitle: "The stack and utilities I use to bring ideas into production.",
        s1: "Mobile Dev",
        s2: "AI & Prompt Eng",
        s3: "Backend & Web",
        s4: "Tools & Workflow"
      },
      projects: {
        badge: "Portfolio",
        title: "Featured Projects",
        subtitle: "Explore mobile applications, full-stack systems, and web learning tools.",
        sourceCode: "Source Code",
        liveDemo: "Live Demo"
      },
      journey: {
        badge: "Timeline",
        title: "Professional Journey & Education",
        subtitle: "Academic milestones, teaching career, and ongoing software development progression.",
        j1Role: "Vocational School Teacher",
        j1Desc: "Instructing vocational students in Coding and Artificial Intelligence, Prompt Engineering, and Basic Programming.",
        j2Role: "Master's Degree in Information Technology",
        j2Desc: "Focusing on advanced machine learning applications in cybersecurity and network traffic classification models.",
        j3Role: "Bachelor's Degree in Computer Science (S.Kom.)",
        j3Desc: "Completed foundational coursework in software engineering, algorithms, database systems, and full-stack development.",
        j4Role: "Freelance & Software Engineer",
        j4Desc: "Building mobile applications, full-stack REST API systems, and custom school/business web dashboards."
      },
      services: {
        badge: "Offerings",
        title: "Services & Capabilities",
        subtitle: "How I can help bring your digital projects and learning programs to life.",
        srv1Title: "Mobile & Web Apps",
        srv1Desc: "Custom cross-platform applications using Flutter and responsive web platforms built with Next.js and Tailwind CSS.",
        srv2Title: "AI & ML Consulting",
        srv2Desc: "Prompt engineering, Python automation scripts, and integration of classification models for research or business tools.",
        srv3Title: "Coding Instruction",
        srv3Desc: "Workshops, mentoring, and vocational curriculum guidance in basic programming, Python, and AI foundations."
      },
      contact: {
        badge: "Get in Touch",
        title: "Let's Build Something Together",
        subtitle: "Have a project in mind, research inquiry, or collaboration idea? Drop a message or reach out directly on WhatsApp.",
        waBoxTitle: "Fast Response via WhatsApp",
        waBoxDesc: "Click the button below to start a direct chat on WhatsApp.",
        chatWABtn: "Chat on WhatsApp",
        copyWA: "Copy Number",
        copiedWA: "Copied!",
        nameLabel: "Your Name",
        namePlaceholder: "Enter your full name",
        emailLabel: "Email Address",
        emailPlaceholder: "john@example.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "Project Collaboration / Research Inquiry",
        messageLabel: "Message",
        messagePlaceholder: "Tell me about your project, timeline, or objectives...",
        sendBtn: "Send Message",
        sending: "Sending...",
        successTitle: "Message Sent, Thank You!",
        successDesc: "Thank you for reaching out. I have received your message and will respond shortly.",
        sendAnother: "Send Another Message"
      }
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-blue-600 selection:text-white ${
      isDark ? "bg-[#09090B] text-[#FAFAFA]" : "bg-slate-50 text-slate-900"
    }`}>
      
      <style jsx global>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(14deg); }
          40% { transform: rotate(-8deg); }
          60% { transform: rotate(14deg); }
          80% { transform: rotate(-4deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>

      {/* NAVIGATION BAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDark ? "bg-[#09090B]/80 border-zinc-800/60 text-white" : "bg-white/80 border-slate-200 text-slate-900"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-colors ${
              isDark ? "border-zinc-800 group-hover:border-blue-500" : "border-slate-300 group-hover:border-blue-600"
            }`}>
              <Image 
                src="/new-profile.jpeg"
                alt="Profile Firman" 
                width={40} 
                height={40} 
                className="object-cover w-full h-full"
              />
            </div>
            <span className={`text-xl font-bold tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
              FZ<span className="text-blue-500">.</span>
            </span>
          </a>

          <div className={`hidden md:flex items-center space-x-6 text-sm font-medium ${
            isDark ? "text-zinc-300" : "text-slate-700"
          }`}>
            <a href="#about" className="hover:text-blue-500 transition-colors">{t[lang].nav.about}</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors">{t[lang].nav.skills}</a>
            <a href="#projects" className="hover:text-blue-500 transition-colors">{t[lang].nav.projects}</a>
            <a href="#publications" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 text-indigo-500 font-semibold">
              <FileText size={15} />
              <span>{t[lang].nav.publications}</span>
            </a>
            <a href="#journey" className="hover:text-blue-500 transition-colors">{t[lang].nav.journey}</a>
            <a href="#services" className="hover:text-blue-500 transition-colors">{t[lang].nav.services}</a>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-full border transition-colors ${
                isDark ? "bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-800" : "bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className={`flex items-center p-1 rounded-full border ${
              isDark ? "bg-zinc-900 border-zinc-800" : "bg-slate-100 border-slate-200"
            }`}>
              <button
                onClick={() => setLang("id")}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === "id" ? "bg-blue-600 text-white shadow-sm" : isDark ? "text-zinc-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                ID 🇮🇩
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === "en" ? "bg-blue-600 text-white shadow-sm" : isDark ? "text-zinc-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                EN 🇬🇧
              </button>
            </div>

            <a href="#contact" className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
              {t[lang].nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full border ${
                isDark ? "bg-zinc-900 border-zinc-800 text-yellow-400" : "bg-slate-100 border-slate-200 text-amber-600"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={isDark ? "text-white" : "text-slate-900"}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 right-0 border-b p-6 flex flex-col space-y-4 shadow-2xl ${
            isDark ? "bg-[#111318] border-zinc-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t[lang].nav.about}</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>{t[lang].nav.skills}</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>{t[lang].nav.projects}</a>
            <a href="#publications" onClick={() => setMobileMenuOpen(false)} className="text-indigo-500 font-medium">{t[lang].nav.publications}</a>
            <a href="#journey" onClick={() => setMobileMenuOpen(false)}>{t[lang].nav.journey}</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>{t[lang].nav.services}</a>
            
            <div className={`flex items-center justify-between pt-2 border-t ${isDark ? "border-zinc-800" : "border-slate-200"}`}>
              <span className="text-xs opacity-80">Language:</span>
              <div className="flex gap-2">
                <button onClick={() => setLang("id")} className={`px-3 py-1 rounded-full text-xs font-bold ${lang === "id" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-300"}`}>ID 🇮🇩</button>
                <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-bold ${lang === "en" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-300"}`}>EN 🇬🇧</button>
              </div>
            </div>

            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-medium">
              {t[lang].nav.contact}
            </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className={`relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden border-b ${
        isDark ? "border-zinc-800/40" : "border-slate-200"
      }`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-block px-3.5 py-1.5 border font-mono text-xs tracking-widest uppercase ${
              isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mr-2" />
              {profileData.eyebrow}
            </div>

            <div className="space-y-2">
              <div className={`flex items-center gap-3 text-2xl sm:text-3xl font-bold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                <span>{t[lang].hero.greeting}</span>
                <span className="animate-wave text-3xl sm:text-4xl">👋</span>
              </div>
              <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] ${isDark ? "text-white" : "text-slate-900"}`}>
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent">Firman Damai Zebua</span>
              </h1>
            </div>

            <p className={`text-lg max-w-2xl leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
              {t[lang].hero.bio}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-4">
              <a href="#projects" className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2 ${
                isDark ? "bg-white text-zinc-950 hover:bg-zinc-200" : "bg-slate-900 text-white hover:bg-slate-800"
              }`}>
                <span>{t[lang].hero.explore}</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href={WA_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <FaWhatsapp size={18} />
                <span>{t[lang].hero.chatWA}</span>
              </a>

              <a 
                href={CV_PATH} 
                download
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold border transition-colors flex items-center justify-center gap-2 ${
                  isDark ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800/80 hover:text-white" : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Download size={16} />
                <span>{t[lang].hero.downloadCV}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={`rounded-2xl border shadow-2xl p-6 relative overflow-hidden ${
              isDark ? "bg-[#111318] border-zinc-800" : "bg-slate-900 border-slate-800 text-slate-100"
            }`}>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-zinc-400 font-mono">dev-terminal ~ bash</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-zinc-200">
                <p className="text-blue-400">$ whoami</p>
                <p className="text-zinc-300">&gt; {profileData.fullName}</p>
                <p className="text-blue-400">$ role --current</p>
                <p className="text-zinc-300">&gt; Educator &amp; {profileData.title}</p>
                <p className="text-blue-400">$ location --current</p>
                <p className="text-zinc-300">&gt; {profileData.location}</p>
                <p className="text-blue-400">$ tech-stack --primary</p>
                <p className="text-zinc-300">&gt; [&quot;AI Engineering&quot;, &quot;Prompt Engineering&quot;, &quot;Flutter&quot;, &quot;Python&quot;, &quot;Next.js&quot;]</p>
                <p className="text-emerald-400 flex items-center space-x-2 pt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Status: Ready for new engineering &amp; teaching challenges.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className={`inline-block px-4 py-1.5 border font-mono text-sm tracking-wide ${
                isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
              }`}>
                {t[lang].about.badge}
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight pt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {t[lang].about.title}
              </h3>
              <p className={`leading-relaxed text-base ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                {t[lang].about.desc}
              </p>

              <div className="pt-2">
                <a 
                  href={CV_PATH} 
                  download
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all ${
                    isDark ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-white" : "border-slate-300 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <Download size={16} />
                  <span>{t[lang].about.downloadCVBtn}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-6 rounded-2xl border space-y-3 transition-all ${
                isDark ? "bg-[#111318] border-zinc-800 hover:border-blue-500/40" : "bg-white border-slate-200 hover:border-blue-500/40 shadow-sm"
              }`}>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  <Smartphone size={24} />
                </div>
                <h4 className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].about.c1Title}</h4>
                <p className={`text-sm ${isDark ? "text-zinc-300" : "text-slate-600"}`}>{t[lang].about.c1Desc}</p>
              </div>
              <div className={`p-6 rounded-2xl border space-y-3 transition-all ${
                isDark ? "bg-[#111318] border-zinc-800 hover:border-purple-500/40" : "bg-white border-slate-200 hover:border-purple-500/40 shadow-sm"
              }`}>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                  <Sparkles size={24} />
                </div>
                <h4 className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].about.c2Title}</h4>
                <p className={`text-sm ${isDark ? "text-zinc-300" : "text-slate-600"}`}>{t[lang].about.c2Desc}</p>
              </div>
              <div className={`p-6 rounded-2xl border space-y-3 transition-all ${
                isDark ? "bg-[#111318] border-zinc-800 hover:border-violet-500/40" : "bg-white border-slate-200 hover:border-violet-500/40 shadow-sm"
              }`}>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500">
                  <Globe size={24} />
                </div>
                <h4 className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].about.c3Title}</h4>
                <p className={`text-sm ${isDark ? "text-zinc-300" : "text-slate-600"}`}>{t[lang].about.c3Desc}</p>
              </div>
              <div className={`p-6 rounded-2xl border space-y-3 transition-all ${
                isDark ? "bg-[#111318] border-zinc-800 hover:border-emerald-500/40" : "bg-white border-slate-200 hover:border-emerald-500/40 shadow-sm"
              }`}>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <GraduationCap size={24} />
                </div>
                <h4 className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].about.c4Title}</h4>
                <p className={`text-sm ${isDark ? "text-zinc-300" : "text-slate-600"}`}>{t[lang].about.c4Desc}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className={`py-24 border-y ${
        isDark ? "bg-[#111318]/50 border-zinc-800/40" : "bg-slate-100/70 border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className={`inline-block px-4 py-1.5 border font-mono text-sm tracking-wide mx-auto ${
                isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
              }`}>
                {t[lang].skills.badge}
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight pt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {t[lang].skills.title}
              </h3>
              <p className={isDark ? "text-zinc-300" : "text-slate-700"}>{t[lang].skills.subtitle}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-[#09090B] border-zinc-800/80" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h4 className="font-semibold text-blue-500 flex items-center space-x-2">
                  <Smartphone size={20} />
                  <span>{t[lang].skills.s1}</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Flutter", "Dart", "Android Studio", "Provider", "Riverpod", "GetX"].map((item: string) => (
                    <TechBadge key={item} name={item} isDark={isDark} />
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-[#09090B] border-zinc-800/80" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h4 className="font-semibold text-purple-500 flex items-center space-x-2">
                  <Sparkles size={20} />
                  <span>{t[lang].skills.s2}</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["AI Engineering", "Prompt Engineering", "Python", "Scikit-Learn"].map((item: string) => (
                    <TechBadge key={item} name={item} isDark={isDark} />
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-[#09090B] border-zinc-800/80" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h4 className="font-semibold text-cyan-500 flex items-center space-x-2">
                  <Server size={20} />
                  <span>{t[lang].skills.s3}</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Next.js", "React", "Tailwind CSS", "PHP", "REST APIs", "MySQL", "PostgreSQL", "Firebase"].map((item: string) => (
                    <TechBadge key={item} name={item} isDark={isDark} />
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-[#09090B] border-zinc-800/80" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h4 className="font-semibold text-emerald-500 flex items-center space-x-2">
                  <Terminal size={20} />
                  <span>{t[lang].skills.s4}</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Git", "GitHub", "VS Code", "Postman", "Figma", "TypeScript", "JavaScript"].map((item: string) => (
                    <TechBadge key={item} name={item} isDark={isDark} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6 space-y-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className={`inline-block px-4 py-1.5 border font-mono text-sm tracking-wide ${
                isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
              }`}>
                {t[lang].projects.badge}
              </div>
              <h3 className={`text-3xl sm:text-5xl font-extrabold tracking-tight pt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {t[lang].projects.title}
              </h3>
              <p className={isDark ? "text-zinc-300" : "text-slate-700"}>{t[lang].projects.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat: string) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50" 
                      : isDark ? "bg-[#111318] border border-zinc-800 text-zinc-300 hover:text-white" : "bg-white border border-slate-200 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project: Project) => (
              <div 
                key={project.id}
                className={`group rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col justify-between relative hover:-translate-y-2 ${
                  isDark 
                    ? "bg-[#111318] border-zinc-800/80 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" 
                    : "bg-white border-slate-200 shadow-sm hover:border-blue-500/50 hover:shadow-xl"
                }`}
              >
                <div>
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className={`relative w-full h-72 sm:h-80 overflow-hidden border-b flex items-center justify-center p-2 cursor-pointer ${
                      isDark ? "bg-zinc-950 border-zinc-800/80" : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title[lang]}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="text-xs font-mono font-semibold text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                        {project.category}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-xl">
                        <ExternalLink size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h4 
                      onClick={() => setSelectedProject(project)}
                      className={`text-2xl font-bold cursor-pointer group-hover:text-blue-500 transition-colors flex items-center justify-between ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      <span>{project.title[lang]}</span>
                      <Sparkles size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>

                    <p className={`text-sm leading-relaxed line-clamp-2 ${isDark ? "text-zinc-300" : "text-slate-600"}`}>
                      {project.shortDescription[lang]}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <TechBadge key={tech} name={tech} isDark={isDark} />
                    ))}
                  </div>

                  {/* Tombol GitHub dan Live Demo Dinamis */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
                          isDark 
                            ? "bg-zinc-900/80 border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white" 
                            : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                        }`}
                      >
                        <FaGithub size={15} />
                        <span>{t[lang].projects.sourceCode}</span>
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 transition-colors shadow-md shadow-blue-500/20"
                      >
                        <ExternalLink size={14} />
                        <span>{t[lang].projects.liveDemo}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* RESEARCH & PUBLICATIONS SECTION */}
      <section id="publications" className={`border-t transition-colors duration-300 ${
        isDark ? "border-zinc-800/40 bg-[#09090B]" : "border-slate-200 bg-slate-100/50"
      }`}>
        <PublicationsSection lang={lang} isDark={isDark} />
      </section>

      {/* PROFESSIONAL JOURNEY & EDUCATION */}
      <section id="journey" className={`py-24 border-y ${
        isDark ? "bg-[#111318]/50 border-zinc-800/40" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <ScrollReveal>
            <div className="text-center space-y-3">
              <div className={`inline-block px-4 py-1.5 border font-mono text-sm tracking-wide mx-auto ${
                isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
              }`}>
                {t[lang].journey.badge}
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight pt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {t[lang].journey.title}
              </h3>
              <p className={isDark ? "text-zinc-300" : "text-slate-700"}>{t[lang].journey.subtitle}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border flex items-start space-x-4 transition-all ${
                isDark ? "bg-[#09090B] border-zinc-800 hover:border-emerald-500/40" : "bg-white border-slate-200 hover:border-emerald-500/40 shadow-sm"
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/yapim.png" alt="Logo SMK Yapim Biru-Biru" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].journey.j1Role}</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 w-fit">
                      2026 - Present
                    </span>
                  </div>
                  <p className="text-sm text-emerald-500 font-medium">SMK Swasta Yapim Biru-Biru</p>
                  <p className={`text-sm pt-2 ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {t[lang].journey.j1Desc}
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border flex items-start space-x-4 transition-all ${
                isDark ? "bg-[#09090B] border-zinc-800 hover:border-blue-500/40" : "bg-white border-slate-200 hover:border-blue-500/40 shadow-sm"
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/usu.png" alt="Logo USU" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].journey.j2Role}</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 w-fit">
                      2025 - Present
                    </span>
                  </div>
                  <p className="text-sm text-blue-500 font-medium">Universitas Sumatera Utara (USU)</p>
                  <p className={`text-sm pt-2 ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {t[lang].journey.j2Desc}
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border flex items-start space-x-4 transition-all ${
                isDark ? "bg-[#09090B] border-zinc-800 hover:border-violet-500/40" : "bg-white border-slate-200 hover:border-violet-500/40 shadow-sm"
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/unika.png" alt="Logo UNIKA" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].journey.j3Role}</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20 w-fit">
                      Graduated
                    </span>
                  </div>
                  <p className="text-sm text-violet-500 font-medium">Universitas Katolik Santo Thomas (UNIKA)</p>
                  <p className={`text-sm pt-2 ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {t[lang].journey.j3Desc}
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border flex items-start space-x-4 transition-all ${
                isDark ? "bg-[#09090B] border-zinc-800 hover:border-amber-500/40" : "bg-white border-slate-200 hover:border-amber-500/40 shadow-sm"
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/freelancer-svgrepo-com.svg" alt="Logo Freelance" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].journey.j4Role}</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 w-fit">
                      Ongoing
                    </span>
                  </div>
                  <p className="text-sm text-amber-500 font-medium">Mobile &amp; Web Development Consultant</p>
                  <p className={`text-sm pt-2 ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    {t[lang].journey.j4Desc}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6 space-y-12">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className={`inline-block px-4 py-1.5 border font-mono text-sm tracking-wide mx-auto ${
              isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
            }`}>
              Offerings
            </div>
            <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight pt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              {t[lang].services.title}
            </h3>
            <p className={isDark ? "text-zinc-300" : "text-slate-700"}>{t[lang].services.subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-3xl border space-y-4 hover:border-blue-500/50 transition-all ${
              isDark ? "bg-[#111318] border-zinc-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Smartphone size={24} />
              </div>
              <h4 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].services.srv1Title}</h4>
              <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                {t[lang].services.srv1Desc}
              </p>
            </div>

            <div className={`p-8 rounded-3xl border space-y-4 hover:border-purple-500/50 transition-all ${
              isDark ? "bg-[#111318] border-zinc-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <Sparkles size={24} />
              </div>
              <h4 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].services.srv2Title}</h4>
              <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                {t[lang].services.srv2Desc}
              </p>
            </div>

            <div className={`p-8 rounded-3xl border space-y-4 hover:border-emerald-500/50 transition-all ${
              isDark ? "bg-[#111318] border-zinc-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <GraduationCap size={24} />
              </div>
              <h4 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].services.srv3Title}</h4>
              <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                {t[lang].services.srv3Desc}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={`py-24 border-t ${
        isDark ? "bg-[#111318]/50 border-zinc-800/40" : "bg-slate-100/60 border-slate-200"
      }`}>
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <ScrollReveal>
            <div className="text-center space-y-3">
              <div className={`inline-block px-4 py-1.5 border font-mono text-sm tracking-wide mx-auto ${
                isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
              }`}>
                {t[lang].contact.badge}
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight pt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {t[lang].contact.title}
              </h3>
              <p className={isDark ? "text-zinc-300" : "text-slate-700"}>{t[lang].contact.subtitle}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all ${
              isDark ? "bg-[#09090B] border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]" : "bg-white border-emerald-500/40 shadow-sm"
            }`}>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-lg">
                  <FaWhatsapp size={22} />
                  <span>{t[lang].contact.waBoxTitle}</span>
                </div>
                <p className={`text-sm ${isDark ? "text-zinc-300" : "text-slate-600"}`}>
                  {t[lang].contact.waBoxDesc}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className={`font-mono text-base font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {WA_NUMBER_DISPLAY}
                  </span>
                  <button 
                    onClick={handleCopyWA}
                    className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1 transition-colors ${
                      isDark ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white" : "bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <Copy size={12} />
                    <span>{copiedNumber ? t[lang].contact.copiedWA : t[lang].contact.copyWA}</span>
                  </button>
                </div>
              </div>

              <a 
                href={WA_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-600/20"
              >
                <FaWhatsapp size={18} />
                <span>{t[lang].contact.chatWABtn}</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={`rounded-3xl border p-8 sm:p-12 shadow-2xl ${
              isDark ? "bg-[#09090B] border-zinc-800" : "bg-white border-slate-200"
            }`}>
              {formStatus === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{t[lang].contact.successTitle}</h4>
                  <p className={isDark ? "text-zinc-300" : "text-slate-700"}>{t[lang].contact.successDesc}</p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className={`mt-4 px-6 py-2.5 rounded-xl text-sm font-medium border ${
                      isDark ? "bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {t[lang].contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field tersembunyi */}
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
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-mono uppercase tracking-wider ${isDark ? "text-zinc-300" : "text-slate-700 font-semibold"}`}>{t[lang].contact.nameLabel}</label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t[lang].contact.namePlaceholder}
                        className={`w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 transition-colors border ${
                          isDark ? "bg-[#111318] border-zinc-800 text-white placeholder:text-zinc-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-mono uppercase tracking-wider ${isDark ? "text-zinc-300" : "text-slate-700 font-semibold"}`}>{t[lang].contact.emailLabel}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t[lang].contact.emailPlaceholder}
                        className={`w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 transition-colors border ${
                          isDark ? "bg-[#111318] border-zinc-800 text-white placeholder:text-zinc-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-mono uppercase tracking-wider ${isDark ? "text-zinc-300" : "text-slate-700 font-semibold"}`}>{t[lang].contact.subjectLabel}</label>
                    <input
                      type="text"
                      required
                      maxLength={150}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t[lang].contact.subjectPlaceholder}
                      className={`w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 transition-colors border ${
                        isDark ? "bg-[#111318] border-zinc-800 text-white placeholder:text-zinc-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-mono uppercase tracking-wider ${isDark ? "text-zinc-300" : "text-slate-700 font-semibold"}`}>{t[lang].contact.messageLabel}</label>
                    <textarea
                      required
                      rows={5}
                      maxLength={3000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t[lang].contact.messagePlaceholder}
                      className={`w-full rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none border ${
                        isDark ? "bg-[#111318] border-zinc-800 text-white placeholder:text-zinc-500" : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg disabled:opacity-50 ${
                      isDark 
                        ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 shadow-zinc-900/20" 
                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10"
                    }`}
                  >
                    {formStatus === "submitting" ? (
                      <span>{t[lang].contact.sending}</span>
                    ) : (
                      <>
                        <span>{t[lang].contact.sendBtn}</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-12 ${
        isDark ? "bg-[#09090B] border-zinc-800/80 text-zinc-400" : "bg-white border-slate-200 text-slate-600"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center space-x-3">
            <span className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>FZ<span className="text-blue-500">.</span></span>
            <span>© {new Date().getFullYear()} Firman Damai Zebua. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors" title="Chat on WhatsApp">
              <FaWhatsapp size={20} />
            </a>
            <a href="https://github.com/dafirfirman" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors" title="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors" title="LinkedIn">
              <FaLinkedin size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors" title="YouTube">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`border rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isDark ? "bg-[#111318] border-zinc-800 text-zinc-300" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-6 right-6 w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800" : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              <X size={20} />
            </button>

            <div className="space-y-2 pr-12">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {selectedProject.category}
              </span>
              <h3 className={`text-2xl sm:text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{selectedProject.title[lang]}</h3>
            </div>

            <div className={`relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border ${
              isDark ? "bg-zinc-950 border-zinc-800" : "bg-slate-100 border-slate-200"
            }`}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title[lang]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Overview</h4>
                <p className={`leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>{selectedProject.overview[lang]}</p>
              </div>

              <div>
                <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Problem Statement</h4>
                <p className={`leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>{selectedProject.problemStatement[lang]}</p>
              </div>

              <div>
                <h4 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Proposed Solution</h4>
                <p className={`leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>{selectedProject.proposedSolution[lang]}</p>
              </div>

              <div>
                <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.keyFeatures[lang].map((feat, idx) => (
                    <li key={idx} className={`flex items-center space-x-2 p-2.5 rounded-xl border ${
                      isDark ? "bg-zinc-900/50 border-zinc-800/60 text-zinc-300" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}>
                      <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} isDark={isDark} />
                  ))}
                </div>
              </div>
            </div>

            <div className={`pt-4 border-t flex flex-wrap gap-4 ${
              isDark ? "border-zinc-800" : "border-slate-200"
            }`}>
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center space-x-2 transition-colors shadow-lg shadow-blue-500/20"
                >
                  <span>{t[lang].projects.liveDemo}</span>
                  <ExternalLink size={16} />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-xl border font-medium text-sm flex items-center space-x-2 transition-colors ${
                    isDark ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white" : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                  }`}
                >
                  <span>{t[lang].projects.sourceCode}</span>
                  <FaGithub size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}