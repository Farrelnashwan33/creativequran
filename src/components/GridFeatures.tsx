"use client";

import React from "react";
import { motion } from "framer-motion";
import { Volume2, BookOpen, Video, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

const gridItems = [
  {
    title: "Belajar Makhraj",
    icon: Volume2,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
    description: "Latihan praktis melafalkan huruf hijaiyah secara tepat & fasih",
  },
  {
    title: "Tahsin & Tajwid",
    icon: BookOpen,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Kupas tuntas hukum tajwid dan perbaikan bacaan Al-Quran",
  },
  {
    title: "Dakwah & Kajian",
    icon: Video,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
    description: "Koleksi ceramah penyejuk jiwa dari ustadz & habib pilihan",
  },
  {
    title: "Tadabbur Al-Quran",
    icon: Sparkles,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
    description: "Menyelami kedalaman pesan ilahi untuk kehidupan sehari-hari",
  },
  {
    title: "Hafalan & Murattal",
    icon: Heart,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    description: "Metode menghafal efektif serta lantunan merdu para qari",
  },
];

const GridFeatures = () => {
  return (
    <section id="video-kajian" className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {gridItems.map((item, index) => (
            <Link href="/video-kajian" key={item.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 md:p-8 rounded-[24px] md:rounded-[32px] ${item.bgColor} soft-shadow cursor-pointer transition-all border border-transparent hover:border-primary/20 flex flex-col gap-3 md:gap-4 group h-full`}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-card flex items-center justify-center soft-shadow mb-1 md:mb-2 group-hover:scale-110 transition-transform">
                  <item.icon size={24} className={`${item.iconColor} md:hidden`} />
                  <item.icon size={28} className={`${item.iconColor} hidden md:block`} />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-foreground">{item.title}</h4>
                <p className="text-foreground/60 text-xs md:text-sm">{item.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridFeatures;
