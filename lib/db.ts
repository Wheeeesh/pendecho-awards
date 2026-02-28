import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// On Railway, mount a persistent volume at /data and set DATABASE_DIR=/data
const DATA_DIR = process.env.DATABASE_DIR ?? path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "awards.db");

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Singleton: reuse the connection across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _db: Database.Database | undefined;
}

export const db: Database.Database =
  global._db ?? (global._db = new Database(DB_PATH));

// Enable WAL mode for better concurrent read performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Schema migration — runs once on startup
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS votes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id   INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    score      INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE INDEX IF NOT EXISTS idx_votes_event_id ON votes(event_id);
`);
