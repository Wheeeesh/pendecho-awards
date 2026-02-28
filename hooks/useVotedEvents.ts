"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "pendecho_voted_events";

export function useVotedEvents() {
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: number[] = raw ? JSON.parse(raw) : [];
      setVotedIds(new Set(parsed));
    } catch {
      setVotedIds(new Set());
    }
    setHydrated(true);
  }, []);

  function markVoted(eventId: number) {
    setVotedIds((prev) => {
      const next = new Set(prev);
      next.add(eventId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // localStorage might be unavailable in some contexts
      }
      return next;
    });
  }

  function hasVoted(eventId: number): boolean {
    return hydrated && votedIds.has(eventId);
  }

  return { hasVoted, markVoted, hydrated };
}
