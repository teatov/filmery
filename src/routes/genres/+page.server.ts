import { db } from '$lib/server/db';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { genreTable } from '$lib/server/schema';

export const load: PageServerLoad = async () => {
  const genres = await db.query.genreTable.findMany({
    with: { movies: true },
    orderBy: [asc(genreTable.name)],
  });
  return { genres };
};
