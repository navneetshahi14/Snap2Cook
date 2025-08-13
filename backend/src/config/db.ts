import { drizzle } from "drizzle-orm/neon-http";
import { neon } from '@neondatabase/serverless';
import { ENV } from './env.ts';
import * as schema from '../db/schema.ts';
 
const sql = neon(ENV.DATABASE_URL as string);
export const db = drizzle(sql,{ schema });


