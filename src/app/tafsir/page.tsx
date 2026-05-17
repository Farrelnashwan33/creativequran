"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronRight, Star } from "lucide-react";

const tafsirBooks = [
  {
    title: "Tafsir Ibnu Katsir",
    author: "Ismail bin Katsir",
    description: "Tafsir paling populer yang merujuk pada ayat Al-Quran, hadits, dan riwayat sahabat.",
    href: "/tafsir/ibnu-katsir",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Terpopuler",
  },
  {
    title: "Tafsir Jalalain",
    author: "Jalaluddin Al-Mahalli & As-Suyuti",
    description: "Tafsir ringkas dan padat yang memudahkan pemahaman makna dasar setiap ayat.",
    href: "/tafsir/jalalain",
    bgColor: "bg-orange-50",
    iconColor: "text-[#F76B1C]",
    badge: "Ringkas",
  },
];

export default function TafsirIndexPage() {
  return (
    <main className="min-h-screen bg-background pb-20 transition-colors duration-300">
      <div className="bg-foreground pt-20 pb-32 px-6 transition-colors duration-300">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 font-bold mb-8 hover:text-white transition-all">
            <ArrowLeft size={20} /> Kembali
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4">
            📚 Sumber: Kemenag RI & Mufassir Terpercaya
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Perpustakaan Tafsir</h1>
          <p className="text-white/40 text-lg max-w-2xl">Pilih kitab tafsir untuk memperdalam pemahaman makna ayat Al-Quran sesuai standar Kemenag RI.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {tafsirBooks.map((book) => (
            <Link key={book.title} href={book.href} className="bg-card p-8 rounded-[40px] soft-shadow border border-border group hover:border-primary/40 transition-all flex flex-col h-full duration-300">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-2xl ${book.bgColor} flex items-center justify-center ${book.iconColor}`}>
                  <BookOpen size={32} />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${book.bgColor} ${book.iconColor}`}>
                  {book.badge}
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{book.title}</h2>
                <p className="text-sm text-foreground/40 mb-4 font-medium italic">Karya: {book.author}</p>
                <p className="text-foreground/70 leading-relaxed">{book.description}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <span className="font-bold text-sm text-primary">Mulai Belajar</span>
                <div className={`w-10 h-10 rounded-full ${book.bgColor} flex items-center justify-center ${book.iconColor} group-hover:scale-110 transition-transform`}>
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/50 text-foreground/40 text-sm font-medium border border-border">
            <Star size={16} className="text-yellow-500" /> Lebih banyak kitab tafsir akan segera hadir
          </div>
        </div>
      </div>
    </main>
  );
}
