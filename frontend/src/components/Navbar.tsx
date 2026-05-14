import { Link } from "wouter";
import { Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl tracking-tight text-slate-800 dark:text-white" style={{ fontFamily: 'Gabriela, serif' }}>MailMuse AI</span>
        </Link>
        <nav className="flex items-center gap-4">
          <button
            data-testid="button-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-white/80 border border-black/10 dark:border-white/10 transition-all"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
