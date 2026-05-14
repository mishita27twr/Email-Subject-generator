import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-24 py-8 border-t border-black/10 dark:border-white/10 backdrop-blur-md bg-white/20 dark:bg-black/20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 dark:text-white/50 text-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-400" />
          <span>MailMuse AI &copy; {new Date().getFullYear()}</span>
        </div>
        <p>Crafted with precision for marketers.</p>
      </div>
    </footer>
  );
}
