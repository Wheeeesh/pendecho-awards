"use client";

import { useCallback } from "react";
import { useVotedEvents } from "@/hooks/useVotedEvents";
import ScoreBadge from "./ScoreBadge";
import VoteSlider from "./VoteSlider";
import DeleteButton from "./DeleteButton";

interface EventCardProps {
  id: number;
  name: string;
  voteCount: number;
  averageScore: number | null;
}

export default function EventCard({
  id,
  name,
  voteCount,
  averageScore,
}: EventCardProps) {
  const { hasVoted, markVoted, hydrated } = useVotedEvents();
  const voted = hasVoted(id);

  const handleVoted = useCallback(() => {
    markVoted(id);
  }, [id, markVoted]);

  return (
    <article className="border border-poly-line flex flex-col">
      {/* Card header — name + delete */}
      <div className="border-b border-poly-line px-4 py-3 flex items-center justify-between gap-3">
        <h2
          className="font-display font-bold text-poly-white uppercase tracking-[0.05em] leading-tight"
          style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)" }}
        >
          {name}
        </h2>
        <div className="shrink-0">
          <DeleteButton eventId={id} eventName={name} />
        </div>
      </div>

      {/* Score panel — off-white "screen" area */}
      <div className="bg-poly-screen border-b border-poly-line px-4 py-5 flex justify-center">
        <ScoreBadge averageScore={averageScore} voteCount={voteCount} />
      </div>

      {/* Voting section */}
      <div className="px-4 py-5 flex-1">
        {!hydrated ? (
          <div className="h-24 flex items-center justify-center">
            <span className="font-display font-semibold text-poly-dim uppercase tracking-[0.2em] text-xs animate-pulse">
              Laden...
            </span>
          </div>
        ) : voted ? (
          <div className="flex flex-col items-center gap-3 py-3">
            <span className="voted-badge">
              <span className="w-4 h-4 rounded-full bg-white inline-block shrink-0" />
              Stem Uitgebracht
            </span>
            <p className="font-body text-poly-dim text-xs text-center leading-relaxed">
              Je stem is geregistreerd. Wis je browserdata om opnieuw te stemmen.
            </p>
          </div>
        ) : (
          <VoteSlider eventId={id} onVoted={handleVoted} />
        )}
      </div>
    </article>
  );
}
