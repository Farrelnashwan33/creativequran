"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Play, 
  Check, 
  CheckCircle, 
  Search, 
  Video, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  Heart, 
  X, 
  Clock, 
  Share2, 
  Award,
  BookMarked
} from "lucide-react";

interface VideoItem {
  id: string; // YouTube Video ID
  title: string;
  speaker: string;
  category: string;
  level: "Pemula" | "Menengah" | "Umum";
  duration: string;
  description: string;
  featured?: boolean;
}

const videos: VideoItem[] = [
  {
    id: "gkPX_g0G9H8",
    title: "Luasnya Kasih Sayang Allah",
    speaker: "Ustadz Adi Hidayat",
    category: "Dakwah & Kajian",
    level: "Umum",
    duration: "14:15",
    description: "Penjelasan mendalam tentang bagaimana kasih sayang Allah sangat luas dan memberikan ketenangan spiritual dalam menghadapi berbagai dinamika kehidupan.",
    featured: true,
  },
  {
    id: "KSTT_EadWq8",
    title: "Tadabbur Al-Qur'an - Penenang Jiwa",
    speaker: "Ustadz Hanan Attaki",
    category: "Dakwah & Kajian",
    level: "Umum",
    duration: "24:40",
    description: "Menggali hikmah di balik ayat-ayat suci, tips istiqamah, serta bagaimana menghidupkan tadabbur Al-Quran dalam keseharian kita.",
  },
  {
    id: "fVpf6_UeP-o",
    title: "Belajar Makharijul Huruf (Al-Jauf & Al-Halaq)",
    speaker: "Ustadz Hardi Damri, Lc",
    category: "Belajar Makhraj",
    level: "Pemula",
    duration: "15:45",
    description: "Panduan dasar pengucapan makhraj huruf hijaiyah dari rongga mulut dan tenggorokan secara praktis dan detail.",
  },
  {
    id: "RgHTcKvpMyk",
    title: "Praktik Makhraj Huruf Bab Al Lisan (Lidah)",
    speaker: "Ustadz Hardi Damri, Lc",
    category: "Belajar Makhraj",
    level: "Pemula",
    duration: "12:10",
    description: "Latihan praktis melafalkan huruf-huruf dari makhraj lisan agar terhindar dari kesalahan fatal saat membaca Al-Quran.",
  },
  {
    id: "BqNn6_VMFZE",
    title: "Cara Cepat Belajar Membaca Al-Quran dari Nol",
    speaker: "IRSSAT Official",
    category: "Tahsin & Tajwid",
    level: "Pemula",
    duration: "28:30",
    description: "Metode ringkas dan efektif belajar membaca Al-Quran bagi pemula yang ingin memulai dari nol dengan percaya diri.",
  },
  {
    id: "k0EBQioLCR0",
    title: "Murattal Surah Pilihan Penenang Hati",
    speaker: "Muzammil Hasballah",
    category: "Hafalan & Murattal",
    level: "Menengah",
    duration: "55:15",
    description: "Lantunan ayat suci Al-Quran surah pilihan dengan irama yang merdu untuk menemani aktivitas harian Anda.",
  }
];

const categories = ["Semua", "Belajar Makhraj", "Tahsin & Tajwid", "Dakwah & Kajian", "Hafalan & Murattal"];

export default function VideoKajianPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [shareCopied, setShareCopied] = useState<string | null>(null);

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("creative-quran-watched-videos");
    if (saved) {
      try {
        setWatchedVideos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed parsing watched videos", e);
      }
    }
  }, []);

  const toggleWatched = (id: string) => {
    const next = watchedVideos.includes(id)
      ? watchedVideos.filter((v) => v !== id)
      : [...watchedVideos, id];
    setWatchedVideos(next);
    localStorage.setItem("creative-quran-watched-videos", JSON.stringify(next));
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === "Semua" || video.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredVideo = videos.find((v) => v.featured);
  const watchedCount = watchedVideos.length;

  return (
    <main className="min-h-screen bg-background pb-24 transition-colors duration-300">
      {/* Decorative radial glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Header */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/50 font-bold mb-8 hover:text-primary transition-all hover:-translate-x-1 group">
            <ArrowLeft size={20} className="group-hover:scale-110 transition-transform" /> Kembali
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground tracking-tight">
                Video <span className="text-primary">Kajian</span>
              </h1>
              <p className="text-foreground/70 text-lg max-w-2xl leading-relaxed">
                Perdalam keimanan, sempurnakan makhraj, dan pelajari tajwid Al-Quran secara interaktif dengan video praktis yang langsung bersumber dari YouTube.
              </p>
            </div>
            
            {/* Progress Badge */}
            {watchedCount > 0 && (
              <div className="flex items-center gap-3 bg-card border border-border px-5 py-3 rounded-2xl soft-shadow w-fit self-start md:self-auto">
                <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white shadow-md">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider">Progress Anda</p>
                  <p className="text-sm font-black text-foreground">{watchedCount} / {videos.length} Selesai</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Progress bar card */}
        {watchedCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/80 backdrop-blur-md rounded-3xl p-6 border border-border soft-shadow flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                🎯
              </div>
              <div>
                <h4 className="font-extrabold text-foreground text-lg">Progres Belajar Mandiri</h4>
                <p className="text-sm text-foreground/60">Tingkatkan ilmu Anda setiap hari untuk menyempurnakan ibadah.</p>
              </div>
            </div>
            <div className="w-full md:w-80 flex flex-col gap-2">
              <div className="h-3 w-full bg-secondary rounded-full overflow-hidden border border-border/10">
                <div 
                  className="h-full primary-gradient transition-all duration-700 rounded-full"
                  style={{ width: `${(watchedCount / videos.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-foreground/50">{watchedCount} materi selesai</span>
                <span className="text-primary">{Math.round((watchedCount / videos.length) * 100)}% Lengkap</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Featured Video Section (Only shown if no search / filter active) */}
        {activeCategory === "Semua" && searchQuery === "" && featuredVideo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-[24px] md:rounded-[32px] overflow-hidden border border-border soft-shadow grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-5 md:p-8 mb-12 hover:border-primary/30 transition-all duration-300 relative group"
          >
            <div 
              className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden shadow-lg cursor-pointer group/img"
              onClick={() => setSelectedVideo(featuredVideo)}
            >
              <img 
                src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`} 
                alt={featuredVideo.title}
                className="w-full h-full object-cover group-hover/img:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/img:bg-black/30 transition-colors">
                <div className="w-16 h-16 rounded-full primary-gradient flex items-center justify-center text-white soft-shadow scale-95 group-hover/img:scale-105 active:scale-95 transition-all duration-300">
                  <Play size={28} className="fill-white translate-x-0.5" />
                </div>
              </div>
              <span className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
                <Clock size={12} /> {featuredVideo.duration}
              </span>
              
              {watchedVideos.includes(featuredVideo.id) && (
                <span className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1 shadow-md">
                  <Check size={14} strokeWidth={3} /> Selesai Belajar
                </span>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-accent bg-accent/15 px-3.5 py-1.5 rounded-full w-fit">
                  ⭐ Video Unggulan
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full w-fit">
                  {featuredVideo.category}
                </span>
              </div>
              
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight hover:text-primary transition-colors cursor-pointer"
                onClick={() => setSelectedVideo(featuredVideo)}
              >
                {featuredVideo.title}
              </h2>
              
              <p className="text-foreground/50 text-sm font-semibold flex items-center gap-2">
                Narasumber: <span className="text-foreground font-extrabold">{featuredVideo.speaker}</span>
              </p>
              
              <p className="text-foreground/75 text-sm md:text-base leading-relaxed">
                {featuredVideo.description}
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => setSelectedVideo(featuredVideo)}
                  className="px-6 py-3.5 rounded-2xl primary-gradient text-white text-sm font-bold soft-shadow flex items-center gap-2 hover:scale-103 active:scale-97 transition-all cursor-pointer"
                >
                  <Play size={16} className="fill-white" /> Tonton Sekarang
                </button>
                <button 
                  onClick={() => toggleWatched(featuredVideo.id)}
                  className={`px-6 py-3.5 rounded-2xl text-sm font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                    watchedVideos.includes(featuredVideo.id) 
                      ? "bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20" 
                      : "bg-secondary text-foreground/75 border-border hover:bg-secondary/80"
                  }`}
                >
                  {watchedVideos.includes(featuredVideo.id) ? (
                    <>
                      <CheckCircle size={16} className="text-green-600" /> Selesai Dipelajari
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} /> Tandai Selesai
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "primary-gradient text-white soft-shadow scale-103 shadow-md"
                    : "bg-card text-foreground/60 hover:text-foreground hover:bg-secondary border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Cari materi atau ustadz..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card text-foreground placeholder-foreground/40 border border-border soft-shadow outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/35" />
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {filteredVideos.map((video) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={video.id} 
                  className="bg-card rounded-[24px] md:rounded-[32px] overflow-hidden border border-border hover:border-primary/30 soft-shadow group flex flex-col justify-between card-hover transition-all duration-300 relative h-full"
                >
                  {/* Thumbnail area */}
                  <div 
                    className="relative aspect-video overflow-hidden cursor-pointer group/thumb" 
                    onClick={() => setSelectedVideo(video)}
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full primary-gradient flex items-center justify-center text-white soft-shadow scale-90 group-hover/thumb:scale-100 transition-transform duration-300">
                        <Play size={20} className="fill-white translate-x-0.5" />
                      </div>
                    </div>
                    
                    {/* Floating Info */}
                    <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1">
                      <Clock size={10} /> {video.duration}
                    </span>
                    <span className="absolute top-3 left-3 bg-card/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-primary border border-border uppercase tracking-wider">
                      {video.level}
                    </span>
                    
                    {watchedVideos.includes(video.id) && (
                      <span className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-md p-1.5 rounded-full text-white shadow-md">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  {/* Text Contents */}
                  <div className="p-5 md:p-6 flex-grow flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                        {video.category}
                      </span>
                      <h3 
                        onClick={() => setSelectedVideo(video)}
                        className="text-lg font-bold text-foreground group-hover:text-primary cursor-pointer line-clamp-2 transition-colors leading-snug"
                      >
                        {video.title}
                      </h3>
                      <p className="text-foreground/50 text-xs font-semibold">
                        Narasumber: <span className="text-foreground font-bold">{video.speaker}</span>
                      </p>
                      <p className="text-foreground/70 text-xs leading-relaxed line-clamp-2 mt-1">
                        {video.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40">
                      <button 
                        onClick={() => setSelectedVideo(video)}
                        className="flex items-center gap-2 font-black text-xs text-primary hover:gap-3 transition-all cursor-pointer"
                      >
                        Tonton Materi <Play size={10} className="fill-primary" />
                      </button>
                      <button 
                        onClick={() => toggleWatched(video.id)}
                        className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                          watchedVideos.includes(video.id)
                            ? "bg-green-500/10 border-green-500/30 text-green-600"
                            : "bg-secondary border-border text-foreground/50 hover:text-foreground"
                        }`}
                        title={watchedVideos.includes(video.id) ? "Batal tandai selesai" : "Tandai selesai belajar"}
                      >
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="bg-card rounded-[32px] border border-border p-16 text-center soft-shadow flex flex-col items-center gap-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-foreground/30 text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-foreground">Video tidak ditemukan</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Kami tidak dapat menemukan video yang sesuai dengan kata kunci "{searchQuery}" atau filter kategori tersebut. Silakan coba cari kata kunci lainnya.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("Semua"); }}
              className="mt-2 px-5 py-2.5 rounded-xl primary-gradient text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-card w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] rounded-[24px] md:rounded-[32px] overflow-hidden border border-border soft-shadow flex flex-col relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
              >
                <X size={18} className="md:w-5 md:h-5" />
              </button>

              {/* Video Player Box */}
              <div className="w-full aspect-video bg-black relative">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info Area */}
              <div className="p-5 md:p-8 flex flex-col gap-3 md:gap-4 flex-1 overflow-y-auto no-scrollbar">
                <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {selectedVideo.category}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                    Level: {selectedVideo.level}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50 bg-secondary px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock size={10} /> {selectedVideo.duration}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-foreground leading-snug">
                  {selectedVideo.title}
                </h2>

                <p className="text-foreground/50 text-xs font-semibold">
                  Penyampai materi / Ustadz: <span className="text-foreground font-extrabold">{selectedVideo.speaker}</span>
                </p>

                <div className="h-px bg-border/60" />

                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-foreground/50 mb-1.5">Deskripsi Ringkas</h4>
                  <p className="text-foreground/75 text-sm leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>

                {/* Interactive buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border/40">
                  <button 
                    onClick={() => toggleWatched(selectedVideo.id)}
                    className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      watchedVideos.includes(selectedVideo.id) 
                        ? "bg-green-500/10 text-green-600 border border-green-500/30 hover:bg-green-500/20" 
                        : "bg-primary text-white hover:scale-103 active:scale-97 shadow-md"
                    }`}
                  >
                    {watchedVideos.includes(selectedVideo.id) ? (
                      <>
                        <CheckCircle size={14} className="text-green-600" /> Selesai Dipelajari
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} /> Tandai Selesai Belajar
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${selectedVideo.id}`);
                      setShareCopied(selectedVideo.id);
                      setTimeout(() => setShareCopied(null), 2000);
                    }}
                    className="px-5 py-3 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground/80 text-xs font-bold border border-border transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Share2 size={14} /> 
                    {shareCopied === selectedVideo.id ? "Link Disalin!" : "Bagikan Materi"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
