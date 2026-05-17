"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Mushaf", href: "/mushaf" },
    { name: "Tafsir", href: "/tafsir/ibnu-katsir" },
    { name: "Artikel", href: "/artikel" },
    { name: "Tentang", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass soft-shadow py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white soft-shadow">
            <BookOpen size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Creative <span className="text-primary">Al-Quran</span>
          </span>
        </Link>

        {/* Center: Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden md:block">
          <Link 
            href="/mushaf"
            className="px-6 py-2.5 rounded-full primary-gradient text-white text-sm font-semibold soft-shadow hover:scale-105 active:scale-95 transition-all inline-block"
          >
            👉 Buka Al-Quran
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-secondary py-8 px-6 flex flex-col gap-5 md:hidden shadow-2xl z-50 overflow-hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-xl font-semibold text-foreground/80 hover:text-primary transition-colors flex items-center justify-between group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/mushaf"
                className="mt-4 px-6 py-4 rounded-2xl primary-gradient text-white font-bold text-lg text-center soft-shadow active:scale-95 transition-all block"
                onClick={() => setMobileMenuOpen(false)}
              >
                👉 Buka Al-Quran
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
