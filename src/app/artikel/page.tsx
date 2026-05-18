"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun, Shield, Heart, Stars, ChevronRight } from "lucide-react";

const articles = [
  {
    title: "Panduan Shalat Fardhu",
    category: "Salah",
    icon: Sun,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    excerpt: "Tata cara shalat 5 waktu sesuai tuntunan Rasulullah SAW lengkap dengan bacaannya.",
  },
  {
    title: "Dzikir Pagi & Petang",
    category: "After Salah",
    icon: Moon,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    excerpt: "Kumpulan doa dan dzikir harian untuk ketenangan jiwa dan perlindungan Allah.",
  },
  {
    title: "Ayat-Ayat Ruqyah Mandiri",
    category: "Protection",
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-50",
    excerpt: "Cara membentengi diri dari gangguan jin dan sihir dengan ayat-ayat Al-Quran.",
  },
  {
    title: "Memahami Asmaul Husna",
    category: "Praises",
    icon: Stars,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    excerpt: "Mengenal nama-nama Allah yang indah dan keutamaan mengamalkannya dalam doa.",
  },
  {
    title: "Keutamaan Shalawat Nabi",
    category: "Salawat",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    excerpt: "Mengapa kita harus bershalawat dan apa saja manfaatnya di dunia dan akhirat.",
  },
];

export default function ArtikelPage() {
  return (
    <main className="min-h-screen bg-background pb-20 transition-colors duration-300">
      <div className="bg-secondary pt-28 md:pt-32 pb-32 px-6 transition-colors duration-300">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/50 font-bold mb-8 hover:text-primary transition-all">
            <ArrowLeft size={20} /> Kembali
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Artikel & Panduan</h1>
          <p className="text-foreground/70 text-lg max-w-2xl">Perdalam wawasan keislaman Anda melalui artikel pilihan yang bersumber dari dalil yang shahih.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div key={art.title} className="bg-card rounded-[32px] overflow-hidden soft-shadow border border-border group hover:border-primary/40 transition-all duration-300">
              <div className={`h-48 ${art.bgColor} flex items-center justify-center relative overflow-hidden transition-colors`}>
                <art.icon size={80} className={`${art.color} opacity-20 scale-150 absolute`} />
                <art.icon size={64} className={`${art.color} relative z-10`} />
              </div>
              <div className="p-8">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${art.color} bg-card px-3 py-1 rounded-full soft-shadow inline-block mb-4 border border-border`}>
                  {art.category}
                </span>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{art.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6">{art.excerpt}</p>
                <Link href="#" className="flex items-center gap-2 font-bold text-sm text-primary hover:gap-3 transition-all">
                  Baca Selengkapnya <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
