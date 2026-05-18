"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationManager() {
  const pathname = usePathname();
  const [showPrompt, setShowPrompt] = useState(false);
  const [permission, setPermission] = useState<string>("default");

  // Helper: Trigger native notification through the active Service Worker
  const triggerNativeNotif = (title: string, body: string, url: string = "/") => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          registration.active.postMessage({
            type: "TRIGGER_NOTIFICATION",
            title,
            body,
            url,
          });
        } else {
          // Fallback if worker is registering/not fully active
          new Notification(title, {
            body,
            icon: "/favicon.ico",
          });
        }
      });
    } else if (typeof window !== "undefined" && "Notification" in window) {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
      });
    }
  };

  // 1. Register Service Worker and initialize permission state
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }

    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);

      // Show custom invite toast only if permission is 'default' and prompt wasn't dismissed
      const dismissed = localStorage.getItem("notif_prompt_dismissed") === "true";
      if (Notification.permission === "default" && !dismissed) {
        // Wait 4 seconds for premium wow entry effect after page loads
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // 2. Track reading habits: update last read timestamp when browsing Mushaf or Tafsir
  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes("/mushaf") || pathname.includes("/tafsir")) {
      const now = Date.now();
      localStorage.setItem("settings_last_read", String(now));
      console.log("Quran/Tafsir read activity recorded:", new Date(now).toLocaleString());
    }
  }, [pathname]);

  // 3. Periodic Daily Reading Checker: Runs on page load and periodically
  useEffect(() => {
    if (permission !== "granted") return;

    const checkReadingReminder = () => {
      const enabled = localStorage.getItem("settings_notif_reminder") !== "false";
      if (!enabled) return;

      const lastReadStr = localStorage.getItem("settings_last_read");
      if (!lastReadStr) {
        // If they have never read on this browser, initialize with current time
        localStorage.setItem("settings_last_read", String(Date.now()));
        return;
      }

      const lastRead = parseInt(lastReadStr, 10);
      const oneDayMs = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - lastRead;

      // If more than 24 hours have elapsed, trigger the native system notification!
      if (elapsed >= oneDayMs) {
        triggerNativeNotif(
          "Anda belum membaca Creative Quran hari ini!",
          "Luangkan waktu 5 menit hari ini untuk membaca Al-Quran dan memperdalam pemahaman tafsir.",
          "/mushaf/1"
        );
        // Reset the clock to prevent spamming
        localStorage.setItem("settings_last_read", String(Date.now()));
      }
    };

    // Run check immediately on load, then every 1 hour (3600000ms)
    checkReadingReminder();
    const interval = setInterval(checkReadingReminder, 3600000);
    return () => clearInterval(interval);
  }, [permission]);

  // Request browser native notification permission
  const handleRequestPermission = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then((status) => {
        setPermission(status);
        setShowPrompt(false);
        if (status === "granted") {
          // Trigger welcome notification
          setTimeout(() => {
            triggerNativeNotif(
              "Notifikasi Aktif! 🎉",
              "Selamat! Anda akan menerima pengingat harian membaca Al-Quran dan info update terbaru."
            );
          }, 1000);
          localStorage.setItem("settings_notifikasi", "Enable All");
          localStorage.setItem("settings_notif_reminder", "true");
          localStorage.setItem("settings_notif_updates", "true");
        } else {
          localStorage.setItem("settings_notifikasi", "Disable All");
        }
        window.dispatchEvent(new Event("settings_updated"));
      });
    }
  };

  const handleDismissPrompt = () => {
    localStorage.setItem("notif_prompt_dismissed", "true");
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 overflow-hidden"
        >
          {/* Glassmorphic Panel Card */}
          <div className="bg-card/85 backdrop-blur-xl border border-primary/30 p-5 rounded-[28px] soft-shadow flex flex-col gap-4 relative">
            {/* Ambient glowing radial effect */}
            <div className="absolute inset-0 bg-radial from-primary/10 to-transparent pointer-events-none -z-10" />

            {/* Close Button */}
            <button
              onClick={handleDismissPrompt}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground/80 hover:bg-secondary w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={15} />
            </button>

            {/* Header info */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Bell size={24} className="animate-bounce" />
              </div>
              <div className="min-w-0 pr-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={10} /> Baru
                  </span>
                </div>
                <h4 className="font-bold text-base text-foreground leading-tight">
                  Aktifkan Notifikasi Quran?
                </h4>
                <p className="text-xs text-foreground/75 leading-relaxed mt-1">
                  Dapatkan pengingat harian membaca Al-Quran dan info update tafsir terbaru langsung di HP & Apple Anda.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={handleRequestPermission}
                className="flex-1 bg-primary text-white text-xs font-bold py-3 px-4 rounded-xl hover:bg-primary-dark transition-all cursor-pointer active:scale-95 text-center shadow-lg shadow-primary/25"
              >
                Aktifkan Sekarang
              </button>
              <button
                onClick={handleDismissPrompt}
                className="bg-secondary text-foreground/70 text-xs font-bold py-3 px-4 rounded-xl hover:bg-secondary/80 hover:text-foreground transition-all cursor-pointer"
              >
                Nanti saja
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
