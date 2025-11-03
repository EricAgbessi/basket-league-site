"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, Trophy, Calendar, Users, Home } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LiveClock from "./HerosComponents/LiveClock";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "Équipes", href: "/teams" },
    { name: "Calendrier", href: "/games" },
    { name: "Classement", href: "/standings" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg dark:bg-slate-900/90"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <LiveClock />
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AHL</span>
                </div>
                <div
                  className={`hidden md:block ${isScrolled ? "text-slate-900 dark:text-white" : "text-white"}`}
                >
                  <span className="font-black text-xl tracking-tight">AFRIC HOOPS</span>
                  <span className="block text-xs font-light opacity-80">LEAGUE</span>
                </div>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                      isScrolled
                        ? "text-slate-700 hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
                        : "text-white/90 hover:text-white"
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span>{item.name}</span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    : "text-white/90 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search size={20} />
              </motion.button>

              {/* CTA Button */}
              <motion.button
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  isScrolled
                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
                    : "bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Tickets
              </motion.button>
              <ThemeToggle />
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full ${isScrolled ? "text-slate-700" : "text-white"}`}
                whileTap={{ scale: 0.9 }}
              >
                <Search size={20} />
              </motion.button>

              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full ${isScrolled ? "text-slate-700" : "text-white"}`}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => {
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                    </motion.a>
                  );
                })}

                <motion.button
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold mt-4"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Acheter des Tickets
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4"
              initial={{ scale: 0.9, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Search size={24} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des équipes, joueurs, matchs..."
                    className="flex-1 bg-transparent border-none outline-none text-lg placeholder-slate-400 dark:text-white"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Search Suggestions */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Suggestions rapides
                  </div>
                  {["Lions de Dakar", "Éléphants d'Abidjan", "Prochain match", "Classement"].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        className="block w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
