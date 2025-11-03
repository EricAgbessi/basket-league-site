"use client";

import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useTransform } from "framer-motion";
import LiveStats from "./HerosComponents/liveSatart";
import BasketballScene from "./HerosComponents/BasketballScene";
import { ProgrammeCarousel } from "./HerosComponents/HighlightsCarousel";
import LiveClock from "./HerosComponents/LiveClock";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 1 - rect.bottom / windowHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const textOpacity = useTransform(() => 1 - Math.min(scrollProgress * 3, 1));
  const leftContentX = useTransform(() => -50 * scrollProgress);
  const leftContentOpacity = useTransform(() => 1 - Math.min(scrollProgress * 2, 1));
  const rightContentX = useTransform(() => 50 * (1 - scrollProgress));
  const rightContentOpacity = useTransform(() => Math.min(scrollProgress * 3, 1));

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] flex items-start justify-center w-full bg-gradient-to-br from-slate-900 via-orange-900/80 to-black overflow-hidden"
    >
      {/* Scene 3D */}
      <div className="fixed top-0 left-0 w-full h-screen">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          shadows
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <BasketballScene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>
      {/* Overlay de dégradé */}
      <div className="fixed inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
      {/* Stats en temps réel */}
      <LiveStats />
      {/* Programme carousel */}
      <ProgrammeCarousel />
      {/* Heure et date en direct */}
      <LiveClock />
      {/* Contenu divisé (apparaît pendant le scroll) */}
      <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none">
        <div className="container mx-auto px-6 h-full flex items-center">
          {/* Contenu gauche */}
          <motion.div
            className="w-1/2 pr-8"
            style={{
              x: leftContentX,
              opacity: leftContentOpacity,
            }}
          >
            <motion.h2
              className="text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              La Nouvelle Ère du <span className="text-orange-400">Basketball Africain</span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {`Découvrez une ligue où le talent, la passion et l'énergie se rencontrent pour créer un
              spectacle unique au monde. 16 équipes, 240 joueurs d'élite, une seule passion.`}
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Voir les Équipes
              </button>
              <button className="border-2 border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
                Highlights
              </button>
            </motion.div>
          </motion.div>

          {/* Contenu droit */}
          <motion.div
            className="w-1/2 pl-8"
            style={{
              x: rightContentX,
              opacity: rightContentOpacity,
            }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Prochain Match</h3>

              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LD</span>
                  </div>
                  <span className="text-white font-semibold">Lions de Dakar</span>
                  <div className="text-orange-400 text-sm">(12-2)</div>
                </div>

                <div className="text-white font-bold text-xl">VS</div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EA</span>
                  </div>
                  <span className="text-white font-semibold">{`Éléphants d'Abidjan`}</span>
                  <div className="text-blue-400 text-sm">(10-4)</div>
                </div>
              </div>

              <div className="text-center text-gray-300 mb-4">
                <p className="font-semibold">15 Décembre 2024 - 20:00</p>
                <p className="text-sm">{`Stade de l'Amitié, Dakar`}</p>
                <p className="text-green-400 text-sm font-bold mt-2">✓ EN DIRECT SUR AHL TV</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                  Acheter des Tickets
                </button>
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                  Regarder en Direct
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{
          opacity: textOpacity,
        }}
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll to discover</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
