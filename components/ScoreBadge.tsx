interface ScoreBadgeProps {
  averageScore: number | null;
  voteCount: number;
}

const scoreLabels: Record<number, string> = {
  1: "Waardeloos",
  2: "Matig",
  3: "Oké",
  4: "Goed",
  5: "Uitstekend",
};

export default function ScoreBadge({ averageScore, voteCount }: ScoreBadgeProps) {
  const rounded = averageScore !== null ? Math.round(averageScore) : null;
  const label = rounded !== null ? scoreLabels[rounded] ?? "" : "";

  return (
    <div className="flex flex-col items-center gap-1 py-1">
      {averageScore !== null ? (
        <>
          <div
            className="font-display font-black text-poly-red leading-none"
            style={{ fontSize: "clamp(2.8rem, 8vw, 4rem)" }}
          >
            {averageScore.toFixed(1)}
          </div>
          <div className="font-display font-semibold text-poly-mid uppercase tracking-[0.2em] text-xs">
            {label}
          </div>
        </>
      ) : (
        <div className="font-display font-semibold text-poly-mid uppercase tracking-[0.15em] text-sm opacity-70">
          Nog geen stemmen
        </div>
      )}
      <div className="font-display font-semibold text-poly-mid uppercase tracking-[0.15em] text-xs mt-1">
        {voteCount} {voteCount === 1 ? "stem" : "stemmen"}
      </div>
    </div>
  );
}
