"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LiveClock() {
  const [currentTime, setCurrentTime] = useState<Date | null>(new Date());

  useEffect(() => {
    if (currentTime) {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [currentTime]);

  if (!currentTime) {
    return (
      <motion.div
        className="absolute top-8 left-8 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-purple-500/30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-white text-sm font-semibold">Chargement...</div>
        <div className="text-orange-400 text-lg font-bold">--:--:--</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute top-8 left-8 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-purple-500/30"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="text-white text-sm font-semibold">
        {currentTime.toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div className="text-orange-400 text-lg font-bold">
        {currentTime.toLocaleTimeString("fr-FR")}
      </div>
    </motion.div>
  );
}

<LiveClock />;
