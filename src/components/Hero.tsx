"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="home" className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-secondary/30 rounded-b-[60px] md:rounded-l-[100px] md:rounded-b-none -z-10" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Platform Quran Modern
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Belajar Al-Quran <br />
            <span className="text-primary">Lebih Mudah & Modern</span>
          </h1>
          
          <p className="text-base sm:text-lg text-foreground/70 max-w-xl">
            Platform membaca, memahami, dan mentadabburi Al-Quran dengan fitur mushaf, tafsir, dan pengaturan teks lengkap. Nikmati pengalaman spiritual yang lebih mendalam.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 w-full sm:w-auto">
            <Link 
              href="/mushaf"
              className="px-8 py-4 rounded-2xl primary-gradient text-white font-bold text-lg text-center soft-shadow hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              Mulai Membaca
            </Link>
            <Link 
              href="#features"
              className="px-8 py-4 rounded-2xl bg-card text-foreground font-bold text-lg text-center soft-shadow border border-border hover:bg-secondary active:scale-95 transition-all w-full sm:w-auto duration-300"
            >
              Lihat Fitur
            </Link>
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative px-4 sm:px-0"
        >
          <div className="relative z-10 rounded-[32px] md:rounded-[48px] overflow-hidden soft-shadow border-4 md:border-8 border-card max-w-[500px] mx-auto lg:max-w-none transition-colors duration-300">
            <Image
              src="/hero-illustration.png"
              alt="Islamic Illustration"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          
          {/* Floating Decorative Cards */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 z-20 glass p-3 sm:p-4 rounded-xl sm:rounded-2xl soft-shadow scale-90 sm:scale-100"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg primary-gradient flex items-center justify-center text-white text-xs sm:text-base">
                📖
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-foreground whitespace-nowrap">Mushaf Madani</p>
                <p className="text-[8px] sm:text-[10px] text-foreground/50">Tersedia Sekarang</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-2 sm:-bottom-10 sm:-left-10 z-20 glass p-3 sm:p-4 rounded-xl sm:rounded-2xl soft-shadow scale-90 sm:scale-100"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent flex items-center justify-center text-white text-xs sm:text-base">
                ✨
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-foreground whitespace-nowrap">Tafsir Lengkap</p>
                <p className="text-[8px] sm:text-[10px] text-foreground/50">Ibnu Katsir & Jalalain</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
