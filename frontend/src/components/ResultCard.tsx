import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface ResultCardProps {
  subjects: string[];
}

export function ResultCard({ subjects }: ResultCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  if (!subjects.length) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Generated Subjects</h3>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30">
          {subjects.length} results
        </span>
      </div>

      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl p-4 hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-slate-800 dark:text-white text-lg leading-relaxed flex-1 pt-1">{subject}</p>
              <button
                data-testid={`button-copy-${index}`}
                onClick={() => handleCopy(subject, index)}
                className="flex-shrink-0 p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-white/70 hover:text-slate-800 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                aria-label="Copy subject line"
              >
                {copiedIndex === index ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {copiedIndex === index && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-3 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg"
              >
                Copied!
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
