import { db } from "./db";

export interface EventRow {
  id: number;
  name: string;
  created_at: number;
  vote_count: number;
  average_score: number | null;
}

const getAllEventsStmt = db.prepare<[], EventRow>(`
  SELECT
    e.id,
    e.name,
    e.created_at,
    COUNT(v.id)   AS vote_count,
    AVG(v.score)  AS average_score
  FROM events e
  LEFT JOIN votes v ON v.event_id = e.id
  GROUP BY e.id
  ORDER BY e.created_at DESC
`);

export function getAllEvents(): EventRow[] {
  return getAllEventsStmt.all();
}

const getEventByIdStmt = db.prepare<[number], { id: number }>(
  `SELECT id FROM events WHERE id = ?`
);

export function eventExists(id: number): boolean {
  return !!getEventByIdStmt.get(id);
}

const createEventStmt = db.prepare<[string], { id: number }>(
  `INSERT INTO events (name) VALUES (?) RETURNING id`
);

export function createEvent(name: string): number {
  const row = createEventStmt.get(name) as { id: number };
  return row.id;
}

const deleteEventStmt = db.prepare<[number], void>(
  `DELETE FROM events WHERE id = ?`
);

export function deleteEvent(id: number): void {
  deleteEventStmt.run(id);
}

const castVoteStmt = db.prepare<[number, number], void>(
  `INSERT INTO votes (event_id, score) VALUES (?, ?)`
);

export function castVote(eventId: number, score: number): void {
  castVoteStmt.run(eventId, score);
}
