"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

// Composant pour le programme des matchs
export function ProgrammeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const matches = [
    {
      id: 1,
      time: "1:00 AM WAT",
      teamHome: { name: "Timberwolves", score: 0, logo: "🐺" },
      teamAway: { name: "Bucks", score: 33, logo: "🦌" },
      status: "Live",
      league: "League Pass",
    },
    {
      id: 2,
      time: "1:00 AM WAT",
      teamHome: { name: "Nets", score: 6, logo: "🌐" },
      teamAway: { name: "Pacers", score: 0, logo: "🏁" },
      status: "Q1",
      league: "League Pass",
    },
    {
      id: 3,
      time: "1:30 AM WAT",
      teamHome: { name: "Jazz", score: 24, logo: "🎷" },
      teamAway: { name: "Celtics", score: 54, logo: "🍀" },
      status: "Q2",
      league: "League Pass",
    },
    {
      id: 4,
      time: "1:30 AM WAT",
      teamHome: { name: "Wizards", score: 33, logo: "🧙" },
      teamAway: { name: "Knicks", score: 0, logo: "🗽" },
      status: "Q1",
      league: "League Pass",
    },
    {
      id: 5,
      time: "2:00 AM WAT",
      teamHome: { name: "Mavericks", score: 0, logo: "🐴" },
      teamAway: { name: "Rockets", score: 0, logo: "🚀" },
      status: "Soon",
      league: "League Pass",
    },
    {
      id: 6,
      time: "2:00 AM WAT",
      teamHome: { name: "Pistons", score: 0, logo: "🔧" },
      teamAway: { name: "Grizzlies", score: 0, logo: "🐻" },
      status: "Soon",
      league: "League Pass",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % matches.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  // Auto-scroll toutes les 5 secondes
  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "text-red-500";
      case "Q1":
      case "Q2":
      case "Q3":
      case "Q4":
        return "text-orange-500";
      case "Soon":
        return "text-gray-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-red-500/20";
      case "Q1":
      case "Q2":
      case "Q3":
      case "Q4":
        return "bg-orange-500/20";
      case "Soon":
        return "bg-gray-500/20";
      default:
        return "bg-gray-400/20";
    }
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-4 px-6 md:px-12 pb-8 ${theme === "dark" ? "bg-black/50" : "bg-white/20"}  backdrop-blur-md rounded-2xl p-2 `}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      style={{ position: "relative" }}
    >
      <motion.button
        onClick={prevSlide}
        className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        style={{ position: "absolute", left: "10px", bottom: "50%", zIndex: "10" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={16} className="text-white" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        style={{ position: "absolute", right: "10px", bottom: "50%", zIndex: "10" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={16} className="text-white" />
      </motion.button>

      {/* Conteneur du carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex transition-transform duration-500"
          style={{ x: -currentIndex * 320 }} // 320px = width de chaque carte
        >
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              whileHover={{ scale: 1.03 }}
              className="relative w-full sm:w-[38%] lg:w-[22%] rounded-xl overflow-hidden group m-4"
            >
              <Image
                src={`/images/heros.jpg`}
                alt={match.status}
                width={400}
                height={250}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
              <div className="absolute bottom-4 left-4">
                <motion.div
                  key={match.id}
                  className="flex-shrink-0 w-60 p-0" // 320px width
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  {/* Carte de match */}
                  <div
                    className={`bg-gradient-to-br ${"from-slate-800/90 to-slate-900/90"}rounded-xl p-2 transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBg(match.status)} ${getStatusColor(match.status)}`}
                      >
                        {match.status}
                      </div>
                      <div className="text-white text-xs font-medium">{match.time}</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{match.teamHome.logo}</div>
                          <span className="text-white font-semibold text-xs">
                            {match.teamHome.name}
                          </span>
                        </div>
                        <div className="text-white font-bold text-xs">{match.teamHome.score}</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{match.teamAway.logo}</div>
                          <span className="text-white font-semibold text-xs">
                            {match.teamAway.name}
                          </span>
                        </div>
                        <div className="text-white font-bold text-xs">{match.teamAway.score}</div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 my-1"></div>

                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 text-xs font-semibold">{match.league}</span>
                      <motion.button
                        className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-1 py-1 rounded-full text-xs font-semibold transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play size={12} />
                        <span className="text-xs">REGARDER</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicateurs de slide */}
      {/* <div className="flex justify-center space-x-2 mt-4">
        {matches.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-500 w-4" : "bg-white/30"
            }`}
          />
        ))}
      </div> */}
    </motion.div>
  );
}
