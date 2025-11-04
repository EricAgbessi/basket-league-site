"use client";
import Hero from "./components/Hero";
import Header from "./components/Header";
import { UpcomingGames } from "./components/Home/UpcomingGames";
import { useEffect, useState } from "react";
import { QuickStandings } from "./components/Home/QuickStandings";
import { NewsHighlights } from "./components/Home/NewsHighlights";

export default function Home() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsHeroVisible(rect.bottom > 100); // Marge de 100px
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="dark:bg-black w-full min-h-screen">
      <Header />
      <main>
        {/* Hero avec id pour la détection */}
        <section id="hero-section">
          <Hero />
        </section>

        {/* Le reste du contenu */}
        <section
          className={`transition-opacity duration-500 ${isHeroVisible ? "opacity-0" : "opacity-100"}`}
        >
          <UpcomingGames />
          <QuickStandings />
          <NewsHighlights />
        </section>
      </main>
    </div>
  );
}
