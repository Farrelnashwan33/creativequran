"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Book, Search, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const allSurahs = [
  { id: 1, name: "Al-Fatihah", verses: 7, city: "Makkiyah", arabic: "الفاتحة" },
  { id: 2, name: "Al-Baqarah", verses: 286, city: "Madaniyah", arabic: "البقرة" },
  { id: 3, name: "Ali 'Imran", verses: 200, city: "Madaniyah", arabic: "آل عمران" },
  { id: 4, name: "An-Nisa", verses: 176, city: "Madaniyah", arabic: "النساء" },
  { id: 5, name: "Al-Ma'idah", verses: 120, city: "Madaniyah", arabic: "المائدة" },
  { id: 6, name: "Al-An'am", verses: 165, city: "Makkiyah", arabic: "الأنعام" },
  { id: 7, name: "Al-A'raf", verses: 206, city: "Makkiyah", arabic: "الأعراف" },
  { id: 8, name: "Al-Anfal", verses: 75, city: "Madaniyah", arabic: "الأنفال" },
  { id: 9, name: "At-Tawbah", verses: 129, city: "Madaniyah", arabic: "التوبة" },
  { id: 10, name: "Yunus", verses: 109, city: "Makkiyah", arabic: "يونس" },
  { id: 11, name: "Hud", verses: 123, city: "Makkiyah", arabic: "هود" },
  { id: 12, name: "Yusuf", verses: 111, city: "Makkiyah", arabic: "يوسف" },
  { id: 13, name: "Ar-Ra'd", verses: 43, city: "Madaniyah", arabic: "الرعد" },
  { id: 14, name: "Ibrahim", verses: 52, city: "Makkiyah", arabic: "ابراهيم" },
  { id: 15, name: "Al-Hijr", verses: 99, city: "Makkiyah", arabic: "الحجر" },
  { id: 16, name: "An-Nahl", verses: 128, city: "Makkiyah", arabic: "النحل" },
  { id: 17, name: "Al-Isra'", verses: 111, city: "Makkiyah", arabic: "الإسراء" },
  { id: 18, name: "Al-Kahf", verses: 110, city: "Makkiyah", arabic: "الكهف" },
  { id: 19, name: "Maryam", verses: 98, city: "Makkiyah", arabic: "مريم" },
  { id: 20, name: "Ta-Ha", verses: 135, city: "Makkiyah", arabic: "طه" },
  { id: 21, name: "Al-Anbiya'", verses: 112, city: "Makkiyah", arabic: "الأنبياء" },
  { id: 22, name: "Al-Hajj", verses: 78, city: "Madaniyah", arabic: "الحج" },
  { id: 23, name: "Al-Mu'minun", verses: 118, city: "Makkiyah", arabic: "المؤمنون" },
  { id: 24, name: "An-Nur", verses: 64, city: "Madaniyah", arabic: "النور" },
  { id: 25, name: "Al-Furqan", verses: 77, city: "Makkiyah", arabic: "الفرقان" },
  { id: 26, name: "Asy-Syu'ara'", verses: 227, city: "Makkiyah", arabic: "الشعراء" },
  { id: 27, name: "An-Naml", verses: 93, city: "Makkiyah", arabic: "النمل" },
  { id: 28, name: "Al-Qashash", verses: 88, city: "Makkiyah", arabic: "القصص" },
  { id: 29, name: "Al-'Ankabut", verses: 69, city: "Makkiyah", arabic: "العنكبوت" },
  { id: 30, name: "Ar-Rum", verses: 60, city: "Makkiyah", arabic: "الروم" },
  { id: 31, name: "Luqman", verses: 34, city: "Makkiyah", arabic: "لقمان" },
  { id: 32, name: "As-Sajdah", verses: 30, city: "Makkiyah", arabic: "السجدة" },
  { id: 33, name: "Al-Ahzab", verses: 73, city: "Madaniyah", arabic: "الأحزاب" },
  { id: 34, name: "Saba'", verses: 54, city: "Makkiyah", arabic: "سبإ" },
  { id: 35, name: "Fathir", verses: 45, city: "Makkiyah", arabic: "فاطر" },
  { id: 36, name: "Ya-Sin", verses: 83, city: "Makkiyah", arabic: "يس" },
  { id: 37, name: "Ash-Shaffat", verses: 182, city: "Makkiyah", arabic: "الصافات" },
  { id: 38, name: "Shad", verses: 88, city: "Makkiyah", arabic: "ص" },
  { id: 39, name: "Az-Zumar", verses: 75, city: "Makkiyah", arabic: "الزمر" },
  { id: 40, name: "Ghafir", verses: 85, city: "Makkiyah", arabic: "غافر" },
  { id: 41, name: "Fushshilat", verses: 54, city: "Makkiyah", arabic: "فصلت" },
  { id: 42, name: "Asy-Syura", verses: 53, city: "Makkiyah", arabic: "الشورى" },
  { id: 43, name: "Az-Zukhruf", verses: 89, city: "Makkiyah", arabic: "الزخرف" },
  { id: 44, name: "Ad-Dukhan", verses: 59, city: "Makkiyah", arabic: "الدخان" },
  { id: 45, name: "Al-Jatsiyah", verses: 37, city: "Makkiyah", arabic: "الجاثية" },
  { id: 46, name: "Al-Ahqaf", verses: 35, city: "Makkiyah", arabic: "الأحقاف" },
  { id: 47, name: "Muhammad", verses: 38, city: "Madaniyah", arabic: "محمد" },
  { id: 48, name: "Al-Fath", verses: 29, city: "Madaniyah", arabic: "الفتح" },
  { id: 49, name: "Al-Hujurat", verses: 18, city: "Madaniyah", arabic: "الحجرات" },
  { id: 50, name: "Qaf", verses: 45, city: "Makkiyah", arabic: "ق" },
  { id: 51, name: "Adz-Dzariyat", verses: 60, city: "Makkiyah", arabic: "الذاريات" },
  { id: 52, name: "Ath-Thur", verses: 49, city: "Makkiyah", arabic: "الطور" },
  { id: 53, name: "An-Najm", verses: 62, city: "Makkiyah", arabic: "النجم" },
  { id: 54, name: "Al-Qamar", verses: 55, city: "Makkiyah", arabic: "القمر" },
  { id: 55, name: "Ar-Rahman", verses: 78, city: "Madaniyah", arabic: "الرحمن" },
  { id: 56, name: "Al-Waqi'ah", verses: 96, city: "Makkiyah", arabic: "الواقعة" },
  { id: 57, name: "Al-Hadid", verses: 29, city: "Madaniyah", arabic: "الحديد" },
  { id: 58, name: "Al-Mujadilah", verses: 22, city: "Madaniyah", arabic: "المجادلة" },
  { id: 59, name: "Al-Hasyr", verses: 24, city: "Madaniyah", arabic: "الحشر" },
  { id: 60, name: "Al-Mumtahanah", verses: 13, city: "Madaniyah", arabic: "الممتحنة" },
  { id: 61, name: "Ash-Shaff", verses: 14, city: "Madaniyah", arabic: "الصف" },
  { id: 62, name: "Al-Jumu'ah", verses: 11, city: "Madaniyah", arabic: "الجمعة" },
  { id: 63, name: "Al-Munafiqun", verses: 11, city: "Madaniyah", arabic: "المنافقون" },
  { id: 64, name: "At-Taghabun", verses: 18, city: "Madaniyah", arabic: "التغابن" },
  { id: 65, name: "Ath-Thalaq", verses: 12, city: "Madaniyah", arabic: "الطلاق" },
  { id: 66, name: "At-Tahrim", verses: 12, city: "Madaniyah", arabic: "التحريم" },
  { id: 67, name: "Al-Mulk", verses: 30, city: "Makkiyah", arabic: "الملك" },
  { id: 68, name: "Al-Qalam", verses: 52, city: "Makkiyah", arabic: "القلم" },
  { id: 69, name: "Al-Haqqah", verses: 52, city: "Makkiyah", arabic: "الحاقة" },
  { id: 70, name: "Al-Ma'arij", verses: 44, city: "Makkiyah", arabic: "المعارج" },
  { id: 71, name: "Nuh", verses: 28, city: "Makkiyah", arabic: "نوح" },
  { id: 72, name: "Al-Jinn", verses: 28, city: "Makkiyah", arabic: "الجن" },
  { id: 73, name: "Al-Muzzammil", verses: 20, city: "Makkiyah", arabic: "المزمل" },
  { id: 74, name: "Al-Muddatstsir", verses: 56, city: "Makkiyah", arabic: "المدثر" },
  { id: 75, name: "Al-Qiyamah", verses: 40, city: "Makkiyah", arabic: "القيامة" },
  { id: 76, name: "Al-Insan", verses: 31, city: "Madaniyah", arabic: "الانسان" },
  { id: 77, name: "Al-Mursalat", verses: 50, city: "Makkiyah", arabic: "المرسلات" },
  { id: 78, name: "An-Naba'", verses: 40, city: "Makkiyah", arabic: "النبأ" },
  { id: 79, name: "An-Nazi'at", verses: 46, city: "Makkiyah", arabic: "النازعات" },
  { id: 80, name: "'Abasa", verses: 42, city: "Makkiyah", arabic: "عبس" },
  { id: 81, name: "At-Takwir", verses: 29, city: "Makkiyah", arabic: "التكوير" },
  { id: 82, name: "Al-Infithar", verses: 19, city: "Makkiyah", arabic: "الانفطار" },
  { id: 83, name: "Al-Muthaffifin", verses: 36, city: "Makkiyah", arabic: "المطففين" },
  { id: 84, name: "Al-Insyiqaq", verses: 25, city: "Makkiyah", arabic: "الانشقاق" },
  { id: 85, name: "Al-Buruj", verses: 22, city: "Makkiyah", arabic: "البروج" },
  { id: 86, name: "Ath-Thariq", verses: 17, city: "Makkiyah", arabic: "الطارق" },
  { id: 87, name: "Al-A'la", verses: 19, city: "Makkiyah", arabic: "الأعلى" },
  { id: 88, name: "Al-Ghasyiyah", verses: 26, city: "Makkiyah", arabic: "الغاشية" },
  { id: 89, name: "Al-Fajr", verses: 30, city: "Makkiyah", arabic: "الفجر" },
  { id: 90, name: "Al-Balad", verses: 20, city: "Makkiyah", arabic: "البلد" },
  { id: 91, name: "Asy-Syams", verses: 15, city: "Makkiyah", arabic: "الشمس" },
  { id: 92, name: "Al-Layl", verses: 21, city: "Makkiyah", arabic: "الليل" },
  { id: 93, name: "Ad-Duha", verses: 11, city: "Makkiyah", arabic: "الضحى" },
  { id: 94, name: "Asy-Syarh", verses: 8, city: "Makkiyah", arabic: "الشرح" },
  { id: 95, name: "At-Tin", verses: 8, city: "Makkiyah", arabic: "التين" },
  { id: 96, name: "Al-'Alaq", verses: 19, city: "Makkiyah", arabic: "العلق" },
  { id: 97, name: "Al-Qadr", verses: 5, city: "Makkiyah", arabic: "القدر" },
  { id: 98, name: "Al-Bayyinah", verses: 8, city: "Madaniyah", arabic: "البينة" },
  { id: 99, name: "Al-Zalzalah", verses: 8, city: "Madaniyah", arabic: "الزلزلة" },
  { id: 100, name: "Al-'Adiyat", verses: 11, city: "Makkiyah", arabic: "العاديات" },
  { id: 101, name: "Al-Qari'ah", verses: 11, city: "Makkiyah", arabic: "القارعة" },
  { id: 102, name: "At-Takatsur", verses: 8, city: "Makkiyah", arabic: "التكاثر" },
  { id: 103, name: "Al-'Ashr", verses: 3, city: "Makkiyah", arabic: "العصر" },
  { id: 104, name: "Al-Humazah", verses: 9, city: "Makkiyah", arabic: "الهمزة" },
  { id: 105, name: "Al-Fil", verses: 5, city: "Makkiyah", arabic: "الفيل" },
  { id: 106, name: "Quraisy", verses: 4, city: "Makkiyah", arabic: "قريش" },
  { id: 107, name: "Al-Ma'un", verses: 7, city: "Makkiyah", arabic: "الماعون" },
  { id: 108, name: "Al-Kautsar", verses: 3, city: "Makkiyah", arabic: "الكوثر" },
  { id: 109, name: "Al-Kafirun", verses: 6, city: "Makkiyah", arabic: "الكافرون" },
  { id: 110, name: "An-Nashr", verses: 3, city: "Madaniyah", arabic: "النصر" },
  { id: 111, name: "Al-Lahab", verses: 5, city: "Makkiyah", arabic: "اللمس" },
  { id: 112, name: "Al-Ikhlas", verses: 4, city: "Makkiyah", arabic: "الإخلاص" },
  { id: 113, name: "Al-Falaq", verses: 5, city: "Makkiyah", arabic: "الفلق" },
  { id: 114, name: "An-Nas", verses: 6, city: "Makkiyah", arabic: "الناس" },
];

export default function MushafPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("semua");

  const filteredSurahs = allSurahs.filter(s => 
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toString() === search) &&
    (activeTab === "semua" || s.city.toLowerCase() === activeTab)
  );

  return (
    <main className="min-h-screen bg-background pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="primary-gradient pt-20 pb-32 px-6 relative">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 font-bold mb-8 hover:text-white transition-all">
            <ArrowLeft size={20} /> Kembali
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white/80 mb-4">
                🕌 Sumber Resmi Kemenag RI
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Mushaf Digital</h1>
              <p className="text-white/70 text-lg">Baca Al-Quran dengan standar Mushaf Madani Kemenag RI.</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Book size={32} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-12">
        {/* Search and Filter Section */}
        <div className="bg-card/70 backdrop-blur-xl p-4 md:p-6 rounded-[32px] soft-shadow border border-border flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 mb-12 transition-colors duration-300">
          <div className="flex-1 flex items-center gap-4 bg-secondary px-6 py-4 rounded-2xl border border-border focus-within:border-primary/30 transition-all">
            <Search size={22} className="text-primary/40 shrink-0" />
            <input 
              type="text" 
              placeholder="Cari surah (misal: Al-Kahf atau 18)..." 
              className="bg-transparent outline-none w-full font-semibold text-foreground placeholder:text-foreground/20 text-sm md:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex p-1 bg-secondary rounded-2xl border border-border w-full md:w-auto transition-colors">
            {["Semua", "Makkiyah", "Madaniyah"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 md:flex-none text-center px-4 md:px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.toLowerCase() 
                  ? "bg-card text-primary soft-shadow font-extrabold" 
                  : "text-foreground/50 hover:text-foreground/80 font-semibold"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Surah List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {filteredSurahs.map((surah) => (
            <Link href={`/mushaf/${surah.id}`} key={surah.id}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card p-5 md:p-6 rounded-[30px] soft-shadow border border-border flex flex-col justify-between group cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition-all h-full relative overflow-hidden duration-300"
              >
                {/* Decorative background element */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <svg width="48" height="48" viewBox="0 0 100 100" className="text-secondary group-hover:text-primary/10 transition-colors">
                        <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-sm text-primary group-hover:text-primary transition-colors">
                        {surah.id}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{surah.name}</h3>
                      <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{surah.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-arabic text-foreground/90 group-hover:text-primary transition-colors">{surah.arabic}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/80">
                  <span className="text-xs font-bold text-foreground/40 group-hover:text-primary transition-colors">{surah.verses} Ayat</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    MULAI BACA <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
