import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('src/lib/server/sqlite.db');
export const db = drizzle(sqlite);
