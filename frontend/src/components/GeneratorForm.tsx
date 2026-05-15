import { useState } from "react";
import { TONES } from "../constants/tones";
import { generateSubjects } from "../services/subjectApi";
import { Loader2, Wand2 } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface GeneratorFormProps {
  onResults: (subjects: string[]) => void;
}

export function GeneratorForm({ onResults }: GeneratorFormProps) {
  const [emailText, setEmailText] = useState("");
  const [tone, setTone] = useState(TONES[0].value);
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  if (!emailText.trim()) {
  setError("Please enter email content first.");
  return;
}
    setLoading(true);
    setError(null);

    try {
      const data = await generateSubjects(emailText, tone, count);
      if (data.success) {
        onResults(data.subjects);
      } else {
        setError("Failed to generate subjects. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full backdrop-blur-xl rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all " +
    "bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="email-body" className="block text-sm font-medium text-slate-700 dark:text-white/80">
          Email Body
        </label>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <textarea
            id="email-body"
            data-testid="input-email-body"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste your email draft here..."
            className={"relative w-full h-48 resize-none " + inputBase + " placeholder:text-slate-400 dark:placeholder:text-white/30"}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="tone-select" className="block text-sm font-medium text-slate-700 dark:text-white/80">
            Tone
          </label>
          <select
            id="tone-select"
            data-testid="select-tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className={inputBase + " appearance-none cursor-pointer"}
            style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
          >
            {TONES.map((t) => (
            <option key={t.value} value={t.value} className="text-black bg-white">                
            {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="count-input" className="block text-sm font-medium text-slate-700 dark:text-white/80">
            Number of Subjects (1-10)
          </label>
          <input
            id="count-input"
            type="number"
            data-testid="input-count"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className={inputBase}
            style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        data-testid="button-generate"
        disabled={loading || !emailText.trim()}
        className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 group-disabled:opacity-0"></div>
        <div className="relative w-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-slate-800 dark:text-white rounded-xl p-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/90 dark:hover:bg-white/15 transition-all">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Magic
            </>
          )}
        </div>
      </button>
    </form>
  );
}
