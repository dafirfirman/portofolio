"use client";

import React from "react";
import { publicationsData, Publication } from "../data/projects";
import { BookOpen, ExternalLink, GraduationCap, Sparkles, FileText, Quote, Award } from "lucide-react";

interface PublicationsProps {
  lang?: "id" | "en";
  isDark?: boolean;
}

export function PublicationsSection({ lang = "id", isDark = true }: PublicationsProps) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 border font-mono text-sm tracking-wide ${
            isDark ? "bg-black border-white text-white" : "bg-slate-900 border-slate-900 text-white"
          }`}>
            <GraduationCap size={16} className="text-indigo-400" />
            <span>{lang === "id" ? "Riset Akademis" : "Academic Research"}</span>
          </div>
          <h3 className={`text-3xl sm:text-5xl font-extrabold tracking-tight pt-2 flex items-center gap-3 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            <span>{lang === "id" ? "Riset & Publikasi" : "Research & Publications"}</span>
            <FileText size={36} className="text-indigo-500 hidden sm:inline-block" />
          </h3>
          <p className={isDark ? "text-zinc-400" : "text-slate-600"}>
            {lang === "id"
              ? "Karya ilmiah, jurnal, dan makalah penelitian seputar Rekayasa Perangkat Lunak, Aplikasi Mobile, dan Machine Learning yang telah dipublikasikan."
              : "Scientific papers, journals, and research publications focusing on Software Engineering, Mobile Applications, and Machine Learning."}
          </p>
        </div>

        <div className={`flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-full border w-fit shadow-sm ${
          isDark 
            ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" 
            : "text-indigo-700 bg-indigo-50 border-indigo-200"
        }`}>
          <Award size={16} className={isDark ? "text-indigo-400" : "text-indigo-600"} />
          <span>Google Scholar Indexed</span>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        {publicationsData.map((pub: Publication) => (
          <div
            key={pub.id}
            className={`group rounded-3xl border p-8 transition-all duration-300 space-y-6 relative overflow-hidden ${
              isDark 
                ? "bg-[#111318] border-zinc-800/80 hover:border-indigo-500/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] text-zinc-300" 
                : "bg-white border-slate-200 shadow-sm hover:border-indigo-500/50 hover:shadow-xl text-slate-700"
            }`}
          >
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-all pointer-events-none" />

            {/* Top Bar: Journal Info & Link */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
              isDark ? "border-zinc-800/80" : "border-slate-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                  isDark ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-indigo-50 border-indigo-200 text-indigo-600"
                }`}>
                  <FileText size={18} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-semibold px-3.5 py-1.5 rounded-full border ${
                    isDark ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" : "text-indigo-700 bg-indigo-50 border-indigo-200"
                  }`}>
                    {pub.journalName} • {pub.year}
                  </span>
                </div>
              </div>

              <a
                href={pub.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 w-fit hover:scale-105"
              >
                <span>Google Scholar</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Main Content: Title & Authors */}
            <div className="space-y-3">
              <h4 className={`text-2xl font-bold group-hover:text-indigo-600 transition-colors flex items-start justify-between gap-3 leading-snug ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                <span>{pub.title}</span>
                <Sparkles size={20} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </h4>

              <div className={`flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-xl border w-fit ${
                isDark ? "text-indigo-400/90 bg-indigo-950/30 border-indigo-500/10" : "text-indigo-700 bg-indigo-50 border-indigo-200"
              }`}>
                <BookOpen size={16} className={isDark ? "text-indigo-400" : "text-indigo-600"} />
                <span>{lang === "id" ? "Penulis" : "Authors"}: {pub.authors}</span>
              </div>
            </div>

            {/* Abstract */}
            <div className={`p-5 rounded-2xl border space-y-2 relative ${
              isDark ? "bg-zinc-950/60 border-zinc-800/60" : "bg-slate-50 border-slate-200"
            }`}>
              <Quote size={20} className="text-indigo-500/30 absolute top-3 right-4 pointer-events-none" />
              <span className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}>
                {lang === "id" ? "Abstrak Penelitian" : "Research Abstract"}
              </span>
              <p className={`text-sm leading-relaxed italic ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                &ldquo;{lang === "id" ? pub.abstract.id : pub.abstract.en}&rdquo;
              </p>
            </div>

            {/* Topic Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {pub.topics.map((topic: string, index: number) => (
                  <span
                    key={index}
                    className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                      isDark 
                        ? "text-zinc-400 bg-zinc-900 border-zinc-800 hover:border-indigo-500/30 hover:text-white" 
                        : "text-slate-600 bg-slate-100 border-slate-200 hover:border-indigo-300 hover:text-slate-900"
                    }`}
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}