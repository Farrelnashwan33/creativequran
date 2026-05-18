"use client";

/* eslint-disable react-hooks/static-components, react-hooks/set-state-in-effect, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const translations: Record<string, Record<string, string>> = {
  "Bahasa Indonesia (Indonesian)": {
    headerTitle: "Pengaturan",
    general: "Umum",
    langTitle: "Bahasa",
    showArabic: "Munculkan Teks Arab",
    showTrans: "Munculkan Terjemahan",
    wordByWord: "Kata per Kata",
    transTitle: "Terjemahan",
    tafsirTitle: "Tafsir",
    wbwLangTitle: "Bahasa Kata Per Kata",
    mushafTypeTitle: "Jenis Mushaf",
    appearance: "Penampilan",
    themeTitle: "Tema",
    notifTitle: "Notifikasi",
    close: "Tutup",
    back: "Kembali",
    selectLang: "Pilih Bahasa Aplikasi",
    selectTrans: "Pilih Terjemahan",
    selectTafsir: "Pilih Tafsir",
    selectWbw: "Bahasa Kata Per Kata",
    selectMushaf: "Pilih Jenis Mushaf",
    selectTheme: "Pilih Tema Tampilan",
    selectNotif: "Notifikasi",

    // Options mapping
    opt_Terang: "Terang",
    opt_Gelap: "Gelap",
    opt_IkutiSistem: "Ikuti Sistem",
    opt_ManageNotif: "Atur Notifikasi",
    opt_EnableAll: "Aktifkan Semua",
    opt_DisableAll: "Nonaktifkan Semua",
    opt_IdMy: "Indonesia / Melayu",
    opt_En: "Inggris",
    opt_None: "Tidak Ada",
  },
  "English (US)": {
    headerTitle: "Settings",
    general: "General",
    langTitle: "Language",
    showArabic: "Show Arabic Text",
    showTrans: "Show Translation",
    wordByWord: "Word by Word",
    transTitle: "Translation",
    tafsirTitle: "Tafsir",
    wbwLangTitle: "Word by Word Language",
    mushafTypeTitle: "Mushaf Type",
    appearance: "Appearance",
    themeTitle: "Theme",
    notifTitle: "Notifications",
    close: "Close",
    back: "Back",
    selectLang: "Select Application Language",
    selectTrans: "Select Translation",
    selectTafsir: "Select Tafsir",
    selectWbw: "Word by Word Language",
    selectMushaf: "Select Mushaf Type",
    selectTheme: "Select Theme",
    selectNotif: "Notifications",

    // Options mapping
    opt_Terang: "Light",
    opt_Gelap: "Dark",
    opt_IkutiSistem: "System Default",
    opt_ManageNotif: "Manage Notifications",
    opt_EnableAll: "Enable All",
    opt_DisableAll: "Disable All",
    opt_IdMy: "Indonesian / Malay",
    opt_En: "English",
    opt_None: "None",
  },
  "Melayu (Malay)": {
    headerTitle: "Tetapan",
    general: "Umum",
    langTitle: "Bahasa",
    showArabic: "Paparkan Teks Arab",
    showTrans: "Paparkan Terjemahan",
    wordByWord: "Kata demi Kata",
    transTitle: "Terjemahan",
    tafsirTitle: "Tafsir",
    wbwLangTitle: "Bahasa Kata demi Kata",
    mushafTypeTitle: "Jenis Mushaf",
    appearance: "Penampilan",
    themeTitle: "Tema",
    notifTitle: "Notifikasi",
    close: "Tutup",
    back: "Kembali",
    selectLang: "Pilih Bahasa Aplikasi",
    selectTrans: "Pilih Terjemahan",
    selectTafsir: "Pilih Tafsir",
    selectWbw: "Bahasa Kata demi Kata",
    selectMushaf: "Pilih Jenis Mushaf",
    selectTheme: "Pilih Tema Tampilan",
    selectNotif: "Notifikasi",

    // Options mapping
    opt_Terang: "Terang",
    opt_Gelap: "Gelap",
    opt_IkutiSistem: "Ikut Sistem",
    opt_ManageNotif: "Urus Notifikasi",
    opt_EnableAll: "Aktifkan Semua",
    opt_DisableAll: "Nyahaktifkan Semua",
    opt_IdMy: "Indonesia / Melayu",
    opt_En: "Inggeris",
    opt_None: "Tiada",
  },
  "العربية (Arabic)": {
    headerTitle: "الإعدادات",
    general: "عام",
    langTitle: "اللغة",
    showArabic: "إظهار النص العربي",
    showTrans: "إظهار الترجمة",
    wordByWord: "كلمة بكلمة",
    transTitle: "الترجمة",
    tafsirTitle: "التفسير",
    wbwLangTitle: "لغة كلمة بكلمة",
    mushafTypeTitle: "نوع المصحف",
    appearance: "المظهر",
    themeTitle: "السمة",
    notifTitle: "الإشعارات",
    close: "إغلاق",
    back: "رجوع",
    selectLang: "اختر لغة التطبيق",
    selectTrans: "اختر الترجمة",
    selectTafsir: "اختر التفسير",
    selectWbw: "لغة كلمة بكلمة",
    selectMushaf: "اختر نوع المصحف",
    selectTheme: "اختر السمة",
    selectNotif: "الإشعارات",

    // Options mapping
    opt_Terang: "فاتح",
    opt_Gelap: "داكن",
    opt_IkutiSistem: "حسب النظام",
    opt_ManageNotif: "إدارة الإشعارات",
    opt_EnableAll: "تفعيل الكل",
    opt_DisableAll: "تعطيل الكل",
    opt_IdMy: "الإندونيسية / الملايو",
    opt_En: "الإنجليزية",
    opt_None: "لا شيء",
  }
};

const getOptionLabel = (key: string, opt: string, t: Record<string, string>) => {
  if (key === "tema") {
    if (opt === "Terang") return t.opt_Terang || opt;
    if (opt === "Gelap") return t.opt_Gelap || opt;
    if (opt === "Ikuti Sistem") return t.opt_IkutiSistem || opt;
  }
  if (key === "notifikasi") {
    if (opt === "Manage Notifications") return t.opt_ManageNotif || opt;
    if (opt === "Enable All") return t.opt_EnableAll || opt;
    if (opt === "Disable All") return t.opt_DisableAll || opt;
  }
  if (key === "bahasaKataPerKata") {
    if (opt === "Indonesian/Malay") return t.opt_IdMy || opt;
    if (opt === "English") return t.opt_En || opt;
    if (opt === "None") return t.opt_None || opt;
  }
  return opt;
};

export default function SettingsPage() {
  const router = useRouter();
  // Initial State
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

  // Notification management states
  const [notifReminder, setNotifReminder] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(true);
  const [browserPermission, setBrowserPermission] = useState<string>("default");

  // Load from localStorage on mount
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

      setNotifReminder(localStorage.getItem("settings_notif_reminder") !== "false");
      setNotifUpdates(localStorage.getItem("settings_notif_updates") !== "false");
      if ("Notification" in window) {
        setBrowserPermission(Notification.permission);
      }
    }
  }, []);

  const triggerTestNotif = (title: string, body: string, url: string = "/") => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((status) => {
          setBrowserPermission(status);
          if (status === "granted") {
            sendNotif(title, body, url);
          } else {
            alert("Harap aktifkan izin notifikasi di browser Anda terlebih dahulu.");
          }
        });
      } else {
        sendNotif(title, body, url);
      }
    } else {
      alert("Browser Anda tidak mendukung notifikasi sistem.");
    }
  };

  const sendNotif = (title: string, body: string, url: string = "/") => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active) {
          reg.active.postMessage({
            type: "TRIGGER_NOTIFICATION",
            title,
            body,
            url
          });
        } else {
          new Notification(title, { body, icon: "/favicon.ico" });
        }
      }).catch(() => {
        new Notification(title, { body, icon: "/favicon.ico" });
      });
    } else {
      new Notification(title, { body, icon: "/favicon.ico" });
    }
  };

  const toggleNotifReminder = () => {
    const newVal = !notifReminder;
    setNotifReminder(newVal);
    localStorage.setItem("settings_notif_reminder", String(newVal));
    updateNotifLabel(newVal, notifUpdates);
  };

  const toggleNotifUpdates = () => {
    const newVal = !notifUpdates;
    setNotifUpdates(newVal);
    localStorage.setItem("settings_notif_updates", String(newVal));
    updateNotifLabel(notifReminder, newVal);
  };

  const updateNotifLabel = (reminder: boolean, updates: boolean) => {
    let label = "Manage Notifications";
    if (reminder && updates) {
      label = "Enable All";
    } else if (!reminder && !updates) {
      label = "Disable All";
    } else {
      label = "Custom";
    }
    setNotifikasi(label);
    localStorage.setItem("settings_notifikasi", label);
    window.dispatchEvent(new Event("settings_updated"));
  };

  // Dispatch custom event when settings are updated to sync across the app
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
    window.dispatchEvent(new Event("settings_updated"));
  };

  // State for modal selector
  const [activeSelection, setActiveSelection] = useState<{
    key: string;
    titleKey: string;
    options: string[];
    currentValue: string;
  } | null>(null);

  // Selector Options mapping
  const selectors = {
    bahasa: {
      titleKey: "selectLang",
      options: [
        "Bahasa Indonesia (Indonesian)", 
        "English (US)", 
        "Melayu (Malay)", 
        "العربية (Arabic)"
      ],
    },
    terjemahan: {
      titleKey: "selectTrans",
      options: [
        "Indonesian - Sabeq Company",
        "Indonesian - Kemenag RI",
        "English - Sahih International",
        "English - Yusuf Ali"
      ],
    },
    tafsir: {
      titleKey: "selectTafsir",
      options: [
        "English - Tafsir Ibn Kathir (Abridged), Indonesian - Tafsir Ibn Kathir",
        "Indonesian - Tafsir Al-Jalalain",
        "Indonesian - Tafsir Kemenag"
      ],
    },
    bahasaKataPerKata: {
      titleKey: "selectWbw",
      options: [
        "Indonesian/Malay", 
        "English", 
        "None"
      ],
    },
    jenisMushaf: {
      titleKey: "selectMushaf",
      options: [
        "Teks Unicode Mushaf", 
        "Mushaf Al-Quran Standar Kemenag", 
        "Mushaf Madinah (Utsmani)"
      ],
    },
    tema: {
      titleKey: "selectTheme",
      options: [
        "Terang", 
        "Gelap", 
        "Ikuti Sistem"
      ],
    },
    notifikasi: {
      titleKey: "selectNotif",
      options: [
        "Manage Notifications",
        "Enable All",
        "Disable All"
      ]
    }
  };

  const t = translations[bahasa] || translations["Bahasa Indonesia (Indonesian)"];
  const isRtl = bahasa === "العربية (Arabic)";

  const openSelector = (key: keyof typeof selectors) => {
    setActiveSelection({
      key,
      titleKey: selectors[key].titleKey,
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
        className="flex items-center justify-between py-4.5 px-6 hover:bg-primary/5 active:bg-primary/10 cursor-pointer transition-colors border-b border-border last:border-b-0 select-none"
      >
        <div className="flex items-center gap-5 min-w-0 flex-1">
          {/* Icon container */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            {iconChar ? (
              <span className="font-arabic font-bold text-2xl text-primary select-none leading-none mb-1">
                {iconChar}
              </span>
            ) : IconComponent ? (
              <IconComponent size={22} className="text-primary" />
            ) : null}
          </div>

          {/* Text labels */}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[17px] text-foreground leading-tight">
              {title}
            </p>
            {subtitle && (
              <p className="text-sm text-foreground/70 font-medium leading-snug mt-1 truncate px-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right element control */}
        {checkbox ? (
          <div className="shrink-0 flex items-center px-1">
            <div 
              className={`w-[22px] h-[22px] rounded border-[2px] transition-all flex items-center justify-center ${
                checked 
                  ? "bg-primary border-primary" 
                  : "border-foreground/20 bg-card"
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
            <div className={`shrink-0 ${isRtl ? "rotate-180" : ""}`}>
              <ChevronRight size={18} className="text-foreground/30" />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background flex justify-center items-start sm:py-8 md:py-12 transition-colors duration-300" dir={isRtl ? "rtl" : "ltr"}>
      {/* Settings Panel Card Container */}
      <div className="w-full sm:max-w-2xl bg-card sm:rounded-[32px] sm:shadow-xl sm:border border-border overflow-hidden min-h-screen sm:min-h-0 transition-colors duration-300">
        
        {/* Header bar matching the website's primary gradient */}
        <header className="primary-gradient px-6 py-5 flex items-center gap-4 text-white shadow-md relative z-10">
          <button 
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-white shrink-0"
            aria-label={t.back}
          >
            <div className={isRtl ? "rotate-180" : ""}>
              <ArrowLeft size={24} />
            </div>
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">{t.headerTitle}</h1>
          </div>
        </header>

        {/* Scrollable list items */}
        <div className="pb-12">
          
          {/* SECTION: UMUM */}
          <section>
            <div className="text-sm font-bold text-primary px-6 pt-6 pb-2 select-none tracking-wider uppercase">
              {t.general}
            </div>
            
            <SettingRow 
              icon={Globe}
              title={t.langTitle}
              subtitle={bahasa}
              onClick={() => openSelector("bahasa")}
            />

            <SettingRow 
              iconChar="ع"
              title={t.showTrans}
              checkbox
              checked={munculkanTerjemahan}
              onCheckboxChange={(val) => updateSetting("munculkanTerjemahan", val)}
            />

            <SettingRow 
              icon={Languages}
              title={t.showArabic}
              checkbox
              checked={munculkanArab}
              onCheckboxChange={(val) => updateSetting("munculkanArab", val)}
            />

            <SettingRow 
              icon={Layers}
              title={t.wordByWord}
              checkbox
              checked={kataPerKata}
              onCheckboxChange={(val) => updateSetting("kataPerKata", val)}
            />

            <SettingRow 
              icon={Languages}
              title={t.transTitle}
              subtitle={terjemahan}
              onClick={() => openSelector("terjemahan")}
            />

            <SettingRow 
              icon={GraduationCap}
              title={t.tafsirTitle}
              subtitle={tafsir}
              onClick={() => openSelector("tafsir")}
            />

            <SettingRow 
              icon={Layers}
              title={t.wbwLangTitle}
              subtitle={getOptionLabel("bahasaKataPerKata", bahasaKataPerKata, t)}
              onClick={() => openSelector("bahasaKataPerKata")}
            />

            <SettingRow 
              icon={BookOpen}
              title={t.mushafTypeTitle}
              subtitle={jenisMushaf}
              onClick={() => openSelector("jenisMushaf")}
            />
          </section>

          {/* SECTION: PENAMPILAN */}
          <section className="mt-4 border-t border-border">
            <div className="text-sm font-bold text-primary px-6 pt-6 pb-2 select-none tracking-wider uppercase">
              {t.appearance}
            </div>

            <SettingRow 
              icon={Paintbrush}
              title={t.themeTitle}
              subtitle={getOptionLabel("tema", tema, t)}
              onClick={() => openSelector("tema")}
            />

            <SettingRow 
              icon={Bell}
              title={t.notifTitle}
              subtitle={getOptionLabel("notifikasi", notifikasi, t)}
              onClick={() => openSelector("notifikasi")}
            />
          </section>
        </div>
      </div>

      {/* Selector modal sheet */}
      <AnimatePresence>
        {activeSelection && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSelection(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Selector Bottom Sheet/Dialog Box */}
            <motion.div 
              initial={{ y: "100%", opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 1 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative w-full sm:max-w-md bg-card rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-border overflow-hidden max-h-[85vh] flex flex-col z-50"
            >
              {/* Modal title header */}
              <div className="primary-gradient px-6 py-5 text-white flex items-center justify-between shrink-0 shadow-sm">
                <h3 className="font-bold text-lg tracking-wide">
                  {t[activeSelection.titleKey] || activeSelection.titleKey}
                </h3>
                <button 
                  onClick={() => setActiveSelection(null)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {t.close}
                </button>
              </div>

              {/* Custom Notification Dashboard or Standard list of options */}
              {activeSelection.key === "notifikasi" ? (
                <div className="p-6 bg-card flex flex-col gap-6 overflow-y-auto max-h-[55vh]">
                  {/* Browser permission status card */}
                  <div className="bg-secondary p-4.5 rounded-2xl border border-border flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground/75">Status Izin Browser:</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        browserPermission === "granted" 
                          ? "bg-primary/10 text-primary" 
                          : browserPermission === "denied"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-orange-500/10 text-orange-500"
                      }`}>
                        {browserPermission === "granted" ? "Diizinkan" : browserPermission === "denied" ? "Ditolak" : "Belum Aktif"}
                      </span>
                    </div>
                    {browserPermission !== "granted" && (
                      <button
                        onClick={() => {
                          if ("Notification" in window) {
                            Notification.requestPermission().then((status) => {
                              setBrowserPermission(status);
                              if (status === "granted") {
                                sendNotif("Notifikasi Aktif! 🎉", "Selamat! Anda berhasil mengaktifkan notifikasi Creative Quran.");
                              }
                            });
                          }
                        }}
                        className="w-full bg-primary text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-primary-dark transition-all cursor-pointer text-center"
                      >
                        Aktifkan Izin Notifikasi
                      </button>
                    )}
                  </div>

                  {/* Switch Settings Section */}
                  <div className="flex flex-col gap-4">
                    {/* Toggle: Pengingat Harian */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base text-foreground leading-tight">Pengingat Harian</p>
                        <p className="text-xs text-foreground/60 leading-normal mt-0.5">Ingatkan jika belum membaca hari ini</p>
                      </div>
                      <button
                        onClick={toggleNotifReminder}
                        className={`w-12 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${
                          notifReminder ? "bg-primary" : "bg-foreground/20"
                        }`}
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 rounded-full bg-white"
                          animate={{ x: notifReminder ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    {/* Toggle: Info Update */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/60">
                      <div>
                        <p className="font-bold text-base text-foreground leading-tight">Notifikasi Update</p>
                        <p className="text-xs text-foreground/60 leading-normal mt-0.5">Berita update tafsir & fitur baru</p>
                      </div>
                      <button
                        onClick={toggleNotifUpdates}
                        className={`w-12 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${
                          notifUpdates ? "bg-primary" : "bg-foreground/20"
                        }`}
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 rounded-full bg-white"
                          animate={{ x: notifUpdates ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Testing Section */}
                  <div className="border-t border-border pt-5 mt-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-1">
                      <span>⚡</span> Uji Notifikasi Live (Coba Sekarang!)
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={() => triggerTestNotif(
                          "Anda belum membaca Creative Quran hari ini!",
                          "Luangkan waktu 5 menit hari ini untuk membaca Al-Quran dan memperdalam pemahaman tafsir.",
                          "/mushaf/1"
                        )}
                        className="w-full flex items-center justify-center gap-2 bg-secondary text-primary hover:bg-primary hover:text-white border border-primary/20 hover:border-transparent font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                      >
                        🔔 Uji Pengingat Membaca
                      </button>
                      <button
                        onClick={() => triggerTestNotif(
                          "Ada update terbaru dari Creative Quran",
                          "Tafsir Ibnu Katsir & Jalalain kini telah sepenuhnya diperbarui dengan standar kemenag RI terbaru.",
                          "/tafsir"
                        )}
                        className="w-full flex items-center justify-center gap-2 bg-secondary text-primary hover:bg-primary hover:text-white border border-primary/20 hover:border-transparent font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                      >
                        🚀 Uji Notifikasi Update
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-y-auto py-2 max-h-[50vh] bg-card">
                  {activeSelection.options.map((opt) => {
                    const isSelected = activeSelection.currentValue === opt;
                    const displayLabel = getOptionLabel(activeSelection.key, opt, t);
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          updateSetting(activeSelection.key, opt);
                          setActiveSelection(null);
                        }}
                        className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors border-b border-border/40 last:border-b-0 hover:bg-primary/5 cursor-pointer ${
                          isSelected ? "bg-primary/5 text-primary font-bold" : "text-foreground"
                        }`}
                      >
                        <span className={`font-bold text-base ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {displayLabel}
                        </span>
                        {isSelected && (
                          <div className="w-[22px] h-[22px] rounded-full bg-primary flex items-center justify-center shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

