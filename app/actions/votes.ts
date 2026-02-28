"use server";

import { revalidatePath } from "next/cache";
import { castVote as dbCastVote, eventExists } from "@/lib/queries";

export async function castVote(
  eventId: number,
  score: number
): Promise<{ success: boolean; error?: string }> {
  if (!Number.isInteger(eventId) || eventId <= 0) {
    return { success: false, error: "Invalid event ID." };
  }
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return { success: false, error: "Score must be between 1 and 5." };
  }
  if (!eventExists(eventId)) {
    return { success: false, error: "Event not found." };
  }

  dbCastVote(eventId, score);
  revalidatePath("/");
  return { success: true };
}
