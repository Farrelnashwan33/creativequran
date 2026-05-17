"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Book, ScrollText, Settings2, ChevronRight, ExternalLink } from "lucide-react";

const features = [
  {
    title: "Jenis Mushaf",
    description: "Pilih tampilan mushaf sesuai kebutuhan: Mushaf Utsmani & Mushaf Madani.",
    gradient: "from-[#4FACFE] to-[#00F2FE]", // Biru Pagi
    icon: Book,
    buttonText: "Lihat Mushaf",
    href: "/mushaf",
  },
  {
    title: "Tafsir Al-Quran",
    description: "Pelajari makna ayat dari kitab tafsir terpercaya: Ibnu Katsir & Jalalain.",
    gradient: "from-[#FAD961] to-[#F76B1C]", // Orange Sunset
    icon: ScrollText,
    links: [
      { name: "Ibnu Katsir", href: "/tafsir/ibnu-katsir" },
      { name: "Jalalain", href: "/tafsir/jalalain" },
    ],
  },
  {
    title: "Pengaturan Teks",
    description: "Atur ukuran teks Arab & terjemahan, tampilkan per kata, atau terjemahan lengkap.",
    gradient: "from-[#FF416C] to-[#FF4B2B]", // Merah Berani
    icon: Settings2,
    buttonText: "Atur Tampilan",
    href: "/settings",
  },
];

const FeatureCards = () => {
  return (
    <section id="features" className="py-12 md:py-20 bg-background/50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-gradient-to-r ${feature.gradient} p-6 md:p-8 lg:p-12 text-white soft-shadow flex flex-col lg:flex-row items-center justify-between gap-8 group`}
            >
              <div className="flex flex-col gap-4 max-w-xl text-center lg:text-left z-10 w-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-1 md:mb-2 mx-auto lg:mx-0">
                  <feature.icon size={24} className="md:hidden" />
                  <feature.icon size={32} className="hidden md:block" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start">
                  {feature.links ? (
                    feature.links.map((link) => (
                      <Link 
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-2 bg-white text-foreground px-5 py-2.5 rounded-xl font-bold hover:scale-105 transition-all soft-shadow text-sm"
                      >
                        {link.name} <ExternalLink size={14} className="text-primary" />
                      </Link>
                    ))
                  ) : (
                    <Link 
                      href={feature.href || "#"}
                      className="flex items-center gap-2 bg-white text-foreground px-6 py-3 rounded-xl md:rounded-2xl font-bold hover:gap-4 transition-all duration-300 soft-shadow text-sm md:text-base"
                    >
                      {feature.buttonText} <ChevronRight size={18} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Decorative Element / Illustration Placeholder */}
              <div className="absolute right-[-10%] bottom-[-10%] lg:relative lg:right-0 lg:bottom-0 lg:w-1/3 h-32 md:h-48 flex items-center justify-center opacity-20 lg:opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none lg:pointer-events-auto">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-150" />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-white scale-[2.5] md:scale-[3] lg:scale-[5]"
                >
                  <feature.icon size={64} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
