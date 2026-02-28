"use client";

import { useRef, useState, useTransition } from "react";
import { createEvent } from "@/app/actions/events";

export default function CreateEventForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createEvent(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
        setTimeout(() => setSuccess(false), 2500);
      }
    });
  }

  return (
    <section className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="h-px flex-1 bg-poly-line" />
        <h2 className="font-display font-bold text-poly-white uppercase tracking-[0.2em] text-base whitespace-nowrap">
          Nieuwe Categorie
        </h2>
        <span className="h-px flex-1 bg-poly-line" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-poly-line p-5 flex flex-col sm:flex-row gap-3"
      >
        <input
          ref={inputRef}
          name="name"
          type="text"
          placeholder="bijv. Beste Snor van 1978..."
          maxLength={100}
          required
          disabled={isPending}
          className="
            flex-1 font-body text-poly-dark bg-poly-white
            px-4 py-3 text-sm
            placeholder:text-poly-mid placeholder:opacity-60
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-poly-red
            disabled:opacity-50
          "
        />
        <button
          type="submit"
          disabled={isPending}
          className="
            font-display font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap
            bg-poly-white text-poly-red
            px-6 py-3
            hover:opacity-90
            active:opacity-70
            transition-opacity duration-100
            disabled:opacity-40 disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          {isPending ? "Bezig..." : "Toevoegen"}
        </button>
      </form>

      {error && (
        <p className="mt-2 font-body text-white text-xs text-center opacity-80">{error}</p>
      )}
      {success && (
        <p className="mt-2 font-display font-bold text-poly-white text-xs uppercase tracking-[0.2em] text-center">
          Categorie toegevoegd!
        </p>
      )}
    </section>
  );
}
