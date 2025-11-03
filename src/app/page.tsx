import Hero from "./components/Hero";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="dark:bg-black w-full">
      <Header />
      <main>
        <Hero />
        <section className="min-h-screen bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none">
          <div className="container mx-auto py-20">
            <h2 className="text-4xl font-bold text-center">Suite du site</h2>
          </div>
        </section>
      </main>
    </div>
  );
}
