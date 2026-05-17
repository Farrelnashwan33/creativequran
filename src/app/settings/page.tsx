"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Globe, 
  Languages, 
  Layers, 
  GraduationCap, 
  BookOpen, 
  Paintbrush, 
  Bell, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  // 1. Initial State from localStorage (or defaults)
  const [bahasa, setBahasa] = useState("Bahasa Indonesia (Indonesian)");
  const [munculkanArab, setMunculkanArab] = useState(true);
  const [munculkanTerjemahan, setMunculkanTerjemahan] = useState(true);
  const [kataPerKata, setKataPerKata] = useState(true);
  const [terjemahan, setTerjemahan] = useState("Indonesian - Sabeq Company");
  const [tafsir, setTafsir] = useState("English - Tafsir Ibn Kathir (Abridged), Indonesian - Tafsir Ibn Kathir");
  const [bahasaKataPerKata, setBahasaKataPerKata] = useState("Indonesian/Malay");
  const [jenisMushaf, setJenisMushaf] = useState("Teks Unicode Mushaf");
  const [tema, setTema] = useState("Terang");
  const [notifikasi, setNotifikasi] = useState("Manage Notifications");

  // Load from localStorage on mount (safe hydration)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBahasa(localStorage.getItem("settings_bahasa") || "Bahasa Indonesia (Indonesian)");
      setMunculkanArab(localStorage.getItem("settings_munculkanArab") !== "false");
      setMunculkanTerjemahan(localStorage.getItem("settings_munculkanTerjemahan") !== "false");
      setKataPerKata(localStorage.getItem("settings_kataPerKata") !== "false");
      setTerjemahan(localStorage.getItem("settings_terjemahan") || "Indonesian - Sabeq Company");
      setTafsir(localStorage.getItem("settings_tafsir") || "English - Tafsir Ibn Kathir (Abridged), Indonesian - Tafsir Ibn Kathir");
      setBahasaKataPerKata(localStorage.getItem("settings_bahasaKataPerKata") || "Indonesian/Malay");
      setJenisMushaf(localStorage.getItem("settings_jenisMushaf") || "Teks Unicode Mushaf");
      setTema(localStorage.getItem("settings_tema") || "Terang");
      setNotifikasi(localStorage.getItem("settings_notifikasi") || "Manage Notifications");
    }
  }, []);

  // Setter helpers that persist to localStorage
  const updateSetting = (key: string, value: any) => {
    localStorage.setItem(`settings_${key}`, String(value));
    switch (key) {
      case "bahasa": setBahasa(value); break;
      case "munculkanArab": setMunculkanArab(value); break;
      case "munculkanTerjemahan": setMunculkanTerjemahan(value); break;
      case "kataPerKata": setKataPerKata(value); break;
      case "terjemahan": setTerjemahan(value); break;
      case "tafsir": setTafsir(value); break;
      case "bahasaKataPerKata": setBahasaKataPerKata(value); break;
      case "jenisMushaf": setJenisMushaf(value); break;
      case "tema": setTema(value); break;
      case "notifikasi": setNotifikasi(value); break;
    }
  };

  // State for modal selector
  const [activeSelection, setActiveSelection] = useState<{
    key: string;
    title: string;
    options: string[];
    currentValue: string;
  } | null>(null);

  // Selector Options mapping
  const selectors = {
    bahasa: {
      title: "Pilih Bahasa Aplikasi",
      options: [
        "Bahasa Indonesia (Indonesian)", 
        "English (US)", 
        "Melayu (Malay)", 
        "العربية (Arabic)"
      ],
    },
    terjemahan: {
      title: "Pilih Terjemahan",
      options: [
        "Indonesian - Sabeq Company",
        "Indonesian - Kemenag RI",
        "English - Sahih International",
        "English - Yusuf Ali"
      ],
    },
    tafsir: {
      title: "Pilih Tafsir",
      options: [
        "English - Tafsir Ibn Kathir (Abridged), Indonesian - Tafsir Ibn Kathir",
        "Indonesian - Tafsir Al-Jalalain",
        "Indonesian - Tafsir Kemenag"
      ],
    },
    bahasaKataPerKata: {
      title: "Bahasa Kata Per Kata",
      options: [
        "Indonesian/Malay", 
        "English", 
        "None"
      ],
    },
    jenisMushaf: {
      title: "Pilih Jenis Mushaf",
      options: [
        "Teks Unicode Mushaf", 
        "Mushaf Al-Quran Standar Kemenag", 
        "Mushaf Madinah (Utsmani)"
      ],
    },
    tema: {
      title: "Pilih Tema Tampilan",
      options: [
        "Terang", 
        "Gelap", 
        "Ikuti Sistem"
      ],
    },
    notifikasi: {
      title: "Notifikasi",
      options: [
        "Manage Notifications",
        "Enable All",
        "Disable All"
      ]
    }
  };

  const openSelector = (key: keyof typeof selectors) => {
    setActiveSelection({
      key,
      title: selectors[key].title,
      options: selectors[key].options,
      currentValue: 
        key === "bahasa" ? bahasa :
        key === "terjemahan" ? terjemahan :
        key === "tafsir" ? tafsir :
        key === "bahasaKataPerKata" ? bahasaKataPerKata :
        key === "jenisMushaf" ? jenisMushaf :
        key === "tema" ? tema : notifikasi
    });
  };

  // Reusable row element matching the screenshot layout
  const SettingRow = ({
    icon: IconComponent,
    iconChar,
    title,
    subtitle,
    onClick,
    checkbox,
    checked,
    onCheckboxChange
  }: {
    icon?: any;
    iconChar?: string;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    checkbox?: boolean;
    checked?: boolean;
    onCheckboxChange?: (val: boolean) => void;
  }) => {
    return (
      <div 
        onClick={checkbox ? () => onCheckboxChange?.(!checked) : onClick}
        className="flex items-center justify-between py-4.5 px-6 hover:bg-[#0FAF9A]/5 active:bg-[#0FAF9A]/10 cursor-pointer transition-colors border-b border-[#E9F2F0]/80 last:border-b-0 select-none"
      >
        <div className="flex items-center gap-5 min-w-0 flex-1">
          {/* Icon container */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            {iconChar ? (
              <span className="font-arabic font-bold text-2xl text-[#0FAF9A] select-none leading-none mb-1">
                {iconChar}
              </span>
            ) : IconComponent ? (
              <IconComponent size={22} className="text-[#0C8F7C]" />
            ) : null}
          </div>

          {/* Text labels */}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[17px] text-[#1A2E2A] leading-tight">
              {title}
            </p>
            {subtitle && (
              <p className="text-sm text-[#1A2E2A]/60 font-medium leading-snug mt-1 truncate pr-4">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right element control */}
        {checkbox ? (
          <div className="shrink-0 flex items-center pr-1">
            <div 
              className={`w-[22px] h-[22px] rounded border-[2px] transition-all flex items-center justify-center ${
                checked 
                  ? "bg-[#0FAF9A] border-[#0FAF9A]" 
                  : "border-[#1A2E2A]/20 bg-white"
              }`}
            >
              {checked && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
        ) : (
          onClick && (
            <ChevronRight size={18} className="text-[#1A2E2A]/30 shrink-0" />
          )
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F7F6] flex justify-center items-start sm:py-8 md:py-12">
      {/* Settings Panel Card Container */}
      <div className="w-full sm:max-w-2xl bg-white sm:rounded-[32px] sm:shadow-xl sm:border border-[#E9F2F0] overflow-hidden min-h-screen sm:min-h-0">
        
        {/* Header bar matching the website's primary gradient */}
        <header className="primary-gradient px-6 py-5 flex items-center gap-4 text-white shadow-md relative z-10">
          <Link 
            href="/" 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-white"
            aria-label="Kembali"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">Pengaturan</h1>
          </div>
        </header>

        {/* Scrollable list items */}
        <div className="pb-12">
          
          {/* SECTION: UMUM */}
          <section>
            <div className="text-sm font-bold text-[#0FAF9A] px-6 pt-6 pb-2 select-none tracking-wider uppercase">
              Umum
            </div>
            
            <SettingRow 
              icon={Globe}
              title="Bahasa"
              subtitle={bahasa}
              onClick={() => openSelector("bahasa")}
            />

            <SettingRow 
              iconChar="ع"
              title="Munculkan Teks Arab"
              checkbox
              checked={munculkanArab}
              onCheckboxChange={(val) => updateSetting("munculkanArab", val)}
            />

            <SettingRow 
              icon={Languages}
              title="Munculkan Terjemahan"
              checkbox
              checked={munculkanTerjemahan}
              onCheckboxChange={(val) => updateSetting("munculkanTerjemahan", val)}
            />

            <SettingRow 
              icon={Layers}
              title="Kata per Kata"
              checkbox
              checked={kataPerKata}
              onCheckboxChange={(val) => updateSetting("kataPerKata", val)}
            />

            <SettingRow 
              icon={Languages}
              title="Terjemahan"
              subtitle={terjemahan}
              onClick={() => openSelector("terjemahan")}
            />

            <SettingRow 
              icon={GraduationCap}
              title="Tafsir"
              subtitle={tafsir}
              onClick={() => openSelector("tafsir")}
            />

            <SettingRow 
              icon={Layers}
              title="Bahasa Kata Per Kata"
              subtitle={bahasaKataPerKata}
              onClick={() => openSelector("bahasaKataPerKata")}
            />

            <SettingRow 
              icon={BookOpen}
              title="Jenis Mushaf"
              subtitle={jenisMushaf}
              onClick={() => openSelector("jenisMushaf")}
            />
          </section>

          {/* SECTION: PENAMPILAN */}
          <section className="mt-4 border-t border-[#E9F2F0]">
            <div className="text-sm font-bold text-[#0FAF9A] px-6 pt-6 pb-2 select-none tracking-wider uppercase">
              Penampilan
            </div>

            <SettingRow 
              icon={Paintbrush}
              title="Tema"
              subtitle={tema}
              onClick={() => openSelector("tema")}
            />

            <SettingRow 
              icon={Bell}
              title="Notifikasi"
              subtitle={notifikasi}
              onClick={() => openSelector("notifikasi")}
            />
          </section>
        </div>
      </div>

      {/* Selector modal sheet for premium, interactive option changing */}
      <AnimatePresence>
        {activeSelection && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSelection(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Selector Bottom Sheet/Dialog Box */}
            <motion.div 
              initial={{ y: "100%", opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 1 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-[#E9F2F0] overflow-hidden max-h-[85vh] flex flex-col z-10"
            >
              {/* Modal title header */}
              <div className="primary-gradient px-6 py-5 text-white flex items-center justify-between shrink-0 shadow-sm">
                <h3 className="font-bold text-lg tracking-wide">{activeSelection.title}</h3>
                <button 
                  onClick={() => setActiveSelection(null)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                >
                  Tutup
                </button>
              </div>

              {/* List of options */}
              <div className="overflow-y-auto py-2 max-h-[50vh] bg-white">
                {activeSelection.options.map((opt) => {
                  const isSelected = activeSelection.currentValue === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        updateSetting(activeSelection.key, opt);
                        setActiveSelection(null);
                      }}
                      className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors border-b border-[#E9F2F0]/40 last:border-b-0 hover:bg-[#0FAF9A]/5 ${
                        isSelected ? "bg-[#0FAF9A]/5 text-[#0FAF9A]" : "text-[#1A2E2A]"
                      }`}
                    >
                      <span className={`font-bold text-base ${isSelected ? "text-[#0FAF9A]" : "text-[#1A2E2A]"}`}>
                        {opt}
                      </span>
                      {isSelected && (
                        <div className="w-[22px] h-[22px] rounded-full bg-[#0FAF9A] flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
