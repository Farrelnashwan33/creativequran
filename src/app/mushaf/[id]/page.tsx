"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Verse {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

interface SurahData {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
  ayat: Verse[];
}

function SurahDetailPageContent() {
  const params = useParams();
  const id = params.id as string;

  const [surah, setSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(32);
  const [showArabic, setShowArabic] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [wordByWord, setWordByWord] = useState(true);
  const [translationSource, setTranslationSource] = useState("Indonesian - Sabeq Company");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadSettings = () => {
      setShowArabic(localStorage.getItem("settings_munculkanArab") !== "false");
      setShowTranslation(localStorage.getItem("settings_munculkanTerjemahan") !== "false");
      setWordByWord(localStorage.getItem("settings_kataPerKata") !== "false");
      setTranslationSource(localStorage.getItem("settings_terjemahan") || "Indonesian - Sabeq Company");
    };

    if (typeof window !== "undefined") {
      loadSettings();
      window.addEventListener("settings_updated", loadSettings);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("settings_updated", loadSettings);
      }
    };
  }, []);
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`https://equran.id/api/v2/surat/${id}`);
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (!json.data) throw new Error("No data");
        setSurah(json.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSurah();
  }, [id]);

  // Audio player logic
  const handlePlayAudio = (ayat: Verse) => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    const audioUrl = ayat.audio?.["06"] || Object.values(ayat.audio || {})[0];
    if (!audioUrl) return;

    // Initialize one single persistent audio element to prevent network delays and stuttering (patah-patah)
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    if (playingAudio === ayat.nomorAyat) {
      // Pause
      audio.pause();
      setPlayingAudio(null);
      return;
    }

    try {
      // Safely transition sources in the same element
      audio.pause();
      audio.src = audioUrl;
      audio.preload = "auto";
      audio.load();
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback interrupted or failed:", error);
        });
      }
      
      setPlayingAudio(ayat.nomorAyat);

      // Smooth scroll to the active playing verse (centered in the viewport)
      setTimeout(() => {
        const element = document.getElementById(`ayat-${ayat.nomorAyat}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } catch (error) {
      console.error("Error updating audio src:", error);
    }

    // Auto-play the next verse automatically on ended
    audio.onended = () => {
      setPlayingAudio(null);
      if (surah && surah.ayat) {
        const currentIndex = surah.ayat.findIndex((a) => a.nomorAyat === ayat.nomorAyat);
        if (currentIndex !== -1 && currentIndex < surah.ayat.length - 1) {
          const nextAyat = surah.ayat[currentIndex + 1];
          autoplayTimeoutRef.current = setTimeout(() => {
            handlePlayAudio(nextAyat);
          }, 800); // 800ms natural delay between verses
        }
      }
    };
  };

  const handleStopAudio = () => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setPlayingAudio(null);
  };

  // Cleanup audio and timeout on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background transition-colors duration-300">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
        />
        <p className="font-bold text-primary animate-pulse">Memuat Surah...</p>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
        <div className="text-center bg-card p-12 rounded-[32px] soft-shadow max-w-md border border-border transition-colors duration-300">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">Surah Tidak Ditemukan</h1>
          <p className="text-foreground/50 mb-6">Gagal memuat data. Cek koneksi internet kamu.</p>
          <Link
            href="/mushaf"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all"
          >
            <ArrowLeft size={18} /> Kembali ke Mushaf
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20 transition-colors duration-300">
      {/* Sticky Header */}
      <nav className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-xl z-50 border-b border-border px-4 md:px-6 py-4 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link
            href="/mushaf"
            className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-all font-bold shrink-0"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Kembali</span>
          </Link>

          <div className="text-center min-w-0">
            <h2 className="font-bold text-base md:text-xl text-foreground truncate">{surah.namaLatin}</h2>
            <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold truncate">{surah.arti}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setFontSize((prev) => (prev >= 48 ? 24 : prev + 8))}
              title="Ubah ukuran font"
              className="hidden md:inline-flex p-2 rounded-xl hover:bg-secondary transition-all text-foreground/60 hover:text-primary"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => setFontSize((prev) => Math.max(20, prev - 8))}
              title="Perkecil font"
              className="hidden md:inline-flex p-2 rounded-xl hover:bg-secondary transition-all text-foreground/60 hover:text-primary"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={() => {
                const nextVal = !showArabic;
                setShowArabic(nextVal);
                localStorage.setItem("settings_munculkanArab", String(nextVal));
              }}
              title="Tampilkan/Sembunyikan Teks Arab"
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all ${
                showArabic
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/40 hover:bg-secondary hover:text-primary"
              }`}
            >
              <span className="text-[17px] font-bold font-arabic leading-none mt-[-2px]">ع</span>
            </button>
            <button
              onClick={() => {
                const nextVal = !showTranslation;
                setShowTranslation(nextVal);
                localStorage.setItem("settings_munculkanTerjemahan", String(nextVal));
              }}
              title="Tampilkan/Sembunyikan Terjemahan"
              className={`p-2 rounded-xl transition-all ${
                showTranslation
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/40 hover:bg-secondary hover:text-primary"
              }`}
            >
              <BookOpen size={20} />
            </button>
            <button className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="primary-gradient pt-32 md:pt-36 pb-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 60%)" }} />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl md:text-3xl font-bold mb-1">
              {surah.nomor}
            </div>
            <h1 className="text-5xl md:text-7xl font-arabic mb-1">{surah.nama}</h1>
            <p className="text-white/80 font-bold text-lg md:text-xl">{surah.namaLatin}</p>
            <div className="flex items-center gap-3 text-white/60 font-bold text-sm">
              <span>{surah.tempatTurun}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span>{surah.jumlahAyat} Ayat</span>
            </div>

            {surah.nomor !== 1 && surah.nomor !== 9 && (
              <div className="mt-8 px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <p className="text-2xl md:text-3xl font-arabic leading-loose tracking-wide">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Verses */}
      <div className="container mx-auto px-4 md:px-6 lg:max-w-4xl mt-10 pb-24">
        <div className="flex flex-col gap-6 md:gap-8">
          {surah.ayat.map((ayat) => (
            <motion.div
              key={ayat.nomorAyat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="relative group"
            >
              <div 
                id={`ayat-${ayat.nomorAyat}`}
                className={`bg-card rounded-[32px] p-6 md:p-10 soft-shadow border transition-all duration-300 ${
                  playingAudio === ayat.nomorAyat 
                    ? "border-primary/60 bg-primary/[0.015]" 
                    : "border-border group-hover:border-primary/40"
                }`}
              >
                {/* Verse Number & Controls */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <svg width="48" height="48" viewBox="0 0 100 100" className="text-secondary/40">
                        <path
                          d="M50 2 L98 50 L50 98 L2 50 Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-base text-primary/60">
                        {ayat.nomorAyat}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(ayat)}
                      className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-xs active:scale-95 ${
                        playingAudio === ayat.nomorAyat
                          ? "bg-primary text-white shadow-md"
                          : "bg-secondary text-primary hover:bg-primary/15"
                      }`}
                      aria-label={playingAudio === ayat.nomorAyat ? "Pause" : "Play"}
                    >
                      {playingAudio === ayat.nomorAyat ? (
                        <>
                          <Pause size={14} />
                          <span>Mendengarkan</span>
                        </>
                      ) : (
                        <>
                          <Play size={14} className="ml-0.5" />
                          <span>Putar Ayat</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/20 hover:text-primary hover:bg-primary/5 transition-all">
                      <Bookmark size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: `${surah.namaLatin} Ayat ${ayat.nomorAyat}`,
                            text: `${ayat.teksArab}\n\n${ayat.teksIndonesia}`,
                          });
                        }
                      }}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/20 hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                {showArabic && (
                  <div className="text-right mb-6 md:mb-8">
                    {wordByWord ? (
                      <div className="flex flex-row-reverse flex-wrap gap-x-4 gap-y-6 justify-start leading-loose">
                        {ayat.teksArab.split(" ").map((word, wordIndex) => (
                          <div 
                            key={wordIndex} 
                            className="flex flex-col items-center p-2 rounded-xl hover:bg-secondary/50 transition-all group cursor-pointer"
                          >
                            <span 
                              className="font-arabic text-foreground select-none group-hover:text-primary transition-colors"
                              style={{ fontSize: `${fontSize}px` }}
                            >
                              {word}
                            </span>
                            <span className="w-1.5 h-1 bg-primary/20 rounded-full scale-0 group-hover:scale-100 transition-transform mt-1" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        className="font-arabic leading-[2.8] md:leading-[3.2] text-foreground select-none"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {ayat.teksArab}
                      </p>
                    )}
                  </div>
                )}

                {/* Transliteration & Translation */}
                <AnimatePresence>
                  {showTranslation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pt-6 border-t border-border/80">
                        <div>
                          <p className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-2">
                            Latin
                          </p>
                          <p className="text-primary/70 font-medium italic text-sm md:text-base leading-relaxed">
                            {ayat.teksLatin}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em] mb-2 flex items-center justify-between">
                            <span>Terjemahan</span>
                            <span className="text-primary font-bold lowercase tracking-normal text-[10px]">
                              ({translationSource})
                            </span>
                          </p>
                          <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-medium">
                            {ayat.teksIndonesia}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {surah.nomor > 1 ? (
            <Link
              href={`/mushaf/${surah.nomor - 1}`}
              className="flex-1 bg-card p-5 md:p-6 rounded-[28px] soft-shadow border border-border flex items-center gap-4 hover:border-primary/30 transition-all group duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <ChevronLeft size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                  Surah Sebelumnya
                </p>
                <p className="font-bold text-foreground text-sm truncate">
                  Surah {surah.nomor - 1}
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {surah.nomor < 114 ? (
            <Link
              href={`/mushaf/${surah.nomor + 1}`}
              className="flex-1 bg-card p-5 md:p-6 rounded-[28px] soft-shadow border border-border flex items-center justify-between gap-4 hover:border-primary/30 transition-all group text-right duration-300"
            >
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                  Surah Berikutnya
                </p>
                <p className="font-bold text-foreground text-sm truncate">
                  Surah {surah.nomor + 1}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <ChevronRight size={22} />
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      {/* Floating Audio Controller */}
      <AnimatePresence>
        {playingAudio !== null && surah && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 100, x: "-50%" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-1/2 z-50 glass soft-shadow rounded-2xl px-6 py-4 flex items-center justify-between gap-6 border border-white/20 w-[90%] sm:w-auto min-w-[320px] max-w-md bg-[#0FAF9A]/95 text-white"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center animate-pulse shrink-0">
                <Volume2 size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Mendengarkan</p>
                <p className="font-bold text-sm truncate">{surah.namaLatin} • Ayat {playingAudio}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  const currentAyat = surah.ayat.find(a => a.nomorAyat === playingAudio);
                  if (currentAyat) handlePlayAudio(currentAyat);
                }}
                className="w-10 h-10 rounded-xl bg-white text-[#0FAF9A] hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center shadow-sm cursor-pointer"
                aria-label="Pause"
              >
                <Pause size={18} fill="currentColor" />
              </button>
              <button
                onClick={handleStopAudio}
                className="w-10 h-10 rounded-xl bg-white/20 text-white hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                aria-label="Stop"
              >
                <VolumeX size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function SurahDetailPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-background transition-colors duration-300">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4 animate-spin" />
        <p className="font-bold text-primary animate-pulse">Memuat Surah...</p>
      </div>
    }>
      <SurahDetailPageContent />
    </React.Suspense>
  );
}
