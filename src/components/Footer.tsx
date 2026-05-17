"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Globe, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-card pt-20 pb-10 border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white soft-shadow">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Creative <span className="text-primary">Al-Quran</span>
              </span>
            </Link>
            <p className="text-foreground/70 leading-relaxed">
              Pusat Dakwah dan Pendidikan Islami Modern. Membawa Al-Quran lebih dekat dengan keseharian Anda.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all">
                <Globe size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all">
                <MessageCircle size={20} />
              </Link>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Menu Utama</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Home", href: "/" },
                { name: "Mushaf", href: "/mushaf" },
                { name: "Tafsir", href: "/tafsir/ibnu-katsir" },
                { name: "Artikel", href: "/artikel" },
                { name: "Tentang", href: "#about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Fitur</h4>
            <ul className="flex flex-col gap-4">
              {["Mushaf Utsmani", "Tafsir Ibnu Katsir", "Dzikir Harian", "Doa Pilihan"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Hubungi Kami</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-foreground/70">
                <Mail size={18} className="text-primary" />
                <span>infocreativequran@gmail.com</span>
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-secondary border border-border transition-colors">
                <p className="text-xs text-foreground/70 mb-3">Dapatkan update konten dakwah terbaru.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email Anda" 
                    className="bg-card px-4 py-2 rounded-xl text-sm w-full outline-none border border-border text-foreground focus:border-primary/50 transition-colors"
                  />
                  <button className="p-2 rounded-xl primary-gradient text-white">
                    👉
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-foreground/50 text-center md:text-left">
          <p>© 2026 Pusat Dakwah dan Pendidikan . All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
