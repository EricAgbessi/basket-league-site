import { useState } from "react";
import { motion } from "framer-motion";

export default function LiveStats() {
  const [stats, setStats] = useState({
    liveGames: 3,
    totalTeams: 16,
    players: 240,
    pointsToday: 1247,
  });

  return (
    <motion.div
      className="absolute top-8 right-8 bg-black/60 backdrop-blur-md rounded-2xl p-2 border border-orange-500/30"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <h3 className="text-white font-bold text-lg mb-2 text-orange-400">EN DIRECT</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.liveGames}</div>
          <div className="text-xs text-gray-300">Matchs en cours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.totalTeams}</div>
          <div className="text-xs text-gray-300">Équipes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.players}</div>
          <div className="text-xs text-gray-300">Joueurs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.pointsToday}</div>
          <div className="text-xs text-gray-300">{"Points aujourd'hui"}</div>
        </div>
      </div>
    </motion.div>
  );
}
