import { getAllEvents } from "@/lib/queries";
import CreateEventForm from "@/components/CreateEventForm";
import EventList from "@/components/EventList";

// Always fetch fresh data — no caching for this interactive page
export const dynamic = "force-dynamic";

export default function Home() {
  const events = getAllEvents();

  return (
    <>
      <CreateEventForm />
      <EventList events={events} />
    </>
  );
}
