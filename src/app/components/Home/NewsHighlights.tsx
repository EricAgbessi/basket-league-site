// components/home/NewsHighlights.tsx
"use client";

import { motion } from "framer-motion";
import { Play, Calendar, ArrowRight } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Record de points pour K. Mbaye",
    excerpt: "Le meneur des Lions établit un nouveau record de la ligue avec 52 points.",
    image: "🏀",
    category: "Record",
    date: "Il y a 2h",
    type: "article",
  },
  {
    id: 2,
    title: "Dunk de la semaine",
    excerpt: "Le dunk spectaculaire de J. Konaté nommé meilleur action de la semaine.",
    image: "💥",
    category: "Highlight",
    date: "Il y a 1 jour",
    type: "video",
  },
  {
    id: 3,
    title: "Interview exclusive du coach Diallo",
    excerpt: "Le coach des Lions parle de la saison et des objectifs playoffs.",
    image: "🎙️",
    category: "Interview",
    date: "Il y a 2 jours",
    type: "article",
  },
];

export function NewsHighlights() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
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
              Actualités & Highlights
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Restez informé des dernières nouvelles de la ligue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Image/Video */}
              <div className="relative h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <div className="text-6xl">{item.image}</div>
                {item.type === "video" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play size={24} className="text-orange-500 ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {item.excerpt}
                </p>

                <button className="flex items-center space-x-2 text-orange-500 font-semibold group-hover:space-x-3 transition-all">
                  <span>{item.type === "video" ? "Regarder" : "Lire la suite"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Voir toutes les actualités */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-8 py-4 rounded-full font-semibold transition-colors">
            Voir toutes les actualités
          </button>
        </motion.div>
      </div>
    </section>
  );
}
