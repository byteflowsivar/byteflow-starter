import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

/**
 * DB ADAPTER CONFIGURATION
 * 
 * To swap to PostgreSQL in production:
 * 1. Install 'pg' and '@types/pg'
 * 2. Import { drizzle } from 'drizzle-orm/node-postgres'
 * 3. Import { Pool } from 'pg'
 * 4. Replace the implementation below with a Pool instance
 */

const sqlite = new Database(process.env.DATABASE_URL || './data/byteflow.db');
export const db = drizzle(sqlite, { schema });

export type DbClient = typeof db;
