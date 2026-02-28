"use client";

import { useTransition } from "react";
import { deleteEvent } from "@/app/actions/events";

interface DeleteButtonProps {
  eventId: number;
  eventName: string;
}

export default function DeleteButton({ eventId, eventName }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !window.confirm(
        `Weet je het zeker? "${eventName}" en alle stemmen worden permanent verwijderd.`
      )
    ) {
      return;
    }
    startTransition(async () => {
      await deleteEvent(eventId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Verwijder categorie"
      className="
        font-display font-bold uppercase tracking-[0.15em] text-xs
        text-poly-white
        border border-poly-line
        px-3 py-1.5
        hover:bg-white hover:text-poly-red
        active:opacity-70
        transition-colors duration-100
        disabled:opacity-40 disabled:cursor-not-allowed
        cursor-pointer whitespace-nowrap
      "
    >
      {isPending ? "Bezig..." : "Verwijder"}
    </button>
  );
}
