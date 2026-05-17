"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, BookOpenCheck, MousePointer2 } from "lucide-react";

const aboutItems = [
  {
    title: "Mudah Dibaca",
    description: "UI bersih & nyaman untuk membaca lama tanpa melelahkan mata.",
    icon: Eye,
  },
  {
    title: "Tafsir Lengkap",
    description: "Belajar makna Al-Quran dari ulama terpercaya dengan referensi shahih.",
    icon: BookOpenCheck,
  },
  {
    title: "Fleksibel",
    description: "Atur tampilan, ukuran teks, dan mode terjemahan sesuai kenyamanan Anda.",
    icon: MousePointer2,
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/30 rounded-[32px] md:rounded-[64px] mx-4 md:mx-6 lg:mx-12 my-12 md:my-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Mengapa Creative Al-Quran?
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto">
            Kami menghadirkan teknologi untuk memudahkan umat Islam dalam berinteraksi dengan kitab suci setiap hari.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {aboutItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center gap-4 md:gap-6"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white flex items-center justify-center soft-shadow mb-1 md:mb-2">
                  <Icon size={28} className="text-primary md:hidden" />
                  <Icon size={32} className="text-primary hidden md:block" />
                </div>
                <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed max-w-[250px]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
