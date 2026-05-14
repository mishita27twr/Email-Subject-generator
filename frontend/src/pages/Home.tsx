import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { GeneratorForm } from "../components/GeneratorForm";
import { ResultCard } from "../components/ResultCard";
import { Footer } from "../components/Footer";

export default function Home() {
  const [subjects, setSubjects] = useState<string[]>([]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
        <div className="text-center space-y-6 mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 dark:from-white dark:via-white dark:to-white/60">
            Write subject lines that actually open.
          </h1>
          <p className="text-base font-medium italic text-violet-600 dark:text-violet-300" style={{ fontFamily: 'Gabriela, serif' }}>
            An AI that inspires and creates better email ideas.
          </p>
          <p className="text-lg md:text-xl text-slate-500 dark:text-white/60">
            Stop guessing. Let our AI analyze your email body and generate high-converting subject lines instantly.
          </p>
        </div>

        <GeneratorForm onResults={setSubjects} />

        {subjects.length > 0 && <ResultCard subjects={subjects} />}
      </main>

      <Footer />
    </div>
  );
}
