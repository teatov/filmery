import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const movies = await db.query.movieTable.findMany();
  return { movies };
};
