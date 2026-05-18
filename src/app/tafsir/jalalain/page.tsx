"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search, Download, ChevronRight } from "lucide-react";

const allSurahs = [
  { id: 1, name: "Al-Fatihah", verses: 7, city: "Makkiyah" },
  { id: 2, name: "Al-Baqarah", verses: 286, city: "Madaniyah" },
  { id: 3, name: "Ali 'Imran", verses: 200, city: "Madaniyah" },
  { id: 4, name: "An-Nisa", verses: 176, city: "Madaniyah" },
  { id: 5, name: "Al-Ma'idah", verses: 120, city: "Madaniyah" },
  { id: 6, name: "Al-An'am", verses: 165, city: "Makkiyah" },
  { id: 7, name: "Al-A'raf", verses: 206, city: "Makkiyah" },
  { id: 8, name: "Al-Anfal", verses: 75, city: "Madaniyah" },
  { id: 9, name: "At-Tawbah", verses: 129, city: "Madaniyah" },
  { id: 10, name: "Yunus", verses: 109, city: "Makkiyah" },
  { id: 11, name: "Hud", verses: 123, city: "Makkiyah" },
  { id: 12, name: "Yusuf", verses: 111, city: "Makkiyah" },
  { id: 13, name: "Ar-Ra'd", verses: 43, city: "Madaniyah" },
  { id: 14, name: "Ibrahim", verses: 52, city: "Makkiyah" },
  { id: 15, name: "Al-Hijr", verses: 99, city: "Makkiyah" },
  { id: 16, name: "An-Nahl", verses: 128, city: "Makkiyah" },
  { id: 17, name: "Al-Isra'", verses: 111, city: "Makkiyah" },
  { id: 18, name: "Al-Kahf", verses: 110, city: "Makkiyah" },
  { id: 19, name: "Maryam", verses: 98, city: "Makkiyah" },
  { id: 20, name: "Ta-Ha", verses: 135, city: "Makkiyah" },
  { id: 21, name: "Al-Anbiya'", verses: 112, city: "Makkiyah" },
  { id: 22, name: "Al-Hajj", verses: 78, city: "Madaniyah" },
  { id: 23, name: "Al-Mu'minun", verses: 118, city: "Makkiyah" },
  { id: 24, name: "An-Nur", verses: 64, city: "Madaniyah" },
  { id: 25, name: "Al-Furqan", verses: 77, city: "Makkiyah" },
  { id: 26, name: "Asy-Syu'ara'", verses: 227, city: "Makkiyah" },
  { id: 27, name: "An-Naml", verses: 93, city: "Makkiyah" },
  { id: 28, name: "Al-Qashash", verses: 88, city: "Makkiyah" },
  { id: 29, name: "Al-'Ankabut", verses: 69, city: "Makkiyah" },
  { id: 30, name: "Ar-Rum", verses: 60, city: "Makkiyah" },
  { id: 31, name: "Luqman", verses: 34, city: "Makkiyah" },
  { id: 32, name: "As-Sajdah", verses: 30, city: "Makkiyah" },
  { id: 33, name: "Al-Ahzab", verses: 73, city: "Madaniyah" },
  { id: 34, name: "Saba'", verses: 54, city: "Makkiyah" },
  { id: 35, name: "Fathir", verses: 45, city: "Makkiyah" },
  { id: 36, name: "Ya-Sin", verses: 83, city: "Makkiyah" },
  { id: 37, name: "Ash-Shaffat", verses: 182, city: "Makkiyah" },
  { id: 38, name: "Shad", verses: 88, city: "Makkiyah" },
  { id: 39, name: "Az-Zumar", verses: 75, city: "Makkiyah" },
  { id: 40, name: "Ghafir", verses: 85, city: "Makkiyah" },
  { id: 41, name: "Fushshilat", verses: 54, city: "Makkiyah" },
  { id: 42, name: "Asy-Syura", verses: 53, city: "Makkiyah" },
  { id: 43, name: "Az-Zukhruf", verses: 89, city: "Makkiyah" },
  { id: 44, name: "Ad-Dukhan", verses: 59, city: "Makkiyah" },
  { id: 45, name: "Al-Jatsiyah", verses: 37, city: "Makkiyah" },
  { id: 46, name: "Al-Ahqaf", verses: 35, city: "Makkiyah" },
  { id: 47, name: "Muhammad", verses: 38, city: "Madaniyah" },
  { id: 48, name: "Al-Fath", verses: 29, city: "Madaniyah" },
  { id: 49, name: "Al-Hujurat", verses: 18, city: "Madaniyah" },
  { id: 50, name: "Qaf", verses: 45, city: "Makkiyah" },
  { id: 51, name: "Adz-Dzariyat", verses: 60, city: "Makkiyah" },
  { id: 52, name: "Ath-Thur", verses: 49, city: "Makkiyah" },
  { id: 53, name: "An-Najm", verses: 62, city: "Makkiyah" },
  { id: 54, name: "Al-Qamar", verses: 55, city: "Makkiyah" },
  { id: 55, name: "Ar-Rahman", verses: 78, city: "Madaniyah" },
  { id: 56, name: "Al-Waqi'ah", verses: 96, city: "Makkiyah" },
  { id: 57, name: "Al-Hadid", verses: 29, city: "Madaniyah" },
  { id: 58, name: "Al-Mujadilah", verses: 22, city: "Madaniyah" },
  { id: 59, name: "Al-Hasyr", verses: 24, city: "Madaniyah" },
  { id: 60, name: "Al-Mumtahanah", verses: 13, city: "Madaniyah" },
  { id: 61, name: "Ash-Shaff", verses: 14, city: "Madaniyah" },
  { id: 62, name: "Al-Jumu'ah", verses: 11, city: "Madaniyah" },
  { id: 63, name: "Al-Munafiqun", verses: 11, city: "Madaniyah" },
  { id: 64, name: "At-Taghabun", verses: 18, city: "Madaniyah" },
  { id: 65, name: "Ath-Thalaq", verses: 12, city: "Madaniyah" },
  { id: 66, name: "At-Tahrim", verses: 12, city: "Madaniyah" },
  { id: 67, name: "Al-Mulk", verses: 30, city: "Makkiyah" },
  { id: 68, name: "Al-Qalam", verses: 52, city: "Makkiyah" },
  { id: 69, name: "Al-Haqqah", verses: 52, city: "Makkiyah" },
  { id: 70, name: "Al-Ma'arij", verses: 44, city: "Makkiyah" },
  { id: 71, name: "Nuh", verses: 28, city: "Makkiyah" },
  { id: 72, name: "Al-Jinn", verses: 28, city: "Makkiyah" },
  { id: 73, name: "Al-Muzzammil", verses: 20, city: "Makkiyah" },
  { id: 74, name: "Al-Muddatstsir", verses: 56, city: "Makkiyah" },
  { id: 75, name: "Al-Qiyamah", verses: 40, city: "Makkiyah" },
  { id: 76, name: "Al-Insan", verses: 31, city: "Madaniyah" },
  { id: 77, name: "Al-Mursalat", verses: 50, city: "Makkiyah" },
  { id: 78, name: "An-Naba'", verses: 40, city: "Makkiyah" },
  { id: 79, name: "An-Nazi'at", verses: 46, city: "Makkiyah" },
  { id: 80, name: "'Abasa", verses: 42, city: "Makkiyah" },
  { id: 81, name: "At-Takwir", verses: 29, city: "Makkiyah" },
  { id: 82, name: "Al-Infithar", verses: 19, city: "Makkiyah" },
  { id: 83, name: "Al-Muthaffifin", verses: 36, city: "Makkiyah" },
  { id: 84, name: "Al-Insyiqaq", verses: 25, city: "Makkiyah" },
  { id: 85, name: "Al-Buruj", verses: 22, city: "Makkiyah" },
  { id: 86, name: "Ath-Thariq", verses: 17, city: "Makkiyah" },
  { id: 87, name: "Al-A'la", verses: 19, city: "Makkiyah" },
  { id: 88, name: "Al-Ghasyiyah", verses: 26, city: "Makkiyah" },
  { id: 89, name: "Al-Fajr", verses: 30, city: "Makkiyah" },
  { id: 90, name: "Al-Balad", verses: 20, city: "Makkiyah" },
  { id: 91, name: "Asy-Syams", verses: 15, city: "Makkiyah" },
  { id: 92, name: "Al-Layl", verses: 21, city: "Makkiyah" },
  { id: 93, name: "Ad-Duha", verses: 11, city: "Makkiyah" },
  { id: 94, name: "Asy-Syarh", verses: 8, city: "Makkiyah" },
  { id: 95, name: "At-Tin", verses: 8, city: "Makkiyah" },
  { id: 96, name: "Al-'Alaq", verses: 19, city: "Makkiyah" },
  { id: 97, name: "Al-Qadr", verses: 5, city: "Makkiyah" },
  { id: 98, name: "Al-Bayyinah", verses: 8, city: "Madaniyah" },
  { id: 99, name: "Al-Zalzalah", verses: 8, city: "Madaniyah" },
  { id: 100, name: "Al-'Adiyat", verses: 11, city: "Makkiyah" },
  { id: 101, name: "Al-Qari'ah", verses: 11, city: "Makkiyah" },
  { id: 102, name: "At-Takatsur", verses: 8, city: "Makkiyah" },
  { id: 103, name: "Al-'Ashr", verses: 3, city: "Makkiyah" },
  { id: 104, name: "Al-Humazah", verses: 9, city: "Makkiyah" },
  { id: 105, name: "Al-Fil", verses: 5, city: "Makkiyah" },
  { id: 106, name: "Quraisy", verses: 4, city: "Makkiyah" },
  { id: 107, name: "Al-Ma'un", verses: 7, city: "Makkiyah" },
  { id: 108, name: "Al-Kautsar", verses: 3, city: "Makkiyah" },
  { id: 109, name: "Al-Kafirun", verses: 6, city: "Makkiyah" },
  { id: 110, name: "An-Nashr", verses: 3, city: "Madaniyah" },
  { id: 111, name: "Al-Lahab", verses: 5, city: "Makkiyah" },
  { id: 112, name: "Al-Ikhlas", verses: 4, city: "Makkiyah" },
  { id: 113, name: "Al-Falaq", verses: 5, city: "Makkiyah" },
  { id: 114, name: "An-Nas", verses: 6, city: "Makkiyah" },
];

export default function JalalainPage() {
  const [search, setSearch] = useState("");

  const filteredSurahs = allSurahs.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toString() === search
  );

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(["Tafsir Jalalain - Ringkas & Padat\n\nSelamat mempelajari tafsir."], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Tafsir_Jalalain.txt";
    document.body.appendChild(element);
    element.click();
    alert("Berhasil! File Tafsir Jalalain sedang diunduh.");
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7] pb-20">
      {/* Header Section */}
      <div className="bg-[#F76B1C] pt-28 md:pt-32 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/honey-comb.png')] pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/70 font-bold mb-8 hover:text-white transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <BookOpen size={30} />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                  Ringkas & Padat
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Tafsir Jalalain</h1>
              <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                Akses cepat tafsir ringkas 114 Surah karya Imam Jalaluddin Al-Mahalli dan Jalaluddin As-Suyuti.
              </p>
            </div>
            
            <button 
              onClick={handleDownload}
              className="flex items-center gap-3 bg-white text-[#F76B1C] px-8 py-4 rounded-2xl font-bold soft-shadow hover:bg-orange-50 transition-all active:scale-95"
            >
              <Download size={22} /> Simpan PDF Lengkap
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-[24px] soft-shadow border border-orange-100 mb-12 flex items-center gap-4">
          <div className="bg-orange-50 p-3 rounded-xl text-[#F76B1C]/40">
            <Search size={24} />
          </div>
          <input 
            type="text" 
            placeholder="Cari surah Jalalain..." 
            className="flex-1 bg-transparent outline-none text-lg font-medium text-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Surah Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSurahs.map((surah) => (
            <Link 
              key={surah.id}
              href={`/tafsir/jalalain/${surah.id}`}
              className="bg-white p-6 rounded-[28px] soft-shadow border border-orange-50 hover:border-orange-200 group cursor-pointer transition-all hover:translate-y-[-4px] block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#F76B1C] font-bold text-sm group-hover:bg-[#F76B1C] group-hover:text-white transition-colors">
                  {surah.id}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 group-hover:text-[#F76B1C] transition-colors">
                  {surah.city}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-[#F76B1C] transition-colors">
                  {surah.name}
                </h3>
                <p className="text-xs text-foreground/50">{surah.verses} Ayat</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-orange-50">
                <span className="text-xs font-bold text-[#F76B1C]">Buka Tafsir</span>
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-foreground/40 group-hover:bg-[#F76B1C]/10 group-hover:text-[#F76B1C] transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
