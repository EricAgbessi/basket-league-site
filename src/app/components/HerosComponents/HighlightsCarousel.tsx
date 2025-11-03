"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Composant pour le programme des matchs
export function ProgrammeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

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
      className="absolute top-20  bg-black/50 backdrop-blur-md rounded-2xl p-2 border border-blue-500/30 w-300"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      style={{ position: "relative" }}
    >
      {/* En-tête */}
      {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className="text-white font-bold text-lg mx-2 text-blue-400">PROGRAMME</p>
          <p className="text-gray-400 text-sm">(Matchs en direct & à venir)</p>
        </div> */}
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
              className="flex-shrink-0 w-60 mr-6" // 320px width
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              {/* Carte de match */}
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl p-2 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                {/* En-tête de la carte */}
                <div className="flex items-center justify-between mb-1">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBg(match.status)} ${getStatusColor(match.status)}`}
                  >
                    {match.status}
                  </div>
                  <div className="text-white text-xs font-medium">{match.time}</div>
                </div>

                {/* Équipes et scores */}
                <div className="space-y-3">
                  {/* Équipe à domicile */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">{match.teamHome.logo}</div>
                      <span className="text-white font-semibold text-xs">
                        {match.teamHome.name}
                      </span>
                    </div>
                    <div className="text-white font-bold text-xs">{match.teamHome.score}</div>
                  </div>

                  {/* Équipe visiteuse */}
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

                {/* Séparateur */}
                <div className="border-t border-white/10 my-1"></div>

                {/* Actions */}
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

// Version alternative avec défilement horizontal complet
export function ProgrammeHorizontal() {
  const matches = [
    {
      id: 1,
      time: "1:00 AM WAT",
      teamHome: { name: "Lions Dakar", score: 42, logo: "🦁" },
      teamAway: { name: "Sharks Conakry", score: 38, logo: "🦈" },
      status: "Q3",
      league: "AHL Premium",
    },
    {
      id: 2,
      time: "1:30 AM WAT",
      teamHome: { name: "Éléphants Abidjan", score: 56, logo: "🐘" },
      teamAway: { name: "Guépards Douala", score: 52, logo: "🐆" },
      status: "Live",
      league: "AHL Premium",
    },
    {
      id: 3,
      time: "2:00 AM WAT",
      teamHome: { name: "Aigles Bamako", score: 0, logo: "🦅" },
      teamAway: { name: "Panthères Kinshasa", score: 0, logo: "🐾" },
      status: "Soon",
      league: "AHL Premium",
    },
    {
      id: 4,
      time: "2:30 AM WAT",
      teamHome: { name: "Gazelles Niamey", score: 0, logo: "🦌" },
      teamAway: { name: "Buffalos Ouaga", score: 0, logo: "🐃" },
      status: "Soon",
      league: "AHL Standard",
    },
  ];

  return (
    <motion.div
      className="absolute top-20 right-8 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 max-w-4xl"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
    >
      <h3 className="text-white font-bold text-lg mb-4 text-blue-400">PROGRAMME AFRIC HOOPS</h3>

      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            className="flex-shrink-0 w-72 bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* En-tête */}
            <div className="flex items-center justify-between mb-3">
              <div
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  match.status === "Live"
                    ? "bg-red-500/20 text-red-500"
                    : match.status === "Soon"
                      ? "bg-gray-500/20 text-gray-500"
                      : "bg-orange-500/20 text-orange-500"
                }`}
              >
                {match.status}
              </div>
              <div className="text-white text-sm font-medium">{match.time}</div>
            </div>

            {/* Contenu du match */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{match.teamHome.logo}</span>
                  <span className="text-white font-semibold">{match.teamHome.name}</span>
                </div>
                <span className="text-white font-bold text-xl">{match.teamHome.score}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{match.teamAway.logo}</span>
                  <span className="text-white font-semibold">{match.teamAway.name}</span>
                </div>
                <span className="text-white font-bold text-xl">{match.teamAway.score}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 mt-3 pt-3 flex items-center justify-between">
              <span className="text-blue-400 text-xs font-semibold">{match.league}</span>
              <motion.button
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={12} />
                <span>REGARDER</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
