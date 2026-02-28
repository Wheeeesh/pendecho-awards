"use server";

import { revalidatePath } from "next/cache";
import {
  createEvent as dbCreateEvent,
  deleteEvent as dbDeleteEvent,
  eventExists,
} from "@/lib/queries";

export async function createEvent(formData: FormData): Promise<{ error?: string }> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";

  if (name.length < 2) {
    return { error: "Naam moet minimaal 2 tekens bevatten." };
  }
  if (name.length > 100) {
    return { error: "Naam is te lang. Maximaal 100 tekens." };
  }

  dbCreateEvent(name);
  revalidatePath("/");
  return {};
}

export async function deleteEvent(eventId: number): Promise<{ error?: string }> {
  if (!Number.isInteger(eventId) || eventId <= 0) {
    return { error: "Invalid event ID." };
  }
  if (!eventExists(eventId)) {
    return { error: "Event not found." };
  }

  dbDeleteEvent(eventId);
  revalidatePath("/");
  return {};
}
