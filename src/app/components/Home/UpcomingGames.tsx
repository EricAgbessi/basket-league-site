// components/home/UpcomingGames.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, Play, Clock } from "lucide-react";
import { useTheme } from "next-themes";

const upcomingGames = [
  {
    id: 1,
    date: "Aujourd'hui",
    time: "20:00",
    homeTeam: { name: "Lions de Dakar", logo: "🦁", record: "12-2" },
    awayTeam: { name: "Éléphants d'Abidjan", logo: "🐘", record: "10-4" },
    venue: "Stade de l'Amitié, Dakar",
    broadcast: "AHL Premium",
  },
  {
    id: 2,
    date: "Demain",
    time: "19:30",
    homeTeam: { name: "Sharks de Conakry", logo: "🦈", record: "8-6" },
    awayTeam: { name: "Aigles de Bamako", logo: "🦅", record: "9-5" },
    venue: "Palais des Sports, Conakry",
    broadcast: "AHL Standard",
  },
  {
    id: 3,
    date: "17 Déc",
    time: "21:00",
    homeTeam: { name: "Panthères de Kinshasa", logo: "🐆", record: "11-3" },
    awayTeam: { name: "Guépards de Douala", logo: "🐆", record: "7-7" },
    venue: "Martyrs Stadium, Kinshasa",
    broadcast: "AHL Premium",
  },
];

export function UpcomingGames() {
    const { theme, setTheme } = useTheme();

  return (
    <section className={`py-20 ${theme === "dark" ? "dark:bg-slate-900" : "bg-white"}  `}>
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
              Prochains Matchs
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Les rencontres à ne pas manquer cette semaine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {upcomingGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* En-tête date/heure */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2 text-orange-500">
                  <Calendar size={20} />
                  <span className="font-semibold">{game.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <Clock size={16} />
                  <span className="font-medium">{game.time}</span>
                </div>
              </div>

              {/* Équipes */}
              <div className="space-y-4 mb-6">
                {/* Équipe domicile */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{game.homeTeam.logo}</div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {game.homeTeam.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {game.homeTeam.record}
                      </div>
                    </div>
                  </div>
                </div>

                {/* VS */}
                <div className="text-center">
                  <div className="inline-block bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full">
                    <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">VS</span>
                  </div>
                </div>

                {/* Équipe visiteuse */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{game.awayTeam.logo}</div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {game.awayTeam.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {game.awayTeam.record}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm text-slate-600 dark:text-slate-400">📍 {game.venue}</div>
                <div className="text-sm text-blue-500 font-semibold">📺 {game.broadcast}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-6">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Play size={16} />
                  <span>Regarder</span>
                </button>
                <button className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-lg font-semibold transition-colors">
                  Billets
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Voir tout le calendrier */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-8 py-4 rounded-full font-semibold transition-colors">
            Voir le calendrier complet
          </button>
        </motion.div>
      </div>
    </section>
  );
}
