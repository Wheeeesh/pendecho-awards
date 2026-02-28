"use client";

import { useState, useTransition } from "react";
import { castVote } from "@/app/actions/votes";

interface VoteSliderProps {
  eventId: number;
  onVoted: () => void;
}

const scoreLabels: Record<number, string> = {
  1: "1 — Waardeloos",
  2: "2 — Matig",
  3: "3 — Oké",
  4: "4 — Goed",
  5: "5 — Uitstekend",
};

export default function VoteSlider({ eventId, onVoted }: VoteSliderProps) {
  const [score, setScore] = useState(3);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await castVote(eventId, score);
      if (result.success) {
        onVoted();
      } else {
        setError(result.error ?? "Er is iets misgegaan.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Score label */}
      <div className="font-display font-bold text-poly-white uppercase tracking-[0.18em] text-center text-sm min-h-[1.3rem]">
        {scoreLabels[score]}
      </div>

      {/* Slider */}
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        className="poly-slider"
        disabled={isPending}
      />

      {/* Tick marks — circles like POLY-8 pads */}
      <div className="flex justify-between px-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setScore(n)}
            className={`
              w-8 h-8 rounded-full border-2 border-white
              font-display font-bold text-xs
              transition-all duration-100
              ${score === n
                ? "bg-white text-poly-red scale-110"
                : "bg-transparent text-white opacity-50 hover:opacity-80"
              }
            `}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="font-body text-white text-xs text-center opacity-80">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="
          font-display font-bold uppercase tracking-[0.2em] text-sm
          bg-poly-white text-poly-red
          px-5 py-3 mt-1
          hover:opacity-90
          active:opacity-70
          transition-opacity duration-100
          disabled:opacity-40 disabled:cursor-not-allowed
          cursor-pointer w-full
        "
      >
        {isPending ? "Bezig..." : "Stem Uitbrengen"}
      </button>
    </form>
  );
}
