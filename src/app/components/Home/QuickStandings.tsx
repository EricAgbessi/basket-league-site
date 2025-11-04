// components/home/QuickStandings.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

const topTeams = [
  { position: 1, name: "Lions de Dakar", logo: "🦁", wins: 12, losses: 2, streak: ["W", "W", "W"] },
  {
    position: 2,
    name: "Panthères de Kinshasa",
    logo: "🐆",
    wins: 11,
    losses: 3,
    streak: ["W", "L", "W"],
  },
  {
    position: 3,
    name: "Éléphants d'Abidjan",
    logo: "🐘",
    wins: 10,
    losses: 4,
    streak: ["L", "W", "W"],
  },
  {
    position: 4,
    name: "Aigles de Bamako",
    logo: "🦅",
    wins: 9,
    losses: 5,
    streak: ["W", "W", "L"],
  },
  {
    position: 5,
    name: "Sharks de Conakry",
    logo: "🦈",
    wins: 8,
    losses: 6,
    streak: ["L", "W", "W"],
  },
];

export function QuickStandings() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Classement
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Top 5 des équipes de la saison régulière
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* En-tête */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-900 text-white font-semibold">
              <div className="col-span-1">#</div>
              <div className="col-span-6">Équipe</div>
              <div className="col-span-2 text-center">W-L</div>
              <div className="col-span-3 text-center">Forme</div>
            </div>

            {/* Lignes */}
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {topTeams.map((team, index) => (
                <motion.div
                  key={team.position}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Position */}
                  <div className="col-span-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        team.position === 1
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : team.position <= 4
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                      }`}
                    >
                      {team.position}
                    </div>
                  </div>

                  {/* Équipe */}
                  <div className="col-span-6 flex items-center space-x-3">
                    <div className="text-2xl">{team.logo}</div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                        {team.name}
                      </div>
                    </div>
                  </div>

                  {/* Record */}
                  <div className="col-span-2 text-center">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {team.wins}-{team.losses}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {((team.wins / (team.wins + team.losses)) * 100).toFixed(1)}%
                    </div>
                  </div>

                  {/* Série */}
                  <div className="col-span-3 text-center">
                    <div className="flex justify-center space-x-1">
                      {team.streak.map((result, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            result === "W" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Voir classement complet */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <span>Voir le classement complet</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
