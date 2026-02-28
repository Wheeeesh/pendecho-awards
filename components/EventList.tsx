import type { EventRow } from "@/lib/queries";
import EventCard from "./EventCard";

interface EventListProps {
  events: EventRow[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        {/* Empty state — nested circles like POLY-8 */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-poly-line flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-poly-line opacity-50" />
          </div>
        </div>
        <p className="font-display font-bold text-poly-white uppercase tracking-[0.2em] text-lg">
          Geen categorieën gevonden.
        </p>
        <p className="font-body text-poly-dim mt-2 text-sm">
          Voeg de eerste categorie toe om te beginnen.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="h-px flex-1 bg-poly-line" />
        <h2 className="font-display font-bold text-poly-white uppercase tracking-[0.2em] text-base whitespace-nowrap">
          Categorieën
        </h2>
        <span className="h-px flex-1 bg-poly-line" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            voteCount={event.vote_count}
            averageScore={event.average_score}
          />
        ))}
      </div>
    </>
  );
}
