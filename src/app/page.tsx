"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Code2, Smartphone, Globe, Server, Cpu, Terminal, 
  ArrowRight, Mail, Send, CheckCircle2, 
  Menu, X, ExternalLink, MapPin, Layers, GraduationCap, Sparkles, Database, BrainCircuit, Wrench, Briefcase, BookOpen
} from "lucide-react";

// Import Ikon Brand Teknologi Resmi dari React Icons/si
import { 
  SiFlutter, SiDart, SiAndroidstudio, SiNextdotjs, SiReact, 
  SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss, 
  SiPhp, SiPython, SiMysql, SiPostgresql, SiFirebase, 
  SiGit, SiGithub, SiPostman, SiFigma, SiScikitlearn
} from "react-icons/si";

// Import Ikon Media Sosial dari React Icons/fa (FontAwesome)
import { 
  FaLinkedin, FaYoutube, FaTiktok, FaInstagram 
} from "react-icons/fa";

import { VscCode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";
import { Zap } from "lucide-react";

import { profileData } from "../data/profile";
import { projectsData, Project } from "../data/projects";

// Komponen Badge Teknologi dengan Ikon Warna Resmi
const TechBadge = ({ name }: { name: string }) => {
  const getTechIcon = (techName: string) => {
    switch (techName.toLowerCase()) {
      case "flutter": return <SiFlutter className="text-[#02569B]" size={14} />;
      case "dart": return <SiDart className="text-[#0175C2]" size={14} />;
      case "android studio": return <SiAndroidstudio className="text-[#3DDC84]" size={14} />;
      case "provider": return <Layers className="text-[#02569B]" size={14} />;
      case "riverpod": return <Cpu className="text-[#00B4D8]" size={14} />;
      case "getx": return <Zap className="text-[#FFB703]" size={14} />;
      case "next.js": return <SiNextdotjs className="text-white" size={14} />;
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
      case "github": return <SiGithub className="text-white" size={14} />;
      case "vs code": return <VscCode className="text-[#007ACC]" size={16} />;
      case "postman": return <SiPostman className="text-[#FF6C37]" size={14} />;
      case "figma": return <SiFigma className="text-[#F24E1E]" size={14} />;
      case "scikit-learn": return <SiScikitlearn className="text-[#F7931E]" size={14} />;
      default: return <Code2 className="text-blue-400" size={14} />;
    }
  };

  return (
    <span className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80 text-xs text-zinc-300 font-medium flex items-center gap-2 hover:border-zinc-700 hover:text-white transition-all duration-300 shadow-sm">
      {getTechIcon(name)}
      <span>{name}</span>
    </span>
  );
};

// Komponen Pembantu untuk Animasi Scroll Reveal
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form State
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const categories: string[] = ["All Projects", "Mobile Applications", "Web Development", "Full-Stack"];

  const filteredProjects: Project[] = activeCategory === "All Projects" 
    ? projectsData 
    : projectsData.filter((p: Project) => p.category === activeCategory);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-blue-600 selection:text-white">
      
      {/* CSS untuk Animasi Melambai (Waving Hand) */}
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090B]/80 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full border-2 border-zinc-800 overflow-hidden group-hover:border-blue-500 transition-colors">
              <Image 
                src="/profile.jpeg"
                alt="Profile Firman" 
                width={40} 
                height={40} 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              Fir<span className="text-blue-500">man</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-zinc-100 transition-colors">About</a>
            <a href="#skills" className="hover:text-zinc-100 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-zinc-100 transition-colors">Projects</a>
            <a href="#journey" className="hover:text-zinc-100 transition-colors">Journey</a>
            <a href="#services" className="hover:text-zinc-100 transition-colors">Services</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#contact" className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-zinc-300 hover:text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#111318] border-b border-zinc-800 p-6 flex flex-col space-y-4 shadow-2xl">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white">About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white">Projects</a>
            <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white">Journey</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white">Services</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-medium">Let&apos;s Talk</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden border-b border-zinc-800/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3.5 py-1.5 bg-black border-2 border-white text-white font-mono text-xs tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block mr-2" />
              {profileData.eyebrow}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-zinc-300">
                <span className="animate-wave text-3xl sm:text-4xl">👋</span>
                <span>I am</span>               
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">Firman Damai Zebua</span>
              </h1>
            </div>

            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              {profileData.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#projects" className="px-7 py-3.5 rounded-xl text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center space-x-2">
                <span>Explore My Work</span>
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="px-7 py-3.5 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 transition-colors">
                Let&apos;s Connect
              </a>
            </div>
          </div>

          {/* Terminal / Graphic card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#111318] border border-zinc-800 shadow-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-zinc-500 font-mono">dev-terminal ~ bash</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <p className="text-blue-400">$ whoami</p>
                <p className="text-zinc-400">&gt; {profileData.fullName}</p>
                <p className="text-blue-400">$ role --current</p>
                <p className="text-zinc-400">&gt; Educator &amp; {profileData.title}</p>
                <p className="text-blue-400">$ location --current</p>
                <p className="text-zinc-400">&gt; {profileData.location}</p>
                <p className="text-blue-400">$ tech-stack --primary</p>
                <p className="text-zinc-400">&gt; [&quot;AI Engineering&quot;, &quot;Prompt Engineering&quot;, &quot;Flutter&quot;, &quot;Python&quot;, &quot;Next.js&quot;]</p>
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
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-block px-4 py-1.5 bg-black border-2 border-white text-white font-mono text-sm tracking-wide">
                About
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight pt-2">Turning technical concepts into reliable applications &amp; education.</h3>
              <p className="text-zinc-400 leading-relaxed">
                I am currently pursuing my Master&apos;s Degree in Informatics Engineering at Universitas Sumatera Utara (USU) after completing my Bachelor&apos;s degree at Universitas Katolik Santo Thomas. Alongside software engineering, I serve as a vocational teacher at SMK Swasta Yapim Biru-Biru, instructing students in Coding, Artificial Intelligence, and Basic Programming.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#111318] border border-zinc-800 space-y-3 hover:border-blue-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Smartphone size={24} />
                </div>
                <h4 className="font-semibold text-lg text-white">Mobile Development</h4>
                <p className="text-sm text-zinc-400">Building cross-platform apps using Flutter &amp; Dart for smooth native experiences.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#111318] border border-zinc-800 space-y-3 hover:border-purple-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-semibold text-lg text-white">AI &amp; Prompt Engineering</h4>
                <p className="text-sm text-zinc-400">Designing intelligent workflows, prompt structures, and ML-integrated applications.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#111318] border border-zinc-800 space-y-3 hover:border-violet-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Globe size={24} />
                </div>
                <h4 className="font-semibold text-lg text-white">Web Applications</h4>
                <p className="text-sm text-zinc-400">Developing responsive web platforms with Next.js, React, and Tailwind CSS.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#111318] border border-zinc-800 space-y-3 hover:border-emerald-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <GraduationCap size={24} />
                </div>
                <h4 className="font-semibold text-lg text-white">Vocational Education</h4>
                <p className="text-sm text-zinc-400">Teaching Coding, AI, and Basic Programming at SMK Swasta Yapim Biru-Biru.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SKILLS SECTION (DENGAN AI & PROMPT ENGINEERING) */}
      <section id="skills" className="py-24 bg-[#111318]/50 border-y border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block px-4 py-1.5 bg-black border-2 border-white text-white font-mono text-sm tracking-wide mx-auto">
                Expertise
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight pt-2">Technologies &amp; Tools</h3>
              <p className="text-zinc-400">The stack and utilities I use to bring ideas into production.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800/80 space-y-4">
                <h4 className="font-semibold text-blue-400 flex items-center space-x-2">
                  <Smartphone size={20} />
                  <span>Mobile Dev</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Flutter", "Dart", "Android Studio", "Provider", "Riverpod", "GetX"].map((item: string) => (
                    <TechBadge key={item} name={item} />
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800/80 space-y-4">
                <h4 className="font-semibold text-purple-400 flex items-center space-x-2">
                  <Sparkles size={20} />
                  <span>AI &amp; Prompt Eng</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["AI Engineering", "Prompt Engineering", "Python", "Scikit-Learn"].map((item: string) => (
                    <TechBadge key={item} name={item} />
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800/80 space-y-4">
                <h4 className="font-semibold text-cyan-400 flex items-center space-x-2">
                  <Server size={20} />
                  <span>Backend &amp; Web</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Next.js", "React", "Tailwind CSS", "PHP", "REST APIs", "MySQL", "PostgreSQL", "Firebase"].map((item: string) => (
                    <TechBadge key={item} name={item} />
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800/80 space-y-4">
                <h4 className="font-semibold text-emerald-400 flex items-center space-x-2">
                  <Terminal size={20} />
                  <span>Tools &amp; Workflow</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Git", "GitHub", "VS Code", "Postman", "Figma", "TypeScript", "JavaScript"].map((item: string) => (
                    <TechBadge key={item} name={item} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6 space-y-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-block px-4 py-1.5 bg-black border-2 border-white text-white font-mono text-sm tracking-wide">
                Portfolio
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight pt-2">
                Featured Projects
              </h3>
              <p className="text-zinc-400">Explore mobile applications, full-stack systems, and machine learning tools.</p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat: string) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50" 
                      : "bg-[#111318] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
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
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-3xl bg-[#111318] border border-zinc-800/80 overflow-hidden hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col justify-between relative"
              >
                <div>
                  <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-zinc-950 border-b border-zinc-800/80 flex items-center justify-center p-2">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
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
                    <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <Sparkles size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>

                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* PROFESSIONAL JOURNEY & EDUCATION (DENGAN LOGO YAPIM BIRU-BIRU) */}
      <section id="journey" className="py-24 bg-[#111318]/50 border-y border-zinc-800/40">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <ScrollReveal>
            <div className="text-center space-y-3">
              <div className="inline-block px-4 py-1.5 bg-black border-2 border-white text-white font-mono text-sm tracking-wide mx-auto">
                Timeline
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight pt-2">Professional Journey &amp; Education</h3>
              <p className="text-zinc-400">Academic milestones, teaching career, and ongoing software development progression.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6">
              {/* 1. Guru SMK Swasta Yapim Biru-Biru */}
              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800 flex items-start space-x-4 hover:border-emerald-500/40 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/yapim.png" alt="Logo SMK Yapim Biru-Biru" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-white text-lg">Vocational School Teacher</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 text-emerald-400 border border-emerald-500/20 w-fit">
                      2026 - Present (Current)
                    </span>
                  </div>
                  <p className="text-sm text-emerald-400 font-medium">SMK Swasta Yapim Biru-Biru</p>
                  <p className="text-sm text-zinc-400 pt-2">Instructing vocational students in <strong>Coding and Artificial Intelligence</strong>, <strong>Prompt Engineering</strong>, and <strong>Basic Programming</strong> for the 2026/2027 academic year.</p>
                </div>
              </div>

              {/* 2. Master's at USU */}
              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800 flex items-start space-x-4 hover:border-blue-500/40 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/usu.png" alt="Logo USU" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-white text-lg">Master&apos;s Degree in Information Technology</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 text-blue-400 border border-blue-500/20 w-fit">
                      2025 - Present (Current)
                    </span>
                  </div>
                  <p className="text-sm text-blue-400 font-medium">Universitas Sumatera Utara (USU)</p>
                  <p className="text-sm text-zinc-400 pt-2">Focusing on advanced machine learning applications in cybersecurity and network traffic classification models.</p>
                </div>
              </div>

              {/* 3. Bachelor's at UNIKA */}
              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800 flex items-start space-x-4 hover:border-violet-500/40 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/unika.png" alt="Logo UNIKA" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-white text-lg">Bachelor&apos;s Degree in Computer Science (S.Kom.)</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 text-violet-400 border border-violet-500/20 w-fit">
                      Graduated
                    </span>
                  </div>
                  <p className="text-sm text-violet-400 font-medium">Universitas Katolik Santo Thomas (UNIKA)</p>
                  <p className="text-sm text-zinc-400 pt-2">Completed foundational coursework in software engineering, algorithms, database systems, and full-stack development.</p>
                </div>
              </div>

              {/* 4. Freelance */}
              <div className="p-6 rounded-2xl bg-[#09090B] border border-zinc-800 flex items-start space-x-4 hover:border-amber-500/40 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 p-2 shrink-0 flex items-center justify-center relative overflow-hidden shadow-md">
                  <Image src="/freelancer-svgrepo-com.svg" alt="Logo Freelance" width={44} height={44} className="object-contain" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-white text-lg">Freelance &amp; Software Engineer</h4>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 text-amber-400 border border-amber-500/20 w-fit">
                      Ongoing
                    </span>
                  </div>
                  <p className="text-sm text-amber-400 font-medium">Mobile &amp; Web Development Consultant</p>
                  <p className="text-sm text-zinc-400 pt-2">Building mobile applications, full-stack REST API systems, and machine learning detectors for clients and personal ventures.</p>
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
            <div className="inline-block px-4 py-1.5 bg-black border-2 border-white text-white font-mono text-sm tracking-wide mx-auto">
              Offerings
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight pt-2">Services &amp; Capabilities</h3>
            <p className="text-zinc-400">Professional services tailored for robust digital solutions.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Mobile App Development", desc: "Cross-platform mobile apps built with Flutter for iOS and Android.", icon: Smartphone, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
              { title: "AI & Prompt Engineering", desc: "Advanced AI workflow integration and prompt design for engineering tasks.", icon: Sparkles, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
              { title: "Web Application Development", desc: "Modern, responsive, and performant web apps with Next.js and React.", icon: Globe, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
              { title: "REST API Development", desc: "Secure and scalable backend APIs for seamless communication.", icon: Server, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
              { title: "Database Design & Integration", desc: "Structured relational databases using MySQL and PostgreSQL.", icon: Database, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
              { title: "Technical Education & Mentorship", desc: "Teaching coding, AI fundamentals, and basic programming for students.", icon: BookOpen, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
            ].map((srv: { title: string; desc: string; icon: React.ElementType; color: string }, idx: number) => {
              const IconComp = srv.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#111318] border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${srv.color}`}>
                    <IconComp size={24} />
                  </div>
                  <h4 className="font-bold text-white text-lg">{srv.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#111318]/50 border-t border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-block px-4 py-1.5 bg-black border-2 border-white text-white font-mono text-sm tracking-wide">
                  Contact
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight pt-2">Have an Idea? Let&apos;s Build Something Great.</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Whether you have a project in mind, need a developer, or simply want to connect, I&apos;d be happy to hear from you.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-3 text-zinc-300">
                    <Mail className="text-blue-400" size={20} />
                    <span>zebuaf2@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-zinc-300">
                    <MapPin className="text-blue-400" size={20} />
                    <span>{profileData.location}</span>
                  </div>
                </div>

                {/* Sosial Media Links di Contact */}
                <div className="pt-4 flex flex-wrap gap-3">
                  <a href="https://github.com/dafirfirman" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors" title="GitHub">
                    <SiGithub size={18} />
                  </a>
                  <a href="https://www.linkedin.com/in/firman-damai-zebua-87a113328/?isSelfProfile=true" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[#0A66C2] hover:border-zinc-700 transition-colors" title="LinkedIn">
                    <FaLinkedin size={18} />
                  </a>
                  <a href="https://www.youtube.com/@mr.coding-21" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[#FF0000] hover:border-zinc-700 transition-colors" title="YouTube">
                    <FaYoutube size={18} />
                  </a>
                  <a href="https://www.tiktok.com/@fizeb2?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:border-zinc-700 transition-colors" title="TikTok">
                    <FaTiktok size={18} />
                  </a>
                  <a href="https://www.instagram.com/firmanzeb_1202?xtok=MWNpZWY0NnFqMXk1MA==" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[#E4405F] hover:border-zinc-700 transition-colors" title="Instagram">
                    <FaInstagram size={18} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-8 rounded-2xl bg-[#09090B] border border-zinc-800 shadow-2xl">
                  {formStatus === "success" ? (
                    <div className="py-16 text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                      <p className="text-sm text-zinc-400 max-w-sm mx-auto">Thank you for reaching out. I will get back to you shortly.</p>
                      <button onClick={() => setFormStatus("idle")} className="mt-4 px-6 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-800">
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-zinc-400">Full Name</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                            placeholder="my name"
                            className="w-full px-4 py-3 rounded-xl bg-[#111318] border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-zinc-400">Email Address</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                            placeholder="my@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-[#111318] border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Subject</label>
                        <input 
                          type="text" 
                          required
                          value={formData.subject}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, subject: e.target.value})}
                          placeholder="Project Inquiry / Collaboration"
                          className="w-full px-4 py-3 rounded-xl bg-[#111318] border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Message</label>
                        <textarea 
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell me about your project or inquiry..."
                          className="w-full px-4 py-3 rounded-xl bg-[#111318] border border-zinc-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={formStatus === "submitting"}
                        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
                      >
                        <span>{formStatus === "submitting" ? "Sending..." : "Send Message"}</span>
                        <Send size={16} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-zinc-800/60 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-lg font-bold text-white">FZ<span className="text-blue-500">.</span></span>
            <p className="text-xs text-zinc-500 mt-1">&copy; {new Date().getFullYear()} Firman Damai Zebua, S.Kom. All rights reserved.</p>
          </div>

          <div className="flex items-center space-x-5 text-zinc-400">
            <a href="https://github.com/dafirfirman" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <SiGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/firman-damai-zebua-87a113328/?isSelfProfile=true" target="_blank" rel="noreferrer" className="hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.youtube.com/@mr.coding-21" target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition-colors" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>
            <a href="https://www.tiktok.com/@fizeb2?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="TikTok">
              <FaTiktok size={20} />
            </a>
            <a href="https://www.instagram.com/firmanzeb_1202?xtok=MWNpZWY0NnFqMXk1MA==" target="_blank" rel="noreferrer" className="hover:text-[#E4405F] transition-colors" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="mailto:zebuaf2@gmail.com" className="hover:text-blue-400 transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111318] border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="relative w-full h-56 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white pt-2">{selectedProject.title}</h3>
            </div>

            <div className="space-y-4 text-sm text-zinc-300">
              <div>
                <h4 className="font-semibold text-white mb-1">Overview</h4>
                <p className="text-zinc-400">{selectedProject.overview}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">Problem Statement</h4>
                <p className="text-zinc-400">{selectedProject.problemStatement}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">Proposed Solution</h4>
                <p className="text-zinc-400">{selectedProject.proposedSolution}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Key Features</h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-400">
                  {selectedProject.keyFeatures.map((feat: string, i: number) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}