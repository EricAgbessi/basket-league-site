"use client";

import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useTransform } from "framer-motion";
import BasketballScene from "./Home/HerosComponents/BasketballScene";
import { ProgrammeCarousel } from "./Home/HerosComponents/HighlightsCarousel";
import Image from "next/image";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcul de la progression du scroll dans la hero section
      let progress = 1 - rect.bottom / windowHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // // Calcul de la visibilité (1 = complètement visible, 0 = complètement cachée)
      // const visibility = Math.max(0, Math.min(1, rect.bottom / windowHeight));
      // if (scrollProgress * 10 > 0.1) {
      //   setHeroVisibility(visibility);
      // }
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-orange-900/70 to-black text-white overflow-hidden flex flex-col justify-between">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center opacity-90"
        >
          <source src="/videos/heros.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Hero content */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      ></div>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 flex-1">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl py-20 md:py-0"
        >
          <motion.h2
            className="text-6xl font-bold mb-6 text-white font-rooster"
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
        </motion.div>

        {/* Player image (optional second layer) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full md:w-1/2 h-[400px] md:h-[600px] flex justify-end"
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            shadows
            gl={{ alpha: true, antialias: true }}
          >
            <Suspense fallback={null}>
              <BasketballScene scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* Video Highlights */}
      {/* <div className="flex flex-wrap gap-4 px-6 md:px-12 pb-8">
        {[
          { id: 1, time: "1:30", title: "Amazing Dunk Highlights" },
          { id: 2, time: "1:55", title: "Top 10 Plays This Week" },
          { id: 3, time: "2:30", title: "Best Defensive Moments" },
        ].map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.03 }}
            className="relative w-full sm:w-[38%] lg:w-[22%] rounded-xl overflow-hidden group"
          >
            <Image
              src={`/images/heros.jpg`}
              alt={video.title}
              width={400}
              height={250}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {video.time}
              </span>
              <h4 className="text-sm mt-2 font-semibold">{video.title}</h4>
            </div>
          </motion.div>
        ))}
      </div> */}

      {/* Programme carousel */}
      <ProgrammeCarousel />
    </section>
  );

  // const containerRef = useRef<HTMLDivElement>(null);
  // const [scrollProgress, setScrollProgress] = useState(0);
  // const [heroVisibility, setHeroVisibility] = useState(1); // 0 à 1 pour l'opacité
  // const [isScrollLocked, setIsScrollLocked] = useState(true);

  // // useEffect(() => {
  // //   if (scrollProgress > 0) {
  // //     setIsScrollLocked(false);
  // //   }
  // //   if (isScrollLocked) {
  // //     document.body.style.overflow = "hidden";
  // //   } else {
  // //     document.body.style.overflow = "auto";
  // //     if (scrollProgress >= 1) {
  // //     }
  // //   }

  // //   return () => {
  // //     document.body.style.overflow = "auto";
  // //   };
  // // }, [isScrollLocked, scrollProgress]);

  // useEffect(() => {
  //   const handler = () => {
  //     if (!containerRef.current) return;
  //     const rect = containerRef.current.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;

  //     // Calcul de la progression du scroll dans la hero section
  //     let progress = 1 - rect.bottom / windowHeight;
  //     progress = Math.max(0, Math.min(1, progress));
  //     setScrollProgress(progress);

  //     // Calcul de la visibilité (1 = complètement visible, 0 = complètement cachée)
  //     const visibility = Math.max(0, Math.min(1, rect.bottom / windowHeight));
  //     if (scrollProgress * 10 > 0.1) {
  //       setHeroVisibility(visibility);
  //     }
  //   };

  //   window.addEventListener("scroll", handler, { passive: true });
  //   handler();
  //   return () => window.removeEventListener("scroll", handler);
  // }, []);

  // const textOpacity = useTransform(() => 1 - Math.min(scrollProgress * 3, 1));
  // const leftContentX = useTransform(() => -50 * scrollProgress * 35);
  // const leftContentOpacity = useTransform(() => 1 - Math.min(scrollProgress * 10, 1));
  // const rightContentX = useTransform(() => 50 * (1 - scrollProgress * 35));
  // const rightContentOpacity = useTransform(() => Math.min(scrollProgress * 10, 1));
  // const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
  //   // Déterminer la direction du scroll (deltaY) et la sensibilité
  //   const sensitivity = 0.05;
  //   const delta = event.deltaY > 0 ? sensitivity : -sensitivity;

  //   // Calculer la nouvelle progression
  //   const newProgress = Math.max(0, Math.min(1, scrollProgress + delta));
  //   console.log(newProgress);
  //   setScrollProgress(newProgress);
  //   // Si l'animation n'est pas terminée (newProgress < 1),
  //   // on bloque le scroll par défaut du navigateur.
  //   if (newProgress < 1) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // };

  // return (
  //   <>
  //     {/* Hero Section avec transition d'opacité */}
  //     <section
  //       ref={containerRef}
  //       onWheel={handleWheel}
  //       className="relative h-screen flex items-start justify-center w-full bg-gradient-to-br from-slate-900 via-orange-900/80 to-black overflow-hidden"
  //       style={{
  //         opacity: heroVisibility,
  //         pointerEvents: heroVisibility > 0.1 ? "auto" : "none",
  //       }}
  //     >
  //       {/* Scene 3D - UNIQUEMENT dans la hero */}
  //       <div className="absolute top-0 left-0 w-full h-full">
  //         <Canvas
  //           camera={{ position: [0, 0, 5], fov: 45 }}
  //           shadows
  //           gl={{ alpha: true, antialias: true }}
  //         >
  //           <Suspense fallback={null}>
  //             <BasketballScene scrollProgress={scrollProgress} />
  //           </Suspense>
  //         </Canvas>
  //       </div>

  //       {/* Overlay de dégradé */}
  //       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

  //       {/* Programme carousel */}
  //       <ProgrammeCarousel />

  //       {/* Contenu divisé (apparaît pendant le scroll) */}
  //       <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
  //         <div className="container mx-auto px-6 h-full flex items-center">
  //           {/* Contenu gauche */}
  //           <motion.div
  //             className="w-1/2 pr-8"
  //             style={{
  //               x: leftContentX,
  //               opacity: leftContentOpacity,
  //             }}
  //           >
  //             <motion.h2
  //               className="text-4xl font-bold mb-6 text-white"
  //               initial={{ opacity: 0 }}
  //               animate={{ opacity: 1 }}
  //             >
  //               La Nouvelle Ère du <span className="text-orange-400">Basketball Africain</span>
  //             </motion.h2>

  //             <motion.p
  //               className="text-lg text-gray-300 mb-6 leading-relaxed"
  //               initial={{ opacity: 0 }}
  //               animate={{ opacity: 1 }}
  //               transition={{ delay: 0.2 }}
  //             >
  //               {`Découvrez une ligue où le talent, la passion et l'énergie se rencontrent pour créer un
  //               spectacle unique au monde. 16 équipes, 240 joueurs d'élite, une seule passion.`}
  //             </motion.p>

  //             <motion.div
  //               className="flex gap-4"
  //               initial={{ opacity: 0 }}
  //               animate={{ opacity: 1 }}
  //               transition={{ delay: 0.4 }}
  //             >
  //               <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
  //                 Voir les Équipes
  //               </button>
  //               <button className="border-2 border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
  //                 Highlights
  //               </button>
  //             </motion.div>
  //           </motion.div>

  //           {/* Contenu droit */}
  //           <motion.div
  //             className="w-1/2 pl-8"
  //             style={{
  //               x: rightContentX,
  //               opacity: rightContentOpacity,
  //             }}
  //           >
  //             <motion.div
  //               className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
  //               initial={{ opacity: 0 }}
  //               animate={{ opacity: 1 }}
  //             >
  //               <h3 className="text-2xl font-bold text-white mb-4">Prochain Match</h3>

  //               <div className="flex items-center justify-between mb-4">
  //                 <div className="text-center">
  //                   <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
  //                     <span className="text-white font-bold text-sm">LD</span>
  //                   </div>
  //                   <span className="text-white font-semibold">Lions de Dakar</span>
  //                   <div className="text-orange-400 text-sm">(12-2)</div>
  //                 </div>

  //                 <div className="text-white font-bold text-xl">VS</div>

  //                 <div className="text-center">
  //                   <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
  //                     <span className="text-white font-bold text-sm">EA</span>
  //                   </div>
  //                   <span className="text-white font-semibold">{`Éléphants d'Abidjan`}</span>
  //                   <div className="text-blue-400 text-sm">(10-4)</div>
  //                 </div>
  //               </div>

  //               <div className="text-center text-gray-300 mb-4">
  //                 <p className="font-semibold">15 Décembre 2024 - 20:00</p>
  //                 <p className="text-sm">{`Stade de l'Amitié, Dakar`}</p>
  //                 <p className="text-green-400 text-sm font-bold mt-2">✓ EN DIRECT SUR AHL TV</p>
  //               </div>

  //               <div className="flex gap-2">
  //                 <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300">
  //                   Acheter des Tickets
  //                 </button>
  //                 <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300">
  //                   Regarder en Direct
  //                 </button>
  //               </div>
  //             </motion.div>
  //           </motion.div>
  //         </div>
  //       </div>

  //       {/* Scroll indicator */}
  //       <motion.div
  //         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         transition={{ duration: 1, delay: 1 }}
  //         style={{
  //           opacity: textOpacity,
  //         }}
  //       >
  //         <div className="flex flex-col items-center text-gray-400">
  //           <span className="text-sm mb-2">Scroll to discover</span>
  //           <motion.div
  //             animate={{ y: [0, 10, 0] }}
  //             transition={{ duration: 2, repeat: Infinity }}
  //             className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
  //           >
  //             <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
  //           </motion.div>
  //         </div>
  //       </motion.div>
  //     </section>

  //     {/* Espace pour le scroll - MAINTENANT TOUJOURS VISIBLE */}
  //     {/* <div className="h-screen bg-transparent" /> */}
  //   </>
  // );
}
