import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/lib/server/schema.ts',
  out: 'src/lib/server/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'src/lib/server/sqlite.db',
  },
} satisfies Config;
